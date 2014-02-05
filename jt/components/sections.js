 /*************************************************************************
 * 
 * COPYRIGHT Jonathan Tribouharet
 * __________________
 * 
 *  [2013] - [2014] Jonathan Tribouharet
 *  All Rights Reserved.
 * 
 * NOTICE:  All information contained herein is, and remains
 * the property of Jonathan Tribouharet.
 * The intellectual and technical concepts contained
 * herein are proprietary to Jonathan Tribouharet
 * and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Jonathan Tribouharet.
 */
 
'use strict'

$(document).one('jt-register-modules', function(){

	var MODULE_NAME = 'form:section';

	console.log('Module: ' + MODULE_NAME);

	JT.set('currentSectionId', null);

	var visibleSectionIds = [];
	var sectionComponents = [];
	var sectionStates = {};
	var sectionConfigs = {};
	
	var questionsList = {};

	$(document).one('jt-loaded', function(){
		JT.showSection(visibleSectionIds[0]);
	});

	JT.registerSection = function(componentConfig){
		JT.toArray(componentConfig.on, 'init');
		JT.toArray(componentConfig.on, 'create');

		prepareViews(componentConfig);

		var component = new JT.Component(MODULE_NAME, componentConfig);
		JT.registerComponent(component);

		sectionComponents.push(component);
	};	

	JT.createSection = function(config){
		for(var i = 0; i < sectionComponents.length; ++i){
			JT.createComponent(MODULE_NAME, sectionComponents[i].name, config);
		}

		if(!JT.get('currentSectionId')){
			JT.set('currentSectionId', config.id);
		}

		sectionStates[config.id] = {
			isRemovable: config.is_removable,
			isRemoved: null,
			isValided: null
		}

		sectionConfigs[config.id] = config;

		if(config.is_removable){
			JT.disableSection(config.id);
		}
		else{
			JT.enableSection(config.id);
		}
	};

	JT.loadSectionStates = function(data){
		for(var sectionId in data){
			if(data[sectionId].isRemoved == "true"){
				JT.disableSection(sectionId);
			}
			else{
				JT.enableSection(sectionId);
			}
		}
	};

	function prepareViews(componentConfig){
		componentConfig.on.init.unshift(JT.setContainerView(MODULE_NAME + ':' + componentConfig.name));
		componentConfig.on.init.unshift(JT.loadView(MODULE_NAME + ':' + componentConfig.name));
		componentConfig.on.create.push(JT.addViewToContainer);
	}

	JT.showSection = function(sectionId, subsectionId){
		if(!subsectionId){
			var subsectionIds = JT.get('subsectionIds');			
			subsectionId = subsectionIds[sectionId][0];
		}

		JT.set('currentSectionId', sectionId);
		JT.set('currentSubSectionId', subsectionId);

		JT.trigger('currentSectionChanged');
		JT.trigger('currentSubSectionChanged');
	};

	JT.showNextSection = function(){
		var subsectionIds = JT.get('subsectionIds');
		var currentSectionId = JT.get('currentSectionId');

		var nextSectionId = null;
		var nextSubSectionId = null;
		var isNext = false;

		for(var i = 0; i < visibleSectionIds.length; ++i){
			var sectionId = visibleSectionIds[i];
			if(sectionId == currentSectionId){
				isNext = true;
			}
			else if(isNext){
				nextSectionId = sectionId;
				nextSubSectionId = subsectionIds[sectionId][0];
				break;
			}
		}

		if(nextSectionId){
			JT.showSection(nextSectionId, nextSubSectionId);
		}
		else{
			// Show lightbox end
			$('[jt-attr="lightbox"].done').removeClass('hidden');
		}
	};

	JT.disableAllSections = function(){
		for(var sectionId in sectionStates){
			JT.disableSection(sectionId);
		}
	};

	JT.enableSection = function(sectionId){
		if(sectionStates[sectionId].isRemoved === false){
			return;
		}

		visibleSectionIds.push(Number(sectionId));
		visibleSectionIds.sort(sortVisibleSectionIds);

		refreshStates(sectionId, { isRemoved: false });
	};

	JT.disableSection = function(sectionId){
		if(sectionStates[sectionId].isRemovable == false || sectionStates[sectionId].isRemoved === true){
			return;
		}

		var index = visibleSectionIds.indexOf(Number(sectionId));
		if(index >= 0){
			visibleSectionIds.splice(index, 1);
		}

		refreshStates(sectionId, { isRemoved: true });

		if(index < 0 || visibleSectionIds.length == 0){
			return;
		}

		var currentSectionId = JT.get('currentSectionId');
		if(currentSectionId == sectionId){			
			if(index >= 0){
				JT.showSection(visibleSectionIds[0]);
			}
			else{
				JT.showSection(visibleSectionIds[index - 1]);
			}
		}
	};

	JT.sectionRefreshValidate = function(sectionId){
		var newStatus = null;

		for(var i in questionsList){
			var questionContext = questionsList[i];
			if(questionContext.isValided === false){
				newStatus = false;
				break
			}
			else if(questionContext.isValided === true){
				newStatus = true;
			}
		}

		if(sectionStates[sectionId].isValided !== newStatus){
			refreshStates(sectionId, { isValided: newStatus });
		}
	}

	function refreshStates(sectionId, state){
		$.extend(sectionStates[sectionId], state);

		JT.trigger('sectionStateChanged', {sectionId: sectionId, state: sectionStates[sectionId] });
		
		if(state.isRemoved !== null && questionsList[sectionId]){
			for(var i = 0; i < questionsList[sectionId].length; ++i){
				var questionContext = questionsList[sectionId][i];
				questionContext.isRemoved = sectionStates[sectionId].isRemoved;

				questionContext.trigger('change');
			}
		}

		synchronizeProposalData();
	}

	function synchronizeProposalData(){
		JT.synchronizeProposalData({
			proposal_data: sectionStates
		});
	}

	JT.registerQuestionToSection = function(questionContext){
		var sectionId = findSectionIdBySubsectionId(questionContext.config.subsection_id);
		questionContext.sectionId = sectionId;
		
		if(!questionsList[sectionId]){
			questionsList[sectionId] = [];
		}

		questionsList[sectionId].push(questionContext);
	}

	function findSectionIdBySubsectionId(subsectionId){
		var subsectionIds = JT.get('subsectionIds');
		for(var sectionId in subsectionIds){
			var subsections = subsectionIds[sectionId];
			for(var i = 0; i < subsections.length; ++i){
				if(subsections[i] == subsectionId){
					return sectionId;
				}
			}
		}

		return null;
	}

	function sortVisibleSectionIds(a, b){
		if(Number(sectionConfigs[a].position) > Number(sectionConfigs[b].position)){
			return 1;
		}
		else if(Number(sectionConfigs[a].position) < Number(sectionConfigs[b].position)){
			return -1;
		}
		else{
			return 0;
		}
	}

});
