require('dotenv').config()
var loadJSON = require('../../client/loadjson')
var Twit = require('twit');
var config= require('./config');
var T=new Twit(config);
var K =new Twit(config);

//loadjson variables
var country = loadJSON.country;
var city = loadJSON.city;

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

K.get('search/tweets',params,getData);
//T.get('search/tweets', { q: 'UF', count: 5 }, function(err, data, response);
function getData(err,data,response){
    console.log(country);
    console.log(city);
}
  


// var app = angular.module('tweets', []);
// app.controller('TopicsController', function($scope) {
//   $scope.query  ;
//   $scope.location.country ;
//   $scope.location.state ;
//   $scope.location.city;
// });

}
