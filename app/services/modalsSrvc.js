  appModule.factory('Modals', ['$rootScope', '$compile', function($rootScope, $compile) {

    var modalService = {};


    // GENERIC MODAL
    modalService.genericModal = function (modalScope, titleString, bodyHtml) {

      var modalTemplate = '';
      modalTemplate += '<div class="modal fade" tabindex="-1">';
      modalTemplate +=   '<div class="modal-dialog burndownModal">';
      modalTemplate +=     '<div class="modal-content">';
      modalTemplate +=       '<div class="modal-header">';
      modalTemplate +=         '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
      modalTemplate +=         '<h4 class="modal-title">' + titleString + '</h4>';
      modalTemplate +=       '</div>';
      modalTemplate +=       '<div class="modal-body">';
      modalTemplate +=          bodyHtml;
      modalTemplate +=       '</div>';
      modalTemplate +=       '<div class="modal-footer">';
      modalTemplate +=         '<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>';
      modalTemplate +=       '</div>';
      modalTemplate +=     '</div>';
      modalTemplate +=   '</div>';
      modalTemplate += '</div>';

      // console.log('MODALS Servise: modalScope: ');
      // console.log(modalScope);
      // console.log(modalScope.due_date);

      var modalDom = $compile(modalTemplate)(modalScope);
      $(modalDom).modal();
    }


    return modalService;
  }]);
