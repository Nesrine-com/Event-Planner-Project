const User = require('../models/Users.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
module.exports = {
  registerUser: async (req, res) => {
    try {
      const { email } = req.body;
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const user = new User(req.body);
      const newUser = await user.save();
      console.log('User created', newUser);

      // Generate a token
      const userToken = jwt.sign(
        {
          _id: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          password: newUser.password
        },
        process.env.JWT_SECRET
      );

      res
        .status(201)
        .cookie('userToken', userToken, { httpOnly: true, expires: new Date(Date.now() + 90000) })
        .json({ successMessage: 'User logged in', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Login user
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        res.status(400).json({ message: 'Invalid credentials' });
      } else {
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
          res.status(400).json({ message: 'Invalid credentials' });
        } else {
          const userToken = jwt.sign(
            {
              _id: user._id,
              email: user.email,
              password: user.password
            },
            process.env.JWT_SECRET
          );
          res
            .status(201)
            .cookie('userToken', userToken, { httpOnly: true, expires: new Date(Date.now() + 90000) })
            .json({ successMessage: 'User logged in', user: user });
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  getLoggedInUser: (req, res) => {
    try {
      const user = jwt.verify(req.cookies.userToken, process.env.JWT_SECRET);
      User.findOne({ _id: user._id })
        .then(user => {
          res.json(user);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};
