/** 
 * @class Definition of WidgetHelper
 * @version 0.01
 **/
var WidgetHelper = /** @lends WidgetHelper */ {
	
	/**
	* Sets up the initial values of WidgetHelper's specific 
	* @param classes string describing the names of the css classes that this widget will be attached to
	**/
	setup: function (classes) {
		
		this.__elementClass = classes;
		this.element.addClass(classes);
		
		this.element.attr("data-uid", this._guid());
		
		// initializae or extend elements if needed
		if(this.elements==null) this.elements = {};
		this.elements = $.extend({}, this.elements);
		
		// initializae or extend properties if needed
		if(this.properties==null) this.properties = {};
		
		var propertiesDefault = {
			__currentState:null
		};
		this.properties = $.extend(propertiesDefault, this.properties);
		
		// initializae or extend states if needed
		if(this.states==null) this.states = {};
		this.states = $.extend({}, this.states);
		
		if(typeof this.element.attr("data-options") != "undefined")
		{
			var predefinedOptions = jQuery.parseJSON(this.element.attr("data-options"));
			$.extend(this.options, predefinedOptions);
		}
	},
	
	uninstall: function(){
			this.element.removeAttr("data-uid");
			this.element.removeClass(this.__elementClass);
			this.states = null;
			this.properties = null;
			
			for (var element in this.elements) {
				this.elements[element].remove();
			}
			
			this.elements = null;
	},
	
	
	/**
	* bla bla bla
	* @param id bla bla bla
	* @param element bla bla bla
	**/
	addElement: function (id, element) {
		if ( this.elements == null ) this.elements= {};
		this.elements[id] = element;
	}, 
	
	
	currentState : function(state)
	{
		if (arguments.length == 0)
		return this.properties.__currentState;
		var previousStep = this.properties.__currentState;
		var states = state.split(' ');
		var args = new Array();
		for (var i = 1;	i < arguments.length; i++)
		{
			args.push(arguments[i]);
		}
		
		this.__executePredefinedStates(state);
		
		if (this.states != null)
		{
			this.properties.__currentState = states[states.length - 1];
			if (this.states._exitState != null)
			{
				this.states._exitState.apply(this, [ state ]);
			}
			else
			{
				$(this.element).trigger("exitstate");
			}
			if (this.states._enterState != null)
			this.states._enterState.apply(this, [ state ]);
			else
			$(this.element).trigger("enterstate");
			for (var index = 0; index < states.length; index++)
			{
				var iteratedState = states[index];
				
				if (previousStep == null) {
					previousStep = "";
				} else {
					this.element.removeClass("state-" + previousStep);
				}
				this.element.addClass("state-" + iteratedState);
				
				args.splice(0, 0, previousStep);
				this.states[iteratedState].apply(this, args);
				previousStep = iteratedState;
				args.splice(0, 1);
			}
			if (this.states._endState != null)
			this.states._endState.apply(this, [ state ]);
			else
			$(this.element).trigger("endstate");
		}
		return false;
	},
	
	__executePredefinedStates: function (state) {
		var attr = "data-state-" + state;
		var modifiers;
		var tokens;
		$("[" + attr + "]", this.element).each(function() {
			modifiers = $(this).attr(attr); 
			if(modifiers != null) {
				tokens = $.parseJSON(modifiers);
				if (tokens != null) {
					for(var method in tokens) {
						if(tokens.hasOwnProperty(method))
							$(this)[method](tokens[method]);			
					}					
				}
			}
		});
	},
	
	_insertClearDivTo: function (container) {
		return $('<div style="clear:both;"></div>').appendTo(container);
	}, 
	
	_guid : function() {
		var S4 = function() {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		};
		
		return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
	}
};
