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
		context.templates = {
			target: context.view.find('[jt-template-view="target"]')[0].outerHTML,
			targetGroup: context.view.find('[jt-template-view="target-group"]')[0].outerHTML,
			targetGroupContainer: context.view.find('[jt-template-view="target-group-container"]')[0].outerHTML
		};

		context.view.eq(0).hide();
		context.contentView = context.view.eq(2);		

		context.targetGroupLastIds = {};
		context.targetGroupViews = [];
		context.nextTargetGroupId = 0;
		context.nextTargetGroupConatiner = null;
		context.nextPositionIsLeft = true;

		context.view.find('[jt-attr="add-target-group"]').on('click', function(e){
			e.preventDefault();
			addTargetGroup(context);
		});
	}

	function load(context){
		rebuildTargetGroupViewsFromData(context);
	}

	function validate(context){
		var isNull = true;

		for(var i in context.data){
			isNull = false;
			break;
		}

		if(isNull){
			return null;
		}

		for(var i in context.data){
			var targetGroupData = context.data[i];
			var sumPercent = 0;

			if(!JT.validateNotBlank(targetGroupData.name)){
				return false;
			}

			for(var j in targetGroupData.values){
				var targetData = targetGroupData.values[j];

				if(!JT.validateNotBlank(targetData.name) ||
					!JT.validateNumeric(targetData.percent)){
					return false;
				}

				sumPercent += Number(targetData.percent);
			}

			if(sumPercent != 100){
				return false;
			}
		}

		return true;
	}

	function addTargetGroup(context){
		if(!context.nextTargetGroupConatiner){
			context.nextTargetGroupConatiner = $(context.templates.targetGroupContainer);
			context.contentView.append(context.nextTargetGroupConatiner);
		}

		var targetGroupView = $(context.templates.targetGroup);
		context.nextTargetGroupConatiner.append(targetGroupView);
		context.targetGroupViews.push(targetGroupView);

		targetGroupView.attr('jt-target-group-id', context.nextTargetGroupId);
		
		if(context.nextPositionIsLeft === true){
			targetGroupView.addClass('left');
		}
		else{
			targetGroupView.addClass('right');
			context.nextTargetGroupConatiner = null;
		}

		context.nextPositionIsLeft = !context.nextPositionIsLeft;

		targetGroupView.find('input').on('input', function(){
			context.data[targetGroupView.attr('jt-target-group-id')].name = $(this).val();
			context.trigger('change');
		});

		targetGroupView.find('[jt-attr="delete-target-group"]').on('click', function(e){
			e.preventDefault();
			removeTargetGroup(context, targetGroupView.attr('jt-target-group-id'));
		});

		context.targetGroupLastIds[context.nextTargetGroupId] = 0;

		if(context.data[context.nextTargetGroupId]){
			targetGroupView.find('input').val(context.data[context.nextTargetGroupId].name);

			rebuildTargetViewsFromData(context, context.nextTargetGroupId);
		}
		else{
			context.data[context.nextTargetGroupId] = { name: "" };
		}

		targetGroupView.find('[jt-attr="add-target"]').on('click', function(e){
			e.preventDefault();
			addTarget(context, targetGroupView, targetGroupView.attr('jt-target-group-id'));
		});

		context.nextTargetGroupId++;
	}

	function removeTargetGroup(context, targetGroupId){
		context.targetGroupViews.splice(targetGroupId, 1);

		for(var i = Number(targetGroupId); i < context.targetGroupViews.length; ++i){
			context.data[i] = context.data[i + 1];
		}

		delete context.data[context.targetGroupViews.length];

		context.trigger('change');
		rebuildTargetGroupViewsFromData(context);
	}

	function addTarget(context, targetGroupView, targetGroupId){
		var targetView = $(context.templates.target);

		var targetId = context.targetGroupLastIds[targetGroupId];
		context.targetGroupLastIds[targetGroupId]++;

		targetView.attr('jt-target-id', targetId);

		targetView.find('input').eq(0).on('input', function(){
			context.data[targetGroupId].values[targetView.attr('jt-target-id')].name = $(this).val();
			context.trigger('change');
		});

		targetView.find('input').eq(1).on('input', function(){
			context.data[targetGroupId].values[targetView.attr('jt-target-id')].percent = $(this).val();
			context.trigger('change');
			updatePercentTargetGroupView(context, targetGroupView, targetGroupId);
		});

		targetView.find('[jt-attr="delete-target"]').on('click', function(e){
			e.preventDefault();
			removeTarget(context, targetGroupId, targetView.attr('jt-target-id'));
		});

		targetGroupView.find('[jt-template-view="content"]').append(targetView);

		if(!context.data[targetGroupId].values){
			context.data[targetGroupId].values = {};
		}

		if(context.data[targetGroupId].values[targetId]){
			targetView.find('input').eq(0).val(context.data[targetGroupId].values[targetId].name);
			targetView.find('input').eq(1).val(context.data[targetGroupId].values[targetId].percent);
		}
		else{
			context.data[targetGroupId].values[targetId] = {};
		}
	}

	function removeTarget(context, targetGroupId, targetId){
		for(var i = Number(targetId); i < context.targetGroupLastIds[targetGroupId]; ++i){
			context.data[targetGroupId].values[i] = context.data[targetGroupId].values[i + 1];
		}

		delete context.data[targetGroupId].values[Number(context.targetGroupLastIds[targetGroupId]) - 1];
		context.targetGroupLastIds[targetGroupId]--;

		context.trigger('change');
		rebuildTargetViewsFromData(context, targetGroupId);
	}

	function rebuildTargetGroupViewsFromData(context){
		context.contentView.html('');
		context.targetGroupLastIds = {};
		context.targetGroupViews = [];
		context.nextTargetGroupId = 0;
		context.nextTargetGroupConatiner = null;
		context.nextPositionIsLeft = true;

		for(var i in context.data){
			addTargetGroup(context);
		}
	}

	function rebuildTargetViewsFromData(context, targetGroupId){
		var targetGroupView = context.targetGroupViews[targetGroupId];
		
		targetGroupView.find('[jt-template-view="content"]').html('');
		context.targetGroupLastIds[targetGroupId] = 0;

		for(var i in context.data[targetGroupId].values){
			addTarget(context, targetGroupView, targetGroupId);
		}
		updatePercentTargetGroupView(context, targetGroupView, targetGroupId);
	}

	function updatePercentTargetGroupView(context, targetGroupView, targetGroupId){
		var sum = 0;

		for(var i in context.data[targetGroupId].values){
			var data = context.data[targetGroupId].values[i];
			var percent = Number(data.percent);

			if(!isNaN(percent)){
				sum += percent;
			}
		}

		targetGroupView.find('[jt-attr="sum-percent"]').text(sum + '%');
	}

	JT.registerInput({
		name: 'target_audience',
		fct:{
			validate: validate
		},
		on:{
			create: create,
			load: load
		}
	});
	
});
