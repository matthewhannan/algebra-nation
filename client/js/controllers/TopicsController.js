angular.module('directoryApp', []).controller('TopicsController',['$scope','$window', '$http', function ($scope,$window, $http) {

  //LOAD USER
  if (sessionStorage.getItem('topicData') !== null && sessionStorage.getItem('userNum') !== null)
  {
    var userNum = parseInt(sessionStorage.getItem('userNum'));
    var topicData = JSON.parse(sessionStorage.getItem('topicData'));

    $scope.user = topicData.data.statuses[userNum].user;

    console.log($scope.user);
  }
  //END LOAD USER

  $scope.query = sessionStorage.getItem('query');

  $scope.location = {
    country: '<Country>',
    state: '<State>',
    city: '<City>'
  };

  $scope.users = [];
  $scope.tweets = [];
  $scope.statuses = [];

  if (sessionStorage.getItem('topicData') !== null)
  {
    $scope.statuses = [];

    var list = JSON.parse(sessionStorage.getItem('topicData')).data.statuses;
    //console.log(list);

    for (var i = 0; i < list.length; i++)
        $scope.statuses.push(list[i]);

    //$scope.$apply();
  }

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

$scope.sendLocationTrend = async function(q) {
  $scope.query=q;
  $window.location = "/topicmetrics.html";
};
  $scope.searchByKeyword = async function () {

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

    await sessionStorage.setItem('topicData', JSON.stringify(twitterData));

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

    location.reload();
  };

  $scope.getTweets = function () {

    var str = sessionStorage.getItem('tweets');

    if (str === 'null')
        return [];
    else
    {
      var tweets = JSON.parse(str);
      return tweets;
    }

  }

}]);
