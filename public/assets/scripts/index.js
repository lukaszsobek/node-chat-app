const socket = io();

socket.on("connect", function () {
    console.log("Connected to server");
});

socket.on("welcomeMessage", function(payload) {
    const messageContainer = document.createElement("p");
    messageContainer.innerText = payload.from + ": " + payload.text;

    document.body.appendChild(messageContainer);    
});

socket.on("newMessage", function(payload) {
    console.log("New message", payload);
    const messageContainer = document.createElement("p");
    messageContainer.innerText = payload.from + ": " + payload.text;

    document.body.appendChild(messageContainer);
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

const messageForm = document.querySelector(".messageForm");
messageForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const msgFrom = "client";
    const msgText = messageForm.elements["message"].value.trim();

    if(!msgText) {
        return;
    }

    socket.emit("createMessage", {
        from: msgFrom,
        text: msgText
    }, function() {
        messageForm.elements["message"].value = "";
    });
});

if( "geolocation" in navigator) {
    const locationButton = document.querySelector(".locationButton");
    locationButton.addEventListener("click", function(e) {

        navigator.geolocation.getCurrentPosition(function(position) {
            socket.emit("geolocationMessage", {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        });
    });

    

}

