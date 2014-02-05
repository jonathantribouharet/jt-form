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

$(document).ready(function(){

	$(document).on('jt-loaded', function(){
		$('[jt-attr="checkbox"], [jt-attr="radio"]').each(function(){

			refreshCheckboxState($(this));

		});
	});

	$(document).on('click', '[jt-attr="checkbox"], [jt-attr="radio"]', function(e){
		e.preventDefault
		e.stopPropagation();

		var input = $(this).find('input');

		input.prop('checked', !input.is(':checked'));
		input.trigger('change');
	});

	$(document).on('change', '[jt-attr="checkbox"] input', function(){
	
		refreshCheckboxState($(this).parents('[jt-attr="checkbox"]'));

	});

	$(document).on('change', '[jt-attr="radio"] input', function(){
	
		var container = $(this).parents('[jt-attr="radio"]').parent().find('[jt-attr="radio"]').each(function(){
			refreshCheckboxState($(this));
		});

	});

	function refreshCheckboxState($checkboxContainer){

		var input = $checkboxContainer.find('input');
		var icon = $checkboxContainer.find('div');

		if(input.is(':checked')){
			icon.addClass('custom_checkbox_active');
		}
		else{
			icon.removeClass('custom_checkbox_active');
		}

	}

});
