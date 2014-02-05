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
		var templatePackageColumn = context.view.find('.pack').first();
		templatePackageColumn.find('input').eq(0).attr('placeholder', context.config.options.package_name_placeholder);
		templatePackageColumn.find('input').eq(1).attr('placeholder', context.config.options.package_amount_placeholder);
		templatePackageColumn.find('input').eq(2).attr('placeholder', context.config.options.package_quantity_placeholder);

		var featureLine = context.view.find('tr').eq(1);
		featureLine.find('input').eq(0).attr('placeholder', context.config.options.feature_placeholder);

		context.templates = {
			packageColummn: templatePackageColumn[0].outerHTML,
			featureLine: featureLine[0].outerHTML
		};

		context.view.first().hide();

		context.view.find('[jt-attr="add-feature"]').on('click', function(e){
			e.preventDefault();
			addFeature(context);
		});
		context.view.find('[jt-attr="add-package"]').on('click', function(e){
			e.preventDefault();
			addPackage(context);
		});

		context.contentView = context.view.find('table').last();
	}

	function load(context){
		for(var i in context.data.features){
			addFeature(context, context.data.features[i]);
		}
		for(var i in context.data.packages){
			addPackage(context, context.data.packages[i]);
		}
	}

	function change(context){
		context.data = {
			packages: {},
			features: {}
		};

		var i = 0;
		context.contentView.find('td.pack').each(function(index, element){
			context.data.packages[i] = {};
			context.data.packages[i].name = $(element).find('input').eq(0).val();
			context.data.packages[i].amount = $(element).find('input').eq(1).val();
			context.data.packages[i].quantity = $(element).find('input').eq(2).val();
			context.data.packages[i].values = {};

			var j = 0;

			context.contentView.find('tr').each(function(tIndex, element){
				if(tIndex == 0 || $(this).hasClass('end')){
					return;
				}

				if($(element).find('td').eq(index + 1).hasClass('yes')){
					context.data.packages[i].values[j] = $(element).find('input').val();
					++j;					
				}
			});

			++i;
		});

		var i = 0;
		context.contentView.find('tr').each(function(index, element){
			if(index == 0 || $(this).hasClass('end')){
				return;
			}

			context.data.features[i] = $(element).find('input').val();

			++i;
		});
	}

	function validate(context){
		var isNull = true;

		for(var i in context.data.packages){
			isNull = false;
			break;
		}
		for(var i in context.data.features){
			isNull = false;
			break;
		}

		if(isNull === null){
			return null;
		}

		for(var i in context.data.packages){
			var packageData = context.data.packages[i];
			if(!JT.validateNotBlank(packageData.name) || 
				!JT.validateNumeric(packageData.amount) || 
				!JT.validateNumeric(packageData.quantity)){
				return false;
			}
		}

		return true;
	}

	function addFeature(context, data){
		var featureView = $(context.templates.featureLine);

		featureView.find('input').on('input', function(){
			context.trigger('change');
		});

		featureView.find('input').on('keyup', function(e){
			if(e.which == 13){ // Detect comma and Enter
				e.preventDefault();
				addFeature(context);
				context.contentView.find('tr').eq(context.contentView.find('tr').length - 2).find('input').first().focus();
			}
		});

		for(var i = 0; i < context.contentView.find('tr:first td').length - 2; ++i){
			createCell(context).insertBefore(featureView.find('td').last());
		}

		featureView.find('.delete').on('click', function(e){
			e.preventDefault();
			featureView.remove();
			context.trigger('change');
		});

		featureView.insertBefore(context.contentView.find('tr.end'));

		if(data){
			featureView.find('input').val(data);
		}
	}

	function addPackage(context, data){
		var headerView = $(context.templates.packageColummn);
		headerView.insertBefore(context.contentView.find('[jt-attr="add-package"]'));

		headerView.on('click', function(e){
			if($(this).hasClass('close')){
				e.preventDefault();
				e.stopPropagation();

				context.view.find('td.pack').removeClass('open').addClass('close');
				$(this).removeClass('close').addClass('open');
			}
		});

		headerView.find('.validate').on('click', function(e){
			e.preventDefault();
			e.stopPropagation();

			headerView.find('span').eq(0).text(headerView.find('input').eq(0).val());
			headerView.find('span').eq(1).text(headerView.find('input').eq(1).val() + '$');

			headerView.removeClass('open').addClass('close');
		});

		headerView.find('input').on('input', function(){
			context.trigger('change');
		});

		headerView.find('.delete').on('click', function(e){
			e.preventDefault();

			var index = headerView.index();

			for(var i = 1; i < context.contentView.find('tr').length; ++i){
				context.contentView.find('tr').eq(i).find('td').eq(index).remove();
			}

			headerView.remove();
			refreshColunSize(context);
			context.trigger('change');
		});

		for(var i = 1; i < context.contentView.find('tr').length - 1; ++i){
			var featureView = context.contentView.find('tr').eq(i);
			createCell(context).insertBefore(featureView.find('.delete'));
		}
		context.contentView.find('tr').eq(context.contentView.find('tr').length - 1).append('<td></td>');

		if(data){
			headerView.find('input').eq(0).val(data.name);
			headerView.find('input').eq(1).val(data.amount);
			headerView.find('input').eq(2).val(data.quantity);
			headerView.find('.validate').trigger('click');

			for(var i in data.values){
				context.contentView.find('tr').each(function(index, element){
					if(index == 0 || $(this).hasClass('end')){
						return;
					}

					if($(element).find('input').val() == data.values[i]){
						$(element).find('td').eq(headerView.index()).removeClass('no').addClass('yes');
					}
				});
			}
		}

		refreshColunSize(context);
	}

	function createCell(context){
		var cellView = $('<td class="options no"></td>');

		cellView.on('click', function(e){
			e.preventDefault();

			if($(this).hasClass('no')){
				$(this).removeClass('no').addClass('yes');
			}
			else{
				$(this).removeClass('yes').addClass('no');
			}

			context.trigger('change');
		});

		return cellView;
	}

	function refreshColunSize(context){
		var tdPack = context.view.find('td.pack');
		if(tdPack.length > 4){
			tdPack.addClass('min');
		}
		else{
			tdPack.removeClass('min');
		}
	}

	JT.registerInput({
		name: 'packages',
		isFullScreen: true,
		fct:{
			validate: validate
		},
		on:{
			change: change,
			create: create,
			load: load
		}
	});
	
});
