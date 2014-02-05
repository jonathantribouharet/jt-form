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

	$(document).on('focus', '.input-svg', function(){
		$(this).svgStyle('fill:#54636d');
	});

	$(document).on('blur', '.input-svg', function() {
		if($(this).val().length > 0){
			$(this).svgStyle('fill:#fff');
		} else {
			$(this).svgStyle("fill:#8ca3b3");
		}
	});

	$(document).on('blur', '.input-focus', function() {
		if($(this).val().length > 0){
			$(this).addClass('blue-dark');
		} else {
			$(this).removeClass('blue-dark');
		}
	});

});