  appModule.factory('Modals', ['$http', '$compile', function($http, $compile) {

    var modalService = {};

    modalService.issuesGridModal = function ($scope, data) { 
      var modalScope = $scope.$new();
      modalScope.data = data;

      var htmlTemplate = '';
      htmlTemplate += '<div class="modal fade" tabindex="-1">';
      htmlTemplate +=   '<div class="modal-dialog">';
      htmlTemplate +=     '<div class="modal-content">';

      htmlTemplate +=       '<div class="modal-header">';
      htmlTemplate +=         '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
      htmlTemplate +=         '<h4 class="modal-title">Modal title</h4>';
      htmlTemplate +=       '</div>';


      htmlTemplate +=       '<div class="modal-body">';
      htmlTemplate +=       '{{data}}';
      htmlTemplate +=       '</div>';

      htmlTemplate +=       '<div class="modal-footer">';
      htmlTemplate +=         '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
      htmlTemplate +=       '</div>';

      htmlTemplate +=     '</div>';
      htmlTemplate +=   '</div>';
      htmlTemplate += '</div>';

      var modalDom = $compile(htmlTemplate)(modalScope);
      $(modalDom).modal();
    }


    return modalService;
  }]);


    //   var dscope = $scope.$new();
    //   dscope.test = "Heyyyy";
    //   var ddom = $compile('<div class="modal fade" tabindex="-1"><div class="modal-dialog"><div class="modal-content">{{test}}</div></div></div>')(dscope);
    //   $(ddom).modal();
    // }