const asyncHandler = require("express-async-handler");
const User = require("../models/userModel"); // import user schema in user controller to do some operation like validation and authentcation using email for example
const generateToken = require("../config/generateToken");

// this function needs async handler  so we run command npm i express-async-handler
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All Feilds are required !!😈");
  }

  //  Do some quires on database
  const userExists = await User.findOne({ email });

  if (userExists) {
    // if user exists create an error that the user already exists
    res.status(400);
    throw new Error("User already exists ❌");
  }
  // else if ===> user doesn't exist in database create it and add it to database
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  //   if user has successfully added to database
  if (user) {
    res.status(201).json({
      // status 201 ==> means success
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id), //    when it registers a new user i wanted to create a new JWT token and send it to our user (when registerion is being sent we want token to be sent with registeration ) so we create function for it called generateToken()
    });
  } else {
    res.status(400);
    throw new Error("Failed to Create the User");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body; // we take two things from req ===> email and passward to auth

  const user = await User.findOne({ email }); // get user from database using his email
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email and password");
  }
});

module.exports = { registerUser, authUser };
