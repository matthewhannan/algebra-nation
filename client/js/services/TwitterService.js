angular.module('directoryApp', []).service('TwitterAPI', ['$scope', function($scope) {

    var Twit = require('twit');
    var config = require('./config');
    var T = new Twit(config);

    //Add functionality here

}]);
