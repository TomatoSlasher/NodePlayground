import { useEffect, useState } from "react";
import UserImg from "../../public/user.png";
import classes from "./ProfileInfo.module.css";

interface ProfileType {
  username: string;
  followers: string[];
  following: [];
  _id: string;
}
const Profile: React.FC<{ profile: { data: ProfileType; userId: string } }> = (
  props
) => {
  const profile = props.profile.data;
  const [isFollower, setIsFollower] = useState(false);
  // check if user follows profile
  useEffect(() => {
    const userId = props.profile.userId;
    const followersIncludesUserId = profile.followers.includes(userId);
    setIsFollower(followersIncludesUserId);
  }, [profile]);

  const profileFollowHandler = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData: any = new FormData();
    formData.append("profileId", e.target[0].value);

    console.log(e.target[0].value);
    const fetchRest = await fetch("http://localhost:8080/profile/follow", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const restData2 = await fetchRest.json();
  };
  const profileUnfollowHandler = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData: any = new FormData();
    formData.append("profileId", e.target[0].value);

    const fetchRest = await fetch("http://localhost:8080/profile/unfollow", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const restData2 = await fetchRest.json();
    console.log(restData2);
  };
  return (
    <div className="wrapper">
      <div className={classes["profile-info-container"]}>
        <img
          className={classes["profile-img"]}
          src={UserImg.src}
          alt="user default image"
        />
        <h2>@{profile.username}</h2>
        <div className={classes["following-container"]}>
          <div className={classes["following"]}>
            <p>following {profile.following.length}</p>
            <p>followers {profile.followers.length}</p>
          </div>
          {isFollower ? (
            <form action="sumbit" onSubmit={profileUnfollowHandler}>
              <input name="profileId" type="hidden" value={profile._id} />
              <button className={classes["unfollow-btn"]} type="submit">
                Unfollow
              </button>
            </form>
          ) : (
            <form action="sumbit" onSubmit={profileFollowHandler}>
              <input name="profileId" type="hidden" value={profile._id} />
              <button type="submit">Follow</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
export default Profile;
