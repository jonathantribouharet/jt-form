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

	var MODULE_NAME = 'view:questions';

	console.log('Module: ' + MODULE_NAME);

	JT.prepareQuestionView = function(context){
		setLayoutView(context);
		setLabel(context);
		addViewToSection(context);
	};

	 JT.addInputToQuestion = function(context, template){
		context.view.find('[jt-view="layout:content"]').append(template.view);

		if(template.isFullScreen){
			context.view.find('.title-question').removeClass('w2').addClass('w10');
			context.view.find('.question').removeClass('w8').addClass('w10');
		}
	};

	function setLayoutView(context){
		context.view = JT.getView('layout:form');

		context.addButton = context.view.find('button');
		context.addButton.on('click', function(e){
			e.preventDefault();
			context.trigger('addInput');
		});

		if(parseInt(context.config.options.max_template) > 1){
			context.addButton.show();
		}
	}

	function setLabel(context){
		context.label_container = context.view.first();
		context.label = context.label_container.find('label');
		context.hint = context.label_container.find('[jt-attr="hint"] div');

		if(context.config.content.length > 0){
			if(context.config.hint){
				var html = '<div class="infos"><div class="arrow-up"></div>';
				html += $("<p></p>").text(context.config.hint).html().replace(/\n/g,'<br/>');
				html += '</div>';

				context.hint.html(html);
			}
			else{
				context.label_container.find('[jt-attr="hint"]').hide();
			}

			context.label.text(context.config.content);
		}
		else{
			context.label_container.hide();
		}
	}

	// WARNING
	function addViewToSection(context){
		var view = $('div[jt-subsection-id="' + context.config.subsection_id +'"] [jt-view="subsection-content"]');
		if(view.length > 0){
			view.append(context.view);
		}
		else{
			$('div[jt-template-section-id="' + context.config.section_id +'"] [jt-view="subsection-content"]').append(context.view);
		}
	}

});
