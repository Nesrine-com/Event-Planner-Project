const UserController = require('../controllers/UserControllers');

module.exports = (app) => {
  app.post('/api/users/register', UserController.registerUser);
  app.post('/api/users/login', UserController.loginUser);
  app.get('/api/loggedUser',UserController.getLoggedInUser)
 
};