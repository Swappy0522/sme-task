const mongoose = require("mongoose");

const MembersSchema = mongoose.Schema({
  MemberName: { type: String, required: true },
  MemberDescription: { type: String, required: true },
  IsActive: { type: Boolean, required: true },
  EnteredBy: { type: String },
  WhenEntered: { type: Date, required: true },
  ModifiedBy: { type: String },
  WhenModified: { type: Date },
});

module.exports = mongoose.model("MembersData", MembersSchema);
