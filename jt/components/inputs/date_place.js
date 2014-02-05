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

	// WARNING pb place change devrait annuler carte si pas de click avec le autocomplete

	function create(context){
		context.inputs = {
			name: context.view.find('input').first(),
			place: context.view.find('input').eq(1),
			place_lat: context.view.find('input').eq(2),
			place_lng: context.view.find('input').eq(3),
			place_city: context.view.find('input').eq(4),
			place_country: context.view.find('input').eq(5),
			place_country_code: context.view.find('input').eq(6),
			start: context.view.find('input').eq(7),
			end: context.view.find('input').eq(8)
		};

		context.inputs.start.on('change', function(){
			context.trigger('change');
		});
		context.inputs.end.on('change', function(){
			context.trigger('change');
		});

		context.inputs.start.datepicker();
		context.inputs.end.datepicker();

		context.mapView = context.view.find('[jt-view="map"]');

		context.autocomplete = new google.maps.places.Autocomplete(context.inputs.place[0], {
			types: ['geocode']
		});
		 
		context.map = new google.maps.Map(context.mapView[0], {
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			disableDoubleClickZoom: true,
			draggable: false,
			scrollwheel: false,
			zoom: 15
		});

		context.marker = new google.maps.Marker({    
			map: context.map
	    });  

		google.maps.event.addListener(context.autocomplete, 'place_changed', function(){
			var place = context.autocomplete.getPlace();

			if(!place || !place.geometry || !place.geometry.location){
				context.inputs.place_lat.val('');
				context.inputs.place_lng.val('');
				context.inputs.place_city.val('');
				context.inputs.place_country.val('');
				context.inputs.place_country_code.val('');
				context.trigger('change');
				context.mapView.hide();

				return;
			}

	        var city = '';
	        var country = '';
	        var country_code = '';

	        for(var i  = 0; i < place.address_components.length; ++i){
	            if(place.address_components[i].types[0] == 'locality'){
	                city = place.address_components[i].long_name;
	            }
	            if(place.address_components[i].types[0] == 'country'){
	                country = place.address_components[i].long_name;
	                country_code = place.address_components[i].short_name;
	            }
	        }

			context.inputs.place_lat.val(place.geometry.location.lat());
			context.inputs.place_lng.val(place.geometry.location.lng());
			context.inputs.place_city.val(city);
			context.inputs.place_country.val(country);
			context.inputs.place_country_code.val(country_code);
			context.trigger('change');

			load_map(context);
		});

		context.mapView.hide();
	}

	function load(context){
		for(var key in context.inputs){
			context.inputs[key].val(context.data[key]);
		}

		if(context.data.place_lat && context.data.place_lng){
			load_map(context);
		}
	}

	function change(context){
		for(var key in context.inputs){
			context.data[key] = context.inputs[key].val();
		}
	}

	function validate(context){
		var result = false;

		if(!JT.validateNotBlank(context.data.name) && !JT.validateNotBlank(context.data.place)){
			result = null;
		}
		else if(JT.validateNotBlank(context.data.name) && JT.validateNotBlank(context.data.place)){
			result = true;
		}

		return result;
	}


	function load_map(context){
		if(context.inputs.place_lat.val().length > 0 && context.inputs.place_lng.val().length > 0){
			var center = new google.maps.LatLng(
				context.inputs.place_lat.val(),
				context.inputs.place_lng.val()
			);

			context.marker.setPosition(center);
			context.map.setCenter(center);
			context.mapView.show();
			google.maps.event.trigger(context.map, 'resize');
		}
		else{
			context.mapView.hide();
		}
	}

	JT.registerInput({
		name: 'date_place',
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
