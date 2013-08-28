var appModule = angular.module('appModule', []);

appModule.config(['$routeProvider', function($routeProvider, $locationProvider) {

  $routeProvider.
      when('/welcome', {templateUrl: 'app/views/welcome.html',   controller: DataLoadCtrl}).
      when('/main', {templateUrl: 'app/views/main.html',   controller: MainCtrl}).
      otherwise({redirectTo: '/welcome'});

}]);

appModule.directive('chartjs', function() {
    return {
        restrict: 'E',
        link: function(scope, elem, attrs) {
            var chartData = scope.data;
            var chartSettings = scope.chartSettings;

            var canv = $('<canvas id="myChart" width="1000" height="500"></canvas>');
            $(elem).append(canv);
            var ctx = canv.get(0).getContext("2d");
            var myNewChart = new Chart(ctx);

            new Chart(ctx).Line(chartData, chartSettings);
            elem.show();
        }
    };
});