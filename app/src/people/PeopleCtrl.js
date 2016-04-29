(function () {
    "use strict";

    angular.module('app.people')
            .controller('PeopleCtrl', PeopleCtrl);

    PeopleCtrl.$inject =
            [
                '$log',
                'dataService',
                'sideNavService',
                'validationHelp',
                'formattingService',
                '$state'
            ];

    /**
     * PeopleCtrl Controller.
     *
     * @param $log
     * @param dataService
     * @param sideNavService
     * @param validationHelp
     * @param formattingService
     * @param $state
     * @constructor
     */
    function PeopleCtrl($log, dataService, sideNavService, validationHelp, formattingService, $state) {

        var ctrl = this;

        ctrl.people       = {};
        ctrl.open         = sideNavService.open;
        ctrl.close        = sideNavService.close;
        ctrl.personToEdit = {};
        ctrl.addPerson    = addPerson;
        ctrl.editPerson   = editPerson;
        ctrl.updatePerson = updatePerson;
        ctrl.deletePerson = deletePerson;

        ctrl.newPerson = {
            name: '',
            bio : ''
        };

        activate();

        /**
         * Kick everything off.
         *
         * @returns {promise}
         */
        function activate() {
            return getPeople()
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
        function getPeople() {
            return dataService.getData('people')
                    .then(function (data) {
                        ctrl.people = formattingService.toArray(data);
                        return ctrl.people;
                    });
        }

        ////////////////////// UTILITIES

        /**
         * Set selected person object to be edited.
         *
         * @param person <object>
         */
        function editPerson(person) {
            ctrl.personToEdit = person;
            return ctrl.personToEdit;
        }

        ////////////////////// CRUD

        /**
         * Add a new person.
         *
         * @param person
         */
        function addPerson(person) {
            if (validationHelp.isObjectEmpty(person)) {
                $log.error('Fill out all the fields, please!');
                return;
            }

            dataService.postData('people', person)
                    .then(function () {
                        $log.info('New Person Has Been Added: ' + person.name);
                        $state.reload();
                    });
        }

        /**
         * Update a person.
         *
         * @param person <object>
         */
        function updatePerson(person) {
            dataService.updateData('people/' + person.$key, person)
                    .then(function () {
                        $log.info(person.name + ' has been updated.');
                        $state.reload();
                    });
        }

        /**
         * Delete a person.
         */
        function deletePerson(person) {
            var verify = prompt('Are you sure you want to delete this person? Type "yes".');

            if (verify === "yes") {
                $log.info('Deleting person ' + person.name);
                return dataService.deleteData('people/' + person.$key)
                        .then(function () {
                            $state.reload();
                        });
            }

            alert('Fine, I won\'t delete anyone.');
            $state.reload();
            return;

        }
    }
})();