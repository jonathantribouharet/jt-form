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

	var MODULE_NAME = 'template';

	console.log('Module: ' + MODULE_NAME);

	var iframe = $('[jt-view="template-content"]');
	var iframeLoading = true;
	var queue = [];
	var queueTemplate = [];

	JT.loadTemplate = function(){
		var templateURL = JT.get('url_template_preview');
		iframe.attr('src', templateURL);

		var timerId = setInterval(function(){
			if(iframe[0].contentWindow.is_loaded == true){
				clearInterval(timerId);
				iframeLoading = false;
				iframe[0].contentWindow.is_iframe = true;
				synchronize();
			}
		}, 1000);
	};

	JT.sendQuestionDataToTemplate = function(key, data){
		queue.push({
			key: key,
			data: data
		});

		synchronize();
	};

	JT.sendTemplateQuestionDataToTemplate = function(key, data){
		queueTemplate.push({
			key: key,
			data: data
		});

		synchronize();
	};

	function synchronize(){
		if(iframeLoading === true || !JT.isLoaded()){
			return;
		}

		for(var i = 0; i < queue.length; ++i){
			var data = queue[i];
			iframe[0].contentWindow.loadElement(data.key, data.data);
		}

		queue = [];

		for(var i = 0; i < queueTemplate.length; ++i){
			var data = queueTemplate[i];
			iframe[0].contentWindow.loadTemplateElement(data.key, data.data);
		}

		queueTemplate = [];
	}

});
