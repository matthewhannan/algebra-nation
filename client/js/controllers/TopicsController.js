angular.module('directoryApp', []).controller('TopicsController', ['$scope', 'TwitterAPI', function ($scope, TwitterAPI) {
  
  $scope.location = {
    country: undefined,
    state: undefined,
    city: undefined
  };
  
  $scope.updateTrendList = function() {
    //To be implemented...
  };
  
}]);
