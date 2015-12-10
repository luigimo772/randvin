/**
 * Created by lmo on 12/9/15.
 */
angular.module('randVin')
    .service('VinService', ['$resource',
        function ($resource) {
            return $resource('/vin', {}, {
                getVin: {
                    method: 'GET'
                }
            });
        }]);