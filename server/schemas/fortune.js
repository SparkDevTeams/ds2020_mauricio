import mongoose from 'mongoose';

const fortuneSchema = new mongoose.Schema({
  message: {
    type: String,
    unique: true,
  },
});

const Fortune = mongoose.model('Fortune', fortuneSchema);
export default Fortune;