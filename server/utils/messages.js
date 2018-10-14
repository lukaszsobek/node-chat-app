const makeDate = () => new Date().getTime();

const makeMessage = (from, text) => ({
    from,
    text,
    createdAt: makeDate()
});

const makeLocationLinkMessage = (from, coords) => {
    const googleMapsLink =
        "https://www.google.com/maps/place/"
        + coords.latitude + "/" + coords.longitude;

    return {
        from,
        locationUrl: encodeURI(googleMapsLink),
        createdAt: makeDate()
    };
};
     
module.exports = {
    makeLocationLinkMessage,
    makeMessage
};