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
		context.view.attr('jt-section-id', context.config.id);
		context.view.find('[jt-view="next-section"]').on('click', JT.showNextSection);
	}

	function currentSectionChanged(component){
		var currentSectionId = JT.get('currentSectionId');
		var currentSubSectionId = JT.get('currentSubSectionId');

		component.container.find('div[jt-section-id]').hide();
		component.container.find('div[jt-section-id="' + currentSectionId + '"]').fadeIn();

		$('html,body').stop().scrollTop(0);

		// var scrollPosition = 1;
		// var scrollPosition = component.container.find('div[jt-subsection-id="' + currentSubSectionId + '"]').offset().top;

		// if(scrollPosition > 0 || $(window).scrollTop() > 0){
			// $('html,body').stop().animate({ scrollTop: scrollPosition }, 750);
		// }
	}

	function sectionStateChanged(component, params){
		if(params.state.isRemoved === true){
			component.container.find('div[jt-section-id="' + params.sectionId + '"]').hide();
		}
	}

	JT.registerSection({
		name: 'content',
		events:{
			currentSectionChanged: currentSectionChanged,
			sectionStateChanged: sectionStateChanged
		},
		on:{
			create: create
		}
	});

});
