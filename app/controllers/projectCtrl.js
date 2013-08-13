function ProjectCtrl($scope, $rootScope, ProjectDataLoader) {
    var log_ctrl = ' - ProjectCtrl: ';
    console.log('');
    console.log('ProjectCtrl Controller started');

  	var appData = $rootScope.data;
    var userSettings = $rootScope.settings.userSettings;
    var redmineSettings = $rootScope.settings.redmineSettings;

    $scope.projects = appData.projects;

    $scope.projectClick = function(project) {
      console.log(log_ctrl + 'Project button click: ' + project.id);
      ProjectDataLoader.loadProjectData(project.id);

    }

}
