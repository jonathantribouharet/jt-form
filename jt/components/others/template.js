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

	var panel = $('.panel-r');
	var panelTop = $('.panel-r div').first();
	var iframe = panel.find('iframe');

	refreshIframeHeight();
	$(window).on('resize', refreshIframeHeight);

	function refreshIframeHeight(){
		var newWdith = panel.width() - 50; // 25 px de padding de chaque cote
		var newHeight =  $(window).height() - iframe.position().top - 120;

		iframe.width(newWdith);
		iframe.height(newHeight);

		var scale = iframe.width() / 1100.0;
		
		iframe.width(1100);
		iframe.height(iframe.height() / scale);

		iframe.css({
			'-moz-transform': 'scale(' + scale + ',' + scale + ')',
			'-webkit-transform': 'scale(' + scale + ',' + scale + ')', 
			'-o-transform': 'scale(' + scale + ',' + scale + ')',
			'-ms-transform': 'scale(' + scale + ',' + scale + ')',
			'transform': 'scale(' + scale + ',' + scale + ')'
		});
	}

});

$(document).on('jt-register-components', function(){
	$('a[jt-attr="url-preview"]').attr('href', JT.get('url_template_preview'));
	$('.link-preview a').attr('href', JT.get('url_template')).text(JT.get('url_template'));

	$('.link-proposal a').first().attr('href', JT.get('url_template'));
	$('.link-proposal a').last().attr('href', "http://www.sponseasy.com/p/KyfScA5WIP");

	$('.link-proposal a').on('click', function(e){
		e.preventDefault();

		if($(this).hasClass('active')){
			return;
		}

		$('.link-proposal a').removeClass('active');
		$(this).addClass('active');
		$('[jt-view="template-content"]').attr('src', $(this).attr('href'));
	});

});
