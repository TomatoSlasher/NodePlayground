import type { NextPage } from "next";
import Profile from "../components/profile/Profile";

const ProfilePage: NextPage = (props: any) => {
  return (
    <div>
      <Profile profile={props.profile} />
    </div>
  );
};

export default ProfilePage;

export async function getServerSideProps(context: any) {
  const fetchProfile = await fetch(
    `http://localhost:8080/profile/view/${context.params.profile.toLowerCase()}`
  );

  const profileData = await fetchProfile.json();

  return {
    props: {
      profile: profileData,
    },
  };
}
