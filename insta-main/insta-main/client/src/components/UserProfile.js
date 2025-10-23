import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function UserProfile() {
  const { username } = useParams();
  const [isloading, setIsloading] = useState(false);
  const [data, setData] = useState();
  const fetchdata = () => {
    setIsloading(true);
    fetch(`http://localhost:5000/api/user/${username}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.response);
        setIsloading(false);
      });
  };
  useEffect((id) => {
    fetchdata();
  }, []);
  return (
    <>
      <div>
        {isloading ? (
          <p>loading</p>
        ) : (
          <>
            {data ? (
              <>
                <div
                  style={{
                    fontSize: "25px",
                    padding: "30px",
                    borderRadius: "20px",
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "40px",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="../avatar.png"
                      alt="avatar"
                      style={{
                        width: "8rem",
                        borderRadius: "100%",
                        border: "2px solid green",
                      }}
                    />
                    <div>
                      <p>
                        <span style={{ fontWeight: "bold" }}>Username: </span>
                        {data.username}
                      </p>
                      <p>
                        <span style={{ fontWeight: "bold" }}>Name: </span>
                        {data.name}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "20px" }}>
                    <p>
                      <span style={{ fontWeight: "bold" }}>Posts: </span>
                      {data.posts}
                    </p>
                    <p>
                      <span style={{ fontWeight: "bold" }}>Followers: </span>
                      {data.followers}
                    </p>
                    <p>
                      <span style={{ fontWeight: "bold" }}>Following: </span>
                      {data.following}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <p>no user found with username {username}</p>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
