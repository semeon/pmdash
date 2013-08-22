appModule.factory('DB', ['$http', '$rootScope', function($http, $rootScope) {

    var log_ctrl = ' - DbSrvs: ';
    var appSettings = $rootScope.settings.appSettings;
    var timeStampFormat = 'YYYY-MM-DD_hh:mm';
    var dbService = {};

	// ---------------------------------------------------------------------
	// READ DATA
	// ---------------------------------------------------------------------
		dbService.getVersionHistory = function(project, version, scope, callback) {
			var docId = project.id + '_' + version.id;

			function successCallback(data) {
				callback(scope, 'title', data);
			}

			function errorCallback(data) {
			}

		 	dbRequest('GET', docId, null, successCallback, errorCallback);
		}



	// ---------------------------------------------------------------------
	// UPDATE DATA
	// ---------------------------------------------------------------------

		function updateHistory(history, historySnapshot) {
			console.log(log_ctrl + 'updateHistory: ' + history._id);
			console.log(log_ctrl + 'updateHistory rev: ' + history._rev);

			var date = moment().format(timeStampFormat);
			history[date] = historySnapshot.currentIssuesNum;


			function success(data){
				console.log(log_ctrl + 'Document ' + history._id + ' successfully saved to DB.');
			};

		 	dbRequest('PUT', history._id, JSON.stringify(history), success);	
		}

		function createVersionHistory(historySnapshot) {
				var docId = historySnapshot.docId;
				history['_id'] = historySnapshot.docId;
				history['project'] = historySnapshot.projectId;
				history['version'] = historySnapshot.versionName;
				return history;
		}

		function docNotFound(historySnapshot) {
			var history = createVersionHistory(historySnapshot);
			updateHistory(history, historySnapshot);
		}

		function docFound(history, historySnapshot) {
			updateHistory(history, historySnapshot);
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
