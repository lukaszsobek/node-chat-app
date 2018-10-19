const socket = io();
const msgListContainer = document.querySelector(".chat-page__messages");

socket.on("connect", function () {
    console.log("Connected to server");
});

socket.on("welcomeMessage", function(payload) {
    const messageContainer = document.createElement("p");
    messageContainer.innerText = payload.from + ": " + payload.text;

    msgListContainer.appendChild(messageContainer);    
});

socket.on("newMessage", function(payload) {
    console.log("New message", payload);
    const messageContainer = document.createElement("p");
    messageContainer.innerText = payload.from + ": " + payload.text;

    msgListContainer.appendChild(messageContainer);
});

socket.on("newLocationMessage", function(payload) {
    console.log("New location message", payload);
    const messageContainer = document.createElement("p");

    messageContainer.innerHTML = 
        `${payload.from}: <a target="_blank" href="${payload.locationUrl}">My location</a>`;

    document.body.appendChild(messageContainer);
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

