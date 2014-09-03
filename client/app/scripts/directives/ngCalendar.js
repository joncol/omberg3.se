"use strict";

(function () {
    var directive = function ($compile) {
        function controller($scope) {
            $scope.yolo = "fosho";
        }

        function link(scope, element, attrs) {
           // var x = angular.element("<li>1</li>");
           // angular.element(element).find(".calendar ul").append(x);
           var calendar = angular.element(element).find(".calendar");
           var today = moment();
           showMonthAndYear(calendar, today);
           appendDays(calendar, today);
           addBorders(calendar);
           // $compile(x)(scope);
        }

        function showMonthAndYear(calendar, today) {
            var month = today.month() + 1;
            var monthName = getMonthName(month);

            var timeElem = angular.element("<span/>", {
                style: "margin-left: 10px;",
                html: "<a href='#' id='prev-month'>&#171;-</a> " +
                    "<span id='month-name' style='display: inline-block; width: 100px; text-align: center;'>" + monthName + "</span>" +
                    " <a href='#' id='next-month'>-&#187;</a> " +
                    "<span id='year' style='display: inline-block; width: 300px; text-align: right;'>" + today.year() + "</span>"
            });

            angular.element(calendar).prepend(timeElem);

            angular.element(calendar).find("#prev-month").on("click", function (ev) {
                ev.preventDefault();
                today.subtract(1, "months");
                angular.element(calendar).find("#month-name").text(getMonthName(today.month() + 1));
                angular.element(calendar).find("#year").text(today.year());
                clearDays(calendar);
                appendDays(calendar, today);
                addBorders(calendar);
            });

            angular.element(calendar).find("#next-month").on("click", function (ev) {
                ev.preventDefault();
                today.add(1, "months");
                angular.element(calendar).find("#month-name").text(getMonthName(today.month() + 1));
                angular.element(calendar).find("#year").text(today.year());
                clearDays(calendar);
                appendDays(calendar, today);
                addBorders(calendar);
            });
        }

        function getMonthName(month) {
            return getMonthNames()[month - 1];
        }

        function getMonthNames() {
            return [
                "januari",
                "februari",
                "mars",
                "april",
                "maj",
                "juni",
                "juli",
                "augusti",
                "september",
                "oktober",
                "november",
                "december"
            ];
        }

        function clearDays(calendar) {
            $(calendar).find("li").slice(7).remove();
        }

        function appendDays(calendar, today) {
            var first = moment(today).date(1);
            var daysInMonth = today.daysInMonth();

            var index = -(first.day() - 2);
            if (index == 2)
                index -= 7;
            do {
                var dayIndex;
                var css = "";
                if (index <= 0) {
                    dayIndex = moment(today).date(1).add(index - 1, "days").date();
                    css = "color: #aaa;";
                } else {
                    dayIndex = index;
                }
                var li = $("<li/>", {
                    style: css,
                    html: dayIndex
                });
                $(calendar).find("ul").append(li);
            } while (++index <= daysInMonth);
        }

        function addBorders(calendar) {
            angular.element(calendar).find("li").slice(0, 7).css({
                "background-color": "#aa9",
                "border-top": "1px solid",
                "border-color": "#888"
            });

            angular.element(calendar).find("li:nth-child(7n + 7)").css({
                "border-right": "1px solid",
                "border-color": "#888"
            });

            angular.element(calendar).find("li").last().css({
                "border-right": "1px solid",
                "border-color": "#888"
            });
        }

        return {
            restrict: "E",
            templateUrl: "views/calendar.html",
            controller: controller,
            scope: {},
            link: link
        };
    };

    angular.module("clientApp").directive("ngCalendar", directive);
}());

