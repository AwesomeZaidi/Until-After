const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  createdAt: { type: Date },
  updatedAt: { type: Date },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  bestWayToContact: { type: Array },
  username: { type: String, required: true },
  password: { type: String, select: false },
  membershipType: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  zipcode: { type: String },
  appointmentsId : [{ type: Schema.Types.ObjectId, ref: "Appointment", required: false }],
  isAdmin: { type: Boolean, default: false },
});

// const User = mongoose.model("User", UserSchema);
UserSchema.pre("save", function(next) {
  // check if user already exists.
  // User.find({username: this.username, email: this.email}).then(user => {
  //     next(new Error("User exists!"));
  // });

  const now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }

  // ENCRYPT PASSWORD
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      next();
    }); //ends bcrypt.hash()

  }); //ends bcrypt.genSalt()

}); //end UserSchema.pre()
  
// Need to use function to enable this.password to work.
UserSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    done(err, isMatch);
  });
}; //ends comparePassword

module.exports = mongoose.model("User", UserSchema);