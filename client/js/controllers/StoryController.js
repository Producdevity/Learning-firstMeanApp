angular
.module('StoryController', [])
.controller('StoryController', function(Story, Socket){
  var vm = this;

  Socket.connect();

  Story.get()
    .success(function(data){
      vm.myStories = data;
    });

  Story.all()
    .success(function(data){
      vm.stories = data;
    });

  vm.createStory = function(){
    vm.processing = false;
    vm.message = '';
    Story.create(vm.storyData)
      .success(function(data){
        vm.processing = false;
        vm.storyData = {};
        vm.message = data.message;
        // vm.myStories.push(data);
      });
  };

  Socket.on('story', function(data){
    vm.myStories.push(data);
  })


});
