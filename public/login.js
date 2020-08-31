async function login(element) {
    // !Create error checks!
    var username = element[0].value.trim();
    var password = element[1].value.trim();

    var xhr = new XMLHttpRequest();
    var location = window.location;
    var postURL = location.protocol + "//" + location.host + "/login";

    xhr.open("POST", postURL, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onload = function(e) {
        if (xhr.response === 'OK') {
            window.location.href = window.location.protocol + "//" + window.location.host;
        }
        else {
            alert("Username or password is incorrect");
        }
    }
    xhr.send(JSON.stringify({"username": username, "password": password}));
}
