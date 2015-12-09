/**
 * Created by lmo on 12/9/15.
 */
angular.module('randVin')
    .service('VinService', ['$resource',
        function ($resource) {
            return $resource('http://randomvin.com/getvin.php?type=real', {}, {
                getVin: {
                    method: 'GET'
                }
            });
        }]);