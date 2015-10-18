(function() {
    'use strict';

    var module = angular.module('daysRemaining', []);

    module.provider('daysRemaining', function() {

        this.$get = ['$document', '$compile', '$rootScope',

            function($document, $compile, $rootScope) {

                var options = {
                    theme: 'black',
                    position: 'left'
                };

                var themes = {
                    gold: 'ribbon_gold',
                    pink: 'ribbon_pink'
                };

                var positions = {
                    left: 'ribbon_left',
                    right: 'ribbon_right'
                };

                var types = {
                    birthday: 'birthday',
                    event: 'special-event'
                };

                var ribbonScope = $rootScope.$new();

                var tpl = $compile(
                  '<a ng-href="{{daysRemaining.ribbonLink}}" class="ribbon-container" target="_blank">' +
                  '<span class="ribbon" ng-class="daysRemaining.ribbonClass">' +
                  '<span><ng-pluralize count="daysRemaining.ribbonDays" ' +
                  'when="{\'0\': \'Event has come\', \'one\': \'1 day left\', \'other\': \'{} days left\'}"' +
                  '</ng-pluralize></span></span></a>'
                )(ribbonScope);

                $document.find('body').append(tpl);

                var setTheme = function(providedTheme) {
                    var theme = providedTheme || options.theme;
                    return themes[theme] || themes.black;
                };

                var setPosition = function(providedPosition) {
                    var position = providedPosition || options.position;
                    return positions[position] || positions.left;
                };

                var setType = function(providedType) {
                    var type = (providedType || options.type);
                    return types[type] || types.birthday;
                };


                var ribbonObject = {

                    config: function(params) {
                        params = params || {};
                        angular.extend(options, params);
                    },

                    set: function(date, link, userOpt) {

                        if (!date) {
                            return;
                        }

                        var endDate = new Date(date.split('-').join('/'));

                        var asUTC = function(date) {
                            var result = new Date(date);
                            result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
                            return result;
                        };

                        var daysBetween = function(startDate, endDate) {
                            var millisecondsPerDay = 24 * 60 * 60 * 1000;
                            return (asUTC(endDate) - asUTC(startDate)) / millisecondsPerDay;
                        };

                        var currentDate = new Date().getTime();

                        var days = Math.round(daysBetween(currentDate, endDate));

                        var userOpts = {};

                        if (typeof userOpt === 'object') {
                            userOpts = {
                                theme: userOpt.theme || undefined,
                                position: userOpt.position || undefined,
                                type: userOpt.type || undefined
                            };
                        } else {
                            userOpts.type = userOpt;
                        }

                        var ribbonClass = setTheme(userOpts.theme) + ' ' + setPosition(userOpts.position) + ' ' + setType(userOpts.type);

                        ribbonScope.daysRemaining = {
                            ribbonLink: link,
                            ribbonClass: ribbonClass,
                            ribbonDays: days
                        };
                    },

                    addTheme: function(themeName, themeClass) {
                        if (!themeName || !themeClass) {
                            return;
                        }
                        themes[themeName] = themeClass;
                    },

                    addType: function(typeName, typeClass) {
                        if (!typeName || !typeClass) {
                            return;
                        }
                        types[typeName] = typeClass;
                    }
                };
                return ribbonObject;
            }
        ];
    });
})();
