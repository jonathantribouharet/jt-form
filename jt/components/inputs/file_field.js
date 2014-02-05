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
		if(context.config.options.is_image == "1"){
			context.view.find('input[type="file"]').attr('accept', 'image/*');

			context.view.find('.dragndrop a').on('click', function(e){
				e.preventDefault();

				fileManager.show(
					function(file){
						uploadSuccess(context, file);
					},
					{
						file_type: 'images',
						crop_size: context.config.options.format
					}
				);
			});
		}
		else{
			context.view.find('.dragndrop a').on('click', function(e){
				e.preventDefault();
				context.view.find('input[type="file"]').trigger('click');
			});
		}
	}

	function load(context){
		if(context.data.file){
			uploadSuccess(context, context.data.file);
		}
	}

	function validate(context){
		var result = null;

		if(context.data && context.data.file){
			result = true;
		}

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
		name: 'file_field',
		helpers: [{
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
			load: load
		}
	});
	
});
