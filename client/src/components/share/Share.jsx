import "./share.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useState } from "react";
import { makeRequest } from "../../axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const Share = () => {
  const queryClient = useQueryClient();

  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      console.log(file, formData);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const { currentUser } = useContext(AuthContext);

  const mutationKey = ["posts"];

  const mutation = useMutation({
    mutationKey,
    mutationFn: (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
  });

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();
    console.log("img url", imgUrl);
    mutation.mutate(
      { desc, img: imgUrl },
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
    setFile(null);
  };
  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={currentUser.profilePic} alt="" />
            <input
              type="text"
              placeholder={`What's on your mind ${currentUser.name}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>

          <div className="right">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>

        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src="/img.png" alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src="/map.png" alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src="/friend.png" alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
