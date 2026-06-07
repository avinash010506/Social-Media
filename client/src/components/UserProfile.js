import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function UserProfile() {
  const { username } = useParams();
  const [isloading, setIsloading] = useState(false);
  const [data, setData] = useState(null);

  const fetchdata = () => {
    setIsloading(true);
    fetch(`http://localhost:5000/api/user/${username}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("User not found or server error");
        }
        return res.json();
      })
      .then((data) => {
        setData(data.response);
        setIsloading(false);
      })
      .catch((err) => {
        console.error(err);
        setData(null);
        setIsloading(false);
      });
  };

  useEffect(() => {
    fetchdata();
  }, [username]);

  return (
    <div style={{
      minHeight: "85vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem 1rem"
    }}>
      <div className="glass" style={{
        width: "100%",
        maxWidth: "600px",
        padding: "3rem",
        display: "flex",
        flexDirection: "column",
        gap: "2.5rem"
      }}>
        {isloading ? (
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            color: "var(--text-secondary)"
          }}>
            <div style={{
              width: "40px",
              height: "40px",
              border: "3px solid var(--secondary-glow)",
              borderTopColor: "var(--primary)",
              borderRadius: "50%",
              animation: "spin 1s linear infinite"
            }} />
            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
            <p>Loading Profile...</p>
          </div>
        ) : (
          <>
            {data ? (
              <>
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "2.5rem",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <div style={{
                    position: "relative",
                    padding: "4px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #f43f5e 0%, #ec4899 50%, #8b5cf6 100%)",
                    boxShadow: "0 0 25px 2px var(--primary-glow)"
                  }}>
                    <img
                      src="/avatar.png"
                      alt="avatar"
                      style={{
                        width: "7.5rem",
                        height: "7.5rem",
                        borderRadius: "50%",
                        display: "block",
                        border: "3px solid #0f172a",
                        objectFit: "cover"
                      }}
                    />
                  </div>
                  <div style={{
                    textAlign: "left",
                    flex: "1",
                    minWidth: "200px"
                  }}>
                    <h2 style={{
                      fontSize: "1.8rem",
                      fontWeight: 700,
                      marginBottom: "0.4rem",
                      color: "var(--text-primary)"
                    }}>
                      @{data.username}
                    </h2>
                    <p style={{
                      fontSize: "1.1rem",
                      fontWeight: 500,
                      color: "var(--text-secondary)"
                    }}>
                      {data.name}
                    </p>
                  </div>
                </div>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "1.5rem",
                  padding: "1.5rem 0",
                  borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                  textAlign: "center"
                }}>
                  <div>
                    <p style={{
                      fontSize: "1.5rem",
                      fontWeight: 800,
                      color: "var(--text-primary)",
                      background: "linear-gradient(135deg, var(--text-primary) 0%, #cbd5e1 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent"
                    }}>
                      {data.posts}
                    </p>
                    <p style={{
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      color: "var(--text-muted)",
                      marginTop: "0.25rem"
                    }}>
                      Posts
                    </p>
                  </div>
                  <div>
                    <p style={{
                      fontSize: "1.5rem",
                      fontWeight: 800,
                      color: "var(--text-primary)",
                      background: "linear-gradient(135deg, var(--text-primary) 0%, #cbd5e1 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent"
                    }}>
                      {data.followers}
                    </p>
                    <p style={{
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      color: "var(--text-muted)",
                      marginTop: "0.25rem"
                    }}>
                      Followers
                    </p>
                  </div>
                  <div>
                    <p style={{
                      fontSize: "1.5rem",
                      fontWeight: 800,
                      color: "var(--text-primary)",
                      background: "linear-gradient(135deg, var(--text-primary) 0%, #cbd5e1 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent"
                    }}>
                      {data.following}
                    </p>
                    <p style={{
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      color: "var(--text-muted)",
                      marginTop: "0.25rem"
                    }}>
                      Following
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div style={{
                textAlign: "center",
                padding: "2rem 0"
              }}>
                <div style={{
                  width: "60px",
                  height: "60px",
                  margin: "0 auto 1.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  background: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid rgba(239, 68, 68, 0.2)"
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                </div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>Profile Not Found</h3>
                <p style={{ color: "var(--text-secondary)" }}>
                  We couldn't find a user profile matching "<strong>{username}</strong>".
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
