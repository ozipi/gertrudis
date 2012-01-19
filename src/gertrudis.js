/**
 * gertrudis jQuery Widget
 * supported by: jQuery 1.5 
 * 
 */
$.widget("ui.gertrudis", $.extend({}, WidgetHelper, {

	// configuration of widget
	options: {
		plugin: "github",
		pluginOptions: {},
		skin: ""
	},
	
	properties: {
		_skin: null,
		_plugin: null		
	},
	

	/**
	 * Creation of widget
	 **/
	_create: function() {				
		this.skin().init();
	},

	/**
	 * Initialization of the widget
	 **/
	_init: function() {
		this._setTimeout($.proxy(this._setTimeout, this));
	},
	
	/**
	 * Sets the timeout interval
	 **/	
	_setTimeout: function(handler){
		//this.plugin().setTimeout(handler);		
	},
	
	/**
	 * Handles the timeout interval
	 **/	
	_timeoutHandler: function(event, options){
		this._pluginExecute());
	},
	
	/**
	 * Executes the plugin action
	 **/	
	_pluginExecute: function(options){
		this.plugin().execute($.proxy(this._pluginExecute_successHandler, this));		
	},
	
	/**
	 * Executes the plugin action
	 **/	
	_pluginExecuteHandler_successHandler: function(options){
		this._skinExecute(options);
	},
	
	/**
	 * Executes the skin execute handler
	 **/	
	_skinExecute: function(options){
		this.skin().execute($.proxy(this._skinExecute_successHandler, this));
	},	
	
	/**
	 * Executes the plugin action
	 **/	
	_skinExecute_successHandler: function(event, options){
		//TODO algo
	},	
	
	_setOption : function(key, value) {
		switch (key) {

	      $.Widget.prototype._setOption.apply(this, arguments);
	},	

	/**
	 * Destruction of widget
	 * @returns nothing
	 **/
	destroy: function() {
		this.uninstall();
		$.Widget.prototype.destroy.apply(this, arguments);
	}
}));
