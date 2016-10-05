(function(){

  angular
       .module('aaapp')
       .controller('xMainController', [
       '$rootScope', '$location', 'Auth',
          xMainController
       ]);

  function MainController($rootScope, $location, Auth, $rootScope) {
    var vm = this;

    vm.menuItems = [ ];
    vm.selectItem = selectItem;

    navService
      .loadAllItems()
      .then(function(menuItems) {
        vm.menuItems = [].concat(menuItems);
      });

    function toggleRightSidebar() {
        $mdSidenav('right').toggle();
    }

    function toggleItemsList() {
      var pending = $mdBottomSheet.hide() || $q.when(true);

      pending.then(function(){
        $mdSidenav('left').toggle();
      });
    }




  }

})();
