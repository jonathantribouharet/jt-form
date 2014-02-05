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
			name: context.view.find('input').eq(1),
			role: context.view.find('input').eq(2),
			email: context.view.find('input').eq(3),
			phone: context.view.find('input').eq(4),
			twitter: context.view.find('input').eq(5),
			linkedin: context.view.find('input').eq(6),
			content: context.view.find('textarea'),
		};

		context.view.find('[jt-attr="upload-file"]').on('click', function(e){
			e.preventDefault();

			fileManager.show(
				function(file){
					uploadSuccess(context, file);
				},
				{
					file_type: 'images',
					crop_size: { width: 169, height: 169 }
				}
			);
		});

		context.view.find('[jt-attr="delete-file"]').on('click', function(e){
			e.preventDefault();
			removeFile(context);
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
		var isNull = true;

		for(var i in context.data){
			isNull = false;
			break;
		}

		if(isNull){
			return null;
		}

		isNull = true;

		for(var i in context.data){
			if(JT.validateNotBlank(context.data[i])){
				isNull = false;
				break;				
			}
		}

		if(isNull){
			return null;
		}

		if(JT.validateNotBlank(context.data.name) && JT.validateNotBlank(context.data.role)){
			return true;
		}

		return false;
	}

	function uploadProgress(context, percent){
		context.view.find('span[jt-attr="uploaded"]').text('Uploading ' + percent + '%');
		context.view.find('span[jt-attr="upload"]').hide();
	}

	function uploadSuccess(context, file){
		context.view.find('span[jt-attr="upload"]').show();
		context.view.find('.dragndrop').addClass('pics-on').css('background','url(' + file.url + ') no-repeat 50%').css('background-size', 'cover');

		context.data.file = file;
		context.trigger('change');
	}

	function uploadError(context){
		context.view.find('span[jt-attr="uploaded"]').text('Error');
		context.view.find('span[jt-attr="upload"]').show();
	}

	function removeFile(context){		
		context.view.find('.dragndrop').removeClass('pics-on').css('background','transparent');
		context.view.find('span[jt-attr="uploaded"]').hide();
		context.view.find('span[jt-attr="upload"]').show();

		delete context.data.file;
		context.trigger('change');
	}

	JT.registerInput({
		name: 'team',
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
