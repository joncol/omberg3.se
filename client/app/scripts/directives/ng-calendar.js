'use strict';

(function () {
    var directive = ['$compile', 'BookingService', '$filter',
        function ($compile, BookingService) {
            var bookings;

            function controller($scope) {
            }

            function link(scope, element, attrs) {
                var calendar = angular.element(element).find('.calendar');
                var today = moment();
                var room = scope.room;

                function updateCalendar(calendar, today) {
                    var firstCalendarDate = getFirstCalendarDate(today);
                    bookings = BookingService.query({
                        timeMin: firstCalendarDate.format(),
                        timeMax: firstCalendarDate.add(1, 'months').format(),
                        room: room
                    }).$promise.then(
                        function (bookings) {
                            redrawCalendar(calendar, today, bookings);
                        },
                        function (error) {
                            console.log('error getting bookings: ' + error);
                        }
                    );
                }

                function redrawCalendar(calendar, today, bookings) {
                    showMonthAndYear(calendar, today, bookings);
                    clearDays(calendar);
                    appendDays(calendar, today, bookings);
                    addBorders(calendar);
                }

                function showMonthAndYear(calendar, today, bookings) {
                    var month = today.month() + 1;
                    var monthName = getMonthName(month);

                    var monthElem = angular.element(calendar).find('#month-name');
                    if (monthElem.length) {
                        monthElem.text(getMonthName(today.month() + 1));
                        angular.element(calendar).find('#year').text(today.year());
                    } else {
                        var timeElem = angular.element('<span/>', {
                            style: 'margin-left: 10px;',
                            html: '<a href="#" id="prev-month">&#171;-</a> ' +
                                '<span id="month-name" style="display: inline-block; width: 100px; text-align: center;">' + monthName + '</span>' +
                                ' <a href="#" id="next-month">-&#187;</a> ' +
                                '<span id="year" style="display: inline-block; width: 300px; text-align: right;">' + today.year() + '</span>'
                        });

                        angular.element(calendar).prepend(timeElem);
                        angular.element(calendar).find('#prev-month').on('click', function (ev) {
                            ev.preventDefault();
                            updateCalendar(calendar, today.subtract(1, 'months'), bookings);
                        });

                        angular.element(calendar).find('#next-month').on('click', function (ev) {
                            ev.preventDefault();
                            updateCalendar(calendar, today.add(1, 'months'), bookings);
                        });
                    }
                }

                updateCalendar(calendar, today);
                // $compile(x)(scope);
            }

            function getMonthName(month) {
                return getMonthNames()[month - 1];
            }

            function getMonthNames() {
                return [
                    'januari',
                    'februari',
                    'mars',
                    'april',
                    'maj',
                    'juni',
                    'juli',
                    'augusti',
                    'september',
                    'oktober',
                    'november',
                    'december'
                ];
            }

            function clearDays(calendar) {
                $(calendar).find('li').slice(7).remove();
            }

            function getFirstCalendarDate(today) {
                var first = moment(today).date(1);
                var index = -(first.day() - 2);
                if (index === 2) {
                    index -= 7;
                }
                return first.add(index - 1, 'days');
            }

            function appendDays(calendar, today, bookings) {
                var first = moment(today).date(1);
                var daysInMonth = today.daysInMonth();

                var index = -(first.day() - 2);
                if (index === 2) {
                    index -= 7;
                }
                do {
                    var date = moment(today).date(1).add(index - 1, "days");

                    var css = '';
                    if (index <= 0) {
                        css += 'color: #aaa;';
                    }

                    var _class = '';
                    if (isBooked(date, bookings)) {
                        _class = 'booked';
                    }

                    var li = $('<li/>', {
                        'style': css,
                        'class': _class,
                        'html': date.date()
                    });
                    $(calendar).find('ul').append(li);
                } while (++index <= daysInMonth);
            }

            function isBooked(date, bookings) {
                return bookings.some(function (booking) {
                    return ((date.isAfter(booking.startDate, 'day') ||
                             date.isSame(booking.startDate, 'day')) &&
                            (date.isBefore(booking.endDate, 'day') ||
                             date.isSame(booking.endDate, 'day')));
                });
            }

            function addBorders(calendar) {
                angular.element(calendar).find('li').slice(0, 7).css({
                    'background-color': '#aa9',
                    'border-top': '1px solid',
                    'border-color': '#888'
                });

                angular.element(calendar).find('li:nth-child(7n + 7)').css({
                    'border-right': '1px solid',
                    'border-color': '#888'
                });

                angular.element(calendar).find('li').last().css({
                    'border-right': '1px solid',
                    'border-color': '#888'
                });
            }

            return {
                restrict: 'E',
                templateUrl: 'views/calendar.html',
                controller: controller,
                scope: {
                    room: '@'
                },
                link: link
            };
        }];

    angular.module('clientApp').directive('ngCalendar', directive);
}());

