"use strict";
var Waiting = function () {
    var waitingElement = kml.args.container.querySelector("#waiting"),
        opts = {
            lines: 13 // The number of lines to draw
            , length: 24 // The length of each line
            , width: 14 // The line thickness
            , radius: 42 // The radius of the inner circle
            , scale: 1 // Scales overall size of the spinner
            , corners: 1 // Corner roundness (0..1)
            , color: "#000" // #rgb or #rrggbb or array of colors
            , opacity: 0.25 // Opacity of the lines
            , rotate: 0 // The rotation offset
            , direction: 1 // 1: clockwise, -1: counterclockwise
            , speed: 1 // Rounds per second
            , trail: 60 // Afterglow percentage
            , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
            , zIndex: 2e9 // The z-index (defaults to 2000000000)
            , className: "spinner" // The CSS class to assign to the spinner
            , top: "50%" // Top position relative to parent
            , left: "50%" // Left position relative to parent
            , shadow: false // Whether to render a shadow
            , hwaccel: false // Whether to use hardware acceleration
            , position: "absolute" // Element positioning
        },
        target = waitingElement,
        spinner = new Spinner(opts),
        progressBarContainer = kml.args.container.querySelector("#progressContainer"),
        progressBar = kml.args.container.querySelector("#importProgress");
    return {
        show: function () {
            waitingElement.style.display = "";
            spinner.spin(target);
        },
        hide: function () {
            waitingElement.style.display = "none";
            spinner.stop();
        },
        showProgressBar: function () {
            progressBarContainer.style.display = "";
            kml.args.container.style.overflow = "hidden";
            kml.args.container.style.height = "100%";
            progressBar.value = "0";
        },
        hideProgressBar: function() {
            setTimeout(function () {
                if (progressBarContainer) {
                    progressBarContainer.style.display = "none";
                    kml.args.container.style.overflow = "";
                    kml.args.container.style.height = "auto";
                }
            }, 400);
        },
        updateProgressBar: function (value) {
            if (progressBar) {
                progressBar.value += value;
            }
        }
    };
};