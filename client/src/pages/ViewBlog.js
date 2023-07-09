import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavigationBox from "../components/NavigationBox/NavigationBox";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";
import IconButton from "@mui/material/IconButton";
import Avatar from "../assets/images/Avatar.png";
import Quotes from "../assets/images/Quotes.png";
import BlogImage from "../assets/images/blogImage.png";
const UpdateBlog = () => {
  const blogs = useSelector((state) => state.auth.blog);
  return (
    <div className="App">
      <NavigationBox />
      <div style={{ width: "80%", marginLeft: "20%" }}>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: "86%", left: "18%" }}>
            <div>
              <div>
                <img
                  src={Avatar}
                  className="avatarImage"
                  style={{
                    height: "100px",
                    border: "5px solid #f2f2f2",
                  }}
                />
              </div>
            </div>
          </div>
          <img
            className="card__image"
            src={`https://source.unsplash.com/600x400/?${blogs.subtitle}`}
            alt="card__image"
            style={{
              width: "70%",
              border: "10px solid #f2f2f2",
              borderRadius: "10px",
              marginLeft: "13%",
              display: "inline-block",
            }}
            width="600"
          />
        </div>
        <div style={{ width: "40%", float: "right" }}>
          <div
            style={{
              display: "inline-block",
              width: "55%",
              marginRight: "10%",
              float: "right",
            }}
          >
            <span style={{ textAlign: "right" }}>
              <IconButton
                aria-label="delete"
                style={{ color: "#191919" }}
                // onClick={() => redirectToUpdate(i)}
              >
                <FavoriteBorderIcon />
              </IconButton>
            </span>
            <span style={{ textAlign: "right" }}>
              <IconButton
                aria-label="delete"
                style={{ color: "#191919" }}
                // onClick={() => remove(i._id)}
              >
                <NotesRoundedIcon />
              </IconButton>
            </span>
          </div>
        </div>

        <div style={{ width: "85%", marginLeft: "15%", marginTop: "2%" }}>
          <h1 style={{ fontSize: "48px" }}>{blogs.title}</h1>
          <span>
            <span style={{ fontSize: "16px", color: "#d0d0d0" }}>by : </span>
            <span style={{ fontSize: "16px", color: "191919" }}>
              {blogs?.firstName
                ? blogs.firstName + " " + blogs?.lastName
                : "Anonymous"}
            </span>
          </span>
        </div>
        <p style={{ width: "65%", marginLeft: "15%", textAlign: "justify" }}>
          {blogs.description}
        </p>
      </div>
       <img src={Quotes} style={{ width: "83%", marginLeft: "17%" }}/>         
       <br/>
       <img src={BlogImage} style={{ width: "62%", marginLeft: "28%"}}/>         
    </div>
  );
};

export default UpdateBlog;
