import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function Messages() {
  const currentUserRaw = localStorage.getItem("currentUser");
  const currentUser = currentUserRaw ? JSON.parse(currentUserRaw) : null;

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  const fetchUsers = async () => {
    try {
      const resp = await axios.get("http://localhost:5000/api/users");
      const otherUsers = resp.data.response.filter(
        (u) => u.username !== currentUser?.username
      );
      setUsers(otherUsers);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  const fetchChatHistory = async (receiverUsername) => {
    if (!currentUser || !receiverUsername) return;
    try {
      const resp = await axios.get(
        `http://localhost:5000/api/messages/${receiverUsername}?sender=${currentUser.username}`
      );
      setMessages(resp.data.response);
    } catch (err) {
      console.error("Failed to fetch chat history:", err);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchUsers();
    }
  }, []);

  useEffect(() => {
    let interval;
    if (selectedUser) {
      fetchChatHistory(selectedUser.username);
      interval = setInterval(() => {
        fetchChatHistory(selectedUser.username);
      }, 3000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [selectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedUser) return;
    const msgText = inputText;
    setInputText("");
    try {
      const resp = await axios.post("http://localhost:5000/api/messages", {
        sender: currentUser.username,
        receiver: selectedUser.username,
        text: msgText,
      });
      setMessages((prev) => [...prev, resp.data.response]);
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  if (!currentUser) {
    return (
      <div style={{ textAlign: "center", padding: "3rem" }}>
        <h3>Please log in to use Messaging features.</h3>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: "1000px",
      margin: "0 auto",
      padding: "2rem 1rem",
      height: "80vh",
      display: "flex",
      gap: "1.5rem"
    }}>
      {/* Sidebar: Users list */}
      <div className="glass" style={{
        width: "30%",
        minWidth: "220px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
      }}>
        <h3 style={{
          padding: "1.2rem",
          fontSize: "1.2rem",
          fontWeight: 700,
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          color: "var(--text-primary)"
        }}>
          Direct Messages
        </h3>
        <div style={{
          flex: 1,
          overflowY: "auto",
          padding: "0.5rem"
        }}>
          {users.length > 0 ? (
            users.map((u) => (
              <div
                key={u._id}
                onClick={() => setSelectedUser(u)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.8rem",
                  padding: "0.75rem 1rem",
                  borderRadius: "10px",
                  cursor: "pointer",
                  background: selectedUser?.username === u.username ? "rgba(236, 72, 153, 0.15)" : "transparent",
                  border: selectedUser?.username === u.username ? "1px solid rgba(236, 72, 153, 0.25)" : "1px solid transparent",
                  transition: "var(--transition-smooth)",
                  marginBottom: "0.4rem"
                }}
                onMouseEnter={(e) => {
                  if (selectedUser?.username !== u.username) {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedUser?.username !== u.username) {
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                <img
                  src="/avatar.png"
                  alt="avatar"
                  style={{ width: "2.2rem", height: "2.2rem", borderRadius: "50%", border: "1px solid var(--secondary)" }}
                />
                <div style={{ overflow: "hidden" }}>
                  <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {u.name}
                  </p>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    @{u.username}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", textAlign: "center", marginTop: "1rem" }}>
              No other users registered.
            </p>
          )}
        </div>
      </div>

      {/* Main chat window */}
      <div className="glass" style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
      }}>
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div style={{
              padding: "1rem 1.5rem",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              alignItems: "center",
              gap: "0.8rem"
            }}>
              <img
                src="/avatar.png"
                alt="avatar"
                style={{ width: "2.2rem", height: "2.2rem", borderRadius: "50%", border: "1px solid var(--secondary)" }}
              />
              <div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>
                  {selectedUser.name}
                </h4>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  @{selectedUser.username}
                </p>
              </div>
            </div>

            {/* Messages Log */}
            <div style={{
              flex: 1,
              overflowY: "auto",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.8rem"
            }}>
              {messages.length > 0 ? (
                messages.map((msg) => {
                  const isOwnMessage = msg.sender === currentUser.username;
                  return (
                    <div
                      key={msg._id}
                      style={{
                        alignSelf: isOwnMessage ? "flex-end" : "flex-start",
                        maxWidth: "65%",
                        padding: "0.75rem 1rem",
                        borderRadius: isOwnMessage ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                        background: isOwnMessage
                          ? "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)"
                          : "rgba(255, 255, 255, 0.06)",
                        border: isOwnMessage
                          ? "none"
                          : "1px solid rgba(255, 255, 255, 0.08)",
                        color: "var(--text-primary)",
                        fontSize: "0.92rem",
                        lineHeight: "1.4",
                        wordBreak: "break-word",
                        boxShadow: isOwnMessage ? "0 4px 15px -4px var(--primary-glow)" : "none"
                      }}
                    >
                      {msg.text}
                    </div>
                  );
                })
              ) : (
                <div style={{ margin: "auto", color: "var(--text-muted)", fontSize: "0.9rem", textAlign: "center" }}>
                  Say hello to {selectedUser.name}!
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input form */}
            <form
              onSubmit={handleSendMessage}
              style={{
                padding: "1.2rem",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                gap: "0.8rem",
                background: "rgba(15, 23, 42, 0.2)"
              }}
            >
              <input
                type="text"
                placeholder="Type a message..."
                className="form__input"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                style={{ flex: 1, padding: "0.75rem 1rem", fontSize: "0.9rem", borderRadius: "10px" }}
              />
              <button
                className="form__button"
                type="submit"
                style={{ width: "auto", padding: "0.75rem 1.5rem", marginTop: 0, fontSize: "0.9rem", borderRadius: "10px" }}
              >
                Send
              </button>
            </form>
          </>
        ) : (
          <div style={{ margin: "auto", textAlign: "center", color: "var(--text-secondary)", padding: "2rem" }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "1rem", opacity: 0.6 }}>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <h4 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--text-primary)" }}>Your Inbox</h4>
            <p style={{ fontSize: "0.85rem", marginTop: "0.25rem" }}>Select a friend from the sidebar to start chatting.</p>
          </div>
        )}
      </div>
    </div>
  );
}
