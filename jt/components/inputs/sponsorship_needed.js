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
		context.view.find('input').on('change', function(){
			context.trigger('change');
		});

		context.view.find('.select').hide();
	}

	function load(context){
		context.view.find('input').prop('checked', false);

		if(context.data.values){
			for(var key in context.data.values){
				var value = context.data.values[key];
				context.view.find('input[value="' + value + '"]').prop('checked', true);
			}
		}

		if(context.data.start){
			var value = context.data.start + ':' + context.data.end;

			context.view.find('input[type="hidden"]').val(value);
			context.view.find('span.value').each(function(index, element){
				if($(element).text() == value){
					$(element).parent().trigger('click');
				}
			});
		}
	}

	function change(context){
		context.data = {
			values: {}
		};

		var inputs = context.view.find('input:checked');

		for(var i = 0; i < inputs.length; ++i){
			var input = inputs[i];
			context.data.values[i] = $(input).val();
		}

		if(context.data.values[0] == 'Financial'){
			context.view.find('.select').slideDown();

			var value = context.view.find('input[type="hidden"]').val();
			if(value && value.length > 0){
				context.data.start = Number(value.match(/(\d+):(\d+)/)[1]);
				context.data.end = Number(value.match(/(\d+):(\d+)/)[2]);
			}
		}
		else{
			context.view.find('.select').slideUp();
			delete context.data.start;
			delete context.data.end;
		}
	}

	function validate(context){
		var isNull = true;

		for(var i in context.data.values){
			isNull = false;
			break;
		}

		if(isNull){
			return null;
		}

		// if(context.data.values[0] == 'Financial' && (!JT.validateNumeric(context.data.start) || !JT.validateNumeric(context.data.end))){
		// 	return false;
		// }

		return true;
	}

	JT.registerInput({
		name: 'sponsorship_needed',
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
