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
				callback(scope, version, data);
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
				historyDoc.records[date] = historySnapshot.currentIssuesNum;
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


	// ---------------------------------------------------------------------
	// WRITE DUMMY DATA
	// ---------------------------------------------------------------------
		dbService.writeDummyData = function(project, version) {

			console.log(log_ctrl + 'Writing dummy data..');
			var historySnapshot = {};
			historySnapshot.docId = project.id + '_' + version.id;
			historySnapshot.projectId = project.id;
			historySnapshot.versionId = version.id;
			historySnapshot.versionName = version.name;
			historySnapshot.records = {};

			var number = 22;

			for (var i=1; i<15; i++) {

				var date = '08.';

				var random = Math.round( Math.random()*4 ) - 2;
				number = number - 1 + random;

				console.log(log_ctrl + '   i: ' + i);
				console.log(log_ctrl + 'date: ' + date);
				console.log(log_ctrl + 'rand: ' + random);
				console.log(log_ctrl + 'numb: ' + number);
				console.log('');

				if (i<10) {
					date += '0';
				}
				date += i;
				historySnapshot.records[date] = {};
				historySnapshot.records[date].value = number;
			}
			requestVersionHistory(historySnapshot, docFound, docNotFound);
		}


		dbService.writeDummyData2 = function(project, version) {

			console.log(log_ctrl + 'Writing dummy data..');
			var historySnapshot = {};
			historySnapshot.docId = project.id + '_' + version.id;
			historySnapshot.projectId = project.id;
			historySnapshot.versionId = version.id;
			historySnapshot.versionName = version.name;
			historySnapshot.records = {};

			var number = 35;

			for (var i=1; i<20; i++) {

				var date = '2013-08-';

				var random = Math.round( Math.random()*4 ) - 2;
				number = number - 1 + random;

				console.log(log_ctrl + '   i: ' + i);
				console.log(log_ctrl + 'date: ' + date);
				console.log(log_ctrl + 'rand: ' + random);
				console.log(log_ctrl + 'numb: ' + number);
				console.log('');

				if (i<10) {
					date += '0';
				}
				date += i;
				
				historySnapshot.records[date] = {};
				historySnapshot.records[date].date = date;
				historySnapshot.records[date].value = number;

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
