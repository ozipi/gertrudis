root = exports ? this
skin_classes = {BasicSkin: BasicSkin}
skin_classes.BasicSkin = class BasicSkin

$.widget "ui.gertrudis", $.extend({}, WidgetHelper,
  options:
    skin: "BasicSkin"
    plugin: "GithubPlugin"
    pluginOptions: {}
    enableTimeout: false

  properties:
    _skin: null
    _plugin: {}
    _global: null

  _create: ->
    console.log "gertrudis.create::"
    @properties._global = root
    @properties._skin = @_getSkinInstance(@options.skin)
    @properties._skin.init this
    @properties._plugin = @_getPluginInstance(@options.plugin, @options.pluginOptions)
    @properties._plugin.init

    true

  _init: ->
    console.log "gertrudis.init::"
    @_pluginExecute @options.pluginOptions
    @_setTimeout $.proxy(@_setTimeout, this)  if @options.enableTimeout

  _getSkinInstance: (skin) ->
    console.log "_getSkinInstance::", skin, @properties._global, @options.skin, window, @properties._global, root
    new skin_classes[@options.skin]()

  _getPluginInstance: (plugin, pluginOptions) ->
    console.log "_getPluginInstance::", plugin, pluginOptions	
    new root[plugin](pluginOptions)

  _setTimeout: (handler) ->

  _timeoutHandler: (event, options) ->
    @_pluginExecute()

  _onSkinInit_successHandler: (event) ->
    console.log "gertrudis._onSkinInit_successHandler::"
    @_pluginExecute @options.pluginOptions

  _pluginExecute: (options) ->
    console.log "gertrudis->_pluginExecute", @properties._plugin
    @properties._plugin.execute options, $.proxy(@_pluginExecute_successHandler, this)

  _pluginExecute_successHandler: (options) ->
    console.log "gertrudis._pluginExecute_successHandler::", options
    @_skinExecute options

  _skinExecute: (options) ->
    console.log "gertrudis._skinExecute::", options
    @properties._skin.execute $.proxy(@_skinExecute_successHandler, this), options

  _skinExecute_successHandler: (event, options) ->
    console.log "gertrudis._skinExecute_successHandler::", options

  _setOption: (key, value) ->

  destroy: ->
    @uninstall()
    $.Widget::destroy.apply this, arguments
)
  
