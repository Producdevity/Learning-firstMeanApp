angular
  .module('appRoutes', ['ngRoute'])
  .config(config);

function config ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'partials/home.html',
      // controller: 'MainController',
      // controllerAs: 'vm'
    })
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'MainController',
      controllerAs: 'vm'
    });
  // $routeProvider.when('/about', {templateUrl: 'partials/about.html', controller: 'aboutController'});
  // $routeProvider.when('/contact', {templateUrl: 'partials/contact.html', controller: 'contactController'});
  // $routeProvider.when('/projects', {templateUrl: 'partials/projects.html', controller: 'projectsController'});
  // $routeProvider.when('/projects/customerapi', {templateUrl: 'partials/projects/customerapi.html', controller: 'customerApiController'});
  // $routeProvider.when('/projects/chat', {templateUrl: 'partials/projects/chat.html', controller: 'chatController'});

  //if no valid routes are found, redirect to /home
  $routeProvider.otherwise({redirectTo: '/home'});

  $locationProvider.html5Mode({enabled: true, requireBase: false});

}
