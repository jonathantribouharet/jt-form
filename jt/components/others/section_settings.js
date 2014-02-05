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

	$('.add-menu').on('click', function(e){
		e.preventDefault();

		if( $(this).hasClass('active') ){
			$(this).removeClass('active');
		} else {
			$(this).addClass('active');
		}
		

		$('.add-section').stop().animate({
			height: "toggle"
		}, 200);
	});

	$('[jt-view="set-minimal-proposal"]').on('click', function(e){
		e.preventDefault();

		JT.disableAllSections();
	});

	$('.settings').on('click', function(e){
		e.preventDefault();
		$('.setting').show();
	});

	$('.close-setting').on('click', function(e){
		e.preventDefault();
		$('.setting').hide();
	});

});