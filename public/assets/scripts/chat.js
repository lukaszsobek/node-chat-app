const socket = io();
const msgListContainer = document.querySelector(".chat-page__messages");
const locationButton = document.querySelector(".form-container__location-btn");
const messageForm = document.querySelector(".form-container__message-form");

function scrollToBottom() {
    const clientHeight = msgListContainer.clientHeight;
    const scrollTop = msgListContainer.scrollTop;
    const scrollHeight = msgListContainer.scrollHeight;

    const lastChild = msgListContainer.lastChild;
    const lastChildHeight = lastChild.innerHeight;
    const lastButOneChildHeight = lastChild.previousSibling.innerHeight;

    const totalHeight = 
        clientHeight 
        + scrollTop 
        + lastChildHeight
        + lastButOneChildHeight;

    if(totalHeight >= scrollHeight) {
        console.log("Triggered");
    }
}

socket.on("connect", function() {
    console.log("Connected to server");
    const urlParams = urlDestructure();
    const user = urlParams.searchparams.get("user");
    const room = urlParams.searchparams.get("room");

    socket.emit("join", { user, room }, function(err) {
        if(err) {
            window.location.href = "/";
            return;
        }

    });
});

socket.on("welcomeMessage", function(payload) {
    const welcomeMessageNode = makeNewMessageHTML(payload);
    msgListContainer.appendChild(welcomeMessageNode);    
});

socket.on("userListChange", function(userList) {
    console.log(userList);
});

socket.on("newMessage", function(payload) {
    const messageNode = makeNewMessageHTML(payload);
    msgListContainer.appendChild(messageNode);
    scrollToBottom();
});

socket.on("newLocationMessage", function(payload) {
    const locationMessageNode = makeLocationMessageHTML(payload);
    msgListContainer.appendChild(locationMessageNode);
    scrollToBottom();
});

socket.on("disconnect", function () {
    console.log("Disconnected from server");
});

messageForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const msgText = messageForm
        .elements["message-form__input"].value.trim();

    if(!msgText) {
        return;
    }

    socket.emit("createMessage", msgText, function() {
        messageForm.elements["message-form__input"].value = "";
    });
});

if(!"geolocation" in navigator) {
    locationButton.disabled = true;
} else {
    const locationButtonText = locationButton.innerText;

    locationButton.addEventListener("click", function() {
        locationButton.innerText = "...";
        locationButton.disabled = true;

        navigator.geolocation.getCurrentPosition(function(position) {
            locationButton.innerText = locationButtonText;
            locationButton.disabled = false;

            socket.emit("geolocationMessage", {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        });
    });
}
