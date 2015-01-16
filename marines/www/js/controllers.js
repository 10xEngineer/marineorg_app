angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state) {
  $scope.login = function(user) {
    console.log('Login: '+ user);

    $state.go('tab.overview');
  };
})

.controller('OverviewCtrl', function($scope, $timeout, Portfolio) {
	$scope.refreshTasks = function() {
		console.log('Refreshing');
		
		$scope.portfolios = [];

		_.each(Portfolio.portfolios || Portfolio.all(), function(portfolio) {
			$scope.portfolios.push( {id: portfolio.id, logo: portfolio.logo, name: portfolio.name, description: portfolio.description, invested_amount: portfolio.invested_amount, balance: portfolio.balance});
		});
		
		$timeout(function() {
			$scope.$broadcast('scroll.refreshComplete');
			$scope.$broadcast('scroll.refreshComplete');
		}, 1250);
	};
	
	function accumulate( sum, num ) {
        return sum + num;
    };

	$scope.refreshTasks();
	
	var total_balance = _.reduce( _.pluck( $scope.portfolios, "balance" ), accumulate );
	var invested_amount = _.reduce( _.pluck( $scope.portfolios, "invested_amount" ), accumulate );
	var total_percentage = (total_balance - invested_amount) / invested_amount;
	$scope.total_balance = numeral(total_balance).format('$ 0,0.00');
    $scope.total_return_percentage = numeral(total_percentage).format('0,0.0 %');
	$scope.invested_amount = numeral(invested_amount).format('$ 0,0.00');
	$scope.invested_return_amount = numeral(total_percentage).format('0, 0.0 %');
})

.controller('PortfolioCtrl', function($scope, $state, $stateParams, Portfolio) {
  $scope.portfolios = Portfolio.portfolios || Portfolio.all();
  //console.log('Portfolios: '+JSON.stringify($scope.portfolios));
  $scope.createFund = function(portfolio) {
	if( portfolio.stock_bond_split ) {
		portfolio.stock_bond_split = portfolio.stock_bond_split / 100;
	} else {
		portfolio.stock_bond_split = 0.5;
	}
    console.log('createFund: ', portfolio);
    Portfolio.add(portfolio);
    $state.go('tab.overview');
  };
  $scope.create = function() {
    $state.go('add-portfolio');
  };
})

.controller('PortfolioDetailCtrl', function($scope, $stateParams, Portfolio) {
	$scope.portfolio = Portfolio.get($stateParams.portfolioId);
	//console.log("Portfolio Dtl: "+JSON.stringify($scope.portfolio));
	
	stock_color_scale = chroma.scale(['lightgreen', 'darkgreen']);
	bond_color_scale = chroma.scale(['lightblue', 'darkblue']);
	$scope.stock_percentage = numeral($scope.portfolio.stock_bond_split*100).format('0,0');
	$scope.bond_percentage = numeral((1-$scope.portfolio.stock_bond_split)*100).format('0,0');

	$scope.donutchart = [];
	var legend = "";
	_.each($scope.portfolio.bonds, function(alloc, i) {
		$scope.donutchart.push( {value: alloc.percent*100 , color: bond_color_scale(i+1/6).hex(), highlight: "#FF5A5E", label: alloc.name} );
		legend = legend + "<li><span class=\"answerbox\"></span><span class=\"category\">"+alloc.name+"</span><span class=\"passive percentage\">"+alloc.percent*100+"</span></li>";
	});
	_.each($scope.portfolio.stocks, function(alloc, i) {
		$scope.donutchart.push( {value: alloc.percent*100, color: stock_color_scale(i+1/6).hex(), highlight: "#FF5A5E", label: alloc.name} );
		legend = legend + "<li><span class=\"answerbox\"></span><span class=\"category\">"+alloc.name+"</span><span class=\"passive percentage\">"+alloc.percent*100+"</span></li>";
	});

	//$scope.legend = $scope.trustAsHtml(legend);
	var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
	$scope.linechart = {
				labels : /*_.range(200), */["January","February","March","April","May","June","July","Aug","Sep","Oct","Nov","Dec"],
				datasets : [
					{
						label: "My First dataset",
						fillColor : "rgba(220,220,220,0.2)",
						strokeColor : "rgba(220,220,220,1)",
						pointColor : "rgba(220,220,220,1)",
						pointStrokeColor : "#fff",
						pointHighlightFill : "#fff",
						pointHighlightStroke : "rgba(220,220,220,1)",
						data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
					}
				]
			};
})

.controller('ActivityCtrl', function($scope, Activity) {
  $scope.activity = Activity.all(); 
/*  $scope.remove = function(activity) {
    Activity.remove(activity);
  }*/
  console.log('Activity: '+JSON.stringify($scope.activity));
})

.controller('TransferCtrl', function($scope, Portfolio) {
  $scope.portfolios = Portfolio.portfolios || Portfolio.all();
})

.controller('TransferDetailCtrl', function($scope, $stateParams, Transfer) {
  $scope.transfer = Transfer.get($stateParams.transferId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableEmail: true
  };
})

.controller('GallerySlideCtrl', function($scope) {
    
})

.controller('GalleryCtrl', function($scope, $ionicSlideBoxDelegate) {
  $scope.slides = [
	{ image: '../img/gold.jpg', image2: '../img/stock-candle1.png' },
	{ image: '../img/shaleoil.jpeg', image2: '../img/stock-candle2.jpeg' },
	{ image: '../img/housing.jpg', image2: '../img/fb-ipo.png' }
  ];
  $scope.slidebox = $ionicSlideBoxDelegate.$getByHandle('gallery');
  $scope.slidebox.stop();
    
  $scope.addSlide = function() {
    $scope.slides.push({});
    $scope.slidebox.update();
    $scope.slidebox.stop();
  };
})

.controller('CardsCtrl', function($scope, TDCardDelegate) {
  console.log('CARDS CTRL');
  var cardTypes = [
    { image: '../img/gold.jpg' },
    { image: '../img/shaleoil.jpeg' },
    { image: '../img/housing.jpg' }
  ];

  $scope.cards = Array.prototype.slice.call(cardTypes, 0);

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.addCard = function() {
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
  }
})

.controller('CardCtrl', function($scope, TDCardDelegate) {
  $scope.cardSwipedLeft = function(index) {
    console.log('LEFT SWIPE');
    $scope.addCard();
  };
  $scope.cardSwipedRight = function(index) {
    console.log('RIGHT SWIPE');
    $scope.addCard();
  };
});

