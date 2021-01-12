const mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
  EventName: { type: String, required: true },
  EventDescription: { type: String, required: true },
  IsActive: { type: Boolean, required: true },
  EnteredBy: { type: String },
  WhenEntered: { type: Date, required: true },
  ModifiedBy: { type: String },
  WhenModified: { type: Date },
});

module.exports = mongoose.model("EventData", EventSchema);
