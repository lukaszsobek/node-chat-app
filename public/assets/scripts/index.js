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
        const locationObj = {};

        navigator.geolocation.getCurrentPosition(function(position) {
            locationObj.latitude = position.coords.latitude;
            locationObj.longitude = position.coords.longitude;
        });

        socket.emit("geolocationMessage", locationObj);
    });

    

}

