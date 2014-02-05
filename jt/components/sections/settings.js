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
		context.view.find('label').text(context.config.name).prepend('<span></span>');

		if(!context.config.is_removable){

			context.view.addClass('not-selectable');

		}
		else{

			context.view.find('input').on('change', function(e){
				e.preventDefault();

				if($(this).is(':checked')){
					JT.enableSection(context.config.id);
				}
				else{
					JT.disableSection(context.config.id);
				}
			});

		}
	}

	function sectionStateChanged(component, params){
		var input = component.container.find('[jt-section-id="' + params.sectionId + '"] input');
		input.prop('checked', !params.state.isRemoved);
		input.trigger('change');
	}

	JT.registerSection({
		name: 'settings',
		events:{
			sectionStateChanged: sectionStateChanged
		},
		on:{
			create: create
		}
	});

});
