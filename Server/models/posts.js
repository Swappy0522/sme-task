const mongoose = require("mongoose");

const PostsSchema = mongoose.Schema({
  PostsName: { type: String, required: true },
  PostsDescription: { type: String, required: true },
  IsActive: { type: Boolean, required: true },
  EnteredBy: { type: String },
  WhenEntered: { type: Date, required: true },
  ModifiedBy: { type: String },
  WhenModified: { type: Date },
});
PostsSchema.index({ PostsName: "text" });
module.exports = mongoose.model("PostsData", PostsSchema);
