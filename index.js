require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const dns = require('dns');
const bodyParser = require('body-parser');
const url = require('url');
app.use(bodyParser.urlencoded({ extended: true }));

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

let id = 4;
const urlMap = {
  'https://www.google.com/': 1,
  'https://www.freecodecamp.org/': 2,
  'https://forum.freecodecamp.org/': 3,
}

app.post('/api/shorturl', function(req, res) {
  const link = req.body.url;
  const urlObject = url.parse(link);
  if (!urlObject.hostname) return res.json({"error": "invalid url"});
  
  dns.lookup(urlObject.hostname, function(err, address) {
    if (err) return res.json({"error": "invalid url"});
    if (!urlMap[link]) {
      urlMap[link] = id;
      id++;
    }
    console.log(urlMap);
    res.json({"original_url": link, "short_url": urlMap[link]});
  })
})

app.get('/api/shorturl/:id', function(req, res) {
  const id = req.params.id;
  const originalUrl = Object.keys(urlMap).find(key => urlMap[key] == id);

  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.json({"error":"No short URL found for the given input"});
  }
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
