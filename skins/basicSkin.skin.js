var BasicSkin = function() {

	var container = null;
	var txtProject = null;
	var tracking = null;

	this.init = function( _container ) {
		var id = "#" + _container.element.context.id;
		console.log('skin::init', _container, _container.element.context.id, id);
		container = $(id);
		
		txtProject = $('<label></label>');
		tracking = $('<div></div>');
	}

	this.execute = function( handler, data ) {
		console.log('skin::execute', data, container);
		
		
		for (var i in data) {
			console.log('->:', data[i]);
		};
		
		txtProject.text(data[0].completition + " " + data[0].major + "." + data[0].min);
		tracking.html(data[0].completition);
		container.append(txtProject);
		container.append(tracking);
	}

}
