var BasicSkin = function() {

	var container = null;
	var txtProject = null;
	var tracking = null;

	this.init = function( _container ) {
		container = $('#testDiv');
		txtProject = $('<label></label>');
		tracking = $('<div></div>');
	}

	this.execute = function( data ) {
		txtProject.text(data.project);
		tracking.html(data.percent);
		container.appendChild(txtProject);
		container.appendChild(tracking);
	}

	this.skinSelected = function( skinName ) {
		if (skinName === undefined) return _skin
	}
}
