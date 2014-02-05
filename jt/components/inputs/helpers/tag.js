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

	var MODULE_NAME = 'helper:tag';

	console.log('Helper: ' + MODULE_NAME);

	JT.helperTag = function(componentConfig){
		componentConfig.on.create.push(function(context){
			context.data.tags = [];

			var view = context.view.find('.tags');
			var input = view.find('.write');

			input.parent().on('click', function(){
				input.focus();
			});

			input.on('keyup', function(e){
				if(e.which == 188 || e.which == 13){ // Detect comma and Enter
					e.preventDefault();
					rebuildTagsFromInput(context);
				}
				else if(e.which == 8 && input.text().length == 0){ // Detect return
					e.preventDefault();
					removeLastTag(context);
				}
			});

			input.on('focusout', function(){
				if(input.text().length > 0){
					rebuildTagsFromInput(context);
				}
			});

			view.on('click', '.tag', function(){
				removeTag(context, $(this));
			});

			input.attr('data-placeholder', context.config.options.tag_placeholder);
		});

		componentConfig.on.load.push(function(context){
			rebuildTagsFromData(context);
		});
	};

	JT.helperTagValidate = function(context){
		var result = true;

		if(!context.data.tags || context.data.tags.length == 0){
			result = null;
		}

		return result;
	};

	function rebuildTagsFromData(context){
		if(!context.data.tags){
			context.data.tags = [];
		}
		
		var copy = context.data.tags.slice(0); // Must pass a copy else infinite loop

		context.data.tags = [];
		context.view.find('.tag').remove();

		addTags(context, copy);
	}

	function rebuildTagsFromInput(context){
		var tags = context.view.find('.write').text().split(',');
		var validTags = [];

		for(var i = 0; i < tags.length; ++i){
			var tag = tags[i];
			if(tag.length > 0){
				validTags.push(tag);
			}
		}

		addTags(context, validTags);
	}

	function addTags(context, newTags){
		for(var i = 0; i < newTags.length; ++i){
			var tag = newTags[i];

			var html = $('<div></div>').addClass('tag').text(tag);
			html.insertBefore(context.view.find('.write'));

			context.data.tags.push(tag);
		}

		var input = context.view.find('.write');
		input.text('');

		if(context.data.tags.length == 0){
			input.addClass('no-tags');
		}
		else{
			input.removeClass('no-tags');
		}

		context.trigger('change');
	}

	function removeTag(context, tag){
		var index = context.data.tags.indexOf(tag.text());
		if(index >= 0){
			context.data.tags.splice(index, 1);
		}
		
		tag.remove();
		context.trigger('change');
	}

	function removeLastTag(context){
		if(context.data.tags.length == 0){
			return;
		}

		context.data.tags.pop();
		rebuildTagsFromData(context);
	}

});
