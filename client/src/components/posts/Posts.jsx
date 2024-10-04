import React from "react";
import "./posts.scss";
import Post from "../post/post";
const Posts = () => {
  const posts = [
    {
      id: 1,
      name: "Timmothy",
      userId: 1,
      profilePic: "https://i.imgur.com/T4rbGAe.png",
      desc: "lorem fdasnjkfdanfjkasd",
      img: "https://i.imgur.com/T4rbGAe.png",
    },
    {
      id: 2,
      name: "Bobby",
      userId: 1,
      profilePic: "https://i.imgur.com/T4rbGAe.png",
      desc: "lorem I am bobby",
    },
  ];
  return (
    <div className="posts">
      {posts.map((post) => {
        return <Post post={post} key={post.id} />;
      })}
    </div>
  );
};

export default Posts;
