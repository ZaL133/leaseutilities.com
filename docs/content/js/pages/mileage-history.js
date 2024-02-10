$(function() {
    let log = lutil.getMileageLog();
    $("#mileage-export").attr("href", "import.html?log=" + btoa(JSON.stringify(log)));

    if (log) {
      var sortedLog = mileageLogToSortedArray(log);
      for(var i = 0; i < sortedLog.length; i++) {
        var entry           = sortedLog[i];
        var dailyAvgBetween = 0;

        if (i > 0) {
          var lastEntry     = sortedLog[i - 1];
          var endDate       = moment(entry.logDate);
          var startDate     = moment(lastEntry.logDate);
          var daysBetween   = endDate.diff(startDate, "days");
          var milesBetween  = entry.miles - lastEntry.miles;
          dailyAvgBetween   = milesBetween / daysBetween;
        }
        $(".table tbody").append(`<tr><td>${entry.logDate}</td><td>${entry.miles}</td><td>${dailyAvgBetween.toFixed(2)}</td></tr>`);
      }
    }

    function mileageLogToSortedArray(log) {
      var rv = [];
      if (log) {
        var props       = Object.getOwnPropertyNames(log);
        for(var i = 0; i < props.length; i++) {
          var propName  = props[i];
          var miles     = log[propName];
          rv.push({ logDate : propName, miles });
        }

        return rv.sort((a, b) => {
          if (a.logDate < b.logDate) return -1;
          if (a.logDate > b.logDate) return 1;
          return 0;
        });
      }
    }
  });
