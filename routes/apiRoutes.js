const express = require('express');
const router = express.Router();
const agent = require('../middleware/agent');
const validate = require('../lib/validate');
const generate = require('../lib/generate');
const Url = require('../models/Url');

router.get('/url/:short', agent.getIPAgent, async (req, res) => {
  try {
    let { short } = req.params,
      lngUrl = '';
    console.log(short);
    validate.checkUrl(short, true);
    if (req.query.info !== 'true') {
      // count query as a view
      lngUrl = await Url.findOneAndUpdate(
        { short },
        { $inc: { views: 1 }, $push: { viewer: req.ipAgent } },
        { new: true }
      ).exec();
    } else {
      // just retrieve the info, don't count
      lngUrl = await Url.findOne({ short }).exec();
    }
    res.status(200).json({ url: lngUrl });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: 'Sorry, the url you were looking for could not be found.'
    });
  }
});

router.post('/url', agent.getIPAgent, async (req, res) => {
  try {
    let { url } = req.body;
    validate.checkUrl(url, false);
    let lngUrl = await new Url({
      long: url,
      short: generate.createShortUrl(8),
      agent: req.ipAgent
    }).save();
    res.status(200).json({ ...lngUrl.toObject() });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;
