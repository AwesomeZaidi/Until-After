const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JournalSchema = new Schema({
    createdAt: { type: Date },
    updatedAt: { type: Date },
    entry: { type: String},
    entries: { type: Array }
    // entry : [{ type: Schema.Types.ObjectId, ref: 'Entry', required: false }],
    // day: { type: String, default: "" },
    // week: { type: Array },
});

JournalSchema.pre("save", function(next) {
    // SET createdAt AND updatedAt
    const now = new Date();
    this.updatedAt = now;
  
    if (!this.createdAt) {
      this.createdAt = now;
    }
  
    next();
  });
  
  module.exports = mongoose.model("Journal", JournalSchema);
  