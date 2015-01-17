angular.module('starter.services', [])

.service('API', function($http, url, params){
	var result;
	return $http({
		all: {
			url: 'http://localhost:3000/'+url,
			headers: {
//				'Authorization': 'Basic dGVzdDp0ZXN0',
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			method: 'GET',
			data: params
		},
		get: {
			url: 'http://localhost:3000/'+url,
			headers: {
//				'Authorization': 'Basic dGVzdDp0ZXN0',
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			method: 'GET',
			data: params
		},
		post: {
			url: 'http://localhost:3000/'+url,
			headers: {
//				'Authorization': 'Basic dGVzdDp0ZXN0',
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			method: 'POST',
			data: params
		},
		update: {
			url: 'http://localhost:3000/'+url,
			headers: {
//				'Authorization': 'Basic dGVzdDp0ZXN0',
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			method: 'PUT',
			data: params
		},
		delete: {
			url: 'http://localhost:3000/'+url,
			headers: {
//				'Authorization': 'Basic dGVzdDp0ZXN0',
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			method: 'DELETE',
			data: params
		}
	});
})

.service('Posts', function() {

  var posts = [{
    id: 0,
    name: 'Looking for a House Sitter',
    logo: 'img/marine badge.jpg',
    description: 'Need someone to house sit and look after our pets for 3 weeks during March, 3rd until March 28th 2015. Please contact me for more details urgently.'
  }, {
    id: 1,
    name: 'Job Opening',
    description: 'Position available for experienced Security Card. PM me for details',
    logo: 'img/marine badge.jpg'
  }, {
    id: 2,
    name: 'Bank Holiday Weekend Drinks & Reunion',
    description: 'Drinks next Friday at the Brass Bell. All Welcome',
    logo: 'img/marine badge.jpg'
  }];

  return {
    all: function() {
      return posts;
    },
    add: function(post) {
		var proto = {
	    	logo: 'img/marine badge.jpg'
    	};
		proto.id = posts.length+99;
		proto.name = post.name;
		proto.description = post.description;
		posts.push( proto );
	},
    remove: function(post) {
      posts.splice(posts.indexOf(post), 1);
    },
    get: function(postId) {
      for (var i = 0; i < posts.length; i++) {
        if (posts[i].id === parseInt(postId)) {
          return posts[i];
        }
      }
      return null;
    }
  }
})


/**
 * A simple example service that returns some data.
 */
.service('Members', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var members = [{
    id: 0,
    name: 'Steve Messina',
    face: 'https://m.ak.fbcdn.net/sphotos-d.ak/hphotos-ak-prn2/v/t1.0-9/548511_10150786996461451_825119123_n.jpg?oh=95d2790098b96c7d5f4f58eb64539841&oe=5530F763&__gda__=1429419977_4182714ba3b1c5285ecbd420c7dd487a',
    rank: 'AB',
    email: 'steve.g.messina@gmail.com',
    phone: '+852 6390 8102',
    twitter: '@steve_messina',
    location: 'Hong Kong',
    job: 'CTO'
  }, {
    id: 1,
    name: 'Campbell Cooke',
    face: 'https://scontent-b-sin.xx.fbcdn.net/hphotos-xap1/v/t1.0-9/14827_1412363912344201_683371243_n.jpg?oh=469fdb48268827a3c2f9959dd2f6e17c&oe=55255707',
    rank: 'CPO',
    email: 'campbell@campbellcooke.net',
    phone: '+1 918-960-3400',
    twitter: '',
    location: 'Tulsa, Oklahoma',
    job: 'Lawyer'
  }, {
    id: 2,
    name: 'Roscoe van Muylwyk',
    face: 'https://m.ak.fbcdn.net/sphotos-a.ak/hphotos-ak-xpa1/v/t1.0-9/10347769_10203573606675042_606197871315383518_n.jpg?oh=594ddfc43aa03879f1d05711291bde17&oe=552E2179&__gda__=1433273363_90f145106a6c8bf9c4f48b8c30720db5',
    rank: 'LtCdr',
    email: 'roscoevm@outlook.com',
    phone: '+1 7176790878',
    twitter: '',
    location: 'Location: Pennsylvania, USA (GMT -5)',
    job: 'Project Manager'
  }, {
    id: 3,
    name: 'Gerald Males',
    face: 'https://scontent-b-sin.xx.fbcdn.net/hphotos-xap1/v/t1.0-9/1380201_10201060621156124_5836470009484186819_n.jpg?oh=cff0a9ca04583d8e4f662b3c9f5de907&oe=553390D0',
    rank: 'AB',
    email: 'malesgerald@gmail.com',
    phone: '',
    twitter: '',
    location: 'Cape Town, South Africa',
    job: 'Manager'
  }];


  return {
    all: function() {
      return members;
    },
    get: function(memberId) {
      // Simple index lookup
      return members[memberId];
    }
  }
})

/**
 * A simple example service that returns some data.
 */
.service('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Steve Messina',
    face: 'https://m.ak.fbcdn.net/sphotos-d.ak/hphotos-ak-prn2/v/t1.0-9/548511_10150786996461451_825119123_n.jpg?oh=95d2790098b96c7d5f4f58eb64539841&oe=5530F763&__gda__=1429419977_4182714ba3b1c5285ecbd420c7dd487a',
    discussion: []
  }, {
    id: 1,
    name: 'Campbell Cooke',
    face: 'https://scontent-b-sin.xx.fbcdn.net/hphotos-xap1/v/t1.0-9/14827_1412363912344201_683371243_n.jpg?oh=469fdb48268827a3c2f9959dd2f6e17c&oe=55255707',
    discussion: []
  }];


  return {
    all: function() {
      return chats;
    },
    get: function(chatId) {
      // Simple index lookup
      return chats[chatId];
    }
  }
})

/**
 * A simple example service that returns some data.
 */
.service('Photos', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var photos = [
	{ id: 0, image: '../img/marine braai.jpg' },
	{ id: 1, image: '../img/marine clothing.jpg' },
	{ id: 2, image: '../img/marine dekking.jpg' },
	{ id: 3, image: '../img/marine honour roll.jpg' },
	{ id: 4, image: '../img/marines belt and badges.JPG' }
 ];


  return {
    all: function() {
      return photos;
    },
    get: function(photoId) {
      // Simple index lookup
      return photos[photoId];
    }
  }
})

/**
 * A simple example service that returns some data.
 */
.service('Activity', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var activity = [{
    id: 0,
    date: 'December 30, 2014 11:15:00',
    post: 2
  }, {
    id: 1,
    date: 'January 03, 2015 17:30:00',
	post: 1
  }];


  return {
    all: function() {
      return activity;
    },
    get: function(activityId) {
      // Simple index lookup
      return activity[activityId];
    }
  }
})



