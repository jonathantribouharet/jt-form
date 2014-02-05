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

	function create(context){
		context.inputs = {
			name: context.view.find('input[type="hidden"]'),
			content: context.view.find('textarea')
		};

		context.view.find('[jt-attr="show-more"]').on('click', function(e){
			e.preventDefault();

			context.view.find('[jt-attr="show-more"]').fadeOut();
			context.view.find('[jt-view="more"]').slideDown();
		});
		context.view.find('[jt-attr="hide-more"]').on('click', function(e){
			e.preventDefault();

			context.view.find('[jt-attr="show-more"]').fadeIn();
			context.view.find('[jt-view="more"]').slideUp();
			context.inputs.content.val('');
		});

		// tester mise en commentaire
		context.view.find('input[type="hidden"]').on('change', function(){
			context.trigger('change');
		});

		context.view.find('[jt-view="more"]').hide();
	}

	function load(context){
		for(var key in context.inputs){
			context.inputs[key].val(context.data[key]);
		}

		if(JT.validateNotBlank(context.inputs.content.val())){
			context.view.find('[jt-attr="show-more"]').trigger('click');
		}
		else{
			context.view.find('[jt-attr="hide-more"]').trigger('click');
		}

		if(context.data.name){
			context.view.find('input[type="hidden"]').val(context.data.name);
			context.view.find('.dropdown span.value').each(function(index, element){
				if($(element).text() == context.data.name){
					$(element).parent().trigger('click');
				}
			});
		}
	}

	function change(context){
		for(var key in context.inputs){
			context.data[key] = context.inputs[key].val();
		}
	}

	function validate(context){
		var result = false;

		if(!JT.validateNotBlank(context.data.name)){
			result = null;
		}
		else if(JT.validateNotBlank(context.data.name)){
			result = true;
		}

		return result;
	}

	JT.registerInput({
		name: 'non_media',
		helpers: [{
			name: 'textarea',
			options: 'content'
		}],
		fct:{
			validate: validate
		},
		on:{
			create: create,
			load: load,
			change: change
		}
	});
	
});
