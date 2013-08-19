var appModule = angular.module('appModule', []);

appModule.config(['$routeProvider', function($routeProvider, $locationProvider) {

  $routeProvider.
      when('/welcome', {templateUrl: 'app/views/welcome.html',   controller: DataLoadCtrl}).
      when('/main', {templateUrl: 'app/views/main.html',   controller: MainCtrl}).
      otherwise({redirectTo: '/welcome'});

}]);

