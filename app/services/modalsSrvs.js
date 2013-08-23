  appModule.factory('Modals', ['$http', '$rootScope', '$compile', function($http, $rootScope, $compile) {

    var appData = $rootScope.data;
    var userSettings = $rootScope.settings.userSettings;
    var redmineSettings = $rootScope.settings.redmineSettings;

    var modalService = {};


    // ISSUE GRID
    modalService.issuesGridModal = function ($scope, title, data) { 
      var modalScope = $scope.$new();
      modalScope.title = title;
      modalScope.issues = data;

      modalScope.getIssueUrl = function(issue) {
        var url = '';
        url = redmineSettings.redmineRealUrl + 
              redmineSettings.issuesRequestUrl + '/' + 
              issue.id;
        return url;
      }

      modalScope.getAssignee = function(issue) {
        var assignee = 'Nobody';
        if (issue.assigned_to) assignee = issue.assigned_to.name;
        issue.assigneeStr = assignee;
        return assignee;
      }

      modalScope.test = function() {
        return 'sdfs';
      }

      // HTML
      var htmlTemplate = '';
        htmlTemplate += '<div class="modal fade" tabindex="-1">';
        htmlTemplate +=   '<div class="modal-dialog issuesGridModal">';
        htmlTemplate +=     '<div class="modal-content">';

        htmlTemplate +=       '<div class="modal-header">';
        htmlTemplate +=         '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
        htmlTemplate +=         '<h4 class="modal-title">Issues: {{title}} ({{issues.length}})</h4>';
        htmlTemplate +=       '</div>';


        htmlTemplate +=       '<div class="modal-body">';

        htmlTemplate +=        '<div class="row">';
        htmlTemplate +=          '<div class="col-md-1 col-md-offset-5 header" style="padding-top: 4px;"><strong>Search:</strong></div>';
        htmlTemplate +=          '<div class="col-md-2"><input type="search" class="form-control input-sm" ng-model="query" placeholder="Type to search"></div>';

        htmlTemplate +=          '<div class="col-md-2 header" style="padding-top: 4px;"><strong class="pull-right">Order by:</strong></div>';
        htmlTemplate +=          '<div class="col-md-2">';
        htmlTemplate +=            '<select class="form-control input-sm" ng-model="orderProp">';
        htmlTemplate +=              '<option value="id" ng-selected="' +  "'selected'"  +  '">Number</option>';
        htmlTemplate +=              '<option value="tracker.name">Tracker</option>';
        htmlTemplate +=              '<option value="status.name">Status</option>';
        htmlTemplate +=              '<option value="subject">Subject</option>';
        htmlTemplate +=              '<option value="assigneeStr">Assignee</option>';
        htmlTemplate +=            '</select>';
        htmlTemplate +=          '</div>';
        htmlTemplate +=        '</div>';

        htmlTemplate +=        '<br/>';

        htmlTemplate +=         '<table class="table table-bordered table-striped table-condensed table-hover" id="issuesGrid">';
        htmlTemplate +=             '<thead>';
        htmlTemplate +=                 '<th>#</th>';
        htmlTemplate +=                 '<th>Status</th>';
        htmlTemplate +=                 '<th>Tracker</th>';
        htmlTemplate +=                 '<th>Subject</th>';
        htmlTemplate +=                 '<th>Assignee</th>';
        htmlTemplate +=             '</thead>';
        htmlTemplate +=             '<tbody>';

        htmlTemplate +=         '<tr ng-repeat="issue in issues | filter:query | orderBy:orderProp">';
        htmlTemplate +=             '<td>';
        htmlTemplate +=                 '<a href="{{getIssueUrl(issue)}}" target="_blank">';
        htmlTemplate +=                     '#{{issue.id}}';
        htmlTemplate +=                 '</a>';
        htmlTemplate +=             '</td>';
        htmlTemplate +=             '<td>{{issue.status.name}}</td>';
        htmlTemplate +=             '<td>{{issue.tracker.name}}</td>';
        htmlTemplate +=             '<td class="align-left">{{issue.subject}}</td>';


        htmlTemplate +=             '<td>{{getAssignee(issue)}}</td>';
        htmlTemplate +=         '</tr>';

        htmlTemplate +=             '<tbody>';
        htmlTemplate +=         '</table>';

        htmlTemplate +=       '</div>';

        htmlTemplate +=       '<div class="modal-footer">';
        htmlTemplate +=         '<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>';
        htmlTemplate +=       '</div>';

        htmlTemplate +=     '</div>';
        htmlTemplate +=   '</div>';
        htmlTemplate += '</div>';

      var modalDom = $compile(htmlTemplate)(modalScope);
      $(modalDom).modal();
    }


    // BURNDOWN GRID
    modalService.burndownModal = function ($scope, version, data) { 
      var modalScope = $scope.$new();
      modalScope.title = 'Burndown chart: ' + version.name;


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

      var modalDom = $compile(htmlTemplate)(modalScope);
      $(modalDom).modal();
    }


    return modalService;
  }]);
