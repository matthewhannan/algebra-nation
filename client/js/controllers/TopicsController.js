angular.module('directoryApp', []).controller('TopicsController', ['$scope', '$http', function ($scope, $http) {

  $scope.query = sessionStorage.getItem('query');

  $scope.location = {
    country: '<Country>',
    state: '<State>',
    city: '<City>'
  };

  $scope.users = [];
  $scope.tweets = [];

  $scope.$watch('query', function () {
    sessionStorage.setItem('query', $scope.query);
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
    $scope.names = [];
    $scope.follow_count = [];

    for (var i = 0; i < 5; i++) {
        $scope.tweets.push(twitterData.data.statuses[i]);
        $scope.users.push($scope.tweets[i].user);
        $scope.names.push($scope.tweets[i].user.name);
        $scope.follow_count.push($scope.tweets[i].user.followers_count);
        console.log($scope.names[i] + " " + $scope.follow_count[i]);

        sessionStorage.setItem('name' + i, $scope.names[i]);
        sessionStorage.setItem('fc' + i, $scope.follow_count[i]);
    }

    for (var i = 0; i < twitterData.data.statuses.length; i++) {
      var tweet = twitterData.data.statuses[i];
      var created_at = tweet.created_at;

      if (created_at.startsWith('Sun'))
          tweetFrequency[0]++;
      else if (created_at.startsWith('Mon'))
          tweetFrequency[1]++;
      else if (created_at.startsWith('Tue'))
          tweetFrequency[2]++;
      else if (created_at.startsWith('Wed'))
          tweetFrequency[3]++;
      else if (created_at.startsWith('Thu'))
          tweetFrequency[4]++;
      else if (created_at.startsWith('Fri'))
          tweetFrequency[5]++;
      else //Saturday
          tweetFrequency[6]++;
    }

    sessionStorage.setItem('Sun', tweetFrequency[0]);
    sessionStorage.setItem('Mon', tweetFrequency[1]);
    sessionStorage.setItem('Tue', tweetFrequency[2]);
    sessionStorage.setItem('Wed', tweetFrequency[3]);
    sessionStorage.setItem('Thu', tweetFrequency[4]);
    sessionStorage.setItem('Fri', tweetFrequency[5]);
    sessionStorage.setItem('Sat', tweetFrequency[6]);

    sessionStorage.setItem('count', twitterData.data.statuses.length);

    location.reload();
  };
  
}]);
