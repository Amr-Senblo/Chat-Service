const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: "String", required: true },
    email: { type: "email", requied: true },
    password: { type: "password", requied: true },
    pic: {
      type: "String",
      requied: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    isAdmin: {
      type: Boolean,
      requied: true,
      default: false,
    },
  },
  { timestamps: true }
);

const USer =mongoose.model("user",userSchema);
module.exports = USer;