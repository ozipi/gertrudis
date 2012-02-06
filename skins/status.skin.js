var StatusSkin = function() {
	
	var container = null;
	var version = null;
	var trackbar = null;
	var tracker = null;
	var completition = null
	var status = null;

	this.init = function( _container ) {
		console.log( 'Skin::init' );
		
		var id = '#' + _container.element.context.id;
		container = $(id);

		version = container.find('h2');
		status = container.find('p');
		trackbar = container.find('#trackbar');
		tracker = $('<div></div>', {class:'tracker'});
		completition = $('<span></span>');

		/*project = $('<h1></h1>', {id:'projectTitle'});
		version = $('<h2></h2>', {id:'projectVersion'});
		trackbar = $('<div></div>', {id:'trackbar'});
		status = $('<p></p>', {id:'projectStatus'});*/
	};

	this.execute = function( _callback, data ) {
		console.log( 'Skin::execute', data );

		trackbar.append(tracker);
		trackbar.append(completition);

		version.text('version: ' + data[1].version);
		status.text('estatus de prueba');
		completition.text(data[1].completition + '%');

		setTrackerPosition(data[1].completition);

		/*container.append(project);
		container.append(version);
		container.append(trackbar);
		container.append(status);*/
	};

	var setTrackerPosition = function(completition) {
		left = (parseInt(completition) * 220 / 100) + 3 - 1.5;
		tracker.css('left', left);
	}

}