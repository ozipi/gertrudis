GithubPlugin = (options) ->
  @options = options
  @init = (options) ->
    console.log "GithubPlugin::init", options, @options
    @githubInfo = {}
    @githubInfo = new Github(@options.user)
    @callback = null
    (if (@options.baseToCompare is `undefined`) then @options.baseToCompare = 100 else null)

  @execute = (options, handler) ->
    console.log "GithubPlugin::execute"
    @callback = handler
    @githubInfo.getRepoTags options.user, options.repo, $.proxy(@_getRepoTags_successHandler, this)

  @_getRepoTags_successHandler = (data) ->
    console.log "GithubPlugin::getRepoTags->", data
    @_getCallback @getProjectPercentages(data)

  @getProjectPercentages = (pData) ->
    console.log "GithubPlugin::getProjectPercentages", pData
    data = {}
    topVersion = 0
    results = {}
    i = 0

    while i < pData.length
      itemData = @getCompletitionData(pData[i].name)
      console.log "pData[i]:", itemData, results[itemData.major]
      unless results[itemData.major] is `undefined`
        console.log "defined", results[itemData.major].min, itemData.min
        if results[itemData.major].min < itemData.min
          console.log "> !"
          results[itemData.major] = itemData
      else
        console.log "undefined"
        results[itemData.major] = itemData
      i++
    console.log "result:", results
    results

  @getCompletitionData = (data) ->
    dotPos = data.indexOf(".")
    vPos = data.indexOf("v")
    majorVersion = data.substr((vPos + 1), (dotPos - 1))
    minVersion = data.substr(dotPos, data.length)
    completition = minVersion * 100
    pending = @options.baseToCompare - completition
    version =
      major: majorVersion
      min: minVersion
      completition: completition
      pending: pending

    version

  @_getCallback = (data) ->
    if @callback?
      unless @options.versionToTrack is `undefined`
        dataselected = {}
        dataselected[@options.versionToTrack] = data[@options.versionToTrack]
        @callback dataselected
      else
        @callback data
      @callback = null