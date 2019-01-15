const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EntrySchema = new Schema({
    createdAt: { type: Date },
    updatedAt: { type: Date },
    text: { type: String, default: "" },
    // voice: { type: File },
    // image: { type: Array },
});

EntrySchema.pre("save", function(next) {
    // SET createdAt AND updatedAt
    const now = new Date();
    this.updatedAt = now;
  
    if (!this.createdAt) {
      this.createdAt = now;
    }
  
    next();
  });
  
  module.exports = mongoose.model("Entry", EntrySchema);
  