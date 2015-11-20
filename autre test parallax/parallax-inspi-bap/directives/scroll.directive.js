function($rootScope, $timeout, $controller, $ionicGesture) {
      return {
        restrict: 'E',
        //require: ['bapAgendaScroll', '^bapAgendaCalendar'],
        scope: true,
        controller: function ctrl() {
            this.left = 0;
            this.top = 0; //-(bapAgendaConfig['start-hour'] * bapAgendaConfig.css['hour-height']);

            var self = this;
            //Event click
            $rootScope.$on('date:selected', function(event, newDate) {
                //Comment calcul le decalage ?
                self.top = 0; //-(bapAgendaConfig['start-hour'] * bapAgendaConfig.css['hour-height']);
                self.left = 0;
                scrollTo(self.left, self.top)
                //document.querySelector('bap-agenda-times').style[ionic.CSS.TRANSFORM] = 'translate3d(0, '+ self.top +'px, 0)';
                //document.querySelector('bap-agenda-times').style[ionic.CSS.TRANSFORM] = 'translate3d(0, '+ self.top +'px, 0)';
            });
        },
        compile: function compile(element) {
            element.addClass('scroll-view ionic-scroll');

            //We cannot transclude here because it breaks element.data() inheritance on compile
            var innerElement = angular.element('<div class="scroll"></div>');
            innerElement.append(element.contents());
            element.append(innerElement);


            return {
                pre: function prelink($scope, $element, $attr, ctrls) {
                    console.log(ctrls);
                    var controller1 = ctrls;//[0];
                    //var controller2 = ctrls[1];
                    //$scope.controller2 = controller2;

                    var getScrollMax = function getScrollMax() {
                        //var scrollMax = $element[0].querySelector('div.calendar-day-section').scrollHeight;
                        //scroll max serait longueur de la fresque
                        var scrollMax = $element[0].querySelector('#test-6 #fresque').scrollWidth;
                        //scrollMax -= Number(window.getComputedStyle(document.querySelector('.calendar')).height.replace('px', ''));

                        return scrollMax;
                    };

                    var scrollTo = function(left, top) {
                      var self = this;
                      animateScroll(top, left);

                      function animateScroll(Y, X) {
                        // scroll animation loop w/ easing
                        // credit https://gist.github.com/dezinezync/5487119
                        //var start = Date.now(),
                          //duration = 250, //milliseconds
                          var fromY = controller1.scrollTop;
                          var fromX = controller1.scrollLeft;

                        //if (fromY === Y && fromX === X) {
                            //
                            //sendCurrentDate();

                            //return; /* Prevent scrolling to the Y point if already there */
                        //}

                        // decelerating to zero velocity
                        function easeOutCubic(t) {
                          return (--t) * t * t + 1;
                        }

                        // scroll loop
                        function animateScrollStep() {
                          //var currentTime = Date.now(),
                            //time = Math.min(1, ((currentTime - start) / duration)),
                          // where .5 would be 50% of time on a linear scale easedT gives a
                          // fraction based on the easing method

                          var easedT = easeOutCubic(100);

                          if (fromY != Y) {
                            controller1.scrollTop = parseInt((easedT * (Y - fromY)) + fromY, 10);
                          }
                          if (fromX != X) {
                            controller1.scrollLeft = parseInt((easedT * (X - fromX)) + fromX, 10);
                          }

                          //console.log('doScroll');
                          doScroll();

                          /*if (time < 1) {
                            ionic.requestAnimationFrame(animateScrollStep);
                          } else {
                            //sendCurrentDate();
                        }*/
                        }

                        // start scroll loop
                        ionic.requestAnimationFrame(animateScrollStep);
                      }
                    };


                    //var sendCurrentDate = function sendCurrentDate() {
                    //    var date = _.last(document.querySelectorAll('.calendar-day.current')).getAttribute('data-day');
                    //    $rootScope.$broadcast('date:scrolled', date);
                    //};

                    var doScroll = function() {
                        // Can't scroll down if on top
                        if (controller1.scrollTop > 0) {
                            controller1.scrollTop = 0;
                        }

                        // Can't scroll top if down
                        var scrollMax = getScrollMax();

                        if (-controller1.scrollTop > scrollMax) {
                            controller1.scrollTop = - scrollMax;
                        }

                        /*var elts = $element[0].querySelectorAll('div.calendar-day-section');
                        _.each(elts, function forEach(elt, index) {
                            var base = ($scope.rooms.length * bapAgendaConfig.css["hour-width"] * (index + controller2.initialDayDelta)) + bapAgendaConfig.css["day-spacing"] * (index + controller2.initialDayDelta);

                            elt.style[ionic.CSS.TRANSFORM] = 'translate3d('+ (base + controller1.scrollLeft) + 'px, ' + controller1.scrollTop + 'px, 0)';
                        });*/

                        // Scroll footer
                        /*var elts = document.querySelectorAll('.calendar-footer-content > span');
                        _.each(elts, function forEach(elt, index) {
                            var base = ($scope.rooms.length * bapAgendaConfig.css["hour-width"] * (index + controller2.initialDayDelta)) + bapAgendaConfig.css["day-spacing"] * (index + controller2.initialDayDelta);

                            elt.style[ionic.CSS.TRANSFORM] = 'translate3d('+ (base + controller1.scrollLeft) + 'px, 0, 0)';
                        });*/

                        //document.querySelector('.calendar-times').style[ionic.CSS.TRANSFORM] = 'translate3d(0, ' + controller1.scrollTop + 'px, 0)';

                        // Scroll header day
                        //var currentDay  = Math.floor(controller1.scrollLeft / controller2.getDayWidth());
                        //var days = document.querySelectorAll('.calendar-header .calendar-day');

                        /*_.each(days, function forEachDay(day, index) {
                            day.style.width = controller2.getDayWidth() + "px";

                            var base = ($scope.rooms.length * bapAgendaConfig.css["hour-width"] * (index + controller2.initialDayDelta)) + bapAgendaConfig.css["day-spacing"] * (index + controller2.initialDayDelta);
                            var pos = (base + controller1.scrollLeft);
                            if (pos < 0) {
                                pos = 0;
                                day.classList.add('current');
                            } else {
                                day.classList.remove('current');
                            }

                            day.style[ionic.CSS.TRANSFORM] = 'translate3d('+ pos + 'px, 0, 0)';
                        });*/
                    };

                    var onDragXY = function onDragXY(event) {
                        controller1.scrollLeft = controller1.left + event.gesture.deltaX;
                        controller1.scrollTop = controller1.top + event.gesture.deltaY;
                        doScroll();
                    };

                    var onDragEnd = function onDragEnd(event) {
                        controller1.left += event.gesture.deltaX;
                        controller1.top += event.gesture.deltaY;

                        if (event.gesture.velocityX > 0.5) {
                            if (event.gesture.direction == 'right') {
                                controller1.left += event.gesture.velocityX * 100;
                            } else if (event.gesture.direction == 'left') {
                                controller1.left -= event.gesture.velocityX * 100;
                            }
                        }

                        if (event.gesture.velocityY > 0.2) {
                            if (event.gesture.direction == 'up') {
                                controller1.top -= event.gesture.velocityY * 100;
                            } else if (event.gesture.direction == 'down') {
                                controller1.top += event.gesture.velocityY * 100;
                            }
                        }

                        // Ensure not go out
                        /*var maxLeft = controller2.getDayWidth() * -controller2.initialDayDelta;
                        if (controller1.left > (maxLeft)) {
                            controller1.left = maxLeft;
                        }

                        var maxRight = controller2.getDayWidth() * ($scope.days.length + controller2.initialDayDelta);
                        maxRight -= window.innerWidth;
                        if (controller1.left < -maxRight) {
                            controller1.left = -maxRight;
                        }*/

                        scrollTo(controller1.left, controller1.top );
                        // Can't scroll down if on top
                        if (controller1.top > 0) {
                            controller1.top = 0;
                        }

                        // Can't scroll top if down
                        var scrollMax = getScrollMax();

                        if (-controller1.top > scrollMax) {
                            controller1.top = - scrollMax;
                        }

                        // Add more days if needed
                        /// At left
                        /*var maxLeft = controller2.getDayWidth() * -controller2.initialDayDelta;
                        maxLeft -= controller2.getDayWidth();
                        if (controller1.left > (maxLeft)) {
                            controller2.getPreviousDays();
                        }

                        /// At right
                        var maxRight = controller2.getDayWidth() * ($scope.days.length + controller2.initialDayDelta);
                        maxRight -= window.innerWidth;
                        maxRight -= controller2.getDayWidth();
                        if (controller1.left < -maxRight) {
                            controller2.getMoreDays();
                        }*/

                    };

                    $ionicGesture.on('drag', onDragXY, element);
                    $ionicGesture.on('dragend', onDragEnd, element);

                    $scope.$on('$destroy', function reenable() {
                        $ionicGesture.off('drag', onDragXY, element);
                        $ionicGesture.off('dragend', onDragEnd, element);
                    });
                }
            };
        }
    }
}
