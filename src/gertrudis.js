// Generated by CoffeeScript 1.3.1
(function() {
  var BasicSkin, root, skin_classes;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  skin_classes = {
    BasicSkin: BasicSkin
  };

  skin_classes.BasicSkin = BasicSkin = (function() {

    function BasicSkin() {}

    return BasicSkin;

  })();

  $.widget("ui.gertrudis", $.extend({}, WidgetHelper, {
    options: {
      skin: "BasicSkin",
      plugin: "GithubPlugin",
      pluginOptions: {},
      enableTimeout: false
    },
    properties: {
      _skin: null,
      _plugin: {},
      _global: null
    },
    _create: function() {
      console.log("gertrudis.create::");
      this.properties._global = root;
      this.properties._skin = this._getSkinInstance(this.options.skin);
      this.properties._skin.init(this);
      this.properties._plugin = this._getPluginInstance(this.options.plugin, this.options.pluginOptions);
      this.properties._plugin.init;
      return true;
    },
    _init: function() {
      console.log("gertrudis.init::");
      this._pluginExecute(this.options.pluginOptions);
      if (this.options.enableTimeout) {
        return this._setTimeout($.proxy(this._setTimeout, this));
      }
    },
    _getSkinInstance: function(skin) {
      console.log("_getSkinInstance::", skin, this.properties._global, this.options.skin, window, this.properties._global, root);
      return new skin_classes[this.options.skin]();
    },
    _getPluginInstance: function(plugin, pluginOptions) {
      console.log("_getPluginInstance::", plugin, pluginOptions);
      return new root[plugin](pluginOptions);
    },
    _setTimeout: function(handler) {},
    _timeoutHandler: function(event, options) {
      return this._pluginExecute();
    },
    _onSkinInit_successHandler: function(event) {
      console.log("gertrudis._onSkinInit_successHandler::");
      return this._pluginExecute(this.options.pluginOptions);
    },
    _pluginExecute: function(options) {
      console.log("gertrudis->_pluginExecute", this.properties._plugin);
      return this.properties._plugin.execute(options, $.proxy(this._pluginExecute_successHandler, this));
    },
    _pluginExecute_successHandler: function(options) {
      console.log("gertrudis._pluginExecute_successHandler::", options);
      return this._skinExecute(options);
    },
    _skinExecute: function(options) {
      console.log("gertrudis._skinExecute::", options);
      return this.properties._skin.execute($.proxy(this._skinExecute_successHandler, this), options);
    },
    _skinExecute_successHandler: function(event, options) {
      return console.log("gertrudis._skinExecute_successHandler::", options);
    },
    _setOption: function(key, value) {},
    destroy: function() {
      this.uninstall();
      return $.Widget.prototype.destroy.apply(this, arguments);
    }
  }));

}).call(this);
