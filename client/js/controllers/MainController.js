angular.module('MainController', [])

.controller('MainController', function($rootScope, $location, Auth){
  var vm = this;
  vm.loggedIn = Auth.isLoggedIn();
  console.log(Auth.isLoggedIn());
  console.log(vm.loggedIn);

  $rootScope.$on('$routeChangeStart', function(){
    vm.loggenId = Auth.isLoggedIn();
    Auth.getUser()
      .then(function(data){
        vm.user = data.data;
        console.log(data);
        console.log(data.data);
      });
  });

  vm.doLogin = function(){
    vm.processing = true;
    vm.error = '';
    Auth.login(vm.loginData.username, vm.loginData.password)
      .success(function(data){
        console.log('doLogin success');
        vm.processing = false;
        Auth.getUser()
          .then(function(data){
            vm.user = data.data;
            console.log(data.data);
          });
        if(data.success)
          $location.path('/');
        else
          vm.error = data.message;
      });
  }

  vm.doLogout = function(){
    Auth.logout();
    $location.path('/logout');
  }

});
