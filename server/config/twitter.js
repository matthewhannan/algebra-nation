require('dotenv').config()
var Twit = require('twit');
var config= require('./config');
var T=new Twit(config);

 var params={
   q:'Gators',
   count: 5

 }

T.get('search/tweets',params,gotData);
//T.get('search/tweets', { q: 'UF', count: 5 }, function(err, data, response);
function gotData(err,data,response){
  var tweets=data.statuses;
  for(var i =0;i<tweets.length;i++){
    console.log(tweets[i].text);
  }


// var app = angular.module('tweets', []);
// app.controller('TopicsController', function($scope) {
//   $scope.query  ;
//   $scope.location.country ;
//   $scope.location.state ;
//   $scope.location.city;
// });

}
