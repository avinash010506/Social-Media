import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUserRaw = localStorage.getItem("currentUser");
  const currentUser = currentUserRaw ? JSON.parse(currentUserRaw) : null;

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 50,
      background: "rgba(15, 23, 42, 0.65)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
      padding: "1rem 2rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <Link to="/" style={{
        fontSize: "1.65rem",
        fontWeight: 800,
        fontFamily: "var(--font-sans)",
        background: "linear-gradient(135deg, #f43f5e 0%, #ec4899 50%, #8b5cf6 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        letterSpacing: "-0.5px",
        display: "flex",
        alignItems: "center",
        gap: "10px"
      }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#insta-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "rotate(-8deg)" }}>
          <defs>
            <linearGradient id="insta-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
        InstaClone
      </Link>
      <nav style={{
        display: "flex",
        gap: "1rem",
        alignItems: "center"
      }}>
        {currentUser ? (
          <>
            <Link to="/" style={{
              fontSize: "0.95rem",
              fontWeight: 600,
              color: location.pathname === "/" ? "var(--text-primary)" : "var(--text-secondary)",
              transition: "var(--transition-smooth)",
              padding: "0.55rem 1.1rem",
              borderRadius: "10px",
              background: location.pathname === "/" ? "rgba(236, 72, 153, 0.15)" : "transparent",
              border: location.pathname === "/" ? "1px solid rgba(236, 72, 153, 0.3)" : "1px solid transparent"
            }}>
              Feed
            </Link>
            <Link to="/messages" style={{
              fontSize: "0.95rem",
              fontWeight: 600,
              color: location.pathname === "/messages" ? "var(--text-primary)" : "var(--text-secondary)",
              transition: "var(--transition-smooth)",
              padding: "0.55rem 1.1rem",
              borderRadius: "10px",
              background: location.pathname === "/messages" ? "rgba(236, 72, 153, 0.15)" : "transparent",
              border: location.pathname === "/messages" ? "1px solid rgba(236, 72, 153, 0.3)" : "1px solid transparent"
            }}>
              Messages
            </Link>
            <Link to={`/user/${currentUser.username}`} style={{
              fontSize: "0.95rem",
              fontWeight: 600,
              color: location.pathname.startsWith("/user/") ? "var(--text-primary)" : "var(--text-secondary)",
              transition: "var(--transition-smooth)",
              padding: "0.55rem 1.1rem",
              borderRadius: "10px",
              background: location.pathname.startsWith("/user/") ? "rgba(236, 72, 153, 0.15)" : "transparent",
              border: location.pathname.startsWith("/user/") ? "1px solid rgba(236, 72, 153, 0.3)" : "1px solid transparent"
            }}>
              Profile
            </Link>
            <button onClick={handleLogout} style={{
              fontSize: "0.95rem",
              fontWeight: 600,
              color: "var(--text-secondary)",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "0.55rem 1.1rem",
              borderRadius: "10px",
              cursor: "pointer",
              fontFamily: "var(--font-sans)",
              transition: "var(--transition-smooth)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--error)";
              e.currentTarget.style.color = "#ef4444";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.color = "var(--text-secondary)";
            }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/" style={{
              fontSize: "0.95rem",
              fontWeight: 600,
              color: location.pathname === "/" ? "var(--text-primary)" : "var(--text-secondary)",
              transition: "var(--transition-smooth)",
              padding: "0.55rem 1.1rem",
              borderRadius: "10px",
              background: location.pathname === "/" ? "rgba(236, 72, 153, 0.15)" : "transparent",
              border: location.pathname === "/" ? "1px solid rgba(236, 72, 153, 0.3)" : "1px solid transparent"
            }}>
              Register
            </Link>
            <Link to="/login" style={{
              fontSize: "0.95rem",
              fontWeight: 600,
              color: location.pathname === "/login" ? "var(--text-primary)" : "var(--text-secondary)",
              transition: "var(--transition-smooth)",
              padding: "0.55rem 1.1rem",
              borderRadius: "10px",
              background: location.pathname === "/login" ? "rgba(236, 72, 153, 0.15)" : "transparent",
              border: location.pathname === "/login" ? "1px solid rgba(236, 72, 153, 0.3)" : "1px solid transparent"
            }}>
              Login
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
