  appModule.factory('IssueGrid', ['$rootScope', '$compile', 'Modals', function($rootScope, $compile, Modals) {

    var appData = $rootScope.data;
    var userSettings = $rootScope.settings.userSettings;
    var redmineSettings = $rootScope.settings.redmineSettings;

    var issueGridService = {};


    issueGridService.create = function (title, data) { 
      var modalScope = $rootScope.$new();
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

      Modals.genericModal(modalScope, htmlTemplate);

    }

    return issueGridService;
  }]);
