function makeTime(createdAt) {
    return moment(createdAt).format("HH:mm");
}

function makeNewMessageHTML(props) {
    if (!props.from || !props.text || !props.createdAt) {
        return;
    }

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
    const messageContainer = document.createElement("p");
    const msgTime = makeTime(props.createdAt);
    messageContainer.innerHTML = 
    `${msgTime} - ${props.from}: <a target="_blank" href="${props.locationUrl}">${linkText}</a>`;

    return messageContainer;
}
