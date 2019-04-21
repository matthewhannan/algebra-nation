angular.module('directoryApp', []).controller('TopicsController', ['$scope', '$http', function ($scope, $http) {

  $scope.query = sessionStorage.getItem('query');

  $scope.location = {
    country: '<Country>',
    state: '<State>',
    city: '<City>'
  };

  $scope.$watch('query', function () {
    sessionStorage.setItem('query', $scope.query);
  });

  console.log($scope.query);

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

    var ourData = {
      keyword: $scope.query
    };

    var config = {
      params: ourData
    };

    var twitterData = undefined;

    twitterData = await $http.get('api/twitter/keyword', config);
  };

  }]);
