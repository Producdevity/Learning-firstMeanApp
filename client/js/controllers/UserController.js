angular.module('UserController', ['UserService'])

.controller('UserController', function(User, $location, $window){
  var vm = this;
vm.testvar = 'fdsdsf';

  User.all()
    .success(function(data){
      vm.users = data;
    });

  vm.signupUser = function(){
    console.log('signupUser in userctrl');
    vm.message = '';
      User.create(vm.userData)
        .then(function(response){
          vm.userData = {};
          vm.message = response.data.message;

          $window.localStorage.setItem('token', response.data.token);
          $location.path('/');
        });
  }

});