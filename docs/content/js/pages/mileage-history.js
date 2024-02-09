$(function() {
    let log = lutil.getMileageLog();
    if (log) {
      var props = Object.getOwnPropertyNames(log);
      for(var i = 0; i < props.length; i++) {
        var propName = props[i];
        var miles = log[propName];

        $(".table tbody").append(`<tr><td>${propName}</td><td>${miles}</td></tr>`);
      }
    }
  });
