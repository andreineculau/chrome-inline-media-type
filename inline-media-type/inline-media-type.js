/*global chrome:true*/
(function () {
    "use strict";

    chrome.webRequest.onHeadersReceived.addListener(function(details) {
        var mediaType,
            RE = /(.*\+(json|xml))(;?.*)/;

        // Change Content-Type to "parent" media type
        // and add current content-type as a profile to the "parent" one
        details.responseHeaders.forEach(function(header) {
            var name = header.name.toLowerCase();

            if (name === 'content-type') {
                if (RE.test(header.value)) {
                    mediaType = true;
                    window.console.log('Changed Content-Type for request: ' + details.url);
                    window.console.log('from: ' + header.value);
                    header.value = header.value.replace(RE, 'application/$2; profile=$1$3');
                    window.console.log('to: ' + header.value);
                }
            }
        });
        // Display it inline
        details.responseHeaders.forEach(function(header) {
            var name = header.name.toLowerCase();

            if (name === 'content-disposition') {
                if (mediaType) {
                    header.value = 'inline';
                }
            }
        });

        return {
            responseHeaders: details.responseHeaders
        };
    }, {
        urls: ['<all_urls>']
    }, ['blocking', 'responseHeaders']);
}());
