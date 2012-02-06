function GithubPlugin2(options) {
	this.options = options;

	this.init = function(options) {
		console.log('Plugin::init');
		this.githubInfo = {};
		this.githubInfo = new Github(this.options.user);
		this.callback = null;
		if (this.options.baseToCompare === undefined) this.options.baseToCompare = 100;
	};

	this.execute = function(options, callback) {
		console.log('Plugin::execute', options);
		this.callback = callback;
		this.githubInfo.getRepoTags( options.user, options.repo, getRepoTags_successHandler );
	}

	var getRepoTags_successHandler = function(data) {
		console.log('Plugin::getRepoTags_successHandler', data);
		getCallback(getProjectPercentages(data));
	}

	var getProjectPercentages = function(pData){
		var data = {};
		var topVersion = 0;
		var results = {};
		for (var i=0, len=pData.length; i < len; i++) {
			var itemData = getCompletitionData(pData[i].name);
			//console.log('pData[i]:', itemData, results[itemData.major]);			
			if (results[itemData.major] != undefined){
				//console.log('defined', results[itemData.major].min, itemData.min);
				if (results[itemData.major].min < itemData.min){
					//console.log('> !');
					results[itemData.major] = itemData;
				}
			}
			else{
				//console.log('undefined');
				results[itemData.major] = itemData;
			}
			
		};
		
		console.log('result:', results);	
		
		return results;
	};
	
	var getCompletitionData = $.proxy(function(data){
		//Static vX.xx
		var dotPos = data.indexOf('.');
		var vPos = data.indexOf('v');
		var statusPos = data.indexOf('-');
		var majorVersion = data.substr((vPos + 1), (dotPos -1));		
		var minVersion = data.substr(dotPos, data.length);
		var completition = minVersion * 100;
		var pending = this.options.baseToCompare - completition;
		
		//console.log('version->', version);
		var version = {major: majorVersion, min: minVersion, completition: completition, pending: pending, version: data, status: null};
		return version;
	}, this);

	var getCallback = $.proxy(function (data) {
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
	}, this);
}