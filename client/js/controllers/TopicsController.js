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

	console.log(twitterData)

    var tweets = twitterData.trends;

    for (var i = 0; i < tweets.length; i++)
    {
       console.log(tweets[i].text);
    }

    $scope.trends = [];



    //var twitterData = JSON.parse($http.get('http:localhost'));

    //Send request to server
    
    
  };
  
}]);
