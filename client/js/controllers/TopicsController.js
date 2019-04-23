<<<<<<< HEAD
angular.module('directoryApp', []).controller('TopicsController', ['$scope', '$http', '$location', function ($scope, $http, $location) {

  $scope.getUserTweetsSync = function () {
    var user_tweets;
    return new Promise (resolve => {
      user_tweets = $scope.getUserTweets($scope.user.screen_name);
      resolve(user_tweets);
    });
    return user_tweets;
  };

  $scope.getUserTweets = async function (sn) {

    var ourData = {
      screen_name: sn
    };

    var config = {
      params: ourData
    };

    //console.log(config);

    $scope.user_tweet_data = await $http.get('/api/twitter/user', config);

    console.log($scope.user_tweet_data);

    var retweets = 0, replies = 0, tweets = 0;
    var user_tweet_frequency = [0, 0, 0, 0, 0, 0, 0];

    for (var i = 0; i < $scope.user_tweet_data.data.length; i++) {
      var user_tweet = $scope.user_tweet_data.data[i];
      console.log(user_tweet);

      var created_at = user_tweet.created_at;

      if (created_at.startsWith('Sun'))
        user_tweet_frequency[0]++;
      else if (created_at.startsWith('Mon'))
        user_tweet_frequency[1]++;
      else if (created_at.startsWith('Tue'))
        user_tweet_frequency[2]++;
      else if (created_at.startsWith('Wed'))
        user_tweet_frequency[3]++;
      else if (created_at.startsWith('Thu'))
        user_tweet_frequency[4]++;
      else if (created_at.startsWith('Fri'))
        user_tweet_frequency[5]++;
      else //Saturday
        user_tweet_frequency[6]++;


      //console.log('Retweeted status undefined? : ' + (user_tweet.retweeted_status === undefined));
      //console.log('Reply exists : ' + (user_tweet.in_reply_to_screen_name !== null));
      
      if ((user_tweet.retweeted_status === undefined) && (user_tweet.in_reply_to_screen_name == null))
          tweets++;
      else if (user_tweet.in_reply_to_screen_name !== null)
          replies++;
      else
          retweets++;

    }

    sessionStorage.setItem('user_tweet_count', tweets);
    console.log('User Tweet Count: ' + tweets);
    sessionStorage.setItem('user_retweet_count', retweets);
    console.log('User Retweet Count: ' + retweets);
    sessionStorage.setItem('user_reply_count', replies);
    console.log('User Reply Count: ' + replies);
    sessionStorage.setItem('user_likes', $scope.user.favourites_count);
    console.log('User Likes Count: ' + $scope.user.favourites_count);

    console.log('***********Frequencies**********');
    sessionStorage.setItem('utf0', user_tweet_frequency[0]);
    console.log('Sunday: ' + user_tweet_frequency[0]);
    sessionStorage.setItem('utf1', user_tweet_frequency[1]);
    console.log('Monday: ' + user_tweet_frequency[1]);
    sessionStorage.setItem('utf2', user_tweet_frequency[2]);
    console.log('Tuesday: ' + user_tweet_frequency[2]);
    sessionStorage.setItem('utf3', user_tweet_frequency[3]);
    console.log('Wednesday: ' + user_tweet_frequency[3]);
    sessionStorage.setItem('utf4', user_tweet_frequency[4]);
    console.log('Thursday: ' + user_tweet_frequency[4]);
    sessionStorage.setItem('utf5', user_tweet_frequency[5]);
    console.log('Friday: ' + user_tweet_frequency[5]);
    sessionStorage.setItem('utf6', user_tweet_frequency[6]);
    console.log('Saturday: ' + user_tweet_frequency[6]);

    return 'Resolved!';
  }
=======
angular.module('directoryApp', []).controller('TopicsController',['$scope','$window', '$http', function ($scope,$window, $http) {
>>>>>>> origin/master

  //LOAD USER
  if (sessionStorage.getItem('topicData') !== null && sessionStorage.getItem('userNum') !== null)
  {
    var userNum = parseInt(sessionStorage.getItem('userNum'));
    var topicData = JSON.parse(sessionStorage.getItem('topicData'));

    $scope.user = topicData.data.statuses[userNum].user;

    if (sessionStorage.getItem('screen_name') !== $scope.user.screen_name)
    {
      var user_tweets = $scope.getUserTweetsSync();
      sessionStorage.setItem('screen_name', $scope.user.screen_name);
    }
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
<<<<<<< HEAD
  
=======

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

>>>>>>> origin/master
}]);
