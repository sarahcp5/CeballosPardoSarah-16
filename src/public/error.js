import config from "../config/config.js";

const PORT = config.app.PORT;

function redirect(url) {
    if(url == 'LOGIN') {
        window.location.href = "http://localhost:" + PORT + "/login";
    }
    else if(url == 'SIGNUP') {
        window.location.href = "http://localhost:" + PORT + "/";
    }
}