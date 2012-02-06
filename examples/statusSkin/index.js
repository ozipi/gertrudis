$(function() {

	var options = {};
	options.skin = 'StatusSkin';
	options.plugin = 'GithubPlugin2';
	options.pluginOptions = { repo: 'gertrudis', user:'ozipi', baseToCompare: 100, versionToTrack: 1 };
	$('#gertrudis').gertrudis(options);
	
});