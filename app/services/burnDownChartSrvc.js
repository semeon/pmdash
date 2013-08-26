  appModule.factory('BurnDownChart', ['$rootScope', '$compile', 'Modals', function($rootScope, $compile, Modals) {

    var appData = $rootScope.data;
    var userSettings = $rootScope.settings.userSettings;
    var redmineSettings = $rootScope.settings.redmineSettings;

    var chartService = {};


    chartService.create = function (project, version, data) { 

      var modalScope = $rootScope.$new(true);
      modalScope.title = 'Burndown chart: ' + project.title + ' / ' + version.name;
      modalScope.due_date = version.due_date;

      var chartData = {};
      chartData.labels = [];
      chartData.datasets = [];
      chartData.datasets[0] = {};
      chartData.datasets[0].data = [];
      chartData.datasets[0].fillColor =        "rgba(220,220,220,0.0)";
      chartData.datasets[0].strokeColor =      "rgba(220,220,220,1)";
      chartData.datasets[0].pointColor =       "rgba(220,220,220,1)";
      chartData.datasets[0].pointStrokeColor = "#fff";

      chartData.datasets[1] = {};
      chartData.datasets[1].data = [];
      chartData.datasets[1].fillColor =        "rgba(60,100,255,0.3)";
      chartData.datasets[1].strokeColor =      "rgba(60,100,255,1)";
      chartData.datasets[1].pointColor =       "rgba(60,100,255,1)";
      chartData.datasets[1].pointStrokeColor = "#eef";


      var yaxisMax = 0;
      var duration = 20;

      for (var i=1; i<duration; i++) {
        var date = '08.';
        if (i<10) {
          date += '0';
        }
        date += i;
        chartData.labels.push(date);

        if (data.records[date]) {
          var value = data.records[date].value;
          chartData.datasets[1].data.push(value);
          if(value > yaxisMax) yaxisMax = value;
        }
      }
      var yaxisStep = Math.round(yaxisMax/10);

      // Ideal line
      var idealStep = yaxisMax/ (duration-3) ;
      console.log('idealStep: ' + idealStep);

      var nextValue = yaxisMax;

      for (var j=1; j<duration; j++) {
        chartData.datasets[0].data.push(nextValue);
        nextValue = nextValue - idealStep;
      }

      modalScope.chartSettings =  {
                                    scaleOverride : true,
                                    scaleSteps: yaxisMax*1.1/yaxisStep,
                                    scaleStepWidth: yaxisStep,
                                    scaleStartValue: 0,
                                    scaleGridLineWidth: 1,
                                    bezierCurve : false
                                  };

      modalScope.data = chartData;



      // HTML
      var htmlTemplate = '';
        htmlTemplate += '<div class="modal fade" tabindex="-1">';
        htmlTemplate +=   '<div class="modal-dialog burndownModal">';
        htmlTemplate +=     '<div class="modal-content">';

        htmlTemplate +=       '<div class="modal-header">';
        htmlTemplate +=         '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
        htmlTemplate +=         '<h4 class="modal-title">{{title}}</h4>';
        htmlTemplate +=       '</div>';

        htmlTemplate +=       '<div class="modal-body">';
        htmlTemplate +=         '<div class="row">';
        htmlTemplate +=           '<div class="col-md-2">';
        htmlTemplate +=             'Version Due date: {{due_date}}';
        htmlTemplate +=           '</div>';
        htmlTemplate +=         '</div>';



        htmlTemplate +=         '<div class="row" style="min-height: 400px;">';
        htmlTemplate +=           '<div class="col-md-12">';
        htmlTemplate +=             '<chartjs ng-model="data"></chartjs>';
        htmlTemplate +=           '</div>';
        htmlTemplate +=         '</div>';
        htmlTemplate +=       '</div>';

        htmlTemplate +=       '<div class="modal-footer">';
        htmlTemplate +=         '<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>';
        htmlTemplate +=       '</div>';

        htmlTemplate +=     '</div>';
        htmlTemplate +=   '</div>';
        htmlTemplate += '</div>';

        Modals.genericModal(modalScope, htmlTemplate);
    }

    return chartService;
  }]);
