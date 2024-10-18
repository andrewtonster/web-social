import React, { useState, useEffect, useContext } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import "./post.scss";
import Comments from "../comments/Comments";
import moment from "moment";
import { makeRequest } from "../../axios";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";

const Post = ({ post }) => {
  const [commentOpen, setCommmentOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  // getting all the user id who liked the post
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["likes", post.id],
    queryFn: () =>
      makeRequest.get("/likes?postId=" + post.id).then((res) => res.data),
  });

  const mutationKey = ["likes"];

  // if current user included in list of likes
  const mutation = useMutation({
    mutationKey,
    mutationFn: (liked) => {
      if (liked) return makeRequest.delete("/likes?postId=" + post.id);
      return makeRequest.post("/likes", { postId: post.id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["likes"]);
    },
  });

  // call the mutation function when like button cliked
  const handleLike = () => {
    mutation.mutate(data.includes(currentUser.id));
  };

  const [showElement, setShowElement] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowElement(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inerhit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>
            {post.desc}

            {post.img}
          </p>
          {showElement && <img src={`./upload/${post.img}`} alt="" />}
        </div>
        <div className="info">
          <div className="item">
            {isLoading ? (
              "isloading"
            ) : data.includes(currentUser.id) ? (
              <FavoriteOutlinedIcon
                style={{ color: "red" }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            {data ? data.length : 0} Likes
          </div>
          <div className="item" onClick={() => setCommmentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            12 Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>

        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;
