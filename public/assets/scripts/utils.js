function urlDestructure(url = window.location.search) {
    const urlNode = document.createElement("a");
    urlNode.href = url;

    const {
        hash,
        host,
        hostname,
        href,
        origin,
        pathname,
        port,
        protocol,
        search
    } = urlNode;

    return {
        hash,
        host,
        hostname,
        href,
        origin,
        pathname,
        port,
        protocol,
        search,
        searchparams: new Map(search.slice(1).split('&').map(keyValue => keyValue.split('=')))
    };
}