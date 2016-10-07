angular
.module('StoryController', ['StoryService'])
.controller('StoryController', function(Story, socketio){
  var vm = this;

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
        // vm.stories.push(data);
      });
  };

  socketio.on('story', function(data){
    vm.myStories.push(data);
  })

});
