const express = require('express');
const crypto = require('crypto');
const Shortener = require('../database/model');
const router = express.Router();


urlValidation = (url) => {
  const pattern = new RegExp(/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/)
  return pattern.test(url)
}

router.post('/', async function(req, res, next) {
  const {longUrl, isSingleUse} = req.body
  const id = crypto.randomBytes(4).toString("base64");
  const sanitizedString = randomBytes
                          .replace(/\+/g, '%2B')
                          .replace(/\//g, '%2F')
                          .replace(/_/g, '%5F');
  if(urlValidation(longUrl)){
    try {
      let url = await Shortener.findOne({ url:longUrl });
      if (url) {
        res.json(url);
      } else {
        const shortUrl = `${process.env.BASE_URI}/${sanitizedString}`;
  
        url = new Shortener({
          url: longUrl,
          shortUrl,
          urlId: sanitizedString,
          isSingleUse,
          createdAt: new Date(),
        });
  
        await Shortener.create(url);
        res.json(url);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json('Server Error');
    }
  } else res.status(400).json ('Invalid Original Url. Valid Sample URL -> http://www.example.com/');
});

module.exports = router;
