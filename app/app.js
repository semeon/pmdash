var appModule = angular.module('appModule', []);

appModule.config(['$routeProvider', function($routeProvider, $locationProvider) {

  $routeProvider.
      when('/welcome', {templateUrl: 'app/views/welcome.html',   controller: DataLoadCtrl}).
      when('/main', {templateUrl: 'app/views/main.html',   controller: MainCtrl}).
      otherwise({redirectTo: '/welcome'});

}]);

appModule.directive('chart', function() {
    return {
        restrict: 'E',
        link: function(scope, elem, attrs) {
            var data = scope[attrs.ngModel];
            $.plot(elem, data, {
                                  series: {
                                      lines: { show: true },
                                      points: { show: true }
                                  },
                                  xaxis: {mode: "categories"},
                                  grid: {
                                          show: true,
                                          backgroundColor: { colors: [ "#fff", "#eee" ] },
                                          borderWidth: {
                                            top: 1,
                                            right: 1,
                                            bottom: 2,
                                            left: 2
                                          }
                                        }
                              });
            elem.show();
        }
    };
});

appModule.directive('chartjs', function() {
    return {
        restrict: 'E',
        link: function(scope, elem, attrs) {
            var data = scope[attrs.ngModel];
            var chartSettings = scope.chartSettings;

            var canv = $('<canvas id="myChart" width="1000" height="400"></canvas>');
            $(elem).append(canv);
            var ctx = canv.get(0).getContext("2d");
            var myNewChart = new Chart(ctx);

            new Chart(ctx).Line(data, chartSettings);
            elem.show();
        }
    };
});