angular
  .module('myApp', [
    'appRoutes',
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
