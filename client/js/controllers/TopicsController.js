angular.module('directoryApp', []).controller('TopicsController', ['$scope', '$http', function ($scope, $http) {

  $scope.query = sessionStorage.getItem('query');

  $scope.location = {
    country: '<Country>',
    state: '<State>',
    city: '<City>'
  };

  $scope.users = [];
  $scope.tweets = [];

  $scope.names = '';
  $scope.follow_count = '';
  $scope.tweetFrequency = '';

  $scope.$watch('query', function () {
    sessionStorage.setItem('query', $scope.query);
  });

  $scope.$watch('names', function () {
    sessionStorage.setItem('names', $scope.names);
  });

  //console.log($scope.query);

  if ($scope.query === 'null')
  {
      //$scope.query = 'Test Query';
      //$scope.$apply();
      //console.log("JA");
  }
  else
  {
    //Only called in /topicsmetrics.html
    //Query is set, make the request for search/tweets to localhost

    //Update results function call here
    //$scope.searchByKeyword();
  }

  $scope.updateTrendList = async function() {

    var ourData = {
      id: loadjson()
    };

    var config = {
      params: ourData
    };

    var twitterData = undefined;

    twitterData = await ($http.get('/api/twitter/trends', config));

	  console.log("http done");

	  console.log(JSON.stringify(twitterData));

    var tweets = twitterData.data[0].trends;

    $scope.trends = [];

    for (var i = 0; i < tweets.length; i++)
    {
       $scope.trends.push(tweets[i]);
    }

    $scope.$apply();
  };

  $scope.searchByKeyword = async function () {

    console.log("Deez Nutz");

    var names = [];
    var follow_count = [];
    var tweetFrequency = [0, 0, 0, 0, 0, 0, 0];

    var ourData = {
      keyword: $scope.query
    };

    var config = {
      params: ourData
    };

    var twitterData = undefined;

    twitterData = await $http.get('api/twitter/keyword', config);

    console.log("http done");

    console.log(JSON.stringify(twitterData));
    
    $scope.tweets = [];
    $scope.users = [];

    for (var i = 0; i < 5; i++) {
        $scope.tweets.push(twitterData.data.statuses[i]);
        $scope.users.push($scope.tweets[i].user);
        $scope.names.push($scope.tweets[i].user.name);
        $scope.follow_count.push($scope.tweets[i].user.followers_count);
        console.log($scope.names[i] + " " + $scope.follow_count[i]);

        sessionStorage.setItem('name' + i, $scope.names[i]);
        sessionStorage.setItem('fc' + i, $scope.follow_count[i]);
    }

    location.reload();
  };
  
}]);
