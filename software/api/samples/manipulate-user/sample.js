var getUser = function (userName, password) {
        api.call("Get", {
            typeName : "User",
            search : {
                name : userName
            }
        }, function (result) {
            if (result.length !== 1) {
                console.log("User does not exist.");
                addUser(userName, password);
            } else {
                console.log("User Exists. Changing Password.");
                result = result[0];
                result.password = password; //append password to the new entity
                setPassword(result);
            }
        }, console.error);
    },
    addUser = function (userName, password) {
        api.call("Add", {
            typeName : "User",
            entity : {
                name : userName,
                firstName : "Tester",
                lastName : "Tester",
                changePassword : false,
                password : password,
                companyGroups : [{
                    id : "GroupCompanyId"
                }],
                reportGroups : [{
                    id : "GroupCompanyId"
                }],
                securityGroups : [{
                    id : "GroupEverythingSecurityId"
                }],
                userAuthenticationType : "BasicAuthentication",
                timeZoneId : "America/New_York",
                activeFrom : new Date().toISOString(),
                activeTo : "2050-01-01T00:00:00.000Z"
            }
        }, function (results) {
            console.log("Added User with Given Password");
        }, console.error);
    },

    setPassword = function (entity) {
        api.call("Set", {
            typeName : "User",
            entity : entity
        }, function (results) {
            console.log("Successfully reset existing user's password");
        }, console.error);
    };


var userNameInput = document.getElementById("userName"),
    passwordInput = document.getElementById("userPassword"),
    changePasswordButton = document.getElementById("changePassword");

changePasswordButton.addEventListener("click", function() {
    getUser(userNameInput.value, passwordInput.value);
}, false);
/*opt nomin*/