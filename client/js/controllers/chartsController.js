angular.module('directoryApp', []).controller('TopicsController', ['$scope', '$http', function ($scope, $http) {


  $scope.options = {
    title: '<Name>',
    width: 'width',
    height: '<height>',
    hAxis:{
        title: '<horizAxis>'
    },
    vAxis:{
        title: '<vertAxis>''
    }
  };

}]);
