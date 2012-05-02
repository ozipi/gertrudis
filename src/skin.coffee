->
  skin = ->
    txtProject = null
    tracking = null
    @init = ->
      txtProject = $("#project")
      tracking = $("#percent")

    @execute = (data) ->
      txtProject.html data.project
      tracking.html data.percent

    @skinSelected = (skinName) ->
      _skin  if skinName is `undefined`