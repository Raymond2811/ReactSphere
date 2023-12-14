const connection = require('../config/connection');
const {User, Thought} = require('../models');
const {users, thoughts} = require('./data');

connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1);
});

connection.once('open', async() => {
  console.log('connected');
  try {
    await User.deleteMany({});
    await Thought.deleteMany({});

    await User.insertMany(users);

    const createdThoughts = await Thought.insertMany(thoughts);
    const updateUsers = createdThoughts.map(thought => {
      return User.findOneAndUpdate(
        {username: thought.username},
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );
    });
    const finalUsers = await Promise.all(updateUsers)
    console.log(finalUsers);
    console.log(createdThoughts);
    console.log('Data seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
});