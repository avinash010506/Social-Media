const express = require("express");
const { createUser, loginUser, getUser, getAllUsers } = require("./usercontroller");
const { createPost, getFeed, likePost, addComment } = require("./postcontroller");
const { sendMessage, getChatHistory } = require("./messagecontroller");

const router = express.Router();

// User routes
router.route('/signup').post(createUser);
router.route('/login').post(loginUser);
router.route('/users').get(getAllUsers);
router.route('/user/:username').get(getUser);

// Post / Feed routes
router.route('/posts').get(getFeed).post(createPost);
router.route('/posts/:postId/like').post(likePost);
router.route('/posts/:postId/comment').post(addComment);

// Messaging routes
router.route('/messages').post(sendMessage);
router.route('/messages/:receiver').get(getChatHistory);

module.exports = router;