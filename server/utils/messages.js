const makeDate = () => new Date().getTime();

const makeMessage = (from, text) => ({
    from,
    text,
    createdAt: makeDate()
});

module.exports = { makeMessage };