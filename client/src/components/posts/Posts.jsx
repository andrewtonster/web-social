import React from "react";
import "./posts.scss";
import Post from "../post/post";
import { makeRequest } from "../../axios";
import { useQuery } from "@tanstack/react-query";

const Posts = ({ userId }) => {
  // we are requesting the data for others post
  // and then returning data
  // initialize a query key, so when we do invalidate queries we fetch
  // these posts again and is stored in data
  // we use cache data (save locally?) so that if the data under posts
  // doesnt change we do not have to refetch
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      makeRequest.get("/posts?userId=" + userId).then((res) => res.data),
  });

  console.log(data);

  // if we have not recieved all our posts yet from the query,
  // then show loading
  return (
    <div className="posts">
      {isError
        ? "Something went wrong"
        : isLoading
        ? "Loading..."
        : data.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;
