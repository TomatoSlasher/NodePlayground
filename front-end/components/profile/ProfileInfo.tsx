import UserImg from "../../public/user.png";
import classes from "./ProfileInfo.module.css";

interface ProfileType {
  username: string;
  followers: number;
  following: number;
  _id: string;
}
const Profile: React.FC<{ profile: ProfileType }> = (props) => {
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
        <h2>@{props.profile.username}</h2>
        <div className={classes["following-container"]}>
          <div className={classes["following"]}>
            <p>following {props.profile.following}</p>
            <p>followers {props.profile.followers}</p>
          </div>
          <form action="sumbit" onSubmit={profileFollowHandler}>
            <input name="profileId" type="hidden" value={props.profile._id} />
            <button type="submit">Follow</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Profile;
