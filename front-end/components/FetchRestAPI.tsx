import { useEffect, useRef, useState } from "react";

const FetchRestAPI: React.FC = () => {
  const [img, setImg]: any = useState();
  const [tweets, setTweets]: any = useState();
  const [previewImage, setPreviewImage] = useState("");
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
    // extract form data
    const formData: any = new FormData(e.target);
    const formProps: any = Object.fromEntries(formData);
    console.log(formProps);

    // formData.append("image", fileImg[0]);
    // formData.append("content", "postData.content");

    const fetchRest = await fetch("http://localhost:8080/tweet/create", {
      method: "POST",
      body: formProps,
    });
    const restData2 = await fetchRest.json();
    console.log(restData2);
    const path = restData2.post.imageUrl;
    const imageUrl = `http://localhost:8080/${restData2.post.imageUrl.substring(
      5
    )}`;
    setImg(imageUrl);
  };

  // useEffect(() => {
  //   const getTweet = async () => {
  //     const fetchRest = await fetch("http://localhost:8080/tweet/all");
  //     const restData2 = await fetchRest.json();
  //     console.log(restData2);
  //     setTweets(restData2);
  //   };
  //   getTweet();
  // }, [img]);

  return (
    <div>
      <form
        action="sumbit"
        onSubmit={(e) => {
          postTweet(e);
          e.preventDefault();
        }}
        className="tweet-form"
      >
        <div className="tweet-container">
          <div>
            {" "}
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
      {tweets &&
        tweets.map((val: any) => {
          return (
            <img
              key={val.imageUrl}
              className="uploaded-img"
              src={`http://localhost:8080/${val.imageUrl.substring(5)}`}
              alt=""
            />
          );
        })}
    </div>
  );
};
export default FetchRestAPI;
