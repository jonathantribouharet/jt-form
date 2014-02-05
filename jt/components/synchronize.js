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

	var ignoreUpdates = true; // Utile lors du chargement du formulaire pour eviter la sauvegarde
	var dataToSend = {};
	var dataToSendTemp = {};
	var updateInProgress = false;
	var lastUpdate = null;
	var lastUpdateTimerId = null;

	$(document).one('jt-loaded', function(){
		ignoreUpdates = false;
	});

	JT.synchronizeProposalData = function(data){
		if(ignoreUpdates){
			return;
		}

		JT.setStatus('Saving...');

		if(updateInProgress){
			if(data){
				$.extend(true, dataToSendTemp, data);
			}

			return;
		}
		
		if(data){
			$.extend(true, dataToSend, data);
		}

		if(lastUpdate && new Date() - lastUpdate < 3000){
			if(lastUpdateTimerId === null){
				lastUpdateTimerId = setTimeout(JT.synchronizeProposalData, 3000);
			}
			return;
		}

		updateInProgress = true;
		lastUpdate = new Date();

		if(lastUpdateTimerId !== null){
			clearInterval(lastUpdateTimerId);
			lastUpdateTimerId = null;
		}
		
		$.ajax({
			
			url: JT.get('url_update'),
			method: 'PUT',
			data: dataToSend

		}).done(function(){
		
			dataToSend = dataToSendTemp;
			JT.setStatus('Saved', true);
		
		}).fail(function(){
			
			$.extend(true, dataToSend, dataToSendTemp);
		
		}).always(function(){

			dataToSendTemp = {};
			updateInProgress = false;

			var count = 0;
			for(var i in dataToSend){
				count++;
			}

			if(count > 0){
				JT.synchronizeProposalData();
			}
		});		
	};

});
