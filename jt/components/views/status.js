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

$(document).one('jt-register-modules', function(){

	var MODULE_NAME = 'view:status';

	console.log('Module: ' + MODULE_NAME);

	var timerId = null;
	var view = null;

	JT.setStatus = function(text, fadeOut){
		if(timerId !== null){
			clearTimeout(timerId);
			timerId = null;
		}

		if(!view || view.length == 0){
			view = $('[jt-view="questions-update-status"]');
		}

		view.stop().css({opacity: "1"}).text(text);

		if(fadeOut === true){
			timerId = setTimeout(function(){
				view.animate({opacity: "0"}, 500);
			}, 2500);
		}
	};

});
