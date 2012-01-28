var BasicSkin = function() {

	var container = null;
	var txtProject = null;
	var tracking = null;

	this.init = function( _container ) {
		console.log('skin::init');
		container = $('#testDiv');
		txtProject = $('<label></label>');
		tracking = $('<div></div>');
	}

	this.execute = function( handler, data ) {
		console.log('skin::execute', data);
		for (var i in data) {
			console.log('->:', data[i]);
		};
		
		txtProject.text(data.completition + " " + data.major + "." + data.min);
		//tracking.html(data[0].commit.url);
		container.append(txtProject);
		//container.append(tracking);
	}

}
