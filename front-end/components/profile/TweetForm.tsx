import { useEffect, useState } from "react";

const TweetForm: React.FC<{
  profile: { data: { _id: string }; userId: string };
}> = (props) => {
  const [isUserProfile, setIsUserProfile] = useState(false);
  useEffect(() => {
    console.log(props.profile.userId);
    if (props.profile.userId === props.profile.data._id) {
      setIsUserProfile(true);
    }
  }, []);
  const [previewImage, setPreviewImage] = useState("");
  const [postState, setPostState] = useState(false);

  const previewFileChange = async (e: any) => {
    const formData: any = new FormData();
    formData.append("image", e.target.files[0]);

    const fetchRest = await fetch("http://localhost:8080/tweet/img-preview", {
      method: "POST",
      body: formData,
    });
    const fetchResult: any = await fetchRest.json();
    const imgPath = `http://localhost:8080/${fetchResult.imageUrl.substring(
      5
    )}`;
    setPreviewImage(imgPath);
  };
  const postTweet = async (e: any) => {
    const token = localStorage.getItem("token");

    const formData: any = new FormData();
    formData.append("image", e.target[1].files[0]);

    formData.append("content", e.target[0].value);

    const fetchRest = await fetch("http://localhost:8080/tweet/create", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const fetchResult = await fetchRest.json();
    setPreviewImage("");
    setPostState(!postState);
  };
  return (
    <div>
      {isUserProfile && (
        <form
          action="sumbit"
          onSubmit={(e) => {
            postTweet(e);
            e.preventDefault();
          }}
          className="tweet-form"
        >
          <div className="post-tweet-container">
            <div>
              <label htmlFor="title">Tweet</label>
              <textarea className="tweet-box" name="content" />
            </div>
            {previewImage && (
              <img className="uploaded-img" src={previewImage} alt="" />
            )}
            <div className="tweet-btn-container">
              <label className="custom-file-upload">
                <input onChange={previewFileChange} name="image" type="file" />
                Upload Image
              </label>
              <button type="submit">Tweet</button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
export default TweetForm;
