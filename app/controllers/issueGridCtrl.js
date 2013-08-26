function IssueGridCtrl($scope, $rootScope, Modals) {
	var log_ctrl = ' - IssueGridCtrl: ';
	console.log('');
	console.log('IssueGridCtrl Controller started');

	$scope.data = 'WWWWWWWWWWW';


  $scope.openIssuesGrid = function (title, data) {
    Modals.issuesGridModal($scope, title, data);
  }


}
