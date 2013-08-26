  appModule.factory('Modals', ['$rootScope', '$compile', function($rootScope, $compile) {

    var modalService = {};

    // GENERIC MODAL
    modalService.genericModal = function (modalScope, htmlTemplate) {
      var modalDom = $compile(htmlTemplate)(modalScope);
      $(modalDom).modal();
    }

    return modalService;
  }]);
