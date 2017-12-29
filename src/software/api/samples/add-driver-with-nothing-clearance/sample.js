var addUserMethod = function () {
    api.call("Add", {
        typeName : "User",
        entity : {
            name : "Jabba The Hutt",
            firstName : "Tester",
            lastName : "Tester",
            password : "testingExample123456",
            companyGroups : [{
                id : "GroupCompanyId"
            }
            ],
            securityGroups : [{
                id : "GroupNothingSecurityId"
            }
            ],
            userAuthenticationType : "BasicAuthentication",
            activeFrom : new Date().toISOString(),
            activeTo : "2050-01-01T00:00:00.000Z",
            /* Driver Properties */
            driverGroups : [{
                id : "GroupCompanyId"
            }
            ],
            keys : [{
                serialNumber : "00000000012d4567",
                driverKeyType : "Usb",
                isImmobilizeOnly : true
            }
            ]
        }
    }, function (result) {
        console.log("User add success: 'id': " + result);
    }, console.error);
};

addUserMethod();
/*opt nomin*/