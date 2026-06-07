const Post = require("./postmodal");

const createPost = async (req, res) => {
  const { username, name, imageUrl, caption } = req.body;
  try {
    const post = await Post.create({ username, name, imageUrl, caption });
    res.status(201).json({ response: post });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getFeed = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 });
    res.status(200).json({ response: posts });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const likePost = async (req, res) => {
  const { postId } = req.params;
  const { username } = req.body;
  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).send("Post not found");

    const index = post.likes.indexOf(username);
    if (index === -1) {
      post.likes.push(username);
    } else {
      post.likes.splice(index, 1);
    }
    await post.save();
    res.status(200).json({ response: post });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const addComment = async (req, res) => {
  const { postId } = req.params;
  const { username, text } = req.body;
  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).send("Post not found");

    post.comments.push({ username, text });
    await post.save();
    res.status(200).json({ response: post });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  createPost,
  getFeed,
  likePost,
  addComment,
};
