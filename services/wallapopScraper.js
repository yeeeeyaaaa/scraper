var Nightmare = require('nightmare');
const rp = require('request-promise');
var cheerio = require('cheerio');

exports.wallapopScraper = function(options, cb) {
  let limitPreuInferior = 1000;
  let prohibitedWords = ['alquilo', 'ofrezco'];

  new Nightmare({ show: true })
    .viewport(1024, 800)
    .goto(options.url)
    .click('.qc-cmp-button')
    .wait(1000)
    .click('.WallapopSearch__location')
    .insert('.LocationMap__input', 'España, Barcelona')
    .wait(1000)
    .click('.LocationMap__suggester li:nth-child(1) span')
    .wait(1000)
    .click('.LocationMap__submit')
    .wait(1000)
    //.screenshot('screenshots/test.png')
    .evaluate(() => {
      return document.body.innerHTML;
    })
    .end()
    .then(html => {
      let $ = cheerio.load(html);
      let results = $('.card-product-content')
        .map(function() {
          const $element = $(this);
          let image = $element.find('.card-product-image').attr('src');
          let preu = $element
            .find('.product-info-price')
            .text()
            .replace('\n', '')
            .replace('.', '')
            .replace('€', '')
            .replace(/ /g, '');
          let url =
            'https://es.wallapop.com' +
            $element.find('.product-info-title').attr('href');
          let title = $element
            .find('.product-info-title')
            .text()
            .replace('\n', '');
          let descripcio = $element.find('.product-info-description ').text();
          if (
            limitPreuInferior <= parseInt(preu) ||
            (22 >= parseInt(preu) &&
              (prohibitedWords.some(w => title !== w) ||
                prohibitedWords.some(w => descripcio !== w)))
          ) {
            return {
              image,
              preu,
              url,
              title,
              descripcio
            };
          }
        })
        .get();

      cb(results);
    });
};
