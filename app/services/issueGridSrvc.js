  appModule.factory('IssueGrid', ['$rootScope', '$compile', 'Modals', function($rootScope, $compile, Modals) {

    var appData = $rootScope.data;
    var userSettings = $rootScope.settings.userSettings;
    var redmineSettings = $rootScope.settings.redmineSettings;

    var issueGridService = {};


    issueGridService.create = function (title, data) { 
        var modalScope = $rootScope.$new(true);
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

        var modalTitle = title + ' (' + data.length + ')';
        var modalBody = '';
            modalBody +=        '<div class="row">';
            modalBody +=          '<div class="col-md-1 col-md-offset-5 header" style="padding-top: 4px;"><strong>Search:</strong></div>';
            modalBody +=          '<div class="col-md-2"><input type="search" class="form-control input-sm" ng-model="query" placeholder="Type to search"></div>';

            modalBody +=          '<div class="col-md-2 header" style="padding-top: 4px;"><strong class="pull-right">Order by:</strong></div>';
            modalBody +=          '<div class="col-md-2">';
            modalBody +=            '<select class="form-control input-sm" ng-model="orderProp">';
            modalBody +=              '<option value="id" ng-selected="' +  "'selected'"  +  '">Number</option>';
            modalBody +=              '<option value="tracker.name">Tracker</option>';
            modalBody +=              '<option value="status.name">Status</option>';
            modalBody +=              '<option value="subject">Subject</option>';
            modalBody +=              '<option value="assigneeStr">Assignee</option>';
            modalBody +=            '</select>';
            modalBody +=          '</div>';
            modalBody +=        '</div>';

            modalBody +=        '<br/>';

            modalBody +=         '<table class="table table-bordered table-striped table-condensed table-hover" id="issuesGrid">';
            modalBody +=             '<thead>';
            modalBody +=                 '<th>#</th>';
            modalBody +=                 '<th>Status</th>';
            modalBody +=                 '<th>Tracker</th>';
            modalBody +=                 '<th>Subject</th>';
            modalBody +=                 '<th>Assignee</th>';
            modalBody +=             '</thead>';
            modalBody +=             '<tbody>';

            modalBody +=         '<tr ng-repeat="issue in issues | filter:query | orderBy:orderProp">';
            modalBody +=             '<td>';
            modalBody +=                 '<a href="{{getIssueUrl(issue)}}" target="_blank">';
            modalBody +=                     '#{{issue.id}}';
            modalBody +=                 '</a>';
            modalBody +=             '</td>';
            modalBody +=             '<td>{{issue.status.name}}</td>';
            modalBody +=             '<td>{{issue.tracker.name}}</td>';
            modalBody +=             '<td class="align-left">{{issue.subject}}</td>';


            modalBody +=             '<td>{{getAssignee(issue)}}</td>';
            modalBody +=         '</tr>';

            modalBody +=             '<tbody>';
            modalBody +=         '</table>';

        Modals.genericModal(modalScope, modalTitle, modalBody);

    }

    return issueGridService;
  }]);
