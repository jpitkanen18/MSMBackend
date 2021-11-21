  //Converts seconds to hours, minutes and seconds

  //most likely useless lmao
  function toHHMMSS(time) {
    var sec_num = parseInt(time, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - hours * 3600) / 60);
    var seconds = sec_num - hours * 3600 - minutes * 60;
  
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    var time = hours + ":" + minutes + ":" + seconds;
    return time;
  }

  function getDate(UNIX_timestamp, offset) {
    var a = new Date(UNIX_timestamp * 1000);
    var offseth = offset / 60 / 60;
    var offsetm = offset / 60;
    a.setUTCDate(a.getUTCDate() + offset);
    var hours = a.getUTCHours();
    var mins = a.getUTCMinutes();
    var secs = a.getUTCSeconds();
    var time = hours + ":" + mins + ":" + secs;
    return time;
  }
  function getDateUTC(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var hours = a.getUTCHours();
    var mins = a.getUTCMinutes();
    var secs = a.getUTCSeconds();
    var time = hours + ":" + mins + ":" + secs + " UTC";
    return time;
  }

  //Returns the current date and time
  function dateTime() {
    var date = new Date();
    var currentHours = date.getHours();
    currentHours = ("0" + currentHours).slice(-2);
    var currentMinutes = date.getMinutes();
    currentMinutes = ("0" + currentMinutes).slice(-2);
    var currentSeconds = date.getSeconds();
    currentSeconds = ("0" + currentSeconds).slice(-2);
    var formattedDate =
      date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear();
    var formattedTime = date.getHours() + ":" + date.getMinutes();
    var formattedTimeFull = currentHours + ":" + currentMinutes + ":" + currentSeconds;
    return [formattedDate, formattedTime,formattedTimeFull, currentSeconds];
  }
  exports.toHHMMSS = toHHMMSS;
  exports.getDate = getDate;
  exports.getDateUTC = getDateUTC;
  exports.dateTime = dateTime;
  