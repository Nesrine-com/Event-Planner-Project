const Event = require('../models/Event.models');
const User = require('../models/Users.models');
const jwt = require('jsonwebtoken');

module.exports.findAll = (req, res) => {
  Event.find()
    .then(Events => {
      console.log("All events found", Events);
      res.json(Events);
    })
    .catch(error => {
      console.log(error);
      res.json(error);
    });
};

module.exports.create = (req, res) => {
  const newsEventObject =new Event(req.body);
  newsEventObject.createdBy=req.jwtpayload
 newsEventObject.save()
    .then(newEvent => {
      res.json(newEvent);
    })
    .catch(error => {
      console.error(error);
      res.status(400).json(error);
    });
};

module.exports.getOne = (req, res) => {
  Event.findById(req.params.id)
    .populate("createdBy", "firstName lastName")
    .then(oneEvent => {
      res.json(oneEvent);
    })
    .catch(error => {
      console.log("Error", error);
      res.json(error);
    });
};

module.exports.delete = (req, res) => {
  Event.findByIdAndDelete(req.params.id)
    .then(deletedEvent => {
      res.json(deletedEvent);
    })
    .catch(error => {
      console.log("Error", error);
      res.json(error);
    });
};

module.exports.update = (req, res) => {
  Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    .then(updatedEvent => {
      res.json(updatedEvent);
    })
    .catch(error => res.status(400).json(error));
};
