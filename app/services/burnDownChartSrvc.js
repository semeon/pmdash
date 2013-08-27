  appModule.factory('BurnDownChart', ['$rootScope', '$compile', 'Modals', function($rootScope, $compile, Modals) {

    var appData = $rootScope.data;
    var userSettings = $rootScope.settings.userSettings;
    var redmineSettings = $rootScope.settings.redmineSettings;

    var chartService = {};

    function Chart(data) {
        var yaxisMax = 0;
        var duration = 20;

        this.data = {};
        this.data.labels = [];
        this.data.datasets = [];
        this.data.datasets[0] = {};
        this.data.datasets[0].data = [];
        this.data.datasets[0].fillColor =        "rgba(220,220,220,0.0)";
        this.data.datasets[0].strokeColor =      "rgba(220,220,220,1)";
        this.data.datasets[0].pointColor =       "rgba(220,220,220,1)";
        this.data.datasets[0].pointStrokeColor = "#fff";

        this.data.datasets[1] = {};
        this.data.datasets[1].data = [];
        this.data.datasets[1].fillColor =        "rgba(60,100,255,0.3)";
        this.data.datasets[1].strokeColor =      "rgba(60,100,255,1)";
        this.data.datasets[1].pointColor =       "rgba(60,100,255,1)";
        this.data.datasets[1].pointStrokeColor = "#f0f0f0";


        // Push data
        for (var i=1; i<duration; i++) {
            var date = '08.';
            if (i<10) {
              date += '0';
            }
            date += i;
            this.data.labels.push(date);

            if (data.records[date]) {
                var value = data.records[date].value;
                this.data.datasets[1].data.push(value);
                if(value > yaxisMax) yaxisMax = value;
            }
        }

        // Update y Axis step according to data
        yaxisStep = Math.round(yaxisMax/10);

        // Push ideal line
        var idealStep = yaxisMax/ (duration-3);
        for (var j=0; j<duration; j++) {
            this.data.datasets[0].data.push(yaxisMax - idealStep*j);
        }

        // create settings
        this.settings = {
            scaleOverride: true,
            scaleSteps: yaxisMax*1.1/yaxisStep,
            scaleStepWidth: yaxisStep,
            scaleStartValue: 0,
            scaleGridLineWidth: 1,
            bezierCurve : false
        };
    }



    chartService.create = function (project, version, data) { 

        var chart = new Chart(data);

        var modalScope = $rootScope.$new(true);
        modalScope.title = 'Burndown chart: ' + project.title + ' / ' + version.name;
        modalScope.due_date = version.due_date;

        modalScope.data = chart.data;
        modalScope.chartSettings =  chart.settings;

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
