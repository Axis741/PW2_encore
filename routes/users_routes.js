const express = require('express');
const router = express.Router()
const { getUsers, createUser, loginUser} = 
require('../controllers/users_controller');
const upload = require("../middlewares/upload");

router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});
// router.get('/', (req, res) => {
//   res.send('Users home page')
// })
// router.get('/about', (req, res) => {
//   res.send('About users')
// })

router.route('/')
  .get(getUsers)
  .post(upload.single("imagen"),createUser);

router.route('/login')
  .post(loginUser);
  
// router.route('/users/:id')
//   .patch(updateUser) // Update: Update a user by ID
//   .delete(deleteUser); // Delete: Delete a user by ID

module.exports = router;
