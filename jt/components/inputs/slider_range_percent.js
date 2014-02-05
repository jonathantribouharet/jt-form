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
			percent: context.view.find('input')
		};

		context.slider = context.view.find('.slider');

		if(context.config.options.min){
			context.config.options.min = Number(context.config.options.min);
		}
		if(context.config.options.max){
			context.config.options.max = Number(context.config.options.max);
		}

		if(isNaN(context.config.options.min)){
			context.config.options.min = 0;
		}
		if(isNaN(context.config.options.max)){
			context.config.options.max = 100;
		}

		context.slider.slider({
			range: true,
			min: context.config.options.min,
			max: context.config.options.max,
			step: 1,
			slide: function(event, ui){
				context.data.start = ui.values[0];
				context.data.end = ui.values[1];
				context.trigger('change');
			}
		});

		context.slider.find('a').append('<span></span>');
		context.leftSpan = context.view.find('a span').first();
		context.rightSpan = context.view.find('a span').last();

		context.data.start = context.config.options.min + ((context.config.options.max - context.config.options.min) / 5);
		context.data.end = context.config.options.max - ((context.config.options.max - context.config.options.min) / 5);
		change(context);
	}

	function load(context){
		for(var key in context.inputs){
			context.inputs[key].val(context.data[key]);
		}
	}

	function change(context){
		for(var key in context.inputs){
			context.data[key] = context.inputs[key].val();
		}

		context.leftSpan.text(context.data.start);
		context.rightSpan.text(context.data.end);

		context.slider.slider('values', 0, context.data.start);
		context.slider.slider('values', 1, context.data.end);
	}

	function validate(context){
		var result = false;

		if(!JT.validateNumeric(context.data.start) &&
			!JT.validateNumeric(context.data.end) &&
			!JT.validateNumeric(context.data.percent)){
			result = null;
		}
		else if(JT.validateNumeric(context.data.percent) && context.data.percent >= 0 && context.data.percent <= 100){
			result = true;
		}

		return result;
	}

	JT.registerInput({
		name: 'slider_range_percent',
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
