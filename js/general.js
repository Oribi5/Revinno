
function formatString(string) {
  let result = "";

  let arr = string.split("-");
  // console.log(arr);
  for ( let i=0; i<arr.length; i++ ) {
    result += arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    if ( i != arr.length-1 ) {
      result += " "
    }
  }
  return result;
}

function millisFormat(duration) {
    var milliseconds = parseInt((duration%1000)/100)
        , seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
}
