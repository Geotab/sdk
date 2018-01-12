"use strict";
var Utils = function () {
    let errorMessageElement = kml.args.container.querySelector("#errorMessage");

    return {
        inputTypeSupport: function (type, testValue) {
            var testEl = document.createElement("input");

            testEl.setAttribute("type", type);
            testEl.setAttribute("value", testValue);
            return testEl.type === type && testEl.value !== testValue;
        },
        isBrowserSupportTouchEvents: function () {
            var result = true;
            try {
                document.createEvent("TouchEvent");
            } catch (e) {
                result = false;
            }
            return result;
        },
        colorObjToArr: function (color) {
            if (!Array.isArray(color)) {
                return [color.r, color.g, color.b, color.a];
            }
            return color;
        },
        rgbToHex: function (rgbaOrR, G, B) {
            if (typeof rgbaOrR === "object") {
                return kml.rgbToHex.apply(this, [rgbaOrR.r, rgbaOrR.g, rgbaOrR.b]);
            }
            return "#" + [rgbaOrR, G, B].map(function (number) {
                    var hex = (number || 0).toString(16);
                    return hex.length < 2 ? "0" + hex : hex;
                }).join("");
        },
        hexToRGBArray: function (hexColor) {
            var normalizedColor = this.normalizeHexColor(hexColor),
                hexToDec = offset => parseInt(normalizedColor.slice(offset, offset + 2), 16);
            return [
                hexToDec(0),
                hexToDec(2),
                hexToDec(4)
            ];
        },
        normalizeHexColor: hexColor => hexColor.replace("#", "").replace(/^(.)(.)(.)$/, "$1$1$2$2$3$3"),
        showError: function (message) {
            errorMessageElement.textContent = message;
            errorMessageElement.style.display = "";
        },
        hideError: function () {
            if (errorMessageElement.style.display != "none") {
                errorMessageElement.style.display = "none";
            }
        },
        getSelectValues: function (select) {
            var result = [],
                options = select && select.options,
                opt;

            for (var i = 0, iLen = options.length; i < iLen; i++) {
                opt = options[i];

                if (opt.selected) {
                    result.push({value: opt.value});
                }
            }
            return result;
        },
        decodeHTMLEntities: function (str) {
            var a = document.createElement("a");
            if (str && typeof str === "string") {
                str = str.replace(/&amp;nbsp;/g, "");
            }
            a.innerHTML = str;
            return a.textContent;
        }
    };
};