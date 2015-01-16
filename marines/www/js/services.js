function generateRandomPortfolio(howMany, factor) {
    var allocations = [],
        index;

    for (index = 0; index < 10; index += 1) {
        allocations.push(
            Math.random() * 100
        );
    }

	// resize to 100%
	var sum = _.reduce(allocations, function(sum, num) {
	  return sum + num;
	});
	normalized_allocations = [];
	_.each(allocations, function(num) {
		normalized_allocations.push((num / sum) * factor);
	})

	return normalized_allocations;
}

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

.service('Portfolio', function() {
  // Might use a resource here that returns a JSON array
//	API.all('api/portfolios', {}, function(data) {
//		console.log('Portfolios fetched: '+JSON.stringify(data));
//	});
  // Some fake testing data
  stock_alloc = generateRandomPortfolio(5, 0.9);
  bond_alloc = generateRandomPortfolio(6, 0.1);
  stock_alloc1 = generateRandomPortfolio(5, 0.3);
  bond_alloc1 = generateRandomPortfolio(6, 0.7);
  stock_alloc2 = generateRandomPortfolio(5, 0.3);
  bond_alloc2 = generateRandomPortfolio(6, 0.7);
  var portfolios = [{
    id: 0,
    name: 'Retirement Fund',
    logo: 'img/growth_retirement.png',
    description: 'Savings for retirement.',
    invested_amount: 100000,
    balance: 100000+Math.random()*100000,
    stock_bond_split: 0.9,
    stocks: [{name: 'US Total Stock Market', percent: stock_alloc[0]}, {name: 'US Mid-Cap Value', percent: stock_alloc[1]}, {name: 'US Small-Cap Value', percent: stock_alloc[2]}, {name: 'International Developed', percent: stock_alloc[3]}, {name: 'Emerging Markets', percent: stock_alloc[4]}],
    bonds: [{name: 'Short Term Treasuries', percent: bond_alloc[0]}, {name: 'Inflation Protected Bonds', percent: bond_alloc[1]}, {name: 'US Municipal Bonds', percent: bond_alloc[2]}, {name: 'US Corporate Bonds', percent: bond_alloc[3]}, {name: 'International Bonds', percent: bond_alloc[4]}, {name: 'Emerging Markets Bonds', percent: bond_alloc[5]}]
  }, {
    id: 1,
    name: 'Build Wealth Fund',
    description: 'Wealth Investment Fund',
    logo: 'img/growth_buildwealth.png',
    invested_amount: 100000,
    balance: 100000+Math.random()*100000,
    stock_bond_split: 0.3,
    stocks: [{name: 'US Total Stock Market', percent: stock_alloc1[0]}, {name: 'US Mid-Cap Value', percent: stock_alloc1[1]}, {name: 'US Small-Cap Value', percent: stock_alloc1[2]}, {name: 'International Developed', percent: stock_alloc1[3]}, {name: 'Emerging Markets', percent: stock_alloc1[4]}],
    bonds: [{name: 'Short Term Treasuries', percent: bond_alloc1[0]}, {name: 'Inflation Protected Bonds', percent: bond_alloc1[1]}, {name: 'US Municipal Bonds', percent: bond_alloc1[2]}, {name: 'US Corporate Bonds', percent: bond_alloc1[3]}, {name: 'International Bonds', percent: bond_alloc1[4]}, {name: 'Emerging Markets Bonds', percent: bond_alloc1[5]}]
  }, {
    id: 2,
    name: 'Safety Net Fund',
    description: 'Savings for a Safety Net (Health or Loss of Job) Fund',
    logo: 'img/growth_safetynet.png',
    invested_amount: 12000,
    balance: 12000+Math.random()*12000,
    stock_bond_split: 0.3,
    stocks: [{name: 'US Total Stock Market', percent: stock_alloc2[0]}, {name: 'US Mid-Cap Value', percent: stock_alloc2[1]}, {name: 'US Small-Cap Value', percent: stock_alloc2[2]}, {name: 'International Developed', percent: stock_alloc2[3]}, {name: 'Emerging Markets', percent: stock_alloc2[4]}],
    bonds: [{name: 'Short Term Treasuries', percent: bond_alloc2[0]}, {name: 'Inflation Protected Bonds', percent: bond_alloc2[1]}, {name: 'US Municipal Bonds', percent: bond_alloc2[2]}, {name: 'US Corporate Bonds', percent: bond_alloc2[3]}, {name: 'International Bonds', percent: bond_alloc2[4]}, {name: 'Emerging Markets Bonds', percent: bond_alloc2[5]}]
  }];

  return {
    all: function() {
      return portfolios;
    },
    add: function(portfolio) {
		var proto = {
	    	logo: 'img/growth_safetynet.png',
	    	invested_amount: 12000,
	    	balance: 12000+Math.random()*12000,
	    	stocks: [{name: 'US Total Stock Market', percent: stock_alloc2[0]}, {name: 'US Mid-Cap Value', percent: stock_alloc2[1]}, {name: 'US Small-Cap Value', percent: stock_alloc2[2]}, {name: 'International Developed', percent: stock_alloc2[3]}, {name: 'Emerging Markets', percent: stock_alloc2[4]}],
	    	bonds: [{name: 'Short Term Treasuries', percent: bond_alloc2[0]}, {name: 'Inflation Protected Bonds', percent: bond_alloc2[1]}, {name: 'US Municipal Bonds', percent: bond_alloc2[2]}, {name: 'US Corporate Bonds', percent: bond_alloc2[3]}, {name: 'International Bonds', percent: bond_alloc2[4]}, {name: 'Emerging Markets Bonds', percent: bond_alloc2[5]}]
    	};
		proto.id = portfolios.length+99;
		proto.name = portfolio.name;
		proto.description = portfolio.description;
		proto.stock_bond_split = portfolio.stock_bond_split;
		portfolios.push( proto );
	},
    remove: function(portfolio) {
      portfolios.splice(portfolios.indexOf(portfolio), 1);
    },
    get: function(portfolioId) {
      for (var i = 0; i < portfolios.length; i++) {
        if (portfolios[i].id === parseInt(portfolioId)) {
          return portfolios[i];
        }
      }
      return null;
    }
  }
})


/**
 * A simple example service that returns some data.
 */
.service('Transfer', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var transfer = [{
    id: 0,
    bank: 'BOC',
    amount: 50000
  }, {
    id: 1,
    bank: 'HSBC',
    amount: 1000
  }];


  return {
    all: function() {
      return transfer;
    },
    get: function(transferId) {
      // Simple index lookup
      return transfer[transferId];
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
    portfolio: 2
  }, {
    id: 1,
    date: 'January 03, 2015 17:30:00',
	portfolio: 1
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



