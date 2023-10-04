var addMultipleZones = function (USA_ZONES) {
        var zonesToAdd = [], i;
        for (i = 0; i < USA_ZONES.length; i++) {
            zonesToAdd.push(["Add", {
                typeName: "Zone",
                entity: {
                    name: USA_ZONES[i].name,
                    mustIdentifyStops: true,
                    displayed: true,
                    activeFrom: "1986-01-01T00:00:00.000Z",
                    activeTo: "2050-01-01T00:00:00.000Z",
                    zoneTypes: ["ZoneTypeCustomerId"],
                    fillColor: {r: 255, g: 255, b: 0, a: 100}, //yellow
                    points: USA_ZONES[i].coords,
                    groups: [
                        {id: "GroupCompanyId"}
                    ]
                }
            }]);
        }
        api.multiCall(zonesToAdd, function () {
            console.log("Added zones");
        }, console.error);
    },
    USA_ZONES = [{
        name: "New York",
        coords: [
            { x: -74.28, y: 40.88 },
            { x: -74.27, y: 40.53 },
            { x: -72.85, y: 40.74 },
            { x: -72.95, y: 40.99 }
        ]
    }];

addMultipleZones(USA_ZONES);
/*opt nomin*/