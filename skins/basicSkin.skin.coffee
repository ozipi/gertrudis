class BasicSkin
  container: null
  txtProject: null
  tracking: null

  @init: (_container) =>
    id = "#" + _container.element.context.id
    console.log "skin::init", _container, _container.element.context.id, id
    container = $(id)
    txtProject = $("<label></label>")
    tracking = $("<div></div>")
		true

  @execute: (handler, data) =>
    console.log "skin::execute", data, container
    for i of data
      console.log "->:", data[i]
    txtProject.text data[0].completition + " " + data[0].major + "." + data[0].min
    tracking.html data[0].completition
    container.append txtProject
    container.append tracking
		true