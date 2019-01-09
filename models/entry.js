// FOR NOW EVERY ENTRY WILL ONLY CONTAIN TEXT SO WE WILL HOLD OFF ON
// IMPLEMENTING THIS AS LATER WE'LL NEED, THEIR VOICE RECORDINGS, ETC MEDIA IDEALLY.

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const JournalSchema = new Schema({
//     createdAt: { type: Date },
//     updatedAt: { type: Date },
//     text: { type: String },
//     voice: { type: File },
//     image: { type: Array },
//     userId : [{ type: Schema.Types.ObjectId, ref: 'User', required: false }],
// });

// JournalSchema.pre("save", function(next) {
//     // SET createdAt AND updatedAt
//     const now = new Date();
//     this.updatedAt = now;
  
//     if (!this.createdAt) {
//       this.createdAt = now;
//     }
  
//     next();
//   });
  
//   module.exports = mongoose.model("Journal", JournalSchema);
  