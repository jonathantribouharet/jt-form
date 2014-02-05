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
		context.container = $('div[jt-section-id="' + context.config.section_id + '"] [jt-view="section-content"]');

		context.view.find('h4').first().text(context.config.name);
		context.view.attr('jt-subsection-id', context.config.id);

		context.container.append(context.view);

		if(context.container.find('[jt-view="subsection-content"]').length == 1){
			context.view.find('h4').first().hide();
			context.view.find('.sep-section').first().hide();
		}
	}

	function currentSubSectionChanged(component){
		var currentSubSectionId = JT.get('currentSubSectionId');

		var position = $('[jt-view="section-content"] [jt-subsection-id="' + currentSubSectionId + '"]').offset().top;
		 $('html, body').stop().animate({  
			scrollTop: position - 180
		}, 'slow');  
		// scrollTo(0, position - 140);
	}

	JT.registerSubsection({
		name: 'content',
		events:{
			currentSubSectionChanged: currentSubSectionChanged
		},
		on:{
			create: create
		}
	});

});
