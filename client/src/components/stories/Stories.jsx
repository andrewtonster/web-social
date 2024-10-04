import React, { useContext } from "react";
import "./stories.scss";
import { AuthContext } from "../../context/authContext";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);
  const stories = [
    {
      id: 1,
      name: "Andrew Doe",
      img: "https://i.imgur.com/T4rbGAe.png",
    },
    {
      id: 2,
      name: "Andrew Doe",
      img: "https://i.imgur.com/T4rbGAe.png",
    },
    {
      id: 3,
      name: "Andrew Doe",
      img: "https://i.imgur.com/T4rbGAe.png",
    },
    {
      id: 4,
      name: "Andrew Doe",
      img: "https://i.imgur.com/T4rbGAe.png",
    },
    {
      id: 5,
      name: "Andrew Doe",
      img: "https://i.imgur.com/T4rbGAe.png",
    },
  ];

  return (
    <div className="stories">
      <div className="story">
        <img src={currentUser.profilePic} />
        <span>{currentUser.name}</span>
        <button>+</button>
      </div>
      {stories.map((story) => {
        return (
          <div className="story" key={story.id}>
            <img src={story.img} />
            <span>{story.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Stories;
