appModule.factory('DB', ['$http', '$rootScope', 'BurnDownChart', function($http, $rootScope, BurnDownChart) {

    var log_ctrl = ' - DbSrvs: ';
    var appSettings = $rootScope.settings.appSettings;
    var timeStampFormat = 'YYYY-MM-DD';
    var dbService = {};


	// ---------------------------------------------------------------------
	// READ DATA
	// ---------------------------------------------------------------------
		dbService.getVersionHistory = function(project, version) {

			if (!appSettings.statistics) {
				console.log('Statistics is turned off.');
				return;
			}

			var docId = project.id + '_' + version.id;

			function successCallback(data) {
				BurnDownChart.create(project, version, data);
			}

			function errorCallback(data) {
			}

		 	dbRequest('GET', docId, null, successCallback, errorCallback);
		}



	// ---------------------------------------------------------------------
	// UPDATE DATA
	// ---------------------------------------------------------------------

		function updateHistory(historyDoc, historySnapshot) {
			console.log(log_ctrl + 'updateHistory: ' + historyDoc._id);
			console.log(log_ctrl + 'updateHistory rev: ' + historyDoc._rev);

			var date = moment().format(timeStampFormat);
			
			if (historySnapshot.records) {
				// DUMMY DATA
				historyDoc.records = historySnapshot.records;
			} else {
				// NORMAL FLOW
				historyDoc.records[date] = {};
				historyDoc.records[date].value = historySnapshot.currentIssuesNum;
			}

			function success(data){
				console.log(log_ctrl + 'Document ' + historyDoc._id + ' successfully saved to DB.');
			};

		 	dbRequest('PUT', historyDoc._id, JSON.stringify(historyDoc), success);	
		}

		function createVersionHistory(historySnapshot) {
				var docId = historySnapshot.docId;
				var historyDoc = {};
				historyDoc['_id'] = historySnapshot.docId;
				historyDoc['project'] = historySnapshot.projectId;
				historyDoc['version'] = historySnapshot.versionName;
				historyDoc.records = {};
				return historyDoc;
		}

		function docNotFound(historySnapshot) {
			var historyDoc = createVersionHistory(historySnapshot);
			updateHistory(historyDoc, historySnapshot);
		}

		function docFound(historyDoc, historySnapshot) {
			updateHistory(historyDoc, historySnapshot);
		}


		function requestVersionHistory(historySnapshot, success, error) {
			var docId = historySnapshot.docId;
			console.log(log_ctrl + 'requesting a doc: ' + docId);
			function successCallback(data) {
				console.log(log_ctrl + 'Doc was returned: ' + docId);
				console.log(data);
				success(data, historySnapshot);
			}

			function errorCallback(data) {
				console.log(log_ctrl + 'Doc was not returned: ' + docId);
				if (data.status == '404') {
					error(historySnapshot);
				}
			}

			console.log('Checking the doc: ' + docId);
		 	dbRequest('GET', docId, null, successCallback, errorCallback);
		}


		dbService.updateVersionHistory = function(project, version) {

			if (!appSettings.statistics) {
				console.log('Statistics is turned off.');
				return;
			}

			
			var historySnapshot = {};
			historySnapshot.docId = project.id + '_' + version.id;
			historySnapshot.projectId = project.id;
			historySnapshot.versionId = version.id;
			historySnapshot.versionName = version.name;
			historySnapshot.currentIssuesNum = 0;
			var columns = project.customStatuses;
			for (cs in columns) {
				if (columns[cs].statistic) {
					historySnapshot.currentIssuesNum += version.getCustomStatusCount(columns[cs].title);
				}
			}		        	
			requestVersionHistory(historySnapshot, docFound, docNotFound);
		}



	// Genric request
	// ------------------------------

		function dbRequest(type, urlParams, data, success, error) {
			console.log(log_ctrl + 'dbRequest..');
			var dbUri = appSettings.dbUri + urlParams;
			console.log(log_ctrl + 'dbUri: ' + dbUri);

			$.ajax({
				url: dbUri,
				type: type,
				dataType: "json",
				data: data,
				contentType: "application/json",
				success: success,
				error: error
			});
		}  

  return dbService;
}]);
