angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state) {
  $scope.login = function(user) {
    console.log('Login: '+ user);

    $state.go('tab.home');
  };
})

.controller('HomeCtrl', function($scope, $timeout, Posts, Members) {

	$scope.refreshTasks = function() {
		console.log('Refreshing');
		
		$scope.posts = Posts.all();
		$scope.members = Members.all();
		
		$timeout(function() {
			$scope.$broadcast('scroll.refreshComplete');
		}, 1250);
	};

	$scope.refreshTasks();
	
})

.controller('PostsCtrl', function($scope, $state, $stateParams, Posts) {
  $scope.posts = Posts.posts || Posts.all();

  $scope.uploadPost = function(post) {
    console.log('upload post: ', post);
    Posts.add(post);
    $state.go('tab.posts');
  };

  $scope.create = function() {
	$state.post = null;
    $state.go('add-post');
  };

  $scope.allPosts = function() {
    $state.go('tab.posts');
  };
})

.controller('PostDetailCtrl', function($scope, $stateParams, Posts) {
	$scope.post = Posts.get($stateParams.postId);
})

.controller('ActivityCtrl', function($scope, Activity) {
  $scope.activity = Activity.all(); 
/*  $scope.remove = function(activity) {
    Activity.remove(activity);
  }*/
  console.log('Activity: '+JSON.stringify($scope.activity));
})

.controller('MembersCtrl', function($scope, Members) {
  $scope.members = Members.members || Members.all();
})

.controller('MemberDetailCtrl', function($scope, $stateParams, Members) {
  $scope.member = Members.get($stateParams.memberId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableEmail: true
  };
})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.chats || Chats.all();
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableEmail: true
  };
})

.controller('GallerySlideCtrl', function($scope) {
    
})

.controller('GalleryCtrl', function($scope, $ionicSlideBoxDelegate, Photos) {
  $scope.slides = Photos.all();
  $scope.slidebox = $ionicSlideBoxDelegate.$getByHandle('gallery');
  $scope.slidebox.stop();
    
  $scope.addSlide = function() {
    $scope.slides.push({});
    $scope.slidebox.update();
    $scope.slidebox.stop();
  };
})


