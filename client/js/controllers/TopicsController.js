angular.module('directoryApp', ['Twitter']).controller('TopicsController', ['$scope', /* Other dependencies to be added*/ function ($scope) {
  
  $scope.location = {
    country: undefined,
    state: undefined,
    city: undefined
  };
  
  $scope.updateTrendList = function() {
    //To be implemented...
  };
  
}]);
