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

	var MODULE_NAME = 'form:input';

	console.log('Module: ' + MODULE_NAME);

	JT.registerInput = function(componentConfig){
		JT.toArray(componentConfig.on, 'create');
		JT.toArray(componentConfig.on, 'load');
		JT.toArray(componentConfig.on, 'change');
		JT.toArray(componentConfig.on, 'validate');
		
		prepareView(componentConfig);
		prepareHelpers(componentConfig);
		prepareSynchonizeInputCollection(componentConfig);

		var component = new JT.Component(MODULE_NAME, componentConfig);

		component.isValided = null;
		component.data = {};

		component.isFullScreen = componentConfig.isFullScreen || false;
		component.inputCollection = null;
		component.inputPosition = null;
		
		JT.registerComponent(component);
	};

	JT.createInput = function(config){
		return JT.createComponent(MODULE_NAME, config.input, config);
	};

	function prepareView(componentConfig){
		componentConfig.on.create.unshift(JT.loadView('form:question:' + componentConfig.name));
	}

	function prepareHelpers(componentConfig){
		if(!componentConfig.helpers){
			componentConfig.helpers = [];
		}

		componentConfig.helpers.push({ name: 'placeholder' });
		componentConfig.helpers.push({ name: 'change' });
		componentConfig.helpers.push({ name: 'validate' });

		for(var i = 0; i < componentConfig.helpers.length; ++i){
			var helper = componentConfig.helpers[i];

			var helperName = helper.name;
			helperName = helperName.charAt(0).toUpperCase() + helperName.slice(1);

			eval('JT.helper' + helperName + '(componentConfig, helper.options);');
		}
	}

	// Must call after validate changed
	function prepareSynchonizeInputCollection(componentConfig){
		componentConfig.on.change.push(function(context){
			if(context.inputCollection){
				context.inputCollection.trigger('change');
			}
		});
		componentConfig.on.validate.push(function(context){
			if(context.inputCollection){
				context.inputCollection.trigger('refreshValidate');
			}
		});
	}

});