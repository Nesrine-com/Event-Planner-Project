const mongoose = require('mongoose');
const EventSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: [true, "Title is required"],
    },
    Description: {
      type: String,
      required: [true, "Description is required"],
      minlength: 5
    },
    Location: {
      type: String,
      required: [true, "Location is required"]
    },
    DateTime: {
      type: Date,
      required: [true, "Date and time are required"]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
  },
  { timestamps: true }
);
const Event = mongoose.model("Event", EventSchema);
module.exports = Event;
