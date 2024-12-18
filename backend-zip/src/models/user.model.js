// const mongoose = require("mongoose");


// const userSchema = new mongoose.Schema({
//   firstName: {
//     type: String,
//     required: true,
//   },
//   lastName: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   role: {
//     type: String,
//     required:true,
//     default:"CUSTOMER"
//   },
//   mobile: {
//     type: String,
//   },
//   addresses: [
//     {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "addresses",
//     },
//   ], 
//   paymentInformation: [
//     {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "payment_information",
//     },
//   ],
//   ratings: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "ratings",
//     },
//   ], 
//   reviews: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "reviews",
//     },
//   ],
//   createdAt: {
//     type: Date,
//     default: Date.now(),
//   },
// });

// const User = mongoose.model("users", userSchema);

// module.exports = User;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: function () {
      return !this.auth0Id; // Required if Auth0 is not used
    },
  },
  auth0Id: {
    type: String,
    unique: true, // Ensure unique Auth0 IDs
    sparse: true, // Allows this field to be optional
  },
  email: {
    type: String,
    required: true,
    unique: true, // Prevent duplicate emails
  },
  role: {
    type: String,
    required: true,
    default: "CUSTOMER",
  },
  mobile: {
    type: String,
  },
  addresses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "addresses",
    },
  ],
  paymentInformation: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "payment_information",
    },
  ],
  ratings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ratings",
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reviews",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
