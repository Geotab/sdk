"use strict";
var angularObj = {
    app: null,
    initAngular: function () {
        let container = document.getElementById("importKMLZonesId");

        angularObj.app = angular.module("importKMLZones", []);

        angularObj.app.directive("modalDialog", function () {
            return {
                restrict: "E",
                scope: {
                    show: "="
                },
                replace: true, // Replace with the template below
                transclude: true, // we want to insert custom content inside the directive
                link: function (scope, element, attrs) {
                    scope.dialogStyle = {};
                    if (attrs.width) {
                        scope.dialogStyle.width = attrs.width;
                    }
                    if (attrs.height) {
                        scope.dialogStyle.height = attrs.height;
                    }
                    scope.hideModal = function () {
                        scope.show = false;
                        container.style.overflow = "";
                        container.style.height = "auto";
                    };
                },
                template: "<div class='ng-modal' ng-show='show'>" +
                "<div class='ng-modal-overlay' ng-click='hideModal()'></div>" +
                "<div class='ng-modal-dialog' ng-style='dialogStyle'>" +
                "<div class='ng-modal-close' ng-click='hideModal()'>X</div>" +
                "<div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
            };
        });

        angularObj.app.service("clearService", function () {
            var clearService = {};
            clearService.clear = function () {
                kml.clear();
            };
            return clearService;
        });

        angularObj.app.controller("optionsController", ["$scope", "clearService", function ($scope, clearService) {
            $scope.modalShown = false;

            $scope.toggleModal = function () {
                var showZoneTypes = function (zoneTypes) {
                    $scope.zoneTypeOptions = [];
                    kml.prevSelectedTypes = [];
                    zoneTypes.forEach(function (type) {
                        $scope.zoneTypeOptions.push({
                            id: type.id,
                            name: type.name,
                            isSystem: type.isSystem ? type.isSystem : false,
                            comment: type.comment ? type.comment : ""
                        });
                    });
                    $scope.$apply();
                    //set default type value if selection is empty
                    kml.options.zoneTypes.every(function (type, index) {
                        let typesSelect = container.querySelector("#typesSelect");
                        if (type === kml.defaultZoneType && typesSelect.selectedIndex === -1) {
                            typesSelect.selectedIndex = index;
                            return false;
                        }
                        return true;
                    });
                };

                kml.api.call("Get", {typeName: "ZoneType"}, function (data) {
                    showZoneTypes(kml.addSystemZoneTypes(data, true));
                }, function () {
                    showZoneTypes(kml.addSystemZoneTypes([], true));
                });
                $scope.colorPickerValue = kml.colorPicker.getPicker().getHexValue();
                $scope.transparencySliderValue = $scope.transparencySliderValue ||
                    kml.colorPicker.getDefaultTransparencyValue();

                if (kml.utils.inputTypeSupport("range", "a")) {
                    container.querySelector(".vanillaSlider").value = $scope.transparencySliderValue;
                }
                angular.element(container.querySelector("input.vanillaSlider")).on("input", function (event) {
                    var val = event.target.value;
                    $scope.transparencySliderValue = Number(val);
                    kml.colorPicker.getTransparencyControl().set({a: val});
                    container.querySelector("#colorPickerField").style.opacity = ((100 - val) / 100);
                    $scope.$apply();
                });

                var colorPickerField = container.querySelector("#colorPickerField");
                if (!kml.utils.inputTypeSupport("color", "hello world")) {
                    angular.element(colorPickerField).on("focus", function () {
                        kml.colorPicker.getPicker().originalPicker.showPicker(this);
                    });
                    angular.element(colorPickerField).on("blur", function () {
                        var value = kml.colorPicker.getPicker().originalPicker.valueElement.value;
                        if (kml.colorPicker.getPicker().originalPicker.pickerIsActive === false) {
                            kml.colorPicker.getPicker().originalPicker.hidePicker();
                        } else {
                            $scope.colorPickerValue = value;
                            this.value = value;
                            this.style.backgroundColor = value;
                            $scope.$apply();
                            this.focus();
                        }
                    });
                } else {
                    angular.element(colorPickerField).on("change", function () {
                        kml.colorPicker.getPicker().setValue(kml.utils.hexToRGBArray(this.value));
                    });
                }
                $scope.modalShown = !$scope.modalShown;
                if ($scope.modalShown === true) {
                    container.style.overflow = "hidden";
                    container.style.height = "100%";
                }
            };
            $scope.setQuickColor = function (event) {
                $scope.colorPickerValue = kml.colorPicker.setQuickColor(event);
            };
            $scope.changeZoneStop = function (event) {
                if (!event.target.checked) {
                    event.preventDefault();
                }
                var checkboxes = event.target.parentNode.querySelectorAll(".geotabSwitchButton");
                for (var i = 0; i < checkboxes.length; i++) {
                    if (checkboxes[i].id != event.target.id) {
                        checkboxes[i].checked = false;
                    }
                }
                event.target.checked = true;
            };
            $scope.applyOptions = function () {
                kml.applyOptions();
                container.style.overflow = "";
                container.style.height = "auto";
                $scope.modalShown = false;
            };
            $scope.setDefaultOptions = function () {
                kml.setDefaultOptions();
                $scope.colorPickerValue = kml.colorPicker.getDefaultColorHex();
                $scope.transparencySliderValue = kml.colorPicker.getDefaultTransparencyValue();
                if (kml.utils.inputTypeSupport("range", "a")) {
                    container.querySelector(".vanillaSlider").value = $scope.transparencySliderValue;
                }
            };
            $scope.clear = function () {
                clearService.clear();
            };
            $scope.selectType = function (event) {
                var i, unselect = null,
                    typesSelect = container.querySelector("#typesSelect");
                kml.prevSelectedTypes = kml.prevSelectedTypes || [];
                setTimeout(function () {
                    //select all previously selected items
                    for (i = 0; i < kml.prevSelectedTypes.length; i++) {
                        typesSelect.options[kml.prevSelectedTypes[i]].selected = true;
                    }
                    //unselect current item if already selected
                    if (unselect !== null) {
                        typesSelect.options[unselect].selected = false;
                    }
                }, 0);
                kml.selectedTypes = typesSelect.selectedOptions || kml.utils.getSelectValues(typesSelect);
                for (i = 0; i < kml.selectedTypes.length; i++) {
                    if (kml.prevSelectedTypes.indexOf(kml.selectedTypes[i].index) === -1) {
                        kml.prevSelectedTypes.push(kml.selectedTypes[i].index);
                    }
                }
                //if clicked already selected item save it's index to unselect
                if (event.target.selected) {
                    unselect = event.target.index;
                    kml.prevSelectedTypes.splice(kml.prevSelectedTypes.indexOf(unselect), 1);
                } else {
                    unselect = null;
                }
            };
        }]);
        angularObj.app.controller("parsedDataController", ["$scope", "clearService", function ($scope, clearService) {
            $scope.uploaderTitle = kml.isFormDataSupported ? "Drop your files here or click to select them" : "Click here to choose kml file";
            $scope.importSelectedZones = function () {
                kml.importZones();
            };
            $scope.hideImported = function (event) {
                kml.hideImported(event);
            };
            $scope.exportKML = function () {
                kml.exportKML();
            };
            $scope.selectAll = function (event) {
                kml.selectAll(event);
            };
            $scope.uploadFiles = function (event) {
                var files = event.target.files;
                clearService.clear();
                kml.parseFiles(files);
            };
        }]);
    }
};