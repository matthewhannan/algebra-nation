angular.module('directoryApp', []).controller('TopicsController', ['$scope', '$http', function ($scope, $http) {
  
  $scope.location = {
    country: '<Country>',
    state: '<State>',
    city: '<City>'
  };
  
  $scope.updateTrendList = function() {

    var params = {
      id: loadjson()
    };

    console.log(params.id);
    console.log("Deez Nutz");

    var twitterData = undefined;

    //'http:localhost:8080/api/twitter'
    $http.get('/api/twitter', params.id).then(function (response) {
      console.log(JSON.stringify(response));
      twitterData = JSON.parse(response);
    });

    var tweets = twitterData.trends;

    for(var i = 0; i < tweets.length; i++)
    {
       console.log(tweets[i].text);
    }

    $scope.trends = [];



    //var twitterData = JSON.parse($http.get('http:localhost'));

    //Send request to server
    
    
  };
  
}]);
