// console.log(process.argv); // for debugging

var http = require('http');

function print_date(d) {
  var month = ["January", "February", "March", "April", "May", "June", 
               "July", "August", "September", "October", "November", "December"];
  return month[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
}

function print_json(s, d) { 
  // {"unix" : 1451606400, "natural" : "January 1, 2016"}
  return "{\"unix\" : \"" + s + "\", \"normal\" : \"" + print_date(d) + "\"}";
}

http.createServer((req, res) => {
  
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
    
  var s = req.url;
  // console.log("s = " + s); // for debugging
      
  if (s === "/" || s === "/favicon.ico") {
    res.end(null);
  } 
  else {
    var s_url = unescape(s.substr(1)); // remove encoding & trim forward slash  
    // console.log("s_url = " + s_url); // for debugging
    var unix_time = Date.parse(s_url); // January 1, 2016
    // console.log("unix_time = " + unix_time); // for debugging
    if (!Number.isNaN(unix_time)) { // determine if string is not a number
      var d = new Date(Number(unix_time));
      // console.log("d (datestring) = " + d); // for debugging
      // console.log("d (gettime) = " + d.getTime()); // for debugging
      if (d.getTime() > 0) {
        // console.log("print_date = " + print_date(d)); // for debugging
        // console.log("print_json (unix_time) = " + print_json(unix_time, d)); // for debugging
        res.end(print_json(unix_time, d));
      }
      else
        res.end(null);
    }
    else { // if is a number 
      var d = new Date(Number(s_url)); // 1451606400000
      // console.log("d = " + d); // for debugging
      if (d > 0) { 
        // console.log("print_json (s_url) = " + print_json(s_url, d)); // for debugging
        res.end(print_json(s_url, d));
      }
      else
        res.end(null);
    }
  }
}).listen(process.env.PORT);