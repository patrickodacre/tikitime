(function () {
    'use strict';

    angular.module('app', [

                /* Shared Modules */
                'app.core',

                /* Feature Modules */
                'app.orders',
                'app.drinks',
                'app.people'
            ])
            .run(['$log', '$state', function ($log, $state) {
                $log.info("Engines ready at Warp 8. Engage.");

                $state.go('orders.home');
            }])
            .config(function ($mdThemingProvider, $mdIconProvider, $stateProvider, $urlRouterProvider, $provide) {

                $provide.decorator('$state', function ($delegate, $stateParams) {
                    $delegate.forceReload = function () {
                        return $delegate.go($delegate.current, $stateParams, {
                            reload : true,
                            inherit: false,
                            notify : true
                        });
                    };
                    return $delegate;
                });

                $mdIconProvider
                        .defaultIconSet("./assets/svg/avatars.svg", 128)
                        .icon("menu", "./assets/svg/menu.svg", 24)
                        .icon("share", "./assets/svg/share.svg", 24)
                        .icon("share_black", "./assets/svg/share_black.svg", 512)
                        .icon("google_plus", "./assets/svg/google_plus.svg", 512)
                        .icon("hangouts", "./assets/svg/hangouts.svg", 512)
                        .icon("twitter", "./assets/svg/twitter.svg", 512)
                        .icon("phone", "./assets/svg/phone.svg", 512)
                        .icon("menu_black", "./assets/svg/menu_black.svg", 512)
                        .icon("portrait", "./assets/svg/portrait.svg", 512)
                        .icon("portrait_black", "./assets/svg/portrait_black.svg", 512)
                        .icon("write", "./assets/svg/write.svg", 512)
                        .icon("write_black", "./assets/svg/write_black.svg", 512)
                        .icon("clear", "./assets/svg/clear.svg", 512);


                $mdThemingProvider.theme('default')
                        .primaryPalette('blue')
                        .accentPalette('green');

                $mdThemingProvider.theme('dark-grey')
                        .backgroundPalette('grey')
                        .dark();

                // For any unmatched url, redirect to /orders.home
                $urlRouterProvider.otherwise("orders.home");

                $stateProvider
                        .state('orders', {
                            abstract    : true,
                            controller  : 'OrderCtrl',
                            controllerAs: 'ctrl',
                            templateUrl : './src/main/templates/main-wrap.tmpl.html'
                        })
                        .state('orders.home', {
                            views: {
                                'main' : {
                                    templateUrl: './src/orders/templates/orders.tmpl.html'
                                },
                                'right': {
                                    template: '<h1>Nothing to see here, yet...</h1>'
                                }
                            }
                        })
                        .state('orders.edit-order', {
                            views: {
                                'main' : {
                                    templateUrl: './src/orders/templates/orders.tmpl.html'
                                },
                                'right': {
                                    templateUrl: './src/orders/templates/order-edit.tmpl.html'
                                }
                            }
                        })
                        .state('orders.create-order', {
                            views: {
                                'main' : {
                                    templateUrl: './src/orders/templates/orders.tmpl.html'
                                },
                                'right': {
                                    templateUrl : './src/orders/templates/order-create.tmpl.html'
                                }
                            }
                        })
                        .state('drinks', {
                            abstract    : true,
                            controller  : 'DrinksCtrl',
                            controllerAs: 'ctrl',
                            templateUrl : './src/main/templates/main-wrap.tmpl.html'
                        })
                        .state('drinks.drinkshome', {
                            views: {
                                'main': {
                                    templateUrl: './src/drinks/templates/drinks.tmpl.html'
                                }
                            }
                        })
                        .state('drinks.add-drink', {
                            views: {
                                'main' : {
                                    templateUrl: './src/drinks/templates/drinks.tmpl.html'
                                },
                                'right': {
                                    templateUrl: './src/drinks/templates/drink-add.tmpl.html'
                                }
                            }
                        })
                        .state('drinks.edit-drink', {
                            views: {
                                'main' : {
                                    templateUrl: './src/drinks/templates/drinks.tmpl.html'
                                },
                                'right': {
                                    templateUrl: './src/drinks/templates/drink-edit.tmpl.html'
                                }
                            }
                        })
                        .state('people', {
                            abstract    : true,
                            controller  : 'PeopleCtrl',
                            controllerAs: 'ctrl',
                            templateUrl : './src/main/templates/main-wrap.tmpl.html'
                        })
                        .state('people.peoplelist', {
                            views: {
                                'main': {
                                    templateUrl: './src/people/templates/people.tmpl.html'
                                }
                            }
                        })
                        .state('people.add-person', {
                            views: {
                                'main' : {
                                    templateUrl: './src/people/templates/people.tmpl.html'
                                },
                                'right': {
                                    templateUrl: './src/people/templates/person-add.tmpl.html'
                                }
                            }
                        })
                        .state('people.edit-person', {
                            views: {
                                'main' : {
                                    templateUrl: './src/people/templates/people.tmpl.html'
                                },
                                'right': {
                                    templateUrl: './src/people/templates/person-edit.tmpl.html'
                                }
                            }
                        });
            });

})();