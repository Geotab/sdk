geotab.addin.tripstimeline = function(api, state) {
    /* Scope variables */
    var container = document.getElementById("tripstimeline-chart-container"),
        prevButton = document.getElementById("tripstimeline-chart-prev"),
        nextButton = document.getElementById("tripstimeline-chart-next"),
        timeline,
        from = new Date(),
        to = new Date(),
        step = 1000*60*60*4,
        loadOffset = 1000*60*60*2,
        data = [],
        loadedIds = {},

        initialize = function() {
            timeline = new vis.Timeline(container, [], {
                orientation: 'top',
                zoomMin: 1000 * 60 * 60 * 4,
                zoomMax: 1000 * 60 * 60 * 4,
                minHeight: 180
            });
            timeline.on("rangechange", function(range) {
                var date;
                if (range.start.valueOf() - from.valueOf() < loadOffset) {
                    date = from;
                    from = new Date(from.valueOf() - step);
                    load(from, date);
                }
                if (to.valueOf() - range.end.valueOf() < loadOffset) {
                    date = to;
                    to = new Date(to.valueOf() + step);
                    load(from, date);
                }
            });
        },
        render = function() {
            if (!devicesCache) {
                loadDevices();
                renderWhenDevicesLoaded = true;
                return false;
            }
            data = [];
            loadedIds = {};
            from = new Date(timeline.range.start - step);
            to = new Date(timeline.range.start + step);

            resize();
            load(from, to);
            return true;
        },
        renderWhenDevicesLoaded = false,
        loadDevices = function() {
            api.call("Get", {
                typeName: "Device",
                search: {
                    groups: state.getGroupFilter ? state.getGroupFilter() : [{id:"GroupCompanyId"}]
                }
            }).then(function(devices) {
                var cache = {}, i;

                for (i = 0; i < devices.length; i++) {
                    cache[devices[i].id] = devices[i];
                }
                devicesCache = cache;
                if (renderWhenDevicesLoaded) {
                    render();
                    renderWhenDevicesLoaded = false;
                }
            }).catch(function (error) {
                alert(error);
            });
            return false;
        },
        devicesCache = false,
        formatTime = function(date) {
            var h = "" + date.getHours(),
                m = "" + date.getMinutes();

            if (h.length === 1) {
                h = "0" + h;
            }
            if (m.length === 1) {
                m = "0" + m;
            }
            return h + ":" + m;
        },
        formatPeriod = function(start, end) {
            return formatTime(start) + " - " + formatTime(end);
        },
        getTripLink = function(start, end, device) {
            return "<a href=\"#tripsHistory,dateRange:(endDate:'" + end.toISOString() + "',startDate:'" + start.toISOString() + "'),devices:!(" + device.id + ")\" class=\"geotabButtonIcons externalLink detailslink\" target=\"blank\"></a>";
        },

        load = function(from, to) {
            getTrips(from, to).then(function(trips) {
                var trip, device, i,
                    start, stop;

                for (i = 0; i < trips.length; i++) {
                    trip = trips[i];
                    device = devicesCache[trip.device.id];
                    if (device && !loadedIds[trip.id]) {
                        loadedIds[trip.id] = true;
                        start = new Date(trip.start);
                        stop = new Date(trip.stop);

                        data.push({
                            id: trip.id,
                            content: device.name + "<br>" + formatPeriod(start, stop) + getTripLink(start, stop, device),
                            start: start,
                            end: stop
                        });
                    }
                }
                timeline.setItems(data);
                timeline.repaint();
            });
        },

        /**
         *	Retrieves a list of trips from the server and adds them to the select box
         **	@param {Date} from Start date
         **	@param {Date} to End date
         *	@param {Function} callback The function to call when complete
         */
        getTrips = function (from, to) {
            return api.call("Get", {
                typeName: "Trip",
                search: {
                    fromDate: from.toISOString(),
                    toDate: to.toISOString()
                }
            }).catch(function(error) {
                alert(error);
                return [];
            });
        },
        resize = function() {
            container.style.width = (container.parentNode.offsetWidth - prevButton.offsetWidth - nextButton.offsetWidth - 20) + "px";
        },
        scrollStep = function(direction) {
            if (timeline) {
                var range = timeline.getWindow(),
                    interval = range.end - range.start;

                timeline.setWindow({
                    start: range.start.valueOf() + direction*interval*0.5,
                    end:   range.end.valueOf()   + direction*interval*0.5
                });
            }
        },
        scrollInterval = null,
        abort = function() {
            data = [];
            loadedIds = {};
            devicesCache = false;
        },
        moveBackward = function() {
            if (!scrollInterval) {
                scrollStep(-1);
                scrollInterval = window.setInterval(function() {
                    scrollStep(-1);
                }, 200);
            }
        },
        moveForward = function() {
            if (!scrollInterval) {
                scrollStep(1);
                scrollInterval = window.setInterval(function() {
                    scrollStep(1);
                }, 200);
            }
        },
        stopScrolling = function() {
            if (scrollInterval) {
                window.clearInterval(scrollInterval);
                scrollInterval = null;
            }
        },
        isBrowserSupportTouchEvents = (function(){
            var result = true;
            try{
                document.createEvent("TouchEvent");
            } catch(e){
                result = false;
            }
            return result;
        })();

    resize();


    /* Event Handlers */
    if (isBrowserSupportTouchEvents) {
        prevButton.addEventListener("touchstart", moveBackward, false);
    } else {
        prevButton.addEventListener("mousedown", moveBackward, false);
    }
    if (isBrowserSupportTouchEvents) {
        nextButton.addEventListener("touchstart", moveForward, false);
    } else {
        nextButton.addEventListener("mousedown", moveForward, false);
    }
    document.body.addEventListener("mouseup", stopScrolling, false);
    if (isBrowserSupportTouchEvents) {
        document.body.addEventListener("touchend", stopScrolling, false);
    }


    /* Public Methods */
    return {
        /*
         * Page lifecycle method: initialize is called once when the Add-In first starts
         * Use this function to initialize the Add-In's state such as default values or
         * make API requests (Geotab or external) to ensure interface is ready for the user.
         */
        initialize: function(api, state, callback) {
            if (callback) {
                callback();
            }
            initialize();
        },

        /*
         * Page lifecycle method: focus is called when the page has finished initialize method
         * and again when a user leaves and returns to your Add-In that has already been initialized.
         * Use this function to refresh state such as vehicles, zones or exceptions which may have
         * been modified since it was first initialized.
         */
        focus: function() {
            // devices must be reloaded when page is focused
            devicesCache = false;
            render();
        },

        /*
         * Page lifecycle method: blur is called when the user is leaving your Add-In.
         * Use this function to save state or commit changes to a datastore or release memory.
         */
        blur: function() {
            abort();
        }
    };
};