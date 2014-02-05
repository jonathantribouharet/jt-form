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
			title: context.view.find('input[type="text"]'),
			content: context.view.find('textarea')
		};

		context.view.find('.dragndrop a').on('click', function(e){
			e.preventDefault();
			context.view.find('input[type="file"]').trigger('click');
		});
	}

	function load(context){
		for(var key in context.inputs){
			context.inputs[key].val(context.data[key]);
		}

		if(context.data.file){
			uploadSuccess(context, context.data.file);
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
		else if(context.config.options.content_maxlength && context.data.content.length > context.config.options.content_maxlength){
			result = false;
		}
		// else if(!context.data.file){
			// result = false;
		// }

		return result;
	}

	function uploadProgress(context, percent){
		context.view.find('span[jt-attr="uploaded"]').text('Uploading ' + percent + '%');
		context.view.find('span[jt-attr="upload"]').hide();
	}

	function uploadSuccess(context, file){
		context.view.find('span[jt-attr="uploaded"]').text('File: ' + file.name);
		context.view.find('span[jt-attr="upload"]').show();

		context.data.file = file;
		context.trigger('change');
	}

	function uploadError(context){
		context.view.find('span[jt-attr="uploaded"]').text('Error');
		context.view.find('span[jt-attr="upload"]').show();
	}

	JT.registerInput({
		name: 'text_area_file',
		helpers: [{
			name: 'textarea',
			options: 'content'
		},
		{
			name: 'file',
			options: {
				inputSelector: 'input[type="file"]',
				progress: uploadProgress,
				success: uploadSuccess,
				error: uploadError
			}
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
