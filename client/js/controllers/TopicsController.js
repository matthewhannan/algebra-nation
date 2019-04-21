angular.module('directoryApp', []).controller('TopicsController', ['$scope', '$http', function ($scope, $http) {
  
  $scope.location = {
    country: '<Country>',
    state: '<State>',
    city: '<City>'
  };
  
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

    //var twitterData = JSON.parse($http.get('http:localhost'));

    //Send request to server
    
    
  };
  
}]);
