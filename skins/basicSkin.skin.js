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
		console.log('skin::exceute');
		txtProject.text(data[0].name);
		tracking.html(data[0].commit.url);
		container.append(txtProject);
		container.append(tracking);
	}

}
