const express = require('express');
const Project = require('../models/Project');

require('dotenv').config();

const router = express.Router();

//// Users
// B@B Users API
////

router.get('/', async function (req, res) {
  console.log(req.query)
  const { id, url, location, endDate, raiseGoal, owner } = req.query;

  try {
    let filter = {};
    if (id) {
      filter.id = id;
    }
    if (url) {
      filter.url = url;
    }
    if (location) {
      console.log(location)
      filter.location = location;
    }
    if (raiseGoal) {
      if (raiseGoal.indexOf("-") > 0) {
        const splitArr = raiseGoal.split("-");
        splitArr[0] = splitArr[0].replaceAll(' ', '').replaceAll(/,/g, '');
        splitArr[1] = splitArr[1].replaceAll(' ', '').replaceAll(/,/g, '');
        filter.raiseGoal = { "$gt" :  parseInt(splitArr[0]), "$lt" : parseInt(splitArr[1])}
      } else {
        r = raiseGoal.replaceAll(/,/g, '').replace("+", '');
        console.log(typeof parseInt(r))
        filter.raiseGoal = { "$gt" :  parseInt(r)}
      }
    }
    if (endDate) {
      console.log('end')
    }
    if (owner) {
      filter.owner = owner
    }
    let projects = await Project.find(filter);
    return res.status(200).json(projects);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
});

// Get all event ids a user has been to
router.get('/:url', async function (req, res) {
  const { url } = req.params;
  try {
    let project = await Project.findOne({ url: url });
    if (!project) throw new Error('No record found.');

    return res.status(200).json(project);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.post('/newProject', async function (req, res) {
  const { id, name, coverImage, url, address, projectInfo, nftsNum, totalTransactions, raiseCurrent, raiseGoal, totalShares, location, endDate, owner, startDate, minInvestment } = req.body;

  if (!name || !coverImage || !url || !address || !projectInfo || !totalTransactions || !raiseCurrent || !raiseGoal || !totalShares || !location || !endDate || !owner || !startDate || !minInvestment) {
    return res.status(400).json({
      error: 'Missing required fields',
    });
  }

  try {
    var new_project = new Project({
      id,
      name,
      address,
      coverImage,
      url,
      projectInfo, 
      totalTransactions, 
      raiseCurrent, 
      raiseGoal, 
      totalShares, 
      location, 
      endDate, 
      owner, 
      startDate, 
      minInvestment
    });
    await new_project.save();
    return res.status(200).json(new_project);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.post('/attendEvent', async function (req, res) {
  const { address, eventId } = req.body;

  try {
    let user = User.findOne({ address });
    if (!user) throw new Error('No user found.');

    let event = Event.findOne({ _id: eventId });
    if (!event) throw new Error('No event found.');

    var newUserEvent = new UserEvent({
      userId: user._id,
      eventId,
    });
    await newUserEvent.save();
    return res.status(200).json(newUserEvent);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
