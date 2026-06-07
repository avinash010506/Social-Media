import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Register from "./Register";
import axios from "axios";

export default function Homepage() {
  const currentUserRaw = localStorage.getItem("currentUser");
  const currentUser = currentUserRaw ? JSON.parse(currentUserRaw) : null;

  const [posts, setPosts] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [commentInputs, setCommentInputs] = useState({});

  const fetchPosts = async () => {
    try {
      const resp = await axios.get("http://localhost:5000/api/posts");
      setPosts(resp.data.response);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchPosts();
    }
  }, []);

  if (!currentUser) {
    return <Register />;
  }

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!imageUrl.trim()) return;
    setIsloading(true);
    try {
      await axios.post("http://localhost:5000/api/posts", {
        username: currentUser.username,
        name: currentUser.name,
        imageUrl: imageUrl,
        caption: caption,
      });
      setImageUrl("");
      setCaption("");
      setIsloading(false);
      fetchPosts();
    } catch (err) {
      console.error("Failed to create post:", err);
      setIsloading(false);
    }
  };

  const handleLikePost = async (postId) => {
    try {
      await axios.post(`http://localhost:5000/api/posts/${postId}/like`, {
        username: currentUser.username,
      });
      fetchPosts();
    } catch (err) {
      console.error("Failed to like post:", err);
    }
  };

  const handleAddComment = async (e, postId) => {
    e.preventDefault();
    const commentText = commentInputs[postId];
    if (!commentText || !commentText.trim()) return;

    try {
      await axios.post(`http://localhost:5000/api/posts/${postId}/comment`, {
        username: currentUser.username,
        text: commentText,
      });
      setCommentInputs({ ...commentInputs, [postId]: "" });
      fetchPosts();
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  };

  const handleCommentInputChange = (postId, val) => {
    setCommentInputs({
      ...commentInputs,
      [postId]: val,
    });
  };

  return (
    <div style={{
      maxWidth: "600px",
      margin: "0 auto",
      padding: "2rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "2rem"
    }}>
      {/* Create Post Card */}
      <div className="glass" style={{ padding: "2rem" }}>
        <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.2rem", color: "var(--text-primary)" }}>
          Share a Moment
        </h3>
        <form onSubmit={handleCreatePost} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="url"
            placeholder="Image URL (e.g. https://picsum.photos/600/400)"
            className="form__input"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
            style={{ padding: "0.8rem 1rem", fontSize: "0.95rem" }}
          />
          <input
            type="text"
            placeholder="Write a caption..."
            className="form__input"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            style={{ padding: "0.8rem 1rem", fontSize: "0.95rem" }}
          />
          <button className="form__button" type="submit" disabled={isloading} style={{ marginTop: "0.5rem" }}>
            {isloading ? "Posting..." : "Post"}
          </button>
        </form>
      </div>

      {/* Feed List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {posts.length > 0 ? (
          posts.map((post) => {
            const isLiked = post.likes.includes(currentUser.username);
            return (
              <div className="glass" key={post._id} style={{ padding: "0", overflow: "hidden" }}>
                {/* Header */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.8rem",
                  padding: "1rem 1.25rem"
                }}>
                  <Link to={`/user/${post.username}`} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.8rem"
                  }}>
                    <img
                      src="/avatar.png"
                      alt="avatar"
                      style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", border: "2px solid var(--secondary)" }}
                    />
                    <div>
                      <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>
                        {post.name || post.username}
                      </h4>
                      <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                        @{post.username}
                      </p>
                    </div>
                  </Link>
                </div>

                {/* Post Image */}
                <div style={{ background: "#090d16", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "250px" }}>
                  <img
                    src={post.imageUrl}
                    alt="feed"
                    style={{ width: "100%", maxHeight: "500px", objectFit: "cover" }}
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&auto=format&fit=crop";
                    }}
                  />
                </div>

                {/* Actions & Description */}
                <div style={{ padding: "1.25rem" }}>
                  <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "0.8rem" }}>
                    <button
                      onClick={() => handleLikePost(post._id)}
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        color: isLiked ? "var(--accent)" : "var(--text-secondary)",
                        transition: "var(--transition-smooth)",
                        fontSize: "1rem",
                        fontWeight: 600
                      }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill={isLiked ? "var(--accent)" : "none"} stroke={isLiked ? "var(--accent)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                      {post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
                    </button>
                  </div>

                  {post.caption && (
                    <p style={{ fontSize: "0.95rem", color: "var(--text-primary)", marginBottom: "1rem" }}>
                      <span style={{ fontWeight: 700, marginRight: "8px" }}>{post.username}</span>
                      {post.caption}
                    </p>
                  )}

                  {/* Comments list */}
                  <div style={{
                    borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                    paddingTop: "0.8rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.6rem"
                  }}>
                    {post.comments && post.comments.map((comment, index) => (
                      <p key={index} style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                        <strong style={{ color: "var(--text-primary)", marginRight: "6px" }}>{comment.username}</strong>
                        {comment.text}
                      </p>
                    ))}
                  </div>

                  {/* Add Comment input */}
                  <form
                    onSubmit={(e) => handleAddComment(e, post._id)}
                    style={{ display: "flex", gap: "0.8rem", marginTop: "1rem", borderTop: "1px solid rgba(255, 255, 255, 0.05)", paddingTop: "1rem" }}
                  >
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="form__input"
                      value={commentInputs[post._id] || ""}
                      onChange={(e) => handleCommentInputChange(post._id, e.target.value)}
                      style={{ flex: 1, padding: "0.6rem 0.8rem", fontSize: "0.85rem", borderRadius: "8px" }}
                    />
                    <button
                      className="form__button"
                      type="submit"
                      style={{ width: "auto", padding: "0.6rem 1.2rem", marginTop: 0, fontSize: "0.85rem", borderRadius: "8px" }}
                    >
                      Post
                    </button>
                  </form>
                </div>
              </div>
            );
          })
        ) : (
          <div className="glass" style={{ padding: "3rem", textAlign: "center" }}>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>No Posts Yet</h3>
            <p style={{ color: "var(--text-secondary)" }}>Be the first one to share a moment!</p>
          </div>
        )}
      </div>
    </div>
  );
}
