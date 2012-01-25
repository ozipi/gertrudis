function GithubPlugin (login){
	this.init = function(){
		console.log('GithubPlugin::init');		
		this.githubInfo = {};			
		this.githubInfo = new Github(options.user);
		this.callback = null;
	};
	
	this.execute = function(options, handler){
		console.log('GithubPlugin::e');
		this.callback = handler;
		githubInfo.getRepoTags(options.user, options.repo, $.proxy(this._getRepoTags_successHandler, this));
	};
	
	this._getRepoTags_successHandler = function(data){
		console.log('GithubPlugin::getRepoTags->', data);		
		this._getCallback(data)
	};
	
	this._getCallback = function (data) {
		if (this.callback != null){
			this.callback(data);
			this.callback = null;
		}
	};	
}