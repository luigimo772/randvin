/**
 * Created by lmo on 12/8/15.
 */
angular.module('randVin')
    .controller('VinController', ['$scope', 'VinService',
        function ($scope, vinService) {
            $scope.loading = false;
            $scope.error = null;

            $scope.getNewRandomVin = function () {
                $scope.loading = true;
                $scope.error = null;
                vinService.getVin(function (data) {
                    $scope.vin = data.vin;
                    $scope.loading = false;
                }, function () {
                    $scope.error = 'Could not fetch a VIN. Please try again.';
                    $scope.loading = false;
                });
            };

            $scope.getNewRandomVin();
            new ClipboardJS('[data-clipboard-target]');
        }]);
