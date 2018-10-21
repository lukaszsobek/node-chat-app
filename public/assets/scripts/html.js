function makeNewMessageHTML(props) {
    if (!props.from || !props.text || !props.createdAt) {
        return;
    }

    // console.log("New message", payload);
    const messageContainer = document.createElement("p");
    const msgTime = makeTime(props.createdAt);
    const msgContent = `${msgTime} - ${props.from}: ${props.text}`;
    messageContainer.innerText = msgContent;

    return messageContainer;
}

function makeLocationMessageHTML(props) {
        if(!props.from || !props.createdAt || !props.locationUrl) {
            return;
        }

        const linkText = "My location";

        // console.log("New location message", payload);
        const messageContainer = document.createElement("p");
        messageContainer.innerHTML = 
        `${makeTime(props.createdAt)} - ${props.from}: <a target="_blank" href="${props.locationUrl}">${linkText}</a>`;

        return messageContainer;
}
