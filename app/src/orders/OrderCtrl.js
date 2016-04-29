(function () {
    "use strict";

    angular.module('app.orders')
            .controller('OrderCtrl', OrderCtrl);

    OrderCtrl.$inject =
            [
                '$log',
                'dataService',
                'formattingService',
                'sideNavService',
                'validationHelp',
                '$state'
            ];

    /**
     * Orders Controller.
     *
     * @param $log
     * @param dataService
     * @param formattingService
     * @param sideNavService
     * @param validationHelp
     * @param $state
     * @constructor
     */
    function OrderCtrl($log, dataService, formattingService, sideNavService, validationHelp, $state) {

        var ctrl                 = this;
        ctrl.orders              = {};
        ctrl.ordersArray         = [];
        ctrl.drinksArray         = [];
        ctrl.open                = sideNavService.open;
        ctrl.close               = sideNavService.close;
        ctrl.orderToEdit         = {};
        ctrl.people              = {};
        ctrl.drinks              = {};
        ctrl.createOrder         = createOrder;
        ctrl.editOrder           = editOrder;
        ctrl.resetOrderToEdit    = resetOrderToEdit;
        ctrl.deleteOrder         = deleteOrder;
        ctrl.updateOrder         = updateOrder;
        ctrl.getPeople           = getPeople;
        ctrl.loadPeople          = loadPeople;
        ctrl.getDrinks           = getDrinks;
        ctrl.loadDrinks          = loadDrinks;
        ctrl.tikitime            = new Date();
        ctrl.minDate             = new Date(
                ctrl.tikitime.getFullYear(),
                ctrl.tikitime.getMonth(),
                ctrl.tikitime.getDate()
        );

        ctrl.newOrder = {
            drinks    : {},
            ordered_by: '',
            tikitime  : ''
        };

        activate();

        // Init ctrl
        function activate() {
            return getOrders()
                    .then(ordersObjectToArray)
                    .then(drinksObjToArray);
        }

        //////////////////////  GETTING   //////////////////////

        /**
         * Get our promise returned by $http.
         *
         * This gives us our object with all our orders.
         * Transform it into an array of order objects right away
         * because that's what ng-repeat likes.
         *
         * @returns {*} Promise.
         */
        function getOrders() {
            return dataService.getData('orders')
                    .then(function (data) {
                        ctrl.orders = data;
                        return ctrl.orders;
                    });
        }

        /**
         * Get all available drinks.
         *
         * @returns {*} Promise
         */
        function getDrinks() {
            return dataService.getData('drinks')
                    .then(function (data) {
                        ctrl.drinks = data;
                        return ctrl.drinks;
                    });
        }

        /**
         * Get all available users from the db.
         *
         * @returns {promise}
         */
        function getPeople() {
            return dataService.getData('people')
                    .then(function (data) {
                        $log.info('Received all People:');
                        $log.debug(ctrl.people);
                        ctrl.people = data;
                        return ctrl.people;
                    });
        }

        /**
         * Load list of users when the select is clicked.
         *
         * @returns {promise}
         */
        function loadPeople() {
            return getPeople();
        }

        /**
         * Load list of drinks.
         *
         * Fires only when a user begins to add a new order.
         *
         * @returns {promise}
         */
        function loadDrinks() {
            return getDrinks();
        }

        ////////////////////// UTILITIES

        /**
         * ng-repeat filter expects an array.
         *
         * Let's give it what it wants:
         *
         * @return array Array of all our order objects.
         */
        function ordersObjectToArray() {
            ctrl.ordersArray = formattingService.toArray(ctrl.orders);
            return ctrl.ordersArray;
        }

        /**
         * Create new array property from Drinks object property.
         *
         * Angular doesn't query object property keys, only their values,
         * so we need to move those drinks into an array that can be queried by the ng-repeat filter.
         */
        function drinksObjToArray() {

            // for each order, create a clean drinks array.
            for (var i = 0; i < ctrl.ordersArray.length; i++) {
                makeCleanArray(ctrl.ordersArray[i]);
            }
            return ctrl.ordersArray;
        }

        /**
         * Clean up the array.
         *
         * The DB will include false values from when drinks are removed from an order.
         * We can't include those in the array for obvious reasons.
         *
         * @param orderObject
         * @returns {Array|*}
         */
        function makeCleanArray(orderObject) {
            var drinkNamesArray = Object.keys(orderObject.drinks);

            // Drinks to be queried by ng-repeat filter.
            orderObject.drinksArray = [];

            // Clean out drinks that may be set to false in an order edit.
            orderObject.drinksArray = formattingService.removeFalseys(orderObject.drinks, drinkNamesArray);

            return orderObject.drinksArray;
        }

        /**
         * Set selected order object to be edited.
         *
         * @param order <object>
         */
        function editOrder(order) {
            ctrl.orderToEdit = order;
            $log.info("The following order has been selected to edit:");
            $log.debug(order);
            return ctrl.orderToEdit;
        }

        /**
         * Reset the orderToEdit on cancel.
         *
         * Values weren't clearing from the object on state change.
         * Since we're using a parent/child view hierarchy,
         * the changes persist.
         */
        function resetOrderToEdit() {
            ctrl.orderToEdit = {};

        }

        ////////////////////// CRUD

        /**
         * Save new order to the db.
         *
         * @param order object
         */
        function createOrder(order) {

            if (validationHelp.isObjectEmpty(order.drinks)) {
                $log.error('Cannot save an order without any drinks!');
                return;
            }

            dataService.postData('orders', order)
                    .then(function () {
                        $log.info('New Order Created:');
                        $state.reload();
                    });
        }

        /**
         * Delete an order.
         */
        function deleteOrder(order) {
            var verify = prompt('Are you sure you want to delete this order? Type "yes".');

            if (verify === "yes") {
                return dataService.deleteData('orders/' + order.$key)
                        .then(function () {
                            $log.info('Deleted order ' + order.$key);
                            $state.reload();
                        });
            }

            alert('Fine, I won\'t delete anything');
            $state.reload();
            return;

        }

        /**
         * Update a order.
         *
         * @param order <object>
         */
        function updateOrder(order) {
            dataService.updateData('orders/' + order.$key, order)
                    .then(function () {
                        $log.info(order.$key + ' has been updated.');
                        ctrl.drinksArray.push(ctrl.orderToEdit.drinksArray);
                        $state.reload();
                    });
        }

    }

}());