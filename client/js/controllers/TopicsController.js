angular.module('directoryApp', []).controller('TopicsController', ['$scope', '$http', function ($scope, $http) {
  
  $scope.location = {
    country: '<Country>',
    state: '<State>',
    city: '<City>'
  };
  
  $scope.updateTrendList = function() {

    var ourData = {
      id: loadjson()
    };

    //console.log("Deez Nutz");

    var config = {
      params: ourData
    };

    var twitterData = undefined;

    console.log($http.get('/api/twitter/trends/', config));

    //'http:localhost:8080/api/twitter'
    twitterData = $http.get('/api/twitter/trends/', config);

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
