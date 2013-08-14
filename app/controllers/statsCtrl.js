function StatsCtrl($scope, $rootScope, ProjectDataLoader) {
    var log_ctrl = ' - StatsCtrl: ';
    console.log('');
    console.log('StatsCtrl Controller started');

  	var appData = $rootScope.data;
    var userSettings = $rootScope.settings.userSettings;
    var redmineSettings = $rootScope.settings.redmineSettings;

    $scope.projects = appData.projects;


    $scope.convertDueDate = function(dueDate) {
      var dueStr = dueDate;
      if (dueStr == undefined) dueStr = 'No Date';
      return dueStr;
    }

    $scope.getTrackerName = function(trackerId) {
      var trackerName = '';
      trackerName = redmineSettings.issueTrackersMap[String(trackerId)].name;
      return trackerName;
    }

    $scope.versionReloadClick = function(project, version) {
      console.log(log_ctrl + 'versionReloadClick: ' + project.id + ' ' + version.name);
      version.reset();

      ProjectDataLoader.loadVersionIssuesData(project, version);
    }





}
