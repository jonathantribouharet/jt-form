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

$(document).one('jt-register-components', function(){

	// Wokrs because inputs validation is refresh here
	function updateData(context){
		context.data = {
			data: {},
			dataValid: {}
		};

		var lastValidId = 0;

		for(var i in context.inputs){
			var input = context.inputs[i];

			context.data.data[i] = input.data;

			if(context.isRemoved === false && input.isValided === true){
				context.data.dataValid[lastValidId] = input.data;
				lastValidId++;
			}
		}
	}

	function synchronizeProposalData(context){
		var data = {};

		data[context.config.key] = {
			question_id: context.config.id,
			key: context.config.key,
			data: context.data
		};

		JT.synchronizeProposalData({
			template_answers: data
		});
	}

	function synchronizeTemplate(context){
		JT.sendTemplateQuestionDataToTemplate(context.config.key, context.data.dataValid);
	}

	JT.registerInputCollection({
		name: 'template',
		on:{
			change: [updateData, synchronizeProposalData, synchronizeTemplate]
		}
	});
	
});
