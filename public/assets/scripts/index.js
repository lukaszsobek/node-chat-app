const socket = io();


socket.on("connect", function () {
    console.log("Connected to server");
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