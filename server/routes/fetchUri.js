const express = require('express');
const Shortener = require('../database/model');
const router = express.Router();


router.get('/:urlId', async function(req, res, next) {
  try {
    let url = await Shortener.findOne({ urlId:req.params.urlId });
    console.log("🚀 ~ file: fetchUri.js:9 ~ router.get ~ url:", url)
    if (url) {
        if(url.isSingleUse && url.clicks === 1) return res.json('Link not usable more than once')
        await Shortener.updateOne(
            {
              urlId: req.params.urlId,
            },
            { $inc: { clicks: 1 } }
        );
        return res.redirect(301,url.url);
    } else res.status(404).json ('Not found');
  } catch (err) {
    console.log(err);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
