const express = require('express');
const router = express.Router()
const { getUsers, createUser, loginUser, verificarSesion, logoutUser} = 
require('../controllers/users_controller');
const upload = require("../middlewares/upload");
const multer = require("multer");

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
  .post((req, res) => {

      upload.single("imagen")(req, res, function(err){

          if(err instanceof multer.MulterError){

              //ERROR DE TAMAÑO
              if(err.code === "LIMIT_FILE_SIZE"){

                  return res.status(400).json({
                      success: false,
                      message: "La imagen es demasiado pesada. Máximo 5MB"
                  });

              }

          }else if(err){

              //ERROR DE TIPO DE ARCHIVO
              return res.status(400).json({
                  success: false,
                  message: err.message
              });

          }

          createUser(req, res);

      });

  });

router.route('/login')
  .post(loginUser);

router.route('/session')
  .get(verificarSesion);

router.route('/logout')
  .post(logoutUser);
  
// router.route('/users/:id')
//   .patch(updateUser) // Update: Update a user by ID
//   .delete(deleteUser); // Delete: Delete a user by ID

module.exports = router;
