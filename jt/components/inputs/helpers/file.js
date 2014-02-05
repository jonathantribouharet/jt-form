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

$(document).one('jt-register-modules', function(){

	var MODULE_NAME = 'helper:file';

	console.log('Helper: ' + MODULE_NAME);

	JT.helperFile = function(componentConfig, options){
		componentConfig.on.create.push(function(context){

			var inputFile = context.view.find(options.inputSelector).first();

			inputFile.on('change', function(){
				upload(inputFile.prop("files")[0], options, context);
			});

			context.view.find('.dragndrop').on('drop',function(e){
				if(e.originalEvent.dataTransfer){
					if(e.originalEvent.dataTransfer.files.length > 0){
						e.preventDefault();
		                e.stopPropagation();

						context.view.find('.dragndrop').removeClass('dragover');
						upload(e.originalEvent.dataTransfer.files[0], options, context);
					} 
				}
			});

		});
	};

	function upload(fileData, options, context){
		var formData = new FormData();
		formData.append("file", fileData);

		$.ajax({
			type: 'POST',
			url: JT.get('url_upload'),
			enctype: 'multipart/form-data',
	        contentType: false,
	        processData: false,
			data: formData,
			xhr: function(){
				var xhr = null;

				// IE
				if(window.ActiveXObject){
					xhr = new window.ActiveXObject('Microsoft.XMLHTTP');
				}
				else{
					xhr = new window.XMLHttpRequest();

					xhr.upload.addEventListener('progress', function(e){
						if(e.lengthComputable){
							options.progress(context, Math.round(e.loaded / e.total * 100.0));
						}
					}, false);
				}

				return xhr;
			}
		}).done(function(data){
			if(data.id){
				// fileManager.add(new JTFile(data.id, data.url, data.name, data.size));
				options.success(context, data);
			}
			else{
				options.error(context);	
			}
		}).fail(options.error(context));
	}

});
