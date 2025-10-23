const express = require("express")
const { createUser,loginUser, getUser } = require("./usercontroller")
// const { getAllPosts, createPost,updatePost, getPost, deletePost} = require("./controllers/postcontroller")
const router = express.Router()

router.route('/signup').post(createUser)
router.route('/login').post(loginUser)
router.route('/user/:username').get(getUser)
// router.route('/posts').get(getAllPosts).post(createPost).patch(updatePost)
// router.route('/posts/:id').get(getPost).patch(updatePost).delete(deletePost)

module.exports = router