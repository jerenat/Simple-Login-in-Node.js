"use strict";

let formBox = document.querySelector("#formpost")

formBox.addEventListener("submit", (e) => {

    var fData = formToJSON(formBox);

    postData("/api/post",JSON.parse(fData)).then(data => {

        console.log(data)

    });

    e.preventDefault();
})