const usersModel = require('../models/users_model');
//const users = [ { id: 1, name: 'Hadi Soufan' }, { id: 2, name: 'Melia Malik' }, { id: 3, name: 'Zayn Cerny' }];
// @desc    Get all users
// @route   GET /api/v1/users
// @access  Public
exports.getUsers = async (req, res) => {
  const users = await usersModel.find();
  res.status(200).json({ success: true, count: users.length, data: users});
};

//-------------CREATE--------------
// @desc    Create new user
// @route   POST /api/v1/create
// @access  Public

// exports.createUser = async (req, res) => {
//   const {name} = await usersModel.create(req.body);  
//   //const id = users.length + 1;
//   //users.push({ id, name });
//   res.status(201).json({ success: true, user: { id, name }, message: 'User created successfully' });
// };

//----------UPDATE-----------------
// @desc    Update a user
// @route   PATCH /api/v1/users/:id
// @access  Public

// exports.updateUser = (req, res) => {
//   const id = req.params.id;
//   const { name } = req.body;
//   const user = users.find(user => user.id == id);
//   if (user) {
//    user.name = name;
//     res.json({ message: 'User updated successfully', user });
//   } else {
//     res.status(404).json({ message: `User with ID ${id} not found` });
//   }
// };

//-----------DELETE-------------
// @desc    Delete a user
// @route   DELETE /api/v1/users/:id
// @access  Public

// exports.deleteUser = (req, res) => {
//   const id = req.params.id;
//   const index = users.findIndex(user => user.id == id);
//   if (index != -1) {
//     users.splice(index, 1);
//     res.json({ message: 'User deleted successfully' });
//   } else {
//     res.status(404).json({ message: `User with ID ${id} not found` });
//   }
// };
