// imports
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const { validationResult } = require("express-validator");
// project internal imports
const User = require("../Models/user");

// user login => /api/v1/user/login

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json({ error: error.errors[0].msg });
  }

  //   getting user
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
  }
  if (!existingUser) {
    return res.status(400).json({ error: "Please Enter Valid Credentials" });
  }

  // password validation
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    res.status(500).json({ erorr: err });
  }
  if (!isValidPassword) {
    return res.json({ error: "Password is not valid" });
  }

  //   genrating token

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      `${process.env.DECODE_TOKEN}`,
      { expiresIn: "1h" }
    );
  } catch (err) {
    res.json({ message: "Some error occured at jwt", error: err });
    return;
  }

  res.json({
    message: "Logged In",
    userId: existingUser.id,
    email: existingUser.email,
    name: existingUser.name,
    token: token,
    image: existingUser.image,
  });
};

// user signup => /api/v1/user/signup

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  // uploading image to cloudinary

  const result = await cloudinary.uploader
    .upload(req.body.image, {
      folder: "Profile",
      width: 150,
      crop: "scale",
    })
    .catch((err) => console.log(err));

  if (!result) {
    return res.json({
      erorr: "Some error occured while uploading image Please try again later",
    });
  }

  // middlewear validation result
  let error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json({ error: error.errors[0].msg });
  }

  //   checking existing user
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    res.status(400).json({
      message: "Some error occured please try again later",
      error: err,
    });
  }

  if (existingUser) {
    res.json({ message: "Email is already in use" });
    return;
  }

  //   hashing user password
  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    res.status(500).json({
      message: "Some error occured while encrypting please try again later",
      error: err,
    });
  }

  //   saving new user in the database

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    image: {
      public_id: result.public_id, //result.public_id,
      url: result.secure_url, //result.secure_url,
    },
  });

  try {
    await newUser.save();

    res.status(201).json({ message: "Signed up Successfully", user: newUser });
  } catch (err) {
    console.log(err);
  }
};

// user profile update  => /api/v1/user/update

const updateProfile = async (req, res, next) => {
  const { userId, name, email, password } = req.body;
  let result;
  // uploading image to cloudinary
  if (req.body.image !== undefined) {
    result = await cloudinary.uploader
      .upload(req.body.image, {
        folder: "Avatar",
        width: 150,
        crop: "scale",
      })
      .catch((err) => console.log(err));
  }

  // finding user
  let findedUser;
  try {
    findedUser = await User.findOne({ _id: userId });
  } catch (err) {
    res.status(400).json({
      message: "Some error occured Please try again later",
      error: err,
    });
  }

  if (!findedUser) {
    return res
      .status(400)
      .json({ message: "User not found with the given id" });
  }

  // hasing password
  let hashedPassword;
  if (password) {
    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
      res.status(500).json({
        message: "Some error occured while encrypting password",
        erorr: err,
      });
    }
  }

  if (password) {
    await User.findByIdAndUpdate(userId, {
      name: name ? name : findedUser.name,
      email: email ? email : findedUser.email,
      image: {
        public_id: result ? result.public_id : findedUser.image.public_id,
        url: result ? result.url : findedUser.image.url,
      },
      password: hashedPassword,
    })
      .then((data) => {
        res.json({ message: "User Profile updated successfully" });
      })
      .catch((err) => {
        console.log(err);
        res.json({
          message:
            "Some Error occured while updating the profile please try again later",
          err,
        });
      });
  } else {
    await User.findByIdAndUpdate(userId, {
      name,
      email,
      image: {
        public_id: result.public_id || findedUser.public_id,
        url: result.url || findedUser.url,
      },
    })
      .then(() => {
        res.json({ message: "User Profile updated successfully" });
      })
      .catch((err) => {
        console.log(err);
        res.json({
          message:
            "Some Error occured while updating the profile please try again later",
          err,
        });
      });
  }
};

// user profile => /api/v1/user/me

const userProfile = async (req, res, next) => {
  const { userId } = req.body;

  try {
    const findedUser = await User.findOne({ _id: userId });
    if (!findedUser) {
      return res.json({ message: "User Not found" });
    }
    return res.json({ message: "User Found", user: findedUser });
  } catch (error) {
    return res.json({ error });
  }
};

exports.login = login;
exports.signup = signup;
exports.updateProfile = updateProfile;
exports.userProfile = userProfile;
