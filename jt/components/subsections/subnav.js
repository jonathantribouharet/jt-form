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

	var HELP_VIEW = '<div class="sec w10"><div class="cross left"><svg version="1.1" id="cross" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"width="28px" height="28px" viewBox="0 0 28 28" style="enable-background:new 0 0 28 28;" xml:space="preserve"><path class="st0" d="M14,28C6.3,28,0,21.7,0,14S6.3,0,14,0s14,6.3,14,14S21.7,28,14,28z M14,3.5C8.2,3.5,3.5,8.2,3.5,14 c0,5.8,4.7,10.5,10.5,10.5S24.5,19.8,24.5,14C24.5,8.2,19.8,3.5,14,3.5z M18.9,18.9c-0.7,0.7-1.8,0.7-2.5,0L14,16.5l-2.5,2.5 c-0.7,0.7-1.8,0.7-2.5,0c-0.7-0.7-0.7-1.8,0-2.5l2.5-2.5l-2.5-2.5c-0.7-0.7-0.7-1.8,0-2.5c0.7-0.7,1.8-0.7,2.5,0l2.5,2.5l2.5-2.5 c0.7-0.7,1.8-0.7,2.5,0c0.7,0.7,0.7,1.8,0,2.5L16.5,14l2.5,2.5C19.6,17.2,19.6,18.3,18.9,18.9z"/></svg></div><h6></h6><p></p></div>';

	function create(context){
		context.container = $('[jt-attr="subnav-section-' + context.config.section_id + '"] [jt-view="form:subsection:subnav"]');
		context.view.attr('jt-subsection-id', context.config.id);

		context.view.find('h2').text(context.config.name);

		context.view.insertBefore(context.container.find('[jt-view="questions-update-status"]').parent());

		context.view.on('click', function(e){
			e.preventDefault();

			var subsectionId = context.config.id;

			JT.set('currentSubSectionId', subsectionId);
			JT.trigger('currentSubSectionChanged');
		});

		var helpView = $(HELP_VIEW);
		helpView.find('h6').text(context.config.name);
		helpView.find('p').text(context.config.help);

		context.container.find('.information').append(helpView)
		context.container.find('.information .sec').first().addClass('active');
	}

	function currentSubSectionChanged(component){
		var currentSubSectionId = JT.get('currentSubSectionId');

		$('[jt-attr^="subnav-section-"] div.info').removeClass('active');
		$('[jt-attr^="subnav-section-"] [jt-subsection-id="' + currentSubSectionId + '"] div.info').addClass('active');
	}

	JT.registerSubsection({
		name: 'subnav',
		events:{
			currentSubSectionChanged: currentSubSectionChanged
		},
		on:{
			create: create
		}
	});

});
