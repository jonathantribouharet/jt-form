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

$(document).one('jt-register-components', function(){

	function create(context){
		context.inputs = {
			value: context.view.find('input')
		};
		
		if(context.config.options.max){
			context.inputs.value.attr('max', context.config.options.max);
		}

		if(context.config.options.min){
			context.inputs.value.attr('min', context.config.options.min);
		}
	}

	function load(context){
		for(var key in context.inputs){
			context.inputs[key].val(context.data[key]);
		}
	}

	function change(context){
		var number = Number(context.inputs.value.val());
		if(!isNaN(number)){
			context.data.value = number;
		}
		else{
			context.data.value = null;
		}
	}

	function validate(context){
		var result = true;

		if(!JT.validateNumeric(context.data.value)){
			result = null;
		}
		else if(context.config.options.min && context.data.value < Number(context.config.options.min)){
			result - false;
		}
		else if(context.config.options.max && context.data.value > Number(context.config.options.max)){
			result = false;
		}

		return result;
	}

	JT.registerInput({
		name: 'number_field',
		fct:{
			validate: validate
		},
		on:{
			create: create,
			load: load,
			change: change
		}
	});
	
});
