$(function(){
	//execute the gertrudis widget
	var options = {};
	options.skin = 'BasicSkin';
	options.pluginOptions = {repo: 'gertrudis', user: 'ozipi', baseToCompare: 150, versionToTrack: 1};
	$('#testDiv').gertrudis(options);
});

