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

	var MODULE_NAME = 'view';

	console.log('Module: ' + MODULE_NAME);

	JT.registerView = function(data){
		var component = new JT.Component(MODULE_NAME, data);

		component.html = data.html;

		JT.registerComponent(component);
	};

	JT.getView = function(view_name){
		return $(JT.createComponent(MODULE_NAME, view_name).html);
	};

	JT.loadView = function(view_name){
		return function(component){
			component.view = JT.getView(view_name);
		};
	};

});
