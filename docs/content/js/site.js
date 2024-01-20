lutil = (function() {
    let publicApi = {};

    function getItem(key) {
        return localStorage.getItem(key);
    }

    function setItem(key, val) {
        localStorage.setItem(key, val);
    }

    function clearItems(items) {
        if (Array.isArray(items)) {
            items.forEach((x) => localStorage.removeItem(x));
        }
        else {
            localStorage.removeItem(items);
        }
    }

    publicApi.consts = {
        /* Index */
        MILEAGEKEY : "MILEAGEKEY",
        STARTDATEKEY : "STARTDATEKEY",

        /* Payments */ 
        MSRP:                       "MSRPKEY",
        NEGOTIATEDVEHICLEPRICE:     "NVPKEY",
        DOWNPAYMENT:                "DPKEY",
        LEASETERMS:                 "LEASETERMSKEY",
        MONEYFACTOR:                "MONEYFACTOR",
        RESIDUALVALUE:              "RESIDUALVALUEKEY"
    };
    publicApi.getItem = getItem;
    publicApi.setItem = setItem;

    return publicApi;
})();