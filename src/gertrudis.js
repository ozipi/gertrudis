/**
 * gertrudis jQuery Widget
 * supported by: jQuery 1.5 
 * 
 */
$.widget("ui.gertrudis", $.extend({}, WidgetHelper, {

	// configuration of widget
	options: {
		skin: "",		
		plugin: "github",
		pluginOptions: {},
		enableTimeout: false
	},
	
	properties: {
		_skin: null,
		_plugin: null		
	},
	

	/**
	 * Creation of widget
	 **/
	_create: function() {				
		//Create the reference of the skin/plugin
		this.skin(this.options.skin);
		this.plugin(this.options.plugin);
		
		//Initialize the skin
		this.skin().init($.proxy(this._onSkinInit_successHandler, this));
	},

	/**
	 * Initialization of the widget
	 **/
	_init: function() {
		if(this.options.enableTimeout){
			this._setTimeout($.proxy(this._setTimeout, this));			
		}
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
	
	_onSkinInit_successHandler: function(event){
		console.log('_onSkinInit_successHandler::', options);		
		this._pluginExecute());		
	},
	
	/**
	 * Executes the plugin action
	 **/	
	_pluginExecute: function(options){
		//TODO: remove after plugin is created
		//this.plugin().execute($.proxy(this._pluginExecute_successHandler, this));		
		
		//Hardcoded data
		var responseObject = [{title: 'github.js', completition: '70', pending:'30'}];
		this._pluginExecuteHandler_successHandler(responseObject);
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
		console.log('_skinExecute_successHandler::', options);
		//TODO algo
	},	
	
	_setOption : function(key, value) {

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
