let consts = {
        /* Index */
        MILEAGEKEY : "MILEAGEKEY",
        STARTDATEKEY : "STARTDATEKEY",
        MILEAGEHISTORYKEY: "MILEAGEHISTORYKEY",
        ANNUALMILESKEY: "ANNUALMILESKEY",

        /* Payments */ 
        MSRP:                       "MSRPKEY",
        NEGOTIATEDVEHICLEPRICE:     "NVPKEY",
        DOWNPAYMENT:                "DPKEY",
        LEASETERMS:                 "LEASETERMSKEY",
        MONEYFACTOR:                "MONEYFACTOR",
        RESIDUALVALUE:              "RESIDUALVALUEKEY"
    };

lutil = (function() {
    let publicApi = {};

    function getItem(key) {
        return localStorage.getItem(key);
    }

    function getMileageLog() {
        return JSON.parse(getItem(consts.MILEAGEHISTORYKEY));
    }

    /*
        Save each mileage log, only once per day - keep the last entry
        mileageLogInfo {
            logDate : DateTime,
            miles: int
        }
     */
    function logMileage(mileageInfo) {
        // make sure the mileageInfo object is valid
        if (
            mileageInfo.hasOwnProperty("logDate")
            && moment(mileageInfo["logDate"]) != "Invalid Date"
            && mileageInfo.hasOwnProperty("miles")
            && parseFloat(mileageInfo["miles"]) != NaN
        ) {
            let log = {};
            try {
                log     = JSON.parse(getItem(consts.MILEAGEHISTORYKEY));
            } catch {}

            let logDate = mileageInfo["logDate"];
            let miles   = mileageInfo["miles"];

            log[logDate] = miles;

            var logString = JSON.stringify(log);

            setItem(consts.MILEAGEHISTORYKEY, logString);
        }
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

    publicApi.consts = consts;
    publicApi.getItem       = getItem;
    publicApi.getMileageLog = getMileageLog;
    publicApi.logMileage    = logMileage;
    publicApi.setItem       = setItem;

    return publicApi;
})();