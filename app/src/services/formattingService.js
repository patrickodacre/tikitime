(function () {
    "use strict";
    angular.module('app')
            .factory('formattingService', formattingService);

    formattingService.$inject =
            [
                '$log'
            ];

    /**
     * Various helpers to aid in formatting data.
     *
     * @returns {{removeFalseys: removeFalseys, toArray: toArray}}
     */
    function formattingService($log) {
        return {
            removeFalseys: removeFalseys,
            toArray      : toArray
        };

        /**
         * Clean array of values that may be false in the database.
         *
         * False values should not be included in the searchable array since they won't exist in any
         * order and will give false positives.
         *
         * @param object       Original object from which the keys were taken.
         * @param uncleanArray Created from Object keys.
         * @returns {Array}    Object keys verified to be true.
         */
        function removeFalseys(object, uncleanArray) {

            var cleanArray = [];

            for (var i = 0; i < uncleanArray.length; i += 1) {
                if (object[uncleanArray[i]] === true) {
                    cleanArray.push(uncleanArray[i].replace("_", " "));
                }
            }

            return cleanArray;
        }

        /**
         * Convert object of objects to an array of objects.
         *
         * @param object
         */
        function toArray(object) {
            if (!(object instanceof Object)) {
                return object;
            }
            return Object.keys(object).map(function (key) {
                return Object.defineProperty(object[key], '$key', {__proto__: null, value: key});
            });
        }

    }

})();