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

	function init(component){
		component.container.on('click', '[jt-section-id]', function(e){
			e.preventDefault();
			JT.showSection($(this).attr('jt-section-id'));
		});
	}

	function create(context){		
		context.view.attr('jt-section-id', context.config.id);
		context.view.find('[jt-attr="name"]').text(context.config.name);
		context.view.find('[jt-attr="icon"]').html(context.config.icon);
	}

	function currentSectionChanged(component){
		var currentSectionId = JT.get('currentSectionId');

		component.container.find('li').removeClass('active');
		component.container.find('li[jt-section-id="' + currentSectionId + '"]').addClass('active');
	}

	function sectionStateChanged(component, params){
		var view = component.container.find('[jt-section-id="' + params.sectionId + '"]');

		if(params.state.isRemoved === true){
			view.stop().removeClass('visible').addClass('hidden').animate({ width:'0px' });
			var newWidth = (Number(99) / $('#header .menu li').not('.hidden').length) +'%'

			if(JT.isLoaded()){
				$('#header .menu li').not('.hidden').animate({ width: newWidth });
				view.stop().addClass('hidden').animate({ width:'0px' });
			}
			else{
				$('#header .menu li').not('.hidden').css({ width: newWidth });
				view.stop().addClass('hidden').css({ width:'0px' });
			}

		} else {
			view.stop().removeClass('hidden').addClass('visible');
			var newWidth = (Number(99) / $('#header .menu li').not('.hidden').length) +'%';

			if(JT.isLoaded()){
				view.stop().animate({ width: newWidth });
				$('#header .menu li').not('.hidden').animate({ width: newWidth });
			}
			else {
				view.stop().css({ width: newWidth });
				$('#header .menu li').not('.hidden').css({ width: newWidth });
			}

		}


		var progressView = view.find('.line-progress');
		progressView.removeClass('complet').removeClass('missing');

		if(params.state.isValided === true){
			progressView.addClass('complet');
		}
		else if(params.state.isValided === false){
			progressView.addClass('missing');
		}

	}

	JT.registerSection({
		name: 'navbar',
		events:{
			currentSectionChanged: currentSectionChanged,
			sectionStateChanged: sectionStateChanged
		},
		on:{
			init: init,
			create: create
		}
	});

});
