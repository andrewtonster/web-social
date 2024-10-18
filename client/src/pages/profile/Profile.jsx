import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import Place from "@mui/icons-material/Place";
import { makeRequest } from "../../axios";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const userId = useLocation().pathname.split("/")[2];
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      makeRequest.get("/users/find/" + userId).then((res) => res.data),
  });

  console.log(data);

  return (
    <div className="profile">
      <div className="images">
        <img src={"./friend.png"} alt="" className="cover" />
        <img src={"./friend.png"} alt="" className="profilePic" />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>name</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>USA</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>website</span>
              </div>
            </div>
            {userId === currentUser.id ? (
              <button>Update</button>
            ) : (
              <button>follow</button>
            )}
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
        <Posts />
      </div>
    </div>
  );
};

export default Profile;
