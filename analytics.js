(function() {
    'use strict';
    var STORAGE_KEY = 'btk_analytics';
    var MAX_ENTRIES = 5000;

    function getStore() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        } catch(e) {
            return [];
        }
    }

    function save(data) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch(e) {}
    }

    function record() {
        var entry = {
            p: location.pathname,
            t: new Date().toISOString(),
            r: document.referrer || '',
            s: screen.width + 'x' + screen.height,
            l: navigator.language || ''
        };
        var data = getStore();
        data.push(entry);
        if (data.length > MAX_ENTRIES) {
            data = data.slice(-MAX_ENTRIES);
        }
        save(data);
    }

    record();
})();
