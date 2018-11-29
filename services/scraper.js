const rp = require('request-promise');
var cheerio = require('cheerio');

exports.wallapopScraper = function(options, cb) {
  rp(options.url)
    .then(function(html) {
      //success!
      console.log(html);
      var $ = cheerio.load(html);
      const items = [];
      console.log($('.card-product').length);
      console.log($('.card-product-content').html());
    })
    .catch(function(err) {
      //handle error
    });
};
