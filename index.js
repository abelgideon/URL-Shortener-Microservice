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

let id = 1;
const urlMap = {}

app.post('/api/shorturl', function(req, res) {
  const link = req.body.url;
  const urlObject = url.parse(link);

  dns.lookup(urlObject.host, function(err, address) {
    if (err) res.json({"error": "invalid url"});
    if (!urlMap[link]) {
      urlMap[link] = id;
      id++;
    }
    res.json({"original_url": `${urlObject.protocol}//${urlObject.host}`, "short_url": urlMap[link]});
  })
})

app.get('/api/shorturl/:id', function(req, res) {
  const id = req.params.id;
  res.redirect(Object.keys(urlMap).find(key => urlMap[key] == id));
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
