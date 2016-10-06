angular.module('NavController', [])

.controller('NavController', function($location){
  var vm = this;

  vm.isActive = function(destination){
    return destination === $location.path();
  }

});
