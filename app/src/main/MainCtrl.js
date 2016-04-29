(function () {
    "use strict";
    angular.module('app')
            .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject =
            [
                '$log',
                'sideNavService'
            ];

    /**
     * Main controller.
     *
     * Responsible for top-level layout and interaction.
     *
     * @param $log
     * @param sideNavService
     * @constructor
     */
    function MainCtrl($log, sideNavService) {

        var main               = this;
        main.open              = sideNavService.open;
        main.isOpen            = false;
        main.selectedMode      = 'md-fling';
        main.selectedDirection = 'down';

        activate();

        function activate() {
            $log.info('MainCtrl is instantiated. Now all your base are belong to us.');
        }

        ////////////////////// METHODS:


    }
})();