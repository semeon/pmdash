function StatsCtrl($scope, $rootScope, ProjectDataLoader, Modals, DB) {
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

    $scope.versionHideClick = function(version) {
      if (version.hidden == undefined) {
        version.hidden = true;
      } else {
        version.hidden = !version.hidden;
      }
    }

    $scope.versionExpandClick = function(version) {
      if (version.expanded == undefined) {
        version.expanded = true;
      } else {
        version.expanded = !version.expanded;
      }
      console.log(log_ctrl + 'version.hidden: ' + version.hidden);
    }

    $scope.saveSnaphotClick = function (project, version) {
      DB.updateVersionHistory(project, version);
    }

    $scope.getBurndownClick = function (project, version) {
      DB.getVersionHistory(project, version, $scope, Modals.burndownModal);
    }


    $scope.openIssuesGrid = function (title, data) {
      Modals.issuesGridModal($scope, title, data);
    }



}


