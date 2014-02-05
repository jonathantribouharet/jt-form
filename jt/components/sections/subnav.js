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

	function create(context, template){
		context.view.attr('jt-attr', 'subnav-section-' + context.config.id);
	}

	function currentSectionChanged(component){
		var currentSectionId = JT.get('currentSectionId');

		component.container.find('[jt-attr^="subnav-section-"]').hide();
		component.container.find('[jt-attr="subnav-section-' + currentSectionId + '"]').show();
	}

	JT.registerSection({
		name: 'subnav',
		events:{
			currentSectionChanged: currentSectionChanged
		},
		on:{
			create: create
		}
	});

});
