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

	var MODULE_NAME = 'helper:textarea';

	console.log('Helper: ' + MODULE_NAME);

	JT.helperTextarea = function(componentConfig, options){
		var attributeName = options;

		componentConfig.on.create.push(function(context){
			var maxlength = null;
			if(attributeName == 'value'){
				maxlength = context.config.options.maxlength;
			}
			else{
				maxlength = context.config.options[attributeName + '_maxlength'];
			}

			if(maxlength){
				context.inputs[attributeName].attr('maxlength', maxlength);
				context.view.find('.nbr-char').text(maxlength + ' remaining characters');
			}
		});

		componentConfig.on.change.push(function(context){
			var maxlength = null;
			if(attributeName == 'value'){
				maxlength = context.config.options.maxlength;
			}
			else{
				maxlength = context.config.options[attributeName + '_maxlength'];
			}

			if(maxlength){
				var count = context.data[attributeName].length;
				var rest = Math.max(maxlength - count, 0);
				context.view.find('.nbr-char').text(rest + ' remaining characters');
			}
		});
	};

});
