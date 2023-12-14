const { User, Thought } = require('../models');

module.exports = {
  async getThoughts (req, res) {
    try {
     const thought = await Thought.find();
     res.json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async getSingleThought (req,res) {
    try {
      const thought = await Thought.findById(req.params.id);

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async createThought (req,res) {
    try {
     const thought = await Thought.create(req.body);
     const user = await User.findOneAndUpdate(
      {username: req.body.username},
      { $addToSet: { thoughts: thought._id } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        message: 'Thought created, but found no user with that ID',
      });
    }

    res.json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async updateThought (req,res) {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.id,
        { thoughtText: req.body.thoughtText },
        { new: true }
      );

      if (!updatedThought) {
        return res.status(404).json({message: 'No thought found with that ID'});
      }
    
      res.json(updatedThought);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async deleteThought (req,res) {
    try {
      const deletedThought = await Thought.findByIdAndDelete(req.params.id);

    if(!deletedThought){
      return res.status(404).json({message:'No thought found with that ID'});
    }

    res.json({ message: 'Thought successfully deleted', deletedThought});
    } catch (error){
      res.status(500).json(error);
    }
  },
  async addReaction (req,res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$addToSet: { reactions: req.body}},
        { runValidators: true, new: true},
      );
        if(!thought) {
          return res.status(404).json({message: 'No thought with this id'})
        }
      res.json(thought);
    } catch (error) {
    res.status(500).json(error);
    }
  },
  async deleteReaction (req,res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      )
      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json({ message: 'Reaction successfully deleted', thought });
    } catch (error) {
    res.status(500).json(error);
    }
  },

}
