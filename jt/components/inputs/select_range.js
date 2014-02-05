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
	}

	function load(context){
		var value = context.data.start + ':' + context.data.end;

		context.view.find('input[type="hidden"]').val(value);
		context.view.find('span.value').each(function(index, element){
			if($(element).text() == value){
				$(element).parent().trigger('click');
			}
		});
	}

	function change(context){
		var value = context.view.find('input[type="hidden"]').val();
		if(value && value.length > 0){
			context.data.start = Number(value.match(/(\d+):(\d+)/)[1]);
			context.data.end = Number(value.match(/(\d+):(\d+)/)[2]);
		}
	}

	function validate(context){
		var result = null;

		if(JT.validateNumeric(context.data.start) && JT.validateNumeric(context.data.end)){
			result = true;
		}

		return result;
	}

	JT.registerInput({
		name: 'select_range',
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
