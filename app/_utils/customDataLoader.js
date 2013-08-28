appModule.factory('DBUtil', ['$http', '$rootScope', function($http, $rootScope) {

    var log_ctrl = ' - DBUtil: ';
    var timeStampFormat = 'YYYY-MM-DD';
    var dbUtil = {};

	// ---------------------------------------------------------------------
	// MAIN SCRIPT
	// ---------------------------------------------------------------------

		dbUtil.runScript = function (){

			// dbUtil.writeDummyData( 'pkserver', '462', '0.4', '2013-07-22', '2013-08-15', 40, 1);
			dbUtil.writeManualDummyData( 'pkserver', '462', '0.4');

		}


		dbUtil.writeManualDummyData = function(projectId, versionId, versionName) {

			console.log(log_ctrl + 'Writing dummy data..');
			var historySnapshot = {};
			historySnapshot._id = projectId + '_' + versionId;
			historySnapshot.docId = projectId + '_' + versionId;
			historySnapshot.projectId = projectId;
			historySnapshot.versionId = versionId;
			historySnapshot.versionName = versionName;
			historySnapshot.records = {};

			historySnapshot.records['2013-08-01'] = {};
			historySnapshot.records['2013-08-01'].value = 50;

			historySnapshot.records['2013-08-02'] = {};
			historySnapshot.records['2013-08-02'].value = 45;

			historySnapshot.records['2013-08-03'] = {};
			historySnapshot.records['2013-08-03'].value = 40;

			historySnapshot.records['2013-08-04'] = {};
			historySnapshot.records['2013-08-04'].value = 44;

			historySnapshot.records['2013-08-05'] = {};
			historySnapshot.records['2013-08-05'].value = 42;

			historySnapshot.records['2013-08-06'] = {};
			historySnapshot.records['2013-08-06'].value = 41;

			historySnapshot.records['2013-08-07'] = {};
			historySnapshot.records['2013-08-07'].value = 37;

			historySnapshot.records['2013-08-08'] = {};
			historySnapshot.records['2013-08-08'].value = 38;

			historySnapshot.records['2013-08-09'] = {};
			historySnapshot.records['2013-08-09'].value = 41;

			historySnapshot.records['2013-08-10'] = {};
			historySnapshot.records['2013-08-10'].value = 39;

			historySnapshot.records['2013-08-11'] = {};
			historySnapshot.records['2013-08-11'].value = 36;

			historySnapshot.records['2013-08-12'] = {};
			historySnapshot.records['2013-08-12'].value = 28;

			historySnapshot.records['2013-08-13'] = {};
			historySnapshot.records['2013-08-13'].value = 25;

			historySnapshot.records['2013-08-14'] = {};
			historySnapshot.records['2013-08-14'].value = 27;

			historySnapshot.records['2013-08-15'] = {};
			historySnapshot.records['2013-08-15'].value = 31;

			historySnapshot.records['2013-08-16'] = {};
			historySnapshot.records['2013-08-16'].value = 30;

			historySnapshot.records['2013-08-17'] = {};
			historySnapshot.records['2013-08-17'].value = 28;

			historySnapshot.records['2013-08-18'] = {};
			historySnapshot.records['2013-08-18'].value = 25;

			historySnapshot.records['2013-08-19'] = {};
			historySnapshot.records['2013-08-19'].value = 22;

			historySnapshot.records['2013-08-20'] = {};
			historySnapshot.records['2013-08-20'].value = 20;

			historySnapshot.records['2013-08-21'] = {};
			historySnapshot.records['2013-08-21'].value = 18;

			historySnapshot.records['2013-08-22'] = {};
			historySnapshot.records['2013-08-22'].value = 15;

			historySnapshot.records['2013-08-23'] = {};
			historySnapshot.records['2013-08-23'].value = 14;

			historySnapshot.records['2013-08-24'] = {};
			historySnapshot.records['2013-08-24'].value = 13;

			historySnapshot.records['2013-08-25'] = {};
			historySnapshot.records['2013-08-25'].value = 12;

			historySnapshot.records['2013-08-26'] = {};
			historySnapshot.records['2013-08-26'].value = 11;

			historySnapshot.records['2013-08-27'] = {};
			historySnapshot.records['2013-08-27'].value = 10;




			function success(data){
				console.log(log_ctrl + 'Document ' + historySnapshot._id + ' successfully saved to DB.');
			};

      dbRequest('PUT', historySnapshot._id, JSON.stringify(historySnapshot), success);
		}

		dbUtil.writeDummyData = function(projectId, versionId, versionName, startDate, endDate, startValue, step) {

			console.log(log_ctrl + 'Writing dummy data..');
			var historySnapshot = {};
			historySnapshot._id = projectId + '_' + versionId;
			historySnapshot.docId = projectId + '_' + versionId;
			historySnapshot.projectId = projectId;
			historySnapshot.versionId = versionId;
			historySnapshot.versionName = versionName;
			historySnapshot.records = {};

      var startMoment = moment(startDate);
      var endMoment = moment(endDate);
      var number = startValue;

      for ( var dateMoment = startMoment; 
            dateMoment <= endMoment; 
            dateMoment.add('days', 1)
          ) {
          var date = dateMoment.format(timeStampFormat);

        	if (number > 35 || number < 30) {
						historySnapshot.records[date] = {};
						historySnapshot.records[date].value = number;
        	}

					var random = Math.round( Math.random()*step*2) - step;
					number = number - step + random;					
      };

			function success(data){
				console.log(log_ctrl + 'Document ' + historySnapshot._id + ' successfully saved to DB.');
			};

      dbRequest('PUT', historySnapshot._id, JSON.stringify(historySnapshot), success);
		}



	// Genric request
	// ------------------------------

		function dbRequest(type, urlParams, data, success, error) {
			console.log(log_ctrl + 'dbRequest..');
			var dbUri = 'http://speradze:5984/pmdash/' + urlParams;
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

  return dbUtil;
}]);
