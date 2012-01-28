function GithubPlugin (options){
	this.options = options;
	
	this.init = function(options){
		console.log('GithubPlugin::init', options, this.options);		
		this.githubInfo = {};			
		this.githubInfo = new Github(this.options.user);
		this.callback = null;
	};
	
	this.execute = function(options, handler){
		console.log('GithubPlugin::execute');
		this.callback = handler;
		this.githubInfo.getRepoTags(options.user, options.repo, $.proxy(this._getRepoTags_successHandler, this));
	};
	
	this._getRepoTags_successHandler = function(data){
		console.log('GithubPlugin::getRepoTags->', data);		
		
		this._getCallback(this.getProjectPercentages(data));
	};
	
	this.getProjectPercentages = function(pData){
		console.log('GithubPlugin::getProjectPercentages', pData);
		var data = {};
		var topVersion = 0;
		for (var i=0; i < pData.length; i++) {
			var perct = this.getCompletitionData(pData[i].name);
			(topVersion < perct)? topVersion = perct : null;			
			console.log('pData[i]:', pData[i].name, perct, topVersion);
		};
		
		data.completition = topVersion;
		return data;
	};
	
	this.getCompletitionData = function(data){
		//Static vX.xx
		var dotPos = data.indexOf('.');
		var version = data.substr(dotPos, data.length);
		version = version * 100;
		//console.log('version->', version);
		return version;
	};
	
	this._getCallback = function (data) {
		if (this.callback != null){
			this.callback(data);
			this.callback = null;
		}
	};	
}