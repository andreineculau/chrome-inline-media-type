/*global chrome:true*/
(function () {
    "use strict";

    chrome.webRequest.onHeadersReceived.addListener(function(details) {

        var mediaType;

        function matchHeader(header, url) {
            var content_types = JSON.parse(localStorage['content_types']);
            var success = false;

            content_types.forEach(function(content_type) {
                var url_re = new RegExp(content_type[0]);
                var ct_re  = new RegExp(content_type[1]);
                if (url_re.test(url) && ct_re.test(header)) {
                  success = content_type[2];
                }
            });
            return success;
        }


        // Change Content-Type to "parent" media type
        // and add current content-type as a profile to the "parent" one
        details.responseHeaders.forEach(function(header) {
            var name = header.name.toLowerCase();
            var new_type;

            if (name === 'content-type') {
                if (new_type = matchHeader(header.value, details.url)) {
                    mediaType = true;
                    window.console.log('Changed Content-Type for request: ' + details.url);
                    window.console.log('from: ' + header.value);
                    header.value = new_type;
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
        urls: ['<all_urls>'],
		types: ["main_frame", "sub_frame"]
    }, ['blocking', 'responseHeaders']);
}());
