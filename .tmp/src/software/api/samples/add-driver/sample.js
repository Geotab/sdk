var addDriver = function (user, driverGroups) {
        api.call("Add", {
            typeName : "User",
            entity : {
                name : user.name,
                firstName : user.firstName,
                lastName : user.lastName,
                password : user.password,
                companyGroups : [{
                    id : "GroupCompanyId"
                }
                ],
                securityGroups : [{
                    id : "GroupEverythingSecurityId"
                }
                ],
                userAuthenticationType : "BasicAuthentication",
                activeFrom : new Date().toISOString(),
                activeTo : "2050-01-01T00:00:00.000Z",
                /**
                 * User is a driver if below property is set.
                 */
                driverGroups : driverGroups
            }
        }, function () {
            console.log("Added driver " + user.name);
        }, console.error);
    },
    driverNameInput = document.getElementById("driverName"),
    driverFirstNameInput = document.getElementById("driverFirstName"),
    driverLastNameInput = document.getElementById("driverLastName"),
    driverPasswordInput = document.getElementById("driverPassword"),
    addDriverButton = document.getElementById("addDriver");

addDriverButton.addEventListener("click", function() {
    addDriver({
        name: driverNameInput.value,
        firstName: driverFirstNameInput.value,
        lastName: driverLastNameInput.value,
        password: driverPasswordInput.value
    }, [{ id: "GroupCompanyId" }]);
}, false);
/*opt nomin*/