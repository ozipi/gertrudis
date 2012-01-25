(function() {
	
var skin = function() {

	var txtProject = null;
	var tracking = null;

	this.init = function(  ) {
		txtProject = $('#project');
		tracking = $('#percent');
	}

	this.execute = function( data ) {
		txtProject.html(data.project);
		tracking.html(data.percent);
	}

	this.skinSelected = function( skinName ) {
		if (skinName === undefined) return _skin
	}
}

});