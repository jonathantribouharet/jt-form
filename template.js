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

window.is_iframe = false;
window.is_loaded = false;

$(document).on('ready', _sponseasyLoad);

var templatesHTML = {};

var sectionViews = {};

function _sponseasyLoad(){
	var proposalId = getUrlParameters('id', "", true);
	var previewMode = getUrlParameters('preview', "", true) !== false;
	var url = '/api/proposals/' + proposalId;

	$('[jt-section-view]').addClass('hidden');

	var apiURL = url;
	if(previewMode){
		apiURL += '?preview=true';
	}

	loadTemplateViews();

	$.getJSON(apiURL, function(data){

		$('[jt-view="name"]').text(data.name);

		for(var i = 0; i < data.data.length; ++i){
			var answer = data.data[i];
			loadElement(answer.key, answer.data.dataValid);
		}

		for(var i = 0; i < data.templateData.length; ++i){
			var answer = data.templateData[i];
			loadTemplateElement(answer.key, answer.data.data);
		}

		if(!previewMode){
			var alive_url = url + '/alive';
			setInterval(function(){
				$.ajax(alive_url);
			}, 15000);

			load_form_contact(url + '/contact');
		}

		load_control_slide();
		hide_contact_packages();
		window.is_loaded = true;

	});
}

function loadTemplateViews(){
	$('[jt-template-view]').each(function(index, element){
		var view = $(element);
		var key = view.attr('jt-template-view');

		if(templatesHTML[key]){
			if(typeof(templatesHTML[key]) == "string"){
				var oldView = templatesHTML[key];
				templatesHTML[key] = {
					0: oldView
				};
			}

			var numberViews = count_object_property(templatesHTML[key]);
			templatesHTML[key][numberViews] = view[0].outerHTML;
		}
		else{
			templatesHTML[key] = view[0].outerHTML;
		}

		view.remove();
	});
}

function loadElement(key, data){
	var containerView = $('[jt-view="' + key +'"]');
	containerView.html('');

	if(containerView.length == 1){
		var templateHTML = templatesHTML[key];

		if(!templateHTML){
			console.log("No template view for: " + key);
			return;
		}

		if(!refreshSectionView(containerView, key, data)){
			return;
		}

		try{
			
			if(containerView.attr('jt-attr') == 'custom'){
				eval("load_" + key + "(containerView, templateHTML, data);");
			}
			else{
				var templates = classic_load(containerView, templateHTML, data);
				eval("load_" + key + "(containerView, templates, data);");
			}

			if(window.is_loaded){
				showElement(containerView);	
			}

		}catch(e){
			console.log(e.message);
		}
	}
	else{
		console.log("No element: " + key);
	}
}

function loadTemplateElement(key, data){
	try{
		var templates = $('[jt-template="' + key + '"]');
		eval("load_template_" + key + "(templates, data);");
	}catch(e){
		console.log(e.message);
	}
}

function classic_load(containerView, templateHTML, data){
	var templates = [];

	for(var i in data){
		var templateData = data[i];
		var templateView = $(templateHTML);
		templates.push(templateView);
		containerView.append(templateView);

		for(var attr in templateData){
			var attrData = templateData[attr];

			if(typeof(attrData) == "string" || typeof(attrData) == "number"){
				templateView.find('[jt-attr="' + attr + '"]').text(attrData);
			}
			else{
				for(var j in attrData){
					templateView.find('[jt-attr="' + attr + '.' + j + '"]').text(attrData[j]);
				}
			}
		}
	}

	return templates;
}

function refreshSectionView(containerView, key, data){
	var sectionView = containerView.parents('[jt-section-view]');
	var sectionName = sectionView.attr('jt-section-view');
	var isVisible = (data && count_object_property(data) > 0);

	var parentSectionName = registerSection(sectionView, sectionName);
	registerElementForSection(sectionName, 'inputs', key);
	setStateForSection(sectionName, 'inputs', key, isVisible);
	refreshVisibilityForSection(sectionName, parentSectionName);

	return isVisible;
}

function registerSection(sectionView, sectionName){
	var parentSectionView = sectionView.parents('[jt-section-view]');

	if(parentSectionView.length > 0){
		var parentSectionName = parentSectionView.attr('jt-section-view');
		registerElementForSection(parentSectionName, 'sections', sectionName);

		return parentSectionName;
	}

	return null;
}

function registerElementForSection(sectionName, type, key){
	if(!sectionViews[sectionName]){
		sectionViews[sectionName] = {};
	}
	if(!sectionViews[sectionName][type]){
		sectionViews[sectionName][type] = {};
	}

	sectionViews[sectionName][type][key] = {
		isVisible: false
	};
}

function setStateForSection(sectionName, type, key, isVisible){
	sectionViews[sectionName][type][key].isVisible = isVisible;
}

function refreshVisibilityForSection(sectionName, parentSectionName){
	var sections = $('[jt-section-view="' + sectionName + '"]');

	var sectionVisible = false;
	for(var i in sectionViews[sectionName].inputs){
		if(sectionViews[sectionName].inputs[i].isVisible){
			sectionVisible = true;
			break;
		}
	}
	for(var i in sectionViews[sectionName].sections){
		if(sectionViews[sectionName].sections[i].isVisible){
			sectionVisible = true;
			break;
		}
	}

	if(sectionVisible === true){
		sections.removeClass('hidden');
	}
	else{
		sections.addClass('hidden');
	}

	if(!parentSectionName){
		return;
	}

	var sectionParents = $('[jt-section-view="' + parentSectionName + '"]');
	setStateForSection(parentSectionName, 'sections', sectionName, sectionVisible);

	sectionVisible = false;
	for(var i in sectionViews[parentSectionName].inputs){
		if(sectionViews[parentSectionName].inputs[i].isVisible){
			sectionVisible = true;
			break;
		}
	}
	for(var i in sectionViews[parentSectionName].sections){
		if(sectionViews[parentSectionName].sections[i].isVisible){
			sectionVisible = true;
			break;
		}
	}

	if(sectionVisible){
		sectionParents.removeClass('hidden');
	}
	else{
		sectionParents.addClass('hidden');
	}
}

function count_object_property(object){
	var count = 0;
	for(var i in object){
		count++;
	}

	return count;
}


// Use for preview
function showElement(containerView){
	showSection(containerView);
	$('html, body').stop().animate({  
		scrollTop: Math.max(containerView.find('[jt-template-view]').offset().top - 200, 0)
	}, 200, function(){
		// var highlight = $('.highlight');
		// if (highlight.is(':hidden')) {
		// 	highlight.show();
		// }
		// if(is_iframe){
		// 	highlight.animate({
		// 		top 	: Math.max(containerView.find('[jt-template-view]').offset().top - 20, 0),
		// 		height 	: containerView.find('[jt-template-view]').outerHeight() + 40
		// 	}, 'slow');
		// }
	});  
}


// Process show and hide on slider
// WARNING petit bug ne met pas a jour le menu du slider
function showSection(containerView){
	var sectionView = containerView.parents('[jt-section-view]');
	var sectionName = sectionView.attr('jt-section-view');	

	if(!sectionView.hasClass('element')){
		return;
	}

	sectionView.parent().children('.element').hide();
	sectionView.show();
}


// function refreshSectionView(containerView, key, data){
// 	var sectionView = containerView.parents('[jt-section-view]');
// 	var sectionName = sectionView.attr('jt-section-view');
// 	sectionView = $('[jt-section-view="' + sectionName + '"]');

// 	if(!sectionViews[sectionName]){
// 		sectionViews[sectionName] = {
// 			inputs: {},
// 			sections: {}
// 		};
// 	}
// 	if(!sectionViews[sectionName].inputs[key]){
// 		sectionViews[sectionName].inputs[key] = {};
// 	}

// 	if(data && count_object_property(data) > 0){
// 		sectionViews[sectionName].inputs[key].isVisible = true;
// 	}
// 	else{
// 		sectionViews[sectionName].inputs[key].isVisible = false;
// 	}

// 	var sectionVisible = false;
// 	for(var i in sectionViews[sectionName].inputs){
// 		if(sectionViews[sectionName].inputs[i].isVisible){
// 			sectionVisible = true;
// 			break;
// 		}
// 	}	

// 	if(sectionVisible){
// 		sectionView.show();
// 	}
// 	else{
// 		sectionView.hide();
// 	}

// 	return sectionVisible;
// }




function getUrlParameters(parameter, staticURL, decode){
   /*
    Function: getUrlParameters
    Description: Get the value of URL parameters either from 
                 current URL or static URL
    Author: Tirumal
    URL: www.code-tricks.com
   */
   var currLocation = (staticURL.length)? staticURL : window.location.search,
       parArr = currLocation.split("?")[1].split("&"),
       returnBool = true;
   
   for(var i = 0; i < parArr.length; i++){
        parr = parArr[i].split("=");
        if(parr[0] == parameter){
            return (decode) ? decodeURIComponent(parr[1]) : parr[1];
            returnBool = true;
        }else{
            returnBool = false;
        }
   }
   
   if(!returnBool) return false;  
}