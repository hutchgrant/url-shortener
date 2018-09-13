const express = require('express');
const router = express.Router();
const moment = require('moment');
const agent = require('../middleware/agent');
const validate = require('../lib/validate');
const generate = require('../lib/generate');
const Url = require('../models/Url');
const DailyView = require('../models/DailyView');
const View = require('../models/View');

router.get('/url/:short', agent.getIPAgent, async (req, res) => {
  try {
    let { short } = req.params,
      lngUrl = '',
      dailyviews = [],
      viewers = [],
      today = moment().startOf('day');

    validate.checkUrl(short, true);
    if (req.query.info !== 'true') {
      // retrieve info and count view
      lngUrl = await Url.findOneAndUpdate(
        { short },
        { $inc: { views: 1 } },
        { new: true }
      ).exec();

      let view = await new View({
        url: lngUrl,
        ...req.ipAgent
      }).save();

      dailyviews = await DailyView.findOneAndUpdate(
        { date: today, url: lngUrl },
        { $inc: { views: 1 }, date: today, url: lngUrl },
        { upsert: true }
      ).exec();
    } else {
      // just retrieve the info, don't count
      lngUrl = await Url.findOne({ short }).exec();
      if (lngUrl) {
        dailyviews = await DailyView.find({
          url: lngUrl,
          date: {
            $lte: today,
            $gte: moment()
              .subtract(7, 'days')
              .calendar()
          }
        });

        viewers = await View.find({
          url: lngUrl
        }).limit(10);
      }
    }
    res.status(200).json({ url: lngUrl, dailyviews, viewers });
  } catch (err) {
    res.status(500).json({
      error: 'Sorry, the url you were looking for could not be found.'
    });
  }
});

router.get('/url/viewers/:id', async (req, res) => {
  /// Paginate viewers
  let page = parseInt(req.query.page);
  let max = parseInt(req.query.max);
  let sort = req.query.sort;
  let direction = req.query.direction;

  page = page - 1;
  page = page > 0 ? page * max : 0;
  try {
    viewers = await View.find({
      url: req.params.id
    })
      .sort({ [sort]: direction })
      .skip(page)
      .limit(max)
      .exec();
    res.status(200).json({ viewers });
  } catch (err) {
    res.status(500).json({ error: "Couldn't retrieve viewers" });
  }
});

router.post('/url', agent.getIPAgent, async (req, res) => {
  try {
    let { url } = req.body;
    validate.checkUrl(url, false);

    let view = await new View({
      ...req.ipAgent
    }).save();

    let lngUrl = await new Url({
      long: url,
      short: generate.createShortUrl(8),
      agent: view
    }).save();
    res.status(200).json({ ...lngUrl.toObject() });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;
