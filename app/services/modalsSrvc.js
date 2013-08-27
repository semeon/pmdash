  appModule.factory('Modals', ['$rootScope', '$compile', function($rootScope, $compile) {

    var modalService = {};

    var modalTemplate_part1 = '';
    modalTemplate_part1 += '<div class="modal fade" tabindex="-1">';
    modalTemplate_part1 +=   '<div class="modal-dialog burndownModal">';
    modalTemplate_part1 +=     '<div class="modal-content">';
    modalTemplate_part1 +=       '<div class="modal-header">';
    modalTemplate_part1 +=         '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
    modalTemplate_part1 +=         '<h4 class="modal-title">{{title}}</h4>';
    modalTemplate_part1 +=       '</div>';
    modalTemplate_part1 +=       '<div class="modal-body">';

    var modalTemplate_part2 = '';
    modalTemplate_part2 +=       '</div>';
    modalTemplate_part2 +=       '<div class="modal-footer">';
    modalTemplate_part2 +=         '<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>';
    modalTemplate_part2 +=       '</div>';
    modalTemplate_part2 +=     '</div>';
    modalTemplate_part2 +=   '</div>';
    modalTemplate_part2 += '</div>';


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

      console.log('modalScope: ');
      console.log(modalScope);

      var modalDom = $compile(modalTemplate)(modalScope);
      $(modalDom).modal();
    }




    return modalService;
  }]);
