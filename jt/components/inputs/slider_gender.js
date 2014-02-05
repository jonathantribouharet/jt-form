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
		context.spanLeft = context.view.find('span').first();
		context.spanRight = context.view.find('span').last();

		context.sliderLeft = context.view.find('.slider-left');
		context.sliderRight = context.view.find('.slider-right');

		context.slider = context.view.find('.slider');

		context.slider.slider({
			min: 0,
			max: 100,
			step: 1,
			slide: function(event, ui){
				context.data.value = ui.value;
				context.trigger('change');
			}
		});

		context.data.value = 50;
		change(context);
	}

	function change(context){
		context.spanLeft.text('Women: ' + context.data.value + '%');
		context.spanRight.text('Men: ' + (100 - context.data.value) + '%');

		context.sliderLeft.css('width', context.data.value + '%');
		context.sliderRight.css('width', (100 - context.data.value) + '%');

		context.slider.slider('value', context.data.value);
	}

	function validate(context){
		return JT.validateNumeric(context.data.value);
	}

	JT.registerInput({
		name: 'slider_gender',
		fct:{
			validate: validate
		},
		on:{
			create: create,
			change: change
		}
	});
	
});
