// here we initialize our modules - after we will work with them like with objects
var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
const wallapopScraperService = require('./services/wallapopScraper');
const sendMail = require('./services/mailService');

var app = express();
const port = 8081;

var wallapopResults;

// here you can see how are making routes in Node.js + Express. The first parameter - the route,
// the second is a callback function, which have two default parameters - request and response.
// For example, if you want to get some data from the page you should address from response variable
app.get('/scrape/users', function(req, res) {
  // Do you have a Github account? Enter here your login!
  var user = 'torvalds';
  url = 'https://api.github.com/users/' + user; // making request with headers, url and callback function
  request({ headers: { 'user-agent': 'node.js' }, url }, function(
    error,
    response,
    html
  ) {
    if (!error) {
      var result = response.body.split(','); // we separating every row with "," to make output more readable
    } // Here we writing our JSON result into a file. The first parameter is the name of the file; // the second is our JSON (we use JSON.stringify to print each row on a new line); // and callback function to let us know about the status of function
    fs.writeFile('output.json', JSON.stringify(result, null, 4), function(err) {
      console.log('File successfully written!');
    });
    res.send('Check your console!');
  });
});
app.get('/scrape/wallapop', function(req, res) {
  if (wallapopResults === undefined)
    url =
      'https://es.wallapop.com/search?bodyTypeIds=van&dist=400&publishDate=any&professional=false&catIds=100&maxPrice=8000&maxMileage=250000&minRegistrationDate=2008&minSeats=6';
  else
    url =
      'https://es.wallapop.com/search?bodyTypeIds=van&dist=400&publishDate=24&professional=false&catIds=100&maxPrice=8000&maxMileage=250000&minRegistrationDate=2008&minSeats=6';

  options = { url };
  wallapopScraperService.wallapopScraper(options, function(results) {
    // TODO stuf with the results

    if (wallapopResults === undefined) wallapopResults = results;
    else {
      if (JSON.stringify(wallapopResults) != JSON.stringify(results)) {
        wallapopResults.every(elem => results.indexOf(elem) > -1);
        console.log('diferents');
      }
    }
    fs.writeFile('wallapopResults.json', results, function(err) {
      //   sendMail.enviarMail(results, function(err) {
      //     if (err) {
      //       console.log('Error ' + err);
      //     }
      //   });
      console.log('File successfully written!');
    });
    res.status(200).json(results);
  });
  //res.send('Check your console!');
});
app.listen(port, function() {
  console.log('Server is running on ' + port + ' port');
});
