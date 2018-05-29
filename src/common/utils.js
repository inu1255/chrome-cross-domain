let utils = {
    syncValues(keys) {
        var data = {};
        for (let key of keys) {
            data[key] = {
                get() {
                    return this.init[key];
                },
                set(value) {
                    this.init[key] = value;
                    chrome.storage.sync.set({[key]: value });
                }
            };
        }
        return data;
    }
};

export default utils;