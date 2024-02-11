const mongoose = require("mongoose");
const validator = require("validator");

const ContactSchema = new mongoose.Schema(
  {
    exercise: {
      type: String,
      required: [true, "Please provide a exercise"],
    },
    relation: {
      type: String,
      required: [true, "Please provide a relation"],
      default: "Flexibility",
      enum: {
        values: ["Strength", "Cardio", "Flexibility", "Other"],
        message: "{VALUE} is not supported.",
      },
    },
    duration: {
      type: Number,
    },
    result: {
      type: String,
      // validate: {
      //   // validator: validator.isMobilePhone,
      //   message: "Please provide a valid result Number",
      // },
    },
    target: {
      type: String,
      // validate: {
      //   // validator: validator.isMobilePhone,
      //   message: "Please provide a valid target Number",
      // },
    },
    email: {
      type: String,
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid Email Addreses",
      },
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }

);

module.exports = mongoose.model("Contact", ContactSchema);
