const mongoose = require('mongoose')

const wordSchema = new mongoose.Schema({
  language_entry: { type: String, required: true, unique: true },
  pronunciation: [String],
  alternative_spellings: [String],
  translations: [String],
  tags: {
    type: [String],
    default: [],
  },
  images: {
    type: [String],
    default: [],
  },
  recordings: {
    type: [String],
    default: [],
  },
  notes: [String],
  public: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  },
})

//   const Word = mongoose.model("Word", wordSchema);
module.exports = mongoose.model('Word', wordSchema)
