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

	var MODULE_NAME = 'helper:placeholder';

	console.log('Helper: ' + MODULE_NAME);

	JT.helperPlaceholder = function(componentConfig){
		componentConfig.on.create.push(function(context){

			if(!context.inputs){
				return;
			}

			if(context.config.options.placeholder){
				context.inputs.value.attr('placeholder', context.config.options.placeholder);
				return;
			}

			for(var optionName in context.config.options){
				var index = optionName.indexOf('placeholder');
				var placeholder = context.config.options[optionName];

				if(index > 0){
					var inputName = optionName.substr(0, index - 1);
					var input = context.inputs[inputName];

					if(input){
						input.attr('placeholder', placeholder);
					}
				}
			}

		});
	};

});
