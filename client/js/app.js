angular
  .module('myApp', [
    'appRoutes',
    'ngResource',
    'ngAnimate',
    'ui.bootstrap',
    'btford.socket-io',
    'SocketFactory',
    'NavController',
    'MainController',
    'UserController',
    'StoryController',
    'AuthService',
    'UserService',
    'StoryService'
  ])

  .config(config);

  function config ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  }
