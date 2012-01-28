/**
 * gertrudis jQuery Widget
 * supported by: jQuery 1.5 
 * 
 */
$.widget("ui.gertrudis", $.extend({}, WidgetHelper, {

	// configuration of widget
	options: {
		skin: "BasicSkin",		
		plugin: "GithubPlugin",
		pluginOptions: {},
		enableTimeout: false
	},
	
	properties: {
		_skin: null,
		_plugin: {}		
	},
	
	/**
	 * Creation of widget
	 **/
	_create: function() {				
		//Create the reference of the skin/plugin
		//this.skin(this.options.skin);
		//this.plugin(this.options.plugin);
		
		//Initialize the skin
		//this.skin().init($.proxy(this._onSkinInit_successHandler, this));
		
		console.log('gertrudis.create::');
		
		this.properties._skin = this._getSkinInstance(this.options.skin);
		this.properties._skin.init();
		
		this.properties._plugin = this._getPluginInstance(this.options.plugin, this.options.pluginOptions);
		this.properties._plugin.init();
	},

	/**
	 * Initialization of the widget
	 **/
	_init: function() {
		console.log('gertrudis.init::');				
		this._pluginExecute(this.options.pluginOptions);
		
		if(this.options.enableTimeout){
			this._setTimeout($.proxy(this._setTimeout, this));			
		}
	},

	_getSkinInstance: function(skin) {
		return new window[this.options.skin]();
	},
	
	_getPluginInstance: function(plugin, pluginOptions){
		return new window[plugin](pluginOptions);
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
		this._pluginExecute();		
	},
	
	_onSkinInit_successHandler: function(event){
		console.log('gertrudis._onSkinInit_successHandler::');		
		this._pluginExecute(this.options.pluginOptions);		
	},
	
	/**
	 * Executes the plugin action
	 **/	
	_pluginExecute: function(options){
		//TODO: remove after plugin is created
		console.log('gertrudis->_pluginExecute', this.properties._plugin);
		this.properties._plugin.execute(options, $.proxy(this._pluginExecute_successHandler, this));		
		
		//Hardcoded data
		//var responseObject = [{title: 'github.js', completition: '70', pending:'30'}];
		//this._pluginExecuteHandler_successHandler(responseObject);
	},
	
	/**
	 * Executes the plugin action
	 **/	
	_pluginExecute_successHandler: function(options){
		console.log('gertrudis._pluginExecute_successHandler::', options);				
		this._skinExecute(options);
	},
	
	/**
	 * Executes the skin execute handler
	 **/	
	_skinExecute: function(options){
		console.log('gertrudis._skinExecute::', options);
		this.properties._skin.execute($.proxy(this._skinExecute_successHandler, this), options);
	},	
	
	/**
	 * Executes the plugin action
	 **/	
	_skinExecute_successHandler: function(event, options){
		console.log('gertrudis._skinExecute_successHandler::', options);
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
