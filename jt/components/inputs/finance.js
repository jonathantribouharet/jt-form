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
		context.data = {
			income: {},
			outcome: {}
		};

		var cellView = context.view.first();
		cellView.find('input').eq(0).attr('placeholder', context.config.options.name_placeholder);
		cellView.find('input').eq(1).attr('placeholder', context.config.options.amount_placeholder);

		context.item = cellView[0].outerHTML;
		cellView.hide();

		context.lastIncomeId = 0;
		context.lastOutcomeId = 0;

		context.view.find('[jt-view="add-outcome"]').on('click', function(e){
			e.preventDefault();
			addItem(context, 'outcome');
		});
		context.view.find('[jt-view="add-income"]').on('click', function(e){
			e.preventDefault();
			addItem(context, 'income');
		});
	}

	function load(context){
		if(!context.data){
			context.data = {
				income: {},
				outcome: {}
			};
		}else if(!context.data.income){
			context.data.income = {};
		}else if(!context.data.outcome){
			context.data.outcome = {};
		}
		
		for(var i in context.data.income){
			var data = context.data.income[i];
			addItem(context, 'income', data);
		}

		for(var i in context.data.outcome){
			var data = context.data.outcome[i];
			addItem(context, 'outcome', data);
		}
	}

	function change(context){
		var total_income = 0;
		var total_outcome = 0;

		if(context.data){

			if(context.data.income){
				for(var i in context.data.income){
					var data = context.data.income[i];
					var amount = Number(data.amount);
					if(!isNaN(amount)){
						total_income += amount;
					}
				}
			}

			if(context.data.outcome){
				for(var i in context.data.outcome){
					var data = context.data.outcome[i];
					var amount = Number(data.amount);
					if(!isNaN(amount)){
						total_outcome += amount;
					}
				}
			}

		}

		context.view.find('[jt-view="total-income"]').text(total_income);
		context.view.find('[jt-view="total-outcome"]').text(total_outcome);
	}

	function validate(context){
		var isNull = true;

		for(var i in context.data.income){
			isNull = false;
			break;
		}
		for(var i in context.data.outcome){
			isNull = false;
			break;
		}

		if(isNull === null){
			return null;
		}

		for(var i in context.data.income){
			var data = context.data.income[i];
			if(!JT.validateNotBlank(data.name) || !JT.validateNumeric(data.amount)){
				return false;
			}
		}

		for(var i in context.data.outcome){
			var data = context.data.outcome[i];
			if(!JT.validateNotBlank(data.name) || !JT.validateNumeric(data.amount)){
				return false;
			}
		}

		return true;
	}

	function addItem(context, selector, savedData){
		var container = context.view.find('.' + selector);
		var item = $(context.item);
		var data = {};

		if(savedData){
			data = savedData;
			item.find('input').first().val(data.name);
			item.find('input').last().val(data.amount);
		}

		var lastId = 0;
		if(selector == 'income'){
			lastId = context.lastIncomeId;
			context.lastIncomeId++;
		}
		else{
			lastId = context.lastOutcomeId;
			context.lastOutcomeId++;
		}

		item.attr('item-id', lastId);

		context.data[selector][lastId] = data;

		item.find('input').first().on('input', function(){
			data.name = $(this).val();
			context.trigger('change');
		});

		item.find('input').last().on('input', function(){
			data.amount = $(this).val();
			context.trigger('change');
		});

		item.find('[jt-attr="delete"]').on('click', function(){
			removeItem(context, selector, item.attr('item-id'));
		});

		container.append(item);

		if(!savedData){
			item.find('.cell').focus();
		}
	}

	function removeItem(context, selector, itemId){
		// Remove item
		context.view.find('.' + selector + ' [item-id="' + itemId + '"]').remove();
		delete context.data[selector][itemId];

		// Reorganize items
		var items = [];
		for(var i in context.data[selector]){
			items.push({
				index: i,
				data: context.data[selector][i]
			});
		}

		context.data[selector] = {};

		for(var i = 0; i < items.length; ++i){
			var item = items[i];

			context.view.find('.' + selector + ' [item-id="' + item.index + '"]').attr('item-id', i);
			context.data[selector][i] = item.data;
		}
		
		if(selector == 'income'){
			context.lastIncomeId--;
		}
		else{
			context.lastOutcomeId--;
		}

		// Save
		context.trigger('change');
	}

	JT.registerInput({
		name: 'finance',
		isFullScreen: true,
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
