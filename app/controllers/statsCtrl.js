function StatsCtrl($scope, $rootScope, ProjectDataLoader, Modals) {
    var log_ctrl = ' - StatsCtrl: ';
    console.log('');
    console.log('StatsCtrl Controller started');

  	var appData = $rootScope.data;
    var userSettings = $rootScope.settings.userSettings;
    var redmineSettings = $rootScope.settings.redmineSettings;

    $scope.projects = appData.projects;
    $scope.issueGridTemplate = 'app/views/_issueGrid.html';


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

    $scope.getModalId = function (project, version, str) {
      var id = 'modal_' +  project.id + '_' + version.id + '_' + str;
      return id;
    }



    // $scope.openModal = function (data) {

    //   Modals.issuesGridModal(data);




    $scope.openModal = function (body) {

      Modals.issuesGridModal($scope, body);

    }

}


