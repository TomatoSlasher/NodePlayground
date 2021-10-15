import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProfileInfo from "./ProfileInfo";
const Profile: React.FC = () => {
  const router: any = useRouter();
  const [profileData, setProfileData]: any = useState("");
  useEffect(() => {
    const getProfile = async () => {
      const token = localStorage.getItem("token");
      const fetchProfile = await fetch(
        `http://localhost:8080/profile/view/${router.query.profile}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      const profileResult = await fetchProfile.json();
      console.log(profileResult);
      setProfileData(profileResult);
    };
    getProfile();
  }, [router]);
  return <div>{profileData.data && <ProfileInfo profile={profileData} />}</div>;
};
export default Profile;
