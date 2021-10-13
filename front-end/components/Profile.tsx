const Profile: React.FC<{ profile: { message: {} } }> = (props) => {
  console.log(props.profile);
  return (
    <div>
      <h1>{props.profile.message}</h1>
    </div>
  );
};
export default Profile;
