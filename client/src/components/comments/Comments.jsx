import React, { useContext } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
const Comments = () => {
  const { currentUser } = useContext(AuthContext);
  const comments = [
    {
      id: 1,
      desc: "lorem fduioafbndoaisfoiafsdbnfioasdfdas",
      name: "John Doe",
      userId: 1,
      profilePic: "https://i.imgur.com/T4rbGAe.png",
    },
  ];
  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input type="text" placeholder="write a comment" />
        <button>Send</button>
      </div>
      {comments.map((comment) => {
        return (
          <div className="comment">
            <img src={comment.profilePic} alt="" />
            <div className="info">
              <span>{comment.name}</span>
              <p>{comment.desc}</p>
            </div>
            <div className="date"> 1 hour ago</div>
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
