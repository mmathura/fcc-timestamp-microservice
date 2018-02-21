// console.log(process.argv); // for debugging

var http = require('http');

http.createServer((req, res) => {
  
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
    
  var s = req.url;
  console.log("s = " + s); // for debugging
  
  var month = ["January", "February", "March", "April", "May", "June", "July", "August", 
               "September", "October", "November", "December"];
      
  if (s === "/" || s === "/favicon.ico") {
    res.end(null);
  } 
  else {
    var s_url = unescape(s.substr(1)); // remove encoding & trim forward slash  
    console.log("s_url = " + s_url); // for debugging
    var unix_time = Date.parse(s_url); // January 1, 2016
    console.log("unix_time = " + unix_time); // for debugging
    if (!Number.isNaN(unix_time)) { // determine if string is not a number
      var d = new Date(Number(unix_time));
      console.log("d (datestring) = " + d); // for debugging
      console.log("d.getTime() = " + d.getTime()); // for debugging
      if (d.getTime() > 0) {
        // {"unix" : 1451606400, "natural" : "January 1, 2016"}
        var s_date = month[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
        console.log("s_date = " + s_date); // for debugging
        res.end("{\"unix\" : \"" + unix_time + "\", \"normal\" : \"" + s_date + "\"}"); 
      }
    }
    else { // if is a number 
      var d = new Date(Number(s_url)); // 1451606400000
      console.log("d = " + d); // for debugging
      if (d > 0) {
        res.end("{\"unix\" : \"" + s_url + "\", \"normal\" : \"" + month[d.getMonth()] +  
                " " + d.getDate() + ", " + d.getFullYear() + "\"}"); 
      }
      else
        res.end(null);
    }
  }
}).listen(process.env.PORT);

