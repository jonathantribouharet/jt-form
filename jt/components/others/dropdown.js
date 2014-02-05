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

	$(document).on('click', '.dropdown', function(e){
		e.preventDefault();

		if($(this).hasClass('open')){
			$(this).removeClass('open');
			$(this).find('ul').slideUp();
		}
		else{
			$(this).addClass('open');
			$(this).find('ul').css('width', $(this).innerWidth()).slideDown();
		}
	});

	$(document).on('click', '.dropdown dd a', function(e){
		e.preventDefault();

		var dropdown = $(this).parents('.dropdown');

		var value = $(this).find('span.value').text();
		var clone = $(this).clone();
		clone.find('span').remove();
		var text = clone.text();

		dropdown.find('input').val(value).trigger('change');
		dropdown.find('dt a').text(text);

		if(!dropdown.hasClass('open')){
			e.stopPropagation();
		}
	});

});
