import ProfileInfo from "./ProfileInfo";
const Profile: React.FC<{ profile: any }> = (props) => {
  return (
    <div>
      <ProfileInfo profile={props.profile.data} />
    </div>
  );
};
export default Profile;
