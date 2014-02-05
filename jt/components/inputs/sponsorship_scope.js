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
			// context.view.find('input:checked').prop('checked', false);
			// $(this).prop('checked', true);
			// context.view.find('input').trigger('change');
			context.trigger('change');
		});
	}

	function load(context){
		context.view.find('input').prop('checked', false);

		for(var key in context.data){
			var value = context.data[key];
			context.view.find('input[value="' + value + '"]').prop('checked', true);
		}
	}

	function change(context){
		context.data = {};
		var inputs = context.view.find('input:checked');

		for(var i = 0; i < inputs.length; ++i){
			var input = inputs[i];
			context.data[i] = $(input).val();
		}
	}

	function validate(context){
		var isNull = true;

		for(var i in context.data){
			isNull = false;
			break;
		}

		if(isNull){
			return null;
		}

		return true;
	}

	JT.registerInput({
		name: 'sponsorship_scope',
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
