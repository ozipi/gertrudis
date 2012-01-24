var githubInfo = {};

function GithubPlugin (options){
	githubInfo = new Github(options.user);
};

function execute (options){
	githubInfo.getRepoTags(options.user, options.repo, $.proxy(_getRepoTags_successHandler, this));					
};

function _getRepoTags_successHandler(result){
	console.log('plugin::getRepoTags->', result)
	//return result;
};