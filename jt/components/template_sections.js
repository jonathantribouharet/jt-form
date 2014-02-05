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

	var MODULE_NAME = 'template:section';

	console.log('Module: ' + MODULE_NAME);

	var sectionComponents = [];

	JT.registerTemplateSection = function(componentConfig){
		JT.toArray(componentConfig.on, 'init');
		JT.toArray(componentConfig.on, 'create');

		prepareViews(componentConfig);

		var component = new JT.Component(MODULE_NAME, componentConfig);
		JT.registerComponent(component);

		sectionComponents.push(component);
	};

	JT.createTemplateSection = function(config){
		for(var i = 0; i < sectionComponents.length; ++i){
			JT.createComponent(MODULE_NAME, sectionComponents[i].name, config);
		}
	};

	function prepareViews(componentConfig){
		componentConfig.on.init.unshift(JT.setContainerView(MODULE_NAME + ':' + componentConfig.name));
		componentConfig.on.init.unshift(JT.loadView(MODULE_NAME + ':' + componentConfig.name));
		componentConfig.on.create.push(JT.addViewToContainer);
	}

});
