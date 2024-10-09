import React from "react";
import "./posts.scss";
import Post from "../post/post";
import { makeRequest } from "../../axios";
import { useQuery } from "@tanstack/react-query";

const Posts = () => {
  // we are requesting the data for others post
  // and then returning data
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => makeRequest.get("/posts").then((res) => res.data),
  });

  console.log(data);
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
