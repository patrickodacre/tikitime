(function () {
    "use strict";

    angular.module('app')
            .factory('dataService', dataService);

    dataService.$inject =
            [
                '$log',
                '$http'
            ];

    /**
     * dataService Service
     *
     * Manage getting and setting data.
     * Manage sorting data.
     *
     * @param $log
     * @param $http
     */
    function dataService($log, $http) {

        var service = {
            getData : getData,
            postData: postData,
            deleteData: deleteData,
            updateData: updateData,
            checkIsArray: checkIsArray
        };

        return service;

        //////////////////////

        /**
         * Get data from the database.
         *
         * @param type document type; either orders, users or drinks
         * @returns {*} Promise
         */
        function getData(type) {
            return $http({
                method: 'GET',
                url   : 'https://tikitime.firebaseio.com/' + type + '.json'
            }).then(returnData, returnError);
        }

        function returnData(res) {
            $log.info("We have some data from our $http.get Request:");
            $log.debug(res);
            return res.data;
        }

        function returnError(err) {
            $log.info('Having some trouble getting your data:');
            return $log.error(err);
        }

        /**
         * Add new data.
         *
         * @param type document type; either orders, users or drinks
         * @param payload new object to be added to the type
         * @returns {IPromise<TResult>}
         */
        function postData(type, payload) {
            return $http.post('https://tikitime.firebaseio.com/' + type + '.json', payload)
                    .then(confirm);
        }

        /**
         * Update existing data.
         *
         * @param type document type; either orders, users or drinks
         * @param payload existing object with updated properties and values.
         * @returns {IPromise<TResult>}
         */
        function updateData(type, payload) {
            return $http.put('https://tikitime.firebaseio.com/' + type + '.json', payload)
                    .then(confirm);
        }

        /**
         * Delete the selected object, duh.
         *
         * @param type document type; either orders, users or drinks suffixed by the actual object ID.
         * @returns {*}
         */
        function deleteData(type) {
            return $http.delete('https://tikitime.firebaseio.com/' + type + '.json')
                    .then(confirmDelete);
        }

        /**
         * Just like to know that things happened.
         *
         * @param result null on Firebase.
         * @returns {*}
         */
        function confirm(result) {
            $log.info(result + ' server action completed.');
            return result;
        }

        /**
         * Just confirm a deletion when through.
         *
         * The details of the delete action are handled in the object's controller.
         */
        function confirmDelete() {
            return $log.info('Delete action completed.');
        }

        ////////////////////// HELPERS

        /**
         * Verify the data has been turned into an array for ng-repeat.
         *
         * Spit out a more helpful warning if it isn't.
         * The warning will stand out when next to the Errors Angular
         * throws, so it will be easier to find the hint.
         *
         * @param payload Transformed response from database.
         */
        function checkIsArray(payload) {
            $log.info("Verify we have an array:");

            if (!Array.isArray(payload) ) {
                return $log.warn('PWHO: The requested payload is not an array. Be sure to run the object returned by the get request through the appropriate formattingService helper.');
            }

            $log.info("All good! See?");
            return $log.debug(payload);
        }

    }

})();