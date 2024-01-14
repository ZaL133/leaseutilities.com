lutil = (function() {
    let publicApi = {};

    function getItem(key) {
        return localStorage.getItem(key);
    }

    function setItem(key, val) {
        localStorage.setItem(key, val);
    }

    publicApi.consts = {
        MILEAGEKEY : "MILEAGEKEY",
        STARTDATEKEY : "STARTDATEKEY"
    };
    publicApi.getItem = getItem;
    publicApi.setItem = setItem;

    return publicApi;
})();