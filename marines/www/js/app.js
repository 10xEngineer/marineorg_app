// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
	setTimeout(function() {
			if( navigator && navigator.splashscreen )
	        	navigator.splashscreen.hide();
	    }, 2000);
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  });
})

.config(function($stateProvider, $httpProvider, $urlRouterProvider) {

	//$httpProvider.defaults.useXDomain = true;
	//delete $httpProvider.defaults.headers.common['X-Requested-With'];

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('login', {
    url: "/login",
	templateUrl: "templates/login.html",
	controller: 'LoginCtrl'
  })
  .state('forgot.password', {
    url: "/forgot",
    views: {
		'forgot': {
			templateUrl: "templates/forgot-password.html",
		}
	}
  })

  .state('add-post', {
      url: '/add-post',
      templateUrl: 'templates/add-post.html',
      controller: 'PostsCtrl'
    })

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('tab.posts', {
      url: '/posts',
      views: {
        'tab-posts': {
          templateUrl: 'templates/tab-posts.html',
          controller: 'PostsCtrl'
        }
      }
    })
    .state('tab.post-detail', {
      url: '/posts/:postId',
      views: {
        'tab-posts': {
          templateUrl: 'templates/post-detail.html',
          controller: 'PostDetailCtrl'
        }
      }
    })

  .state('tab.members', {
      url: '/members',
      views: {
        'tab-members': {
          templateUrl: 'templates/tab-members.html',
          controller: 'MembersCtrl'
        }
      }
    })
    .state('tab.member-detail', {
      url: '/members/:memberId',
      views: {
        'tab-members': {
          templateUrl: 'templates/member-detail.html',
          controller: 'MemberDetailCtrl'
        }
      }
    })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })


  .state('tab.photos', {
      url: '/photos',
      views: {
        'tab-photos': {
          templateUrl: 'templates/tab-photos.html',
          controller: 'GalleryCtrl'
        }
      }
    })

  .state('tab.activity', {
      url: '/activity',
      views: {
        'tab-activity': {
          templateUrl: 'templates/tab-activity.html',
          controller: 'ActivityCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('login');

})

.directive('noScroll', function($document) {
  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
})

.directive('pgZoom', function($document) {
  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      console.log($attr);
      var $window = angular.element(window);
      var eventPoint;
      var lastEventPoint;
      var target = $element;
      var parent = $element.parent();
      
      $scope.style = {};
      $scope.rect = {};
      
      var calculateBounds = function() {
        $scope.bounds = Rectangle(Point(parent[0].offsetLeft, parent[0].offsetTop), Size(parent[0].offsetWidth, parent[0].offsetHeight));
        $scope.rect = Rectangle(Point(0, 0), Size($element[0].clientWidth, $element[0].clientHeight));
        var ix = $scope.bounds.size.divide($scope.rect.size);
        var mix = Math.min(ix.width, ix.height);
        $scope.size = Size($element[0].clientWidth, $element[0].clientHeight);
        $scope.minScale = Size(mix, mix);
        $scope.scale = mix;
        $scope.rect.setCenter($scope.bounds.getCenter());
        $scope.topLeft = $scope.rect.topLeft;
        $scope.clamp = $scope.rect.topLeft.clone();
        $scope.clampRect = new Rectangle($scope.clamp, $scope.rect.size);
        $scope.$apply();
      };
      $element.on('load', calculateBounds);
      $window.on('resize', calculateBounds);
      
      $element.on('dragstart', function(event){
        // event.preventDefault();
        console.log(event);
        if (!event.gesture)
          return;
        
        $scope.$apply(function(){
          $scope.start = $scope.topLeft.clone();
        });
      });
      $element.on('drag', function(event){
        // event.preventDefault();
        console.log(event);
        if (!event.gesture)
          return;
        
        $scope.$apply(function () {
          $scope.topLeft = $scope.start.add(Point(event.gesture.deltaX, event.gesture.deltaY));
        });
      });
      $element.on('mousewheel', function(event){
        //event.preventDefault();

        console.log(event);
        var wheelDelta = clamp(event.wheelDelta, -1, 1);
        var scale = clamp(($scope.scale || 1) + wheelDelta * 0.1, Math.min($scope.minScale.height, $scope.minScale.width), 5);
        var zoomPoint = Point(event.clientX, event.clientY).subtract($scope.bounds.getCenter()).multiply(scale - $scope.scale).multiply(scale);
        $scope.$apply(function(){
          $scope.scale = scale;
          $scope.topLeft = $scope.topLeft.subtract(zoomPoint);
        });
      });
      
      $scope.$watch('topLeft', function (val, valn) {
        if (val === null || val === valn) {
          return;
        }
        val = clampPoint(val, $scope.clampRect.topLeft, $scope.clampRect.getBottomRight());
        $scope.rect.topLeft = val;
        $scope.style.translate = 'translate(' + val.x + 'px,' + val.y + 'px)';
      });
      $scope.$watch('scale', function (val, valn) {
        if (val == Infinity || valn === val) {
          return;
        }
        console.log('scale', val);
        $scope.rect.size = $scope.size.multiply(val);
        var extra = $scope.bounds.size.subtract($scope.rect.size);
        extra.width = Math.min(extra.width, 0);
        extra.height = Math.min(extra.height, 0);
        $scope.clampRect.size = extra.abs();
        $scope.clampRect.topLeft = Point($scope.clamp.x + extra.width / 2, $scope.clamp.y + extra.height / 2);
        $scope.style.scale = 'scale(' + val + ')';
      });
      $scope.$watch('style', function (val, valn) {
        if (val === null || val === valn) {
          return;
        }
        target[0].style.WebkitTransform = [
          val.translate,
          val.scale
        ].join(' ');
      }, true);
    },
  };
});

