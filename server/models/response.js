const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const responseSchema = new Schema({
  responseContent: {
    type: String,
    required: [true, 'Content harus diisi']
  },
  parent: { type: Schema.Types.ObjectId, ref: 'Thread' },
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, {
  timestamps: true
});

const Response  = mongoose.model('Response', responseSchema);

module.exports = Response;
