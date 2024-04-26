"use strict";

var loginBox = document.querySelector(".login");
var loginForm = loginBox.querySelector("form");

loginForm.addEventListener("submit", async (e) => {
  var fData = formToJSON(loginForm);

  postData("/api/login", JSON.parse(fData)).then((data) => {
    switch (data.message) {
      case "OK":
        window.location.href = "/profile";
        break;
    }
  });

  e.preventDefault();
});
