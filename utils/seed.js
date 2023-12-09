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

    const createdUsers = await User.insertMany(users);
    const userMap = {};
    createdUsers.forEach((user) => {
      userMap[user.username] = user._id;
    });

    const thoughtsWithUserIds = thoughts.map((thought) => ({
      ...thought,
      username: userMap[thought.username],
    }));

    await Thought.insertMany(thoughtsWithUserIds);
    console.table(users);
    console.table(thoughtsWithUserIds);
    console.log('Data seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
});