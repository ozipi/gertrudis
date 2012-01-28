$(function(){
	//execute the gertrudis widget
	var options = {};
	options.skin = 'BasicSkin';
	//options.pluginOptions = {repo: 'gertrudis', user: 'ozipi', baseToCompare: 100, versionToTrack: 1};
	options.pluginOptions = {repo: 'gertrudis', user: 'ozipi'};	
	$('#testDiv').gertrudis(options);
});

