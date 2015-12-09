/**
 * Created by lmo on 12/8/15.
 */
angular.module('randVin')
    .controller('VinController', ['$scope', 'VinService',
        function ($scope, vinService) {
            $scope.vin = vinService.getVin();
        }]);