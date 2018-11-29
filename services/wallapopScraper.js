var Nightmare = require('nightmare');
const rp = require('request-promise');
var cheerio = require('cheerio');

// var nightmare = Nightmare({ show: true });

exports.wallapopScraper = function(options, cb) {
  //LocationMap__input text España, Barcelona
  //LocationMap__submit click
  new Nightmare({ show: true })
    .viewport(600, 1024)
    .goto(options.url)
    .click('.qc-cmp-button')
    .wait(1000)
    .click('.WallapopSearch__location')
    .insert('.LocationMap__input', 'España, Barcelona')
    .wait(1000)
    .click('.LocationMap__suggester li:nth-child(1) span')
    .wait(1000)
    .click('.LocationMap__submit')
    .wait(3000)
    .screenshot('screenshots/test.png')
    .evaluate(() => {
      //   let searchResults = [];
      //   const results = document.querySelectorAll('.card-product-content');
      return document.body.innerHTML;
      //   results.forEach(function(result) {
      //     let row = {
      //       title: result.innerText,
      //       url: result.href
      //     };
      //     searchResults.push(row);
      //   });
      //return document.title;
      //   return results;
    })
    .end()
    .then(html => {
      let $ = cheerio.load(html);
      let results = $('.card-product-content')
        .map(function() {
          return $(this).text();
        })
        .get();
      //   results.forEach(function(r) {
      //     console.log('Title: ' + r.title);
      //     console.log('URL: ' + r.url);
      //   });
      console.log(html);
    });
  // .click('.WallapopSearch__location WallapopSearch__location--placeholder')
  // .wait(2000)
  // .insert('.LocationMap__input', 'España, Barcelona')
  // .click('.LocationMap__submit')
  // .wait(2000)
  // .evaluate(function() {
  //   let searchResults = [];
  //   const results = document.querySelectorAll(
  //     '.card js-masonry-item card-product product tracked'
  //   );
  //   results.forEach(function(result) {
  //     console.log('result ' + result);
  //     let row = {
  //       title: result.innerText,
  //       url: result.href
  //     };
  //     searchResults.push(row);
  //   });
  //   return searchResults;
  // })
  // .end()
  // .then(function(result) {
  //   result.forEach(function(r) {
  //     console.log('Title: ' + r.title);
  //     console.log('URL: ' + r.url);
  //   });
  // })
  // .catch(function(e) {
  //   console.log(e);
  // });
  //   rp(options.url)
  //     .then(function(html) {
  //       //success!
  //       console.log(html);
  //       var $ = cheerio.load(html);
  //       const items = [];
  //       console.log($('.card-product').length);
  //       console.log($('.card-product-content').html());
  //     })
  //     .catch(function(err) {
  //       //handle error
  //     });
};
