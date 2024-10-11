import React, { useContext } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";
import { useState } from "react";
const Comments = ({ postId }) => {
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["comments"],
    queryFn: () =>
      makeRequest.get("/comments?postId=" + postId).then((res) => res.data),
  });

  const queryClient = useQueryClient();
  const mutationKey = ["comments"];

  const mutation = useMutation({
    mutationKey,
    mutationFn: (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
  });

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate(
      { desc, postId },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(mutationKey);
        },
        onError: (error) => {
          console.error(error);
        },
        onSettled: () => {
          console.log("settled");
        },
      }
    );

    setDesc("");
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input
          type="text"
          placeholder="write a comment"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {isLoading
        ? "loading"
        : data.map((comment) => {
            return (
              <div className="comment" id={comment.id} key={comment.id}>
                <img src={comment.profilePic} alt="" />
                <div className="info">
                  <span>{comment.name}</span>
                  <p>{comment.desc}</p>
                </div>
                <div className="date">
                  {moment(comment.createdAt).fromNow()}
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default Comments;
