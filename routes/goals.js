const express = require('express');
const router = express.Router();
const config = require('../config/database');

const Goal = require('../models/goal');

router.post('/newgoal', (req, res, next) => {
  let newGoal = new Goal({
    text: req.body.text,
    expDate: req.body.expDate,
    status: req.body.status
  })
  console.log(newGoal);

  Goal.addGoal(newGoal, (err, goal) => {
    if (err) {
      res.json({success: false, message: 'Failed to add goal', error: err})
    } else {
      res.json({success: true, message: 'Goal has been added'})
    }
  })
});

router.get('/', (req, res, next) => {
  let goals = Goal.find({}, (error, goals)=> {
    if (error) {
      console.log(error);
    } else {
      res.json({goals: goals});
    }
  });
});

router.post('/add', (req, res, next)=> {
  let newGoal = new Goal();
  newGoal.text = req.body.text;
  newGoal.expiredDate = req.body.expiredDate;
  newGoal.status = req.body.status;

  newGoal.save((error)=> {
    if (error) {
      res.json({success: false, message: 'Failed to add new goal', error: error});
    } else {
      res.json({success: true, message: 'Goal added'});
    }
  });
});

// Get Single Goal
router.get('/goal/:id', (req, res)=> {
  Goal.findById(req.params.id, (err, goal)=> {
    res.json({goal: goal});
  });
});

// Update Single Goal
router.post('/goal/edit/:id', (req, res)=>{
  let newGoal = {};

  newGoal.text = req.body.text;
  newGoal.expiredDate = req.body.expiredDate;
  newGoal.status = req.body.status;

  let query = {_id: req.params.id};

  Goal.update(query, newGoal, (error)=> {
    if (error) {
      res.json({success: false, message: 'Failed to update the goal', error: error});
    } else {
      res.json({success: true, message: 'Goal updated'});
    }
  });
});

module.exports = router;
