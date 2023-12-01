var express = require("express");
var router = express.Router();
const User = require("../models/User");
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const hashPassword = require("../Utils/hashPassword");
const verifyToken = require("../middleware/verifyToken");
const Save = require("../models/Saved");

// GET home page.  -------------------------------------------------
router.get("/", function (req, res) {
  res.json({ Homepage: "home" }).status(201);
});

//Login-------------------------------------------------
router.post("/login", async (req, res) => {
  try {
    const { password, email } = req.body;

    const user = await User.findOne({ email });
    const userId = user._id;
    console.log(user);
    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid username or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid username or password" });
    }

    // Create a JWT token
    const token = jwt.sign({ email, userId }, process.env.JWT_SECRET);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      // other cookie options as needed
    });

    res.json({ message: "Success", token: token }).status(201);
  } catch (error) {
    console.log(error);
    res.json({ status: "Failed", message: error }).status(401);
  }
});

//Register-------------------------------------------------
router.post("/register", async (req, res) => {
  try {
    const data = req.body;
    const password = data.password;
    const hPassword = await hashPassword(password);

    const user = await User.create({
      email: data.email,
      password: hPassword,
      username: data.username,
    });

    res.json(user).status(201);
  } catch (error) {
    console.log(error);
    res.json({ status: "Failed", message: error }).status(401);
  }
});

//save anime post-------------------------------------------------
router.post("/save", verifyToken, async (req, res) => {
  try {
    const { mal_id, saved_type } = req.body;

    if (!mal_id || !saved_type) {
      return res
        .status(400)
        .json({ error: "Missing fields while saving anime" });
    }

    //check if already saved by this user
    const { userId } = req.user;
    const alreadySaved = await Save.findOne({
      user_id: userId,
      mal_id: mal_id,
    });

    if (alreadySaved) {
      return res
        .status(400)
        .json({ error: "Anime for the user already exists." });
    }

    const newAnimeSave = await Save.create({
      mal_id: mal_id,
      saved_type: saved_type,
      user_id: userId,
    });
    res.json(newAnimeSave).status(201);
  } catch (error) {
    console.log(error);
    res.json({ status: "Failed", message: error }).status(401);
  }
});

//Unsave anime post-------------------------------------------------
router.delete("/unSave", verifyToken, async (req, res) => {
  try {
    const { mal_id } = req.body;

    if (!mal_id) {
      return res
        .status(400)
        .json({ error: "Missing fields while saving anime" });
    }

    //check if already saved by this user
    const { userId } = req.user;
    const alreadySaved = await Save.findOne({
      user_id: userId,
      mal_id: mal_id,
    });

    if (alreadySaved === null) {
      return res
        .status(400)
        .json({ error: "Anime for the user already not saved." });
    }

    const unsaved = await Save.deleteOne({
      mal_id: mal_id,
      user_id: userId,
    });

    return res.status(201).json(unsaved);
  } catch (error) {
    console.log(error);
    res.json({ status: "Failed", message: error }).status(401);
  }
});

//get save Status-------------------------------------------------
router.get("/saveStatus/:id", verifyToken, async (req, res) => {
  try {
    let user_id = req.user;
    user_id = user_id.userId;
    const animeId = req.params.id;

    const getSavedData = await Save.findOne({
      mal_id: animeId,
      user_id: user_id,
    });

    if (getSavedData === null) {
      return null;
    }

    res.json({ savedStatus: true }).status(201);
  } catch (error) {
    console.log(error);
    res.json({ status: "Failed", message: error.message }).status(401);
  }
});
// -------------------------------------------------
router.get("/getData", async (req, res) => {
  try {
    const data = await User.find();
    res.json({ success: true, data: data });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
