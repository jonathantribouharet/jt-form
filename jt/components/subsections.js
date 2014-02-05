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

	var MODULE_NAME = 'form:subsection';

	console.log('Module: ' + MODULE_NAME);

	JT.set('currentSubSectionId', null);

	JT.set('subsectionIds', {});

	var subsectionComponents = [];

	JT.registerSubsection = function(componentConfig){
		JT.toArray(componentConfig.on, 'init');
		JT.toArray(componentConfig.on, 'create');

		prepareViews(componentConfig);

		var component = new JT.Component(MODULE_NAME, componentConfig);
		JT.registerComponent(component);

		subsectionComponents.push(component);
	};

	JT.createSubsection = function(config){
		for(var i = 0; i < subsectionComponents.length; ++i){
			JT.createComponent(MODULE_NAME, subsectionComponents[i].name, config);
		}

		if(!JT.get('currentSubSectionId')){
			JT.set('currentSubSectionId', config.id);
		}

		var subsectionIds = JT.get('subsectionIds');
		
		if(!subsectionIds[config.section_id]){
			subsectionIds[config.section_id] = [];
		}
		subsectionIds[config.section_id].push(config.id);
	};

	function prepareViews(componentConfig){
		componentConfig.on.init.unshift(JT.loadView(MODULE_NAME + ':' + componentConfig.name));
	}

});