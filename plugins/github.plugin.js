function GithubPlugin (options){
	this.options = options;
	
	this.init = function(options){
		console.log('GithubPlugin::init', options, this.options);		
		this.githubInfo = {};			
		this.githubInfo = new Github(this.options.user);
		this.callback = null;
		(this.options.baseToCompare == undefined)? this.options.baseToCompare = 100 : null;	
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
		var results = {};
		for (var i=0; i < pData.length; i++) {
			var itemData = this.getCompletitionData(pData[i].name);
			console.log('pData[i]:', itemData, results[itemData.major]);			
			if (results[itemData.major] != undefined){
				console.log('defined', results[itemData.major].min, itemData.min);
				if (results[itemData.major].min < itemData.min){
					console.log('> !');
					results[itemData.major] = itemData;
				}
			}
			else{
				console.log('undefined');
				results[itemData.major] = itemData;
			}
			
		};
		
		console.log('result:', results);	
		
		return results;
	};
	
	this.getCompletitionData = function(data){
		//Static vX.xx
		var dotPos = data.indexOf('.');
		var vPos = data.indexOf('v');		
		var majorVersion = data.substr((vPos + 1), (dotPos -1));		
		var minVersion = data.substr(dotPos, data.length);
		var completition = minVersion * 100;
		var pending = this.options.baseToCompare - completition;
		
		//console.log('version->', version);
		var version = {major: majorVersion, min: minVersion, completition: completition, pending: pending};
		return version;
	};
	
	this._getCallback = function (data) {
		if (this.callback != null){
			if (this.options.versionToTrack != undefined){
				var dataselected = {};
				dataselected[this.options.versionToTrack] = data[this.options.versionToTrack];
				this.callback(dataselected);				
			}
			else{
				this.callback(data);				
			}
			
			this.callback = null;
		}
	};	
	
}