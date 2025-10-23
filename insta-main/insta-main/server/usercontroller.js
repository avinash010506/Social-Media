const User = require("./usermodal");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const emailExists = await User.findOne({ email: req.body.email });

  if (emailExists) return res.status(400).send("Email already exists");

  const usernameExists = await User.findOne({ username: req.body.username });

  if (usernameExists) return res.status(400).send("username already exists");
  const { username, email, password, name } = req.body;
  const userdetails = {
    username: username,
    email: email,
    password: password,
    name: name,
  };
  try {
    const response = await User.create(userdetails);
    res.status(201).json({ response });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const loginUser = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("invalid username");
  if (req.body.password != user.password)
    return res.status(400).send("invalid password");
  const token = jwt.sign({ name: user.username }, process.env.TOKEN_SECRET);
  try {
    res.send({ token: token, user: user });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getUser = async (req, res) => {
  const { username: username } = req.params;
  try {
    const user = await User.findOne({ username: username });
    if (!user) return res.status(404).send("invalid username");
    res.status(200).json({ response: user });
  } catch (error) {
    res.status(404).json({ msg: error });
  }
};
module.exports = {
  createUser,
  loginUser,
  getUser,
};
