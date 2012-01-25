function GithubPlugin (options){
	this.options = options;
	
	this.init = function(options){
		console.log('GithubPlugin::init', options, this.options);		
		this.githubInfo = {};			
		this.githubInfo = new Github(this.options.user);
		this.callback = null;
	};
	
	this.execute = function(options, handler){
		console.log('GithubPlugin::');
		this.callback = handler;
		this.githubInfo.getRepoTags(options.user, options.repo, $.proxy(this._getRepoTags_successHandler, this));
	};
	
	this._getRepoTags_successHandler = function(data){
		console.log('GithubPlugin::getRepoTags->', data);		
		this._getCallback(data);
	};
	
	this._getCallback = function (data) {
		if (this.callback != null){
			this.callback(data);
			this.callback = null;
		}
	};	
}