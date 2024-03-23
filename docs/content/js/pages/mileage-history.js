$(function() {
  // Set export link
    let data = lutil.getExportObject();
    $("#mileage-export").attr("href", "import.html?data=" + btoa(JSON.stringify(data)));

    let log  = lutil.getMileageLog();
    if (log) {
      var sortedLog = lutil.mileageLogToSortedArray(log);
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
        } else {
          var endDate       = moment(entry.logDate);
          var startDateString = lutil.getItem(consts.STARTDATEKEY);
          var startDate     = moment(startDateString);
          var daysBetween   = endDate.diff(startDate, "days");
          var milesBetween  = entry.miles;
          dailyAvgBetween   = milesBetween / daysBetween;
        }
        $(".table tbody").append(`<tr><td>${entry.logDate}</td><td>${entry.miles}</td><td>${dailyAvgBetween.toFixed(2)}</td></tr>`);
      }
    }
  });
