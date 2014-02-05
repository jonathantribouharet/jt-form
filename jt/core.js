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

$(document).one('ready', function(){

	function JT(){
		this._vars = {};
		this._components = {};
		this._events = {};
		this._isLoaded = false;
	}

	/**********************/

	JT.prototype.toArray = function(object, attribute){
		if(object[attribute]){
			if(object[attribute] instanceof Array === false){
				object[attribute] = [object[attribute]];
			}	
		}
		else{
			object[attribute] = [];
		}
	}

	JT.prototype.set = function(key, value){
		this._vars[key] = value;
	}

	JT.prototype.get = function(key){
		return this._vars[key];
	}

	JT.prototype.isLoaded = function(){
		return this._isLoaded;
	}

	JT.prototype.registerComponent = function(component){
		console.log('Register component: [' + component.type + '] ' + component.name);

		if(!this._components[component.type]){
			this._components[component.type] = {};
		}

		this._components[component.type][component.name] = component;
	}

	JT.prototype.createComponent = function(type, name, config){
		var component = this._components[type][name];

		if(!component){
			throw "No component type '" + type + "' and name '" + name + "'";
		}

		return component.create(config);
	}

	JT.prototype.on = function(event_name, callbacks, target){
		if(!this._events[event_name]){
			this._events[event_name] = [];
		}

		if(typeof(callbacks) == "function"){
			this._events[event_name].push([callbacks, target]);
		}
		else{
			for(var i = 0; i < callbacks.length; ++i){
				this._events[event_name].push([callbacks[i], target]);
			}
		}
	}

	JT.prototype.trigger = function(event_name, params){
		for(var i = 0; i < this._events[event_name].length; ++i){
			var callback = this._events[event_name][i][0];
			var target = this._events[event_name][i][1];

			callback(target, params);
		}
	}

	/**********************/

	JT.prototype.Component = function(type, componentConfig){
		this.type = type;
		this.name = componentConfig.name;
		this.fct = {};

		this._initialized = false;

		this._callbacks = {
			init: [],
			create: []
		};

		if(componentConfig){
			if(componentConfig.fct){
				for(var fct_name in componentConfig.fct){
					this.fct[fct_name] = componentConfig.fct[fct_name];
				}		
			}

			this._defineCallbacks(componentConfig);
		}
	}

	// WARNING
	JT.prototype.Component.prototype.clone = function(){
		var newComponent = new JT.prototype.Component(this.type, this.name, this.data);
		$.extend(true, newComponent, this);

		// Ne copie pas les view avec la methode clone...
		if(newComponent.view){
			newComponent.view = newComponent.view.clone();
		}

		return newComponent;
	}

	JT.prototype.Component.prototype._defineCallbacks = function(componentConfig){
		if(componentConfig.events){
			for(var event_name in componentConfig.events){
				var events = componentConfig.events[event_name];

				window.JT.on(event_name, events, this);		
			}
		}

		if(componentConfig.on){
			for(var callback_name in componentConfig.on){
				var callbacks = componentConfig.on[callback_name];

				if(!this._callbacks[callback_name]){
					this._callbacks[callback_name] = [];
				}

				if(typeof(callbacks) == "function"){
					this._callbacks[callback_name].push(callbacks);
				}
				else{
					for(var i = 0; i < callbacks.length; ++i){
						this._callbacks[callback_name].push(callbacks[i]);
					}
				}			
			}
		}
	}

	JT.prototype.Component.prototype.create = function(config){
		if(!this._initialized){
			// console.log('Initialize component: ' + this.type + ':' + this.name);

			this.trigger('init');
			this._initialized = true;
		}

		// console.log('Create component: ' + this.type + ':' + this.name);

		var newComponent = this.clone();
		newComponent.config = config;
		newComponent.trigger('create');

		return newComponent;
	}

	JT.prototype.Component.prototype.trigger = function(callback_name, params){
		if(!this._callbacks[callback_name]){
			throw "No callback named '" + callback_name + "' for component " + this.name;
		}
		for(var i = 0; i < this._callbacks[callback_name].length; ++i){
			this._callbacks[callback_name][i](this, params);
		}
	}

	/**********************/

	window.JT = new JT();

	console.log("Initialisation");
	$(document).trigger('jt-init');

	console.log("Register modules"); 
	$(document).trigger('jt-register-modules');

	console.log("Register components");
	$(document).trigger('jt-register-components');

	console.log("JT Load");
	$(document).trigger('jt-load');

	console.log("JT Loaded");
	$(document).trigger('jt-loaded');

	window.JT._isLoaded = true;

});
