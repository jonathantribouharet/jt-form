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

	var MODULE_NAME = 'form:input_collection';

	console.log('Module: ' + MODULE_NAME);

	var inputCollections = {};

	JT.registerInputCollection = function (componentConfig){
		JT.toArray(componentConfig.on, 'create');
		JT.toArray(componentConfig.on, 'load');
		JT.toArray(componentConfig.on, 'change');
		JT.toArray(componentConfig.on, 'validate');
		JT.toArray(componentConfig.on, 'refreshValidate');
		JT.toArray(componentConfig.on, 'addInput');
		JT.toArray(componentConfig.on, 'removeInput');

		prepareView(componentConfig);
		prepareInputSystem(componentConfig);
		prepapreValidate(componentConfig);

		var component = new JT.Component(MODULE_NAME, componentConfig);

		component.data = {
			data: {},
			dataValid: {}
		};

		component.lastInputPosition = 0;
		component.inputs = {};
		
		component.sectionId = null;
		component.isValided = null;

		component.addButton = null;
		component.isRemoved = false; // truc pour si la section est removed

		JT.registerComponent(component);

		inputCollections[componentConfig.name] = {};
	};

	JT.createInputCollection = function(type, config){
		var context = JT.createComponent(MODULE_NAME, type, config);

		inputCollections[type][config.key] = context;
	};

	JT.loadInputCollection = function(type, json){
		var context = inputCollections[type][json.key];

		if(!context){
			console.log("No input: " + type + ":" + json.key);
			return;
		}

		context.data = json.data;
		context.trigger('load');
	};

	function prepareView(componentConfig){
		componentConfig.on.create.unshift(JT.prepareQuestionView);

		componentConfig.on.create.push(function(context){
			for(var i = 0; i < Number(context.config.options.min_template); ++i){
				context.trigger('addInput');
			}
		});

		// WARNING
		if(componentConfig.name == 'template'){
			return;
		}

		componentConfig.on.create.push(JT.registerQuestionToSection);
	}

	function prepareInputSystem(componentConfig){
		componentConfig.on.addInput.push(addInput);
		componentConfig.on.removeInput.push(removeInput);
		componentConfig.on.load.push(load);
	}

	// WARNING
	function prepapreValidate(componentConfig){
		if(componentConfig.name == 'template'){
			return;
		}

		componentConfig.on.refreshValidate.push(function(context){
			var newStatus = null;

			for(var i in context.inputs){
				var input = context.inputs[i];
				if(input.isValided === false){
					newStatus = false;
					break;
				}
				else if(input.isValided === true){
					newStatus = true;
				}
			}

			if(context.isValided !== newStatus){
				context.isValided = newStatus;
				context.trigger('validate');
				JT.sectionRefreshValidate(context.sectionId);
			}

		});
	}

	function addInput(context){
		var inputContext = JT.createComponent('form:input', context.config.input, context.config);
		inputContext.inputCollection = context;
		inputContext.inputPosition = context.lastInputPosition;
		context.inputs[context.lastInputPosition] = inputContext;

		JT.addInputToQuestion(context, inputContext);
		
		if(context.config.options.min_template == context.config.options.max_template){
			context.view.find('[jt-view="delete"]').hide();
		}

		inputContext.view.find('[jt-view="delete"] a').on('click', function(e){
			e.preventDefault();
			removeInput(context, inputContext.inputPosition);
		});

		context.lastInputPosition++;

		if(context.lastInputPosition >= Number(context.config.options.max_template)){
			context.addButton.hide();
		}
	}

	function removeInput(context, inputId){
		if(context.lastInputPosition <= Number(context.config.options.min_template)){
			return;
		}

		context.inputs[inputId].view.remove();

		delete context.inputs[inputId];

		context.lastInputPosition--;

		context.addButton.show();

		// reorganize ids

		var inputsArray = [];

		for(var i in context.inputs){
			inputsArray.push(context.inputs[i]);
		}

		context.inputs = {};
		context.data = {
			data: {},
			dataValid: {}
		};

		for(var i = 0; i < inputsArray.length; ++i){
			context.inputs[i] = inputsArray[i];
			context.inputs[i].inputPosition = i;
		}

		// update data
		context.trigger('change');
	}

	function load(context){
		// can have data = { 2: ..., 4: ... } because $.ajax don't send empty object
		var maxId = 0;
		for(var i in context.data.data){
			maxId = Math.max(i, maxId);
		}

		for(var i = 0; i <= maxId; ++i){
			if(!context.inputs[i]){
				context.trigger('addInput');
			}
		}

		for(var i in context.data.data){
			var inputContext = context.inputs[i];
			inputContext.data = context.data.data[i];
		}

		// After else update context.data with setDateFromTemplate
		for(var i in context.inputs){
			var inputContext = context.inputs[i];
			inputContext.trigger('load');
			inputContext.trigger('change');
		}
	}

});