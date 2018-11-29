const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });

nightmare
  .goto('https://duckduckgo.com')
  .type('#search_form_input_homepage', 'github nightmare')
  .click('#search_button_homepage')
  .wait('#r1-0 a.result__a')
  .evaluate(() => document.querySelector('#r1-0 a.result__a').href)
  .end()
  .then(console.log)
  .catch(error => {
    console.error('Search failed:', error);
  });

// nightmare
//   .goto('http://cnn.com')
//   .evaluate(() => {
//     return document.title;
//   })
//   .end()
//   .then(title => {
//     console.log(title);
//   });
