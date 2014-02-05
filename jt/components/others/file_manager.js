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

function JTFile(id, url, name, size){
	this.id = id;
	this.url = url;
	this.name = name;
	this.size = size;
}

function FileManager(uploadURL, cropURL){
	this.uploadURL = uploadURL;
	this.cropURL = cropURL;
	this.files = {};
	this.crop_size = {};
	this.view = $('.lightbox.filemanager').first();

	this.list_view = this.view.find('ul');
	this.template = this.list_view.find('li')[0].outerHTML;
	this.view.find('li').remove();

	this.callback = null;
	this.selected_file_id = null;

	var fileManager = this;

	this.view.on('click', 'li a', function(e){
		e.preventDefault();

		fileManager.selectFile($(this).attr('jt-file-id'));
	});

	this.view.find('[jt-file-manager="ok"]').on('click', function(e){
		e.preventDefault();

		if(!fileManager.selected_file_id){
			return;
		}

		fileManager.callback(fileManager.files[fileManager.selected_file_id]);
		fileManager.hide();
	});

	this.view.find('[jt-file-manager="crop"]').on('click', function(e){
		e.preventDefault();

		if(!fileManager.selected_file_id){
			console.log("No selected file");
			return;
		}

		var file = fileManager.files[fileManager.selected_file_id];

		if(!file.size || isNaN(file.size.width) || isNaN(file.size.height)){
			console.log("No size for this file", file);
			return;
		}

		fileManager.enterCropMode(file);
	});

	this.view.find('[jt-file-manager="upload"]').on('click', function(e){
		e.preventDefault();
		fileManager.view.find('input').trigger('click');
	});

	this.view.find('[jt-file-manager="hide"]').on('click', function(e){
		e.preventDefault();
		fileManager.hide();
	});

	this.view.find('[jt-attr="close"]').on('click', function(e){
		e.preventDefault();
		fileManager.hide();
	});

	this.view.find('input').on('change', function(){
		fileManager.upload();
	});
}

/******************************************/

FileManager.prototype.add = function(file){
	this.files[file.id] = file;

	var html = $(this.template);

	html.find('a').attr('jt-file-id', file.id);

	var fileName = file.name;
	var file_extension = fileName.split('.').slice(-1)[0];

	if(fileName.length > 8){
		fileName = fileName.substring(0,8) +'.. .'+file_extension;
	}

	html.find('span').text(fileName);
	

	if($.inArray(file_extension, ['jpg', 'jpeg', 'png', 'gif']) >= 0){
		html.find('img').attr('src', file.url);
	}

	this.list_view.append(html);
}

FileManager.prototype.upload = function(){
	var formData = new FormData();
	formData.append('file', this.view.find('input').prop("files")[0]);

	var fileManager = this;

	$.ajax({
		type: 'POST',
		url: fileManager.uploadURL,
		enctype: 'multipart/form-data',
		cache: false,
        contentType: false,
        processData: false,
		data: formData,
		xhr: function(){
			// IE
			if(window.ActiveXObject){
				return new window.ActiveXObject("Microsoft.XMLHTTP");
			}

			var xhr = new window.XMLHttpRequest();
			xhr.upload.addEventListener("progress", function(evt){
				if(evt.lengthComputable){
					var percentComplete = evt.loaded / evt.total;
					fileManager.view.find('[jt-file-manager="upload"]').text(Math.round(percentComplete * 100.0) + ' %');
				}
			}, false);

			return xhr;
		}
	}).done(function(data){
		if(data.id){
			fileManager.add(new JTFile(data.id, data.url, data.name, data.size));
		}
		fileManager.view.find('[jt-file-manager="upload"]').text('Upload a new file');
	});
}

/******************************************/

FileManager.prototype.show = function(callback, options){
	this.callback = callback;
	this.selectFile(null);

	if(options.file_type == 'images'){
		this.view.find('input[type="file"]').attr('accept', 'image/*');
		this.crop_size = options.crop_size;
	}
	else{
		this.view.find('input[type="file"]').removeAttr('accept');
	}

	this.view.show();
}

FileManager.prototype.hide = function(){
	this.view.hide();
}

FileManager.prototype.selectFile = function(file_id){
	this.view.find('.selected').removeClass('selected');
	this.view.find('.footer .after-select').addClass('mask');
	this.selected_file_id = file_id;

	if(file_id){
		this.view.find('a[jt-file-id="' + file_id + '"]').parent().addClass('selected');
		this.view.find('.footer .after-select').removeClass('mask');
	}
}

FileManager.prototype.enterCropMode = function(file){
	var fileManager = this;
	var crop_view = $('.lightbox.cropbox');

	this.view.hide();
	crop_view.show();


	var jcrop_api = null;
	var image = crop_view.find('img');
	var selectZone = null;

	image.attr('src', file.url);

	var new_image_width = file.size.width / file.size.height * 300;
	image.attr('width', new_image_width);
	image.attr('max-width', new_image_width);
	image.width(new_image_width);

	image.attr('height', '300');
	image.height('300');

	var aspectRatio = null;
	if(fileManager.crop_size && fileManager.crop_size.width){
		aspectRatio = (fileManager.crop_size.width / fileManager.crop_size.height);	
	}

	image.Jcrop({
		aspectRatio: aspectRatio,
		onSelect: function(c){
				selectZone = c;
			}
		},
		function(){
			jcrop_api = this;
		}
	);

	crop_view.find('a[jt-cropbox="crop"]').on('click', function(e){
		e.preventDefault();

		if(selectZone == null){
			return;
		}

		var url = fileManager.cropURL;
		url = url.replace('MEDIA_ID', fileManager.selected_file_id);

		var ratio_w = (new_image_width / file.size.width);
		var ratio_h = (300 / file.size.height);

		selectZone.x /= ratio_w;
		selectZone.y /= ratio_h;
		selectZone.w /= ratio_w;
		selectZone.h /= ratio_h;

		$.ajax({
			type: 'POST',
			url: url,
			data: selectZone,
		}).done(function(data){
			if(data.id){
				fileManager.add(new JTFile(data.id, data.url, 'crop-'+data.name, data.size));
				fileManager.selectFile(data.id);
			}

			jcrop_api.destroy();
			crop_view.find('a[jt-cropbox="crop"]').off('click');
			
			crop_view.hide();
			fileManager.view.show();
		});
	});

	crop_view.find('a[jt-cropbox="hide"]').on('click', function(e){
		e.preventDefault();
		
		jcrop_api.destroy();
		crop_view.find('a[jt-cropbox="hide"]').off('click');

		crop_view.hide();
		fileManager.view.show();
	});

	crop_view.find('[jt-attr="close"]').on('click', function(e){
		e.preventDefault();
		
		jcrop_api.destroy();
		crop_view.find('a[jt-cropbox="hide"]').off('click');

		crop_view.hide();
		fileManager.view.show();
	});
	
}
