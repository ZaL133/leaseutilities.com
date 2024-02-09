$(function() {

    // Miles 
    let miles = lutil.getItem(lutil.consts.MILEAGEKEY);
    if (miles) $("#miles").val(miles);

    // Start Date
    let startDate = lutil.getItem(lutil.consts.STARTDATEKEY);
    if (startDate) $("#startDate").val(moment(startDate).format("yyyy-MM-DD"));

    // Annual Allowed Miles
    let annualMiles = lutil.getItem(lutil.consts.ANNUALMILESKEY);
    if (annualMiles) $("#annualAllowedMiles").val(annualMiles);


      $("#submit").click((e) => {
          e.preventDefault();

          // Miles
          var miles = $("#miles").val();
          if (miles) lutil.setItem(lutil.consts.MILEAGEKEY, miles);

          // Start Date 
          var startDate = moment($("#startDate").val());
          if (startDate) lutil.setItem(lutil.consts.STARTDATEKEY, startDate);

          // Annual Allowed Miles
          var annualAllowedMiles = $("#annualAllowedMiles").val();
          if (annualAllowedMiles) lutil.setItem(lutil.consts.ANNUALMILESKEY, annualAllowedMiles);

          var today = moment();
          var days  = today.diff(startDate, 'days');

          lutil.logMileage({ 
              logDate : today.format("yyyy-MM-DD"),
              miles   : miles
          });

          // Do all calculations here
          var dailyAverageMiles = miles / days;
          var projectedAnnualMiles = dailyAverageMiles * 365;

          if (annualAllowedMiles) {

            // Calculate the avg you'll need to drive to hit your target 
            var dailyAverageAtTarget  = (annualAllowedMiles / 365).toFixed(2);
            var daysLeftInCurrentYear = 365 - days;
            var milesLeft             = annualAllowedMiles - miles;
            var averageToHitTarget    = milesLeft / daysLeftInCurrentYear;
            var moreInfoText = `There are <span class='highlight'>${daysLeftInCurrentYear}</span> left in the current year.
At this rate, you will need to average <span class='highlight'>${averageToHitTarget.toFixed(1)}</span> miles per day to hit your allowed miles target.
`;
            $("#moreInfo").html(moreInfoText);

            // Calculations 
            var projectedOverage = projectedAnnualMiles - annualAllowedMiles;
            
            if (projectedOverage > 0) {
              $("#projectedOverage").val(projectedOverage.toFixed(1));
            }
          }

          $("#dailyAverageMiles").val(dailyAverageMiles.toFixed(1));
          $("#projectedAnnualMiles").val(parseInt(projectedAnnualMiles.toFixed(1)));
      })
  })
