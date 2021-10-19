import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProfileInfo from "./ProfileInfo";
import TweetForm from "./TweetForm";
import ProfileFeed from "./ProfileFeed";

import classes from "./Profile.module.css";
const Profile: React.FC = () => {
  const router: any = useRouter();
  const [profileData, setProfileData]: any = useState("");
  useEffect(() => {
    const getProfile = async () => {
      const token = localStorage.getItem("token");
      const fetchProfile = await fetch(
        `https://twitter-tomato.herokuapp.com/profile/view/${router.query.profile}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      const profileResult = await fetchProfile.json();
      setProfileData(profileResult);
    };
    getProfile();
  }, [router]);
  return (
    <div className="wrapper">
      <div className={classes["profile-page-container"]}>
        {profileData.data && <ProfileInfo profile={profileData} />}
        {profileData.data && <TweetForm profile={profileData} />}
        {profileData.data && <ProfileFeed profile={profileData} />}
      </div>
    </div>
  );
};
export default Profile;
