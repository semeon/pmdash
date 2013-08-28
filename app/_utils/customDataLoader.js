appModule.factory('DBUtil', ['$http', '$rootScope', function($http, $rootScope) {

    var log_ctrl = ' - DBUtil: ';
    var timeStampFormat = 'YYYY-MM-DD';
    var dbUtil = {};

	// ---------------------------------------------------------------------
	// MAIN SCRIPT
	// ---------------------------------------------------------------------

		dbUtil.runScript = function (){


			dbUtil.writeDummyData( 'pkserver', '462', '0.4', '2013-07-22', '2013-08-15', 40, 1);

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
			var dbUri = 'http://speradze:5984/db/' + urlParams;
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
