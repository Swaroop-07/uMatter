import React, { useEffect, useState } from "react";
import "../App.css";
import NavigationBox from "../components/NavigationBox/NavigationBox";
import BlogCard from "../components/BlogCard/BlogCard";
const Blog = () => {
  return (
    <div className="App">
      <NavigationBox />
      <div style={{ width: "85%", marginLeft: "15%" }}>
        <BlogCard />
        <br />
      </div>
    </div>
  );
};

export default Blog;
