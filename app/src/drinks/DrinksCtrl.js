(function () {
    "use strict";

    angular.module('app.drinks')
            .controller('DrinksCtrl', DrinksCtrl);

    DrinksCtrl.$inject =
            [
                '$log',
                'dataService',
                'sideNavService',
                'validationHelp',
                'formattingService',
                '$state'
            ];

    /**
     * Drinks Controller
     * @param $log
     * @constructor
     */
    function DrinksCtrl($log, dataService, sideNavService, validationHelp, formattingService, $state) {

        var ctrl = this;

        ctrl.drinks      = {};
        ctrl.open        = sideNavService.open;
        ctrl.close       = sideNavService.close;
        ctrl.drinkToEdit = {};
        ctrl.addDrink    = addDrink;
        ctrl.editDrink   = editDrink;
        ctrl.updateDrink = updateDrink;
        ctrl.deleteDrink = deleteDrink;

        ctrl.newDrink = {
            name: ''
        };

        activate();

        function activate() {
            return getDrinks()
                    .then(dataService.checkIsArray);
        }

        //////////////////////  GETTING   //////////////////////

        /**
         * Get our promise returned by $http.
         *
         * This gives us our object with all our orders.
         *
         * @returns {*} Promise.
         */
        function getDrinks() {
            return dataService.getData('drinks')
                    .then(function (data) {
                        $log.info('Turning our payload object into an array to make Angular happy.');
                        ctrl.drinks = formattingService.toArray(data);
                        return ctrl.drinks;
                    });
        }

        ////////////////////// UTILITIES

        /**
         * Set selected drink object to be edited.
         *
         * @param drink <object>
         */
        function editDrink(drink) {
            ctrl.drinkToEdit = drink;
            return ctrl.drinkToEdit;
        }

        ////////////////////// CRUD

        /**
         * Create a new drink
         *
         * @param drink
         */
        function addDrink(drink) {
            if (validationHelp.isObjectEmpty(drink)) {
                $log.error('Cannot save a drink without a name!');
                return;
            }

            dataService.postData('drinks', drink)
                    .then(function () {
                        $log.info('New Drink Has Been Added: ' + drink.name);
                        $state.reload();
                    });
        }

        /**
         * Update a drink.
         *
         * @param drink <object>
         */
        function updateDrink(drink) {
            dataService.updateData('drinks/' + drink.$key, drink)
                    .then(function () {
                        $log.info(drink.name + ' has been updated.');
                        $state.reload();
                    });
        }


        /**
         * Delete a drink.
         */
        function deleteDrink(drink) {
            var verify = prompt('Are you sure you want to delete this drink? Type "yes".');

            if (verify === "yes") {
                return dataService.deleteData('drinks/' + drink.$key)
                        .then(function () {
                            $log.info('Deleted drink ' + drink.$key);
                            $state.reload();
                        });
            }

            alert('Fine, I won\'t delete that drink.');
            $state.reload();
            return;

        }

    }
})();