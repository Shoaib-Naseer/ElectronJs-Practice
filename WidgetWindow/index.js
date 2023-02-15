let request = require('request');

request(
  'https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand',
  (err, response, body) => {
    let bodyJson = JSON.parse(body);

    let num = Math.floor(Math.random() * 10);
    console.log(num);
    let randomQuote = bodyJson[num]['content'].rendered;
    console.log(bodyJson[0]['content'].rendered);
    document.getElementById('quote').innerHTML = randomQuote;
  }
);

//new Quote after every 5 second=
setInterval(function () {
  request(
    'https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand',
    (err, response, body) => {
      let bodyJson = JSON.parse(body);
      let num = Math.floor(Math.random() * 10);
      let randomQuote = bodyJson[num]['content'].rendered;
      console.log(bodyJson[0]['content'].rendered);
      document.getElementById('quote').innerHTML = randomQuote;
    }
  );
}, 1000);
