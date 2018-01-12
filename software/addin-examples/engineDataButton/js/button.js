geotab.customButtons.engineDataButton = function(event, api, state) {
    var diagnostics = ["DiagnosticEngineSpeedId", "DiagnosticGoDeviceVoltageId", "DiagnosticTotalTripFuelUsedId"],
        device = (function(){
            var pageState = state.getState();
            return (pageState && pageState.liveVehicleIds && typeof pageState.liveVehicleIds === "object" && pageState.liveVehicleIds.length) ? pageState.liveVehicleIds[0] : null;
        })(),
        dateRange = (function(){
            var date = new Date(),
                interval = 60*60*24*1000,   // a day
                endDate = new Date(date.getTime() - interval);
            return {
                startDate: endDate.toISOString(),
                endDate: date.toISOString()
            }
        })(),
        messenger = (function(){
            var text = "Select any vehicle first",
                addAttributes = function(element, attrs){
                    var a;
                    for (a in attrs){
                        attrs.hasOwnProperty(a) && element.setAttribute(a, attrs[a]);
                    }
                },
                addCss = function(element, styles){
                    var a;
                    for (a in styles){
                        if (styles.hasOwnProperty(a)){
                            element.style[a] = styles[a]
                        }
                    }
                },
                createElement = function(elemName, attrs, css, appendTo){
                    var elem = document.createElement(elemName);
                    attrs && addAttributes(elem, attrs);
                    css && addCss(elem, css);
                    appendTo && appendTo.appendChild(elem);
                    return elem;
                },
                timer,
                destroy = function(){
                    timer && clearInterval(timer);
                    timer = undefined;
                    closeIcon && closeIcon.removeEventListener("click", closeEvent, false);
                    mainContainer && mainContainer.parentNode && mainContainer.parentNode.removeChild(mainContainer);
                    mainContainer = undefined;
                    textContainer = undefined;
                    closeIcon = undefined;
                },
                closeEvent = function(){
                    destroy();
                },
                mainContainer,
                textContainer,
                closeIcon,
                getMainCont = function(){
                    return document.querySelector("#engineDataButton-addin");
                },
                createMainCont = function(){
                    mainContainer = createElement("div", {
                        id: "engineDataButton-addin"
                    }, {
                        border: "1px solid #ffeb94",
                        "background-color": "#fffcdd",
                        color: "#222",
                        margin: "0 auto 0 auto",
                        position: "relative",
                        width: "600px",
                        top: 0,
                        right: "0",
                        "z-index": "10004",
                        "table-layout": "fixed",
                        opacity: 0.9,
                        "text-align": "center"
                    }, document.body);
                    mainContainer.destroy = destroy;
                    textContainer = createElement("h2", null, {
                        display: "inline-block",
                        margin: "5px 0",
                        "word-wrap": "break-word",
                        "font-weight": "normal",
                        "font-size": "1.5em",
                        color: "#222",
                        "text-align": "center"
                    }, mainContainer);
                    textContainer.innerHTML = text;
                    closeIcon = createElement("span", null, {
                        float: "right",
                        "margin-top": "9px",
                        "font-size": "20px",
                        width: "30px",
                        position: "relative",
                        top: "-0.1em",
                        left: "-0.1em",
                        "font-family": "arial",
                        "font-style": "normal",
                        "font-weight": "bold",
                        cursor: "pointer",
                        display: "inline-block",
                        "text-decoration": "none",
                        "text-align": "center",
                        "vertical-align": "middle",
                        "overflow": "hidden",
                        "font-variant": "normal",
                        "text-transform": "none",
                        color: "#222"
                    }, mainContainer);
                    closeIcon.innerHTML = "x";
                    closeIcon.addEventListener("click", closeEvent, false);
                };

            return {
                showMessage: function(){
                    mainContainer = getMainCont();
                    if (!mainContainer){
                        createMainCont();
                        timer = setInterval(destroy, 5000);
                    }
                },
                destroy: function(){
                    mainContainer = mainContainer || getMainCont();
                    mainContainer && mainContainer.destroy();
                }
            };
        })();
    if (device && device !== "all"){
        messenger.destroy();
        state.gotoPage("engineDataProfile", {
            dateRange: dateRange,
            device: [device],
            diagnostic: diagnostics
        });
    } else {
        messenger.showMessage();
    }
};