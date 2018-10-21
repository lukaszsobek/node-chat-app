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

module.exports = {
    newMessageHTML
};