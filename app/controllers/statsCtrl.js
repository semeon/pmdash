function StatsCtrl($scope, $rootScope, ProjectDataLoader, IssueGrid, DB) {
    var log_ctrl = ' - StatsCtrl: ';
    console.log('');
    console.log('StatsCtrl Controller started');

  	var appData = $rootScope.data;
    var userSettings = $rootScope.settings.userSettings;
    var redmineSettings = $rootScope.settings.redmineSettings;
    var appSettings = $rootScope.settings.appSettings;

    $scope.burndownsOn = appSettings.statistics;

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


    // BUTTONS
    // ---------------------------

      $scope.projectHideClick = function(project) {
        if (project.hidden == undefined) {
          project.hidden = true;
        } else {
          project.hidden = !project.hidden;
        }
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
        // DB.getVersionHistory(project, version, $scope, Modals.burndownModal);
        DB.getVersionHistory(project, version);
      }


      $scope.fillDB = function(project, version) {
        console.log(log_ctrl + 'Fill DB called');
        DB.writeDummyData(project, version);
      }

    // Grid links
    // -------------------------------

      $scope.openIssuesGrid = function (title, data) {

        IssueGrid.create(title, data);

        //Modals.issuesGridModal($scope, title, data);
      }





}


