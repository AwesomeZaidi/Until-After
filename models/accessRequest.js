const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestAccessSchema = new Schema({
  createdAt: { type: Date },
  updatedAt: { type: Date },
  relationship: { type: String, required: true },
  deathCertificate: { data: Buffer, contentType: String },
  obituaryLink: { type: String },
  requester : { type: Schema.Types.ObjectId, ref: "User", required: false },
  requestee: { type: Schema.Types.ObjectId, ref: "User", required: false }
});

RequestAccessSchema.pre("save", function(next) {
    // SET createdAt AND updatedAt
    const now = new Date();
    this.updatedAt = now;

    if (!this.createdAt) {
      this.createdAt = now;
    }
  
    next();
});

module.exports = mongoose.model("RequestAccess", RequestAccessSchema);