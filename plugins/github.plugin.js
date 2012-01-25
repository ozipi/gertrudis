function GithubPlugin (login){
	this.init = function(){
		console.log('GithubPlugin::init');		
		this.githubInfo = {};			
		this.githubInfo = new Github(options.user);
	};
	
	this.execute = function(options){
		console.log('GithubPlugin::e');
		githubInfo.getRepoTags(options.user, options.repo, $.proxy(this._getRepoTags_successHandler, this));							
	};
	
	this._getRepoTags_successHandler = function(meta){
		console.log('GithubPlugin::getRepoTags->', result);		
	};
	
	this._getCallback = function (data) {
		if (this.callback != null){
			this.callback(data);
			this.callback = null;
		}
	};	
}
