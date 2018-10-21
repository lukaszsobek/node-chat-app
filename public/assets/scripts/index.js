const socket = io();
const msgListContainer = document.querySelector(".chat-page__messages");

function makeTime(createdAt) {
    return moment(createdAt).format("HH:mm");
}

socket.on("connect", function () {
    console.log("Connected to server");
});

socket.on("welcomeMessage", function(payload) {
    const welcomeMessageNode = makeNewMessageHTML(payload);
    msgListContainer.appendChild(welcomeMessageNode);    
});

socket.on("newMessage", function(payload) {
    const messageNode = makeNewMessageHTML(payload);
    msgListContainer.appendChild(messageNode);
});

socket.on("newLocationMessage", function(payload) {
    const locationMessageNode = makeLocationMessageHTML(payload);
    msgListContainer.appendChild(locationMessageNode);
});

socket.on("disconnect", function () {
    console.log("Disconnected from server");
});

const messageForm = document.querySelector(".form-container__message-form");
messageForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const msgFrom = "client";
    const msgText = messageForm
        .elements["message-form__input"].value.trim();

    if(!msgText) {
        return;
    }

    socket.emit("createMessage", {
        from: msgFrom,
        text: msgText
    }, function() {
        messageForm.elements["message-form__input"].value = "";
    });
});

if( "geolocation" in navigator) {
    const locationButton = document.querySelector(".form-container__location-btn");
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

