import config from '../common/config';

chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (let key in changes) {
        var storageChange = changes[key];
        config[key] = storageChange.newValue;
        console.log(key, config[key]);
    }
});

chrome.storage.sync.get(config, function(data) {
    Object.assign(config, data);
});

// chrome.storage.sync.remove(['cross_header']);

chrome.storage.sync.get(null, function(data) {
    console.log(data);
});

chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
        if (!config.referer) return;
        let origin = details.initiator;
        let host = /[^:]+:\/\/[^/]+/.exec(details.url)[0];
        if (host != origin) {
            // 只有跨越了才加
            let requestHeaders = details.requestHeaders;
            for (var i = 0; i < requestHeaders.length; ++i) {
                if (requestHeaders[i].name === 'Referer') {
                    if (config.noreferer) requestHeaders.splice(i, 1);
                    else requestHeaders.splice(i, 1, { name: 'Referer', value: host });
                    return { requestHeaders };
                }
            }
        }
    }, { urls: ["<all_urls>"], types: ['image'] }, ["blocking", "requestHeaders"]);

chrome.webRequest.onHeadersReceived.addListener(
    function(details) {
        if (!config.cross) return;
        let origin = details.initiator;
        let host = /[^:]+:\/\/[^/]+/.exec(details.url)[0];
        if (host != origin) {
            // 只有跨越了才加
            let responseHeaders = details.responseHeaders;
            for (var i = 0; i < responseHeaders.length; ++i) {
                if (responseHeaders[i].name.toLowerCase() === 'access-control-allow-origin') {
                    // 已经有了就不加了
                    return;
                }
            }
            responseHeaders.push({ name: 'Access-Control-Allow-Origin', value: origin });
            if (config.credentials) responseHeaders.push({ name: 'Access-Control-Allow-Credentials', value: 'true' });
            responseHeaders.push({ name: 'Access-Control-Allow-Headers', value: config.cross_header.join(",") });
            return { responseHeaders };
        }
    }, { urls: ["<all_urls>"], types: ['xmlhttprequest'] }, ["blocking", "responseHeaders"]);