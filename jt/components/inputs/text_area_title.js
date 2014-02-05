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
			title: context.view.find('input'),
			content: context.view.find('textarea')
		};
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
	}

	function validate(context){
		var result = true;

		if(!JT.validateNotBlank(context.data.title) && !JT.validateNotBlank(context.data.content)){
			result = null;
		}
		else if(
			(!JT.validateNotBlank(context.data.title) || !JT.validateNotBlank(context.data.content)) || 
			context.config.options.content_maxlength && context.data.content.length > context.config.options.content_maxlength){
			result = false;
		}

		return result;
	}

	JT.registerInput({
		name: 'text_area_title',
		helpers: [{
			name: 'textarea',
			options: 'content'
		}],
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
