var api;

document.addEventListener("DOMContentLoaded", function () {

    "use strict";

    var GeotabLogin = (function () {
        
        var authenticationCallback,
            debug = {
                enabled: false,
                server: "",
                database: "",
                email: "",
                password: ""
            };

        function initializeGeotabApi() {
            api = GeotabApi(function (detailsCallback) {    
                authenticationCallback = detailsCallback;

                // Create the modal background to sign up
                const preventDuplicate = document.querySelectorAll('.blanket').length;
                if(preventDuplicate === 0){
                    var blanket = document.createElement("div");
                    blanket.setAttribute("id", "blanket");
                    blanket.setAttribute("class", "blanket");
                    document.body.appendChild(blanket);
                }
                
                // Hide scroll-bar when signing in
                document.body.style.overflow = 'hidden';

                // Show sign in components 
                document.getElementById("signin-content").style.display = "block";

                // Show example in the background
                document.querySelector(".container").style.display = "inline-block";
            }, {
                rememberMe: false
            });
        }

        function signOut(reason) {
            if (reason !== undefined) {
                alert(reason);
            }

            // Determines if the modal background is present if not creates the background 
            const preventDuplicate = document.querySelectorAll('.blanket').length;
            if(preventDuplicate === 0){
                var blanket = document.createElement("div");
                blanket.setAttribute("id", "blanket");
                blanket.setAttribute("class", "blanket");
                document.body.appendChild(blanket);
            }

            document.getElementById("signin-content").style.display = "block";
            // document.getElementById("example-content").style.display = "none";
            document.querySelector(".container").style.display = "inline-block";
        }

        function closeModal(id) {
            var modal = document.getElementById(id + "-modal"),
                blanket = document.getElementById("blanket");

            // Show the examples scroll-bar when the modal closed
            document.body.style.overflow = 'auto';

            modal.parentNode.removeChild(modal);
            blanket.parentNode.removeChild(blanket);
        }

        function showModal(id) {
            var blanket = document.createElement("div"),
                modal = document.createElement("div"),
                modalClose = document.createElement("button");

            blanket.setAttribute("id", "blanket");
            blanket.setAttribute("class", "blanket");
            blanket.onclick = function () {
                closeModal(id);
            };
            document.body.appendChild(blanket);

            modalClose.setAttribute("class", "modalClose");
            modalClose.onclick = function () {
                closeModal(id);
            };
            modalClose.classList.add("material-icons");
            modalClose.innerText = "close";

            modal.setAttribute("id", id + "-modal");
            modal.setAttribute("class", "modal bordered");
            modal.style.display = "block";
            modal.innerHTML = document.getElementById(id).innerHTML;

            modal.appendChild(modalClose);
            document.body.appendChild(modal);
        };

        function createLabel(options) {
            var element = document.createElement("label");
            element.setAttribute("for", options.for);
            element.innerHTML = options.html;
            return element;
        };

        function createInput(options) {
            var element = document.createElement("input");
            element.setAttribute("id", options.id);
            element.setAttribute("type", options.type);
            element.setAttribute("placeholder", options.placeholder);
            if (options.value !== undefined) {
                element.setAttribute("value", options.value);
            }
            return element;
        };

        function intializeInterface() {
            // Build the outer container holding the sign in form
            var signInContainer = document.createElement("div");
            signInContainer.classList.add("sign-in-container");
            signInContainer.setAttribute("id", "signin-container");

            // Div holding the heading text below (e.g. Welcome!)
            var signInHeader = document.createElement("div");
            signInHeader.classList.add("sign-in-header");
            
            var heading1 = document.createElement("h1");
            heading1.innerText = "Welcome!";
            var heading2 = document.createElement("h2");
            heading2.innerText = "Please enter your MyGeotab credentials to continue.";

            // Div containing the disclaimer
            var signInDisclaimer = document.createElement("div");
            signInDisclaimer.classList.add("sign-in-disclaimer");

            // Using materialize css to import the 'error' icon
            var disclaimerIcon = document.createElement("div");
            disclaimerIcon.classList.add("material-icons");
            disclaimerIcon.innerText = "error";

            var disclaimerText = document.createElement("h2");
            disclaimerText.innerText = "This tool is provided as an example and is available on an As-Is basis, you must assume all the risks and costs associated with the use of the sample tool, including, any damage to any equipment, software, information or data.";
                
            signInHeader.appendChild(heading1);
            signInHeader.appendChild(heading2);
            
            signInDisclaimer.appendChild(disclaimerIcon);
            signInDisclaimer.appendChild(disclaimerText);

            signInContainer.appendChild(signInHeader);
            signInContainer.appendChild(signInDisclaimer);

            // Build sign in form
            var form = document.createElement("form"),
                legend = document.createElement("legend"),
                paragraph1 = document.createElement("p"),
                paragraph2 = document.createElement("p"),
                paragraph3 = document.createElement("p"),
                paragraph4 = document.createElement("p"),
                button = document.createElement("button")

            // Build server field
            paragraph1.appendChild(createLabel({
                for: "server",
                html: "Server Name"
            }));
            paragraph1.appendChild(createInput({
                id: "server",
                type: "text",
                placeholder: "e.g. my.geotab.com",
                value: (debug.enabled === true ? debug.server : undefined)
            }));

            // Build database field
            paragraph2.appendChild(createLabel({
                for: "database",
                html: "Database"
            }));
            paragraph2.appendChild(createInput({
                id: "database",
                type: "text",
                placeholder: "e.g. MyCompany",
                value: (debug.enabled === true ? debug.database : undefined)
            }));

            // Build email field
            paragraph3.appendChild(createLabel({
                for: "email",
                html: "Email"
            }));
            paragraph3.appendChild(createInput({
                id: "email",
                type: "email",
                placeholder: "e.g. my.name@mycompany.com",
                value: (debug.enabled === true ? debug.email : undefined)
            }));

            // Build password field
            paragraph4.appendChild(createLabel({
                for: "password",
                html: "Password"
            }));
            paragraph4.appendChild(createInput({
                id: "password",
                type: "password",
                placeholder: "*********",
                value: (debug.enabled === true ? debug.password : undefined)
            }));

            button.setAttribute("id", "signin");
            button.classList.add("primary-btn");
            button.classList.add("sign-in-btn");
            button.innerHTML = "Sign in";

            form.appendChild(legend);
            form.appendChild(paragraph1);
            form.appendChild(paragraph2);
            form.appendChild(paragraph3);
            form.appendChild(paragraph4);
            form.appendChild(button);

            signInContainer.appendChild(form);

            document.getElementById("signin-content").appendChild(signInContainer);

            var templateButton = document.getElementById("template");

            if (templateButton) {
                templateButton.addEventListener("click", function (event) {
                    event.preventDefault();

                    // Hide the examples scroll-bar when the template open
                    document.body.style.overflow = 'hidden';

                    showModal("template-content");
                });
            }

            document.getElementById("signin").addEventListener("click", function (event) {
                event.preventDefault();

                // Transparent background behind the sign-in modal
                var blanket = document.getElementById("blanket");
                
                var server   = document.getElementById("server").value,
                    database = document.getElementById("database").value,
                    email    = document.getElementById("email").value,
                    password = document.getElementById("password").value;
                    
                authenticationCallback(server, database, email, password, function (error) {
                    alert(error);
                    document.body.style.overflow = 'hidden';
                    signOut();
                });
                                
                // Show scroll-bar when sign in successful
                document.body.style.overflow = 'auto';

                // Remove sign in modal and the modal background
                blanket.parentNode.removeChild(blanket);
                document.getElementById("signin-content").style.display = "none";
                document.getElementById("example-content").style.display = "inline-block";
            });

            document.getElementById("signout").addEventListener("click", function (event) {
                event.preventDefault();

                if (api !== undefined) {
                    api.forget();
                }

                signOut();
            });

            // document.getElementById("help").addEventListener("click", function (event) {
            //     event.preventDefault();
            //     showModal("help-content");
            // });
        }

        return function () {
            this.initialize = function () {
                initializeGeotabApi();
                intializeInterface();
            }
        };

    })();

    var app = new GeotabLogin();
    app.initialize();

});
