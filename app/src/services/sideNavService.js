(function () {
    "use strict";

    angular.module('app')
            .factory('sideNavService', sideNavService);

    sideNavService.$inject =
            [
                '$log',
                '$mdSidenav'
            ];

    /**
     * Service to handle the opening and closing of side panels.
     *
     * It's a pretty important job.
     *
     * @param $log Helps me write fun messages to the console.
     * @param $mdSidenav Material Design's SideNav service.
     * @returns {{open: open, close: close}}
     */
    function sideNavService($log, $mdSidenav) {

        var publicAPI = {
            open : open,
            close: close
        };

        return publicAPI;

        //////////////////////  METHODS   //////////////////////

        /**
         * Open one of the side panels.
         *
         * @param NavID <string> Left or Right Areas
         */
        function open(NavID) {
            $mdSidenav(NavID).toggle()
                    .then(function () {
                        $log.debug("Log: " + NavID + " opened.");
                    });
        }

        /**
         * Close the panel.
         *
         * @param NavID <string> Left or Right Areas
         */
        function close(NavID) {
            $mdSidenav(NavID).close()
                    .then(function () {
                        $log.debug("Log: " + NavID + " closed.");
                    });
        }
    }
}());