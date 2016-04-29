(function () {
    "use strict";
    angular.module('app')

            .factory('validationHelp', validationHelp);

    validationHelp.$inject =
            [
                '$log'
            ];

    /**
     * Validation Helpers
     *
     * @param $log
     */
    function validationHelp($log) {

        var validationHelp = {
            isObjectEmpty: isObjectEmpty
        };

        return validationHelp;

        ////////////////////// METHODS

        /**
         * Check if object is empty.
         *
         * @param object
         * @returns {boolean}
         */
        function isObjectEmpty(object) {
            for (var key in object) {
                if (object.hasOwnProperty(key)) {
                    return false;
                }
            }
            return true;
        }


    }

})();