const { User } = require('../models');

module.exports = {
  async getUsers (req,res) {
    try {
     const users = await User.find();
     res.json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async getSingleUser (req,res){
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      
      res.json(user);
    } catch (error) {
     res.status(500).json(error);
    }
  },
  async createUser (req,res) {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (error) {
     res.status(500).json(error);
    }
  },
  async updateUser (req,res) {
    try {
      const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    user.username = req.body.username;
    user.email = req.body.email;

    await user.save();
    res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async deleteUser (req, res){
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);

      if (!deletedUser) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json({ message: 'User successfully deleted', deletedUser });
    } catch (error) {
      res.status(500).json(error);
    }
  },
}