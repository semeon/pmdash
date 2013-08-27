  appModule.factory('BurnDownChart', ['$rootScope', '$compile', 'Modals', function($rootScope, $compile, Modals) {

    var appData = $rootScope.data;
    var userSettings = $rootScope.settings.userSettings;
    var redmineSettings = $rootScope.settings.redmineSettings;

    var chartService = {};



    function resetChartData() {
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
        chartData.datasets[1].pointStrokeColor = "#f0f0f0";

        return chartData;
    }


    chartService.create = function (project, version, data) { 

        var chartData = resetChartData();
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
        var idealStep = yaxisMax/ (duration-3);

        var nextValue = yaxisMax;

        for (var j=1; j<duration; j++) {
            chartData.datasets[0].data.push(nextValue);
            nextValue = nextValue - idealStep;
        }



        var modalScope = $rootScope.$new(true);
        modalScope.title = 'Burndown chart: ' + project.title + ' / ' + version.name;
        modalScope.due_date = version.due_date;
        modalScope.data = chartData;
        modalScope.chartSettings =  {
            scaleOverride : true,
            scaleSteps: yaxisMax*1.1/yaxisStep,
            scaleStepWidth: yaxisStep,
            scaleStartValue: 0,
            scaleGridLineWidth: 1,
            bezierCurve : false
        };

        var modalTitle = 'Burndown chart: ' + project.title + ' / ' + version.name;
        var modalBody = '';
        modalBody += '<div class="row" style="min-height: 400px;">';
        modalBody +=    '<div class="col-md-12">';
        modalBody +=        '<chartjs></chartjs>';
        modalBody +=    '</div>';
        modalBody += '</div>';

        console.log('modalScope.title: ' + modalScope.title);

        Modals.genericModal(modalScope, modalTitle, modalBody);
    }

    return chartService;
  }]);
