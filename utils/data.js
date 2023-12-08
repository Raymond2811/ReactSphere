const { Types } = require('mongoose');

const users = [
  {
    username: 'Charles',
    email: 'charles@test.com',
    thoughts: [],
    friends: [],
  },
  {
    username: 'Gwen',
    email: 'gwen@test.com',
    thoughts: [],
    friends: [],
  },
  {
    username: 'Jake',
    email: 'jake@test.com',
    thoughts: [],
    friends: [],
  },
];

const thoughts = [
  {
    thoughtText: 'Hello guys!',
    createdAt:  Date.now(),
    username: 'Charles',
    reactions: [
      {
        reactionId: new Types.ObjectId(),
        reactionBody: 'This is a reaction!',
        username: 'Charles',
        createdAt: Date.now(),
      },
    ],
  },
  {
    thoughtText: 'Hello guys!',
    createdAt: Date.now(),
    username: 'Gwen',
    reactions: [
      {
        reactionId: new Types.ObjectId(),
        reactionBody: 'This is a reaction!',
        username: 'Gwen',
        createdAt: Date.now(),
      },
    ],
  },
  {
    thoughtText: 'Hello guys!',
    createdAt: Date.now(),
    username: 'Jake',
    reactions: [
      {
        reactionId: new Types.ObjectId(),
        reactionBody: 'This is a reaction!',
        username: 'Jake',
        createdAt: Date.now(),
      },
    ],
  },
];

module.exports = { users, thoughts };