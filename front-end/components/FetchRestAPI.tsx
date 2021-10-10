import { useEffect, useRef, useState } from "react";

const FetchRestAPI: React.FC = () => {
  const [fileImg, setFile]: any = useState();
  const [img, setImg]: any = useState();
  const [currentImgs, setCurrentImgs]: any = useState();

  const handleFileChange = (event: any) => {
    setFile(event.target.files);
  };

  const postTweet = async (e: any) => {
    // extract form data
    const formData: any = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    console.log(formProps);

    // formData.append("image", fileImg[0]);
    // formData.append("content", "postData.content");

    // const fetchRest = await fetch("http://localhost:8080/data/image", {
    //   method: "POST",
    //   body: formData,
    // });
    // const restData2 = await fetchRest.json();
    // const path = restData2.post.imageUrl;
    // const imageUrl = `http://localhost:8080/${restData2.post.imageUrl.substring(
    //   5
    // )}`;
    // setImg(imageUrl);
  };

  useEffect(() => {
    const getTweet = async () => {
      const fetchRest = await fetch("http://localhost:8080/data/image");
      const restData2 = await fetchRest.json();
      console.log(restData2);
      setCurrentImgs(restData2);
    };
    getTweet();
  }, [img]);

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
          <div className="tweet-btn-container">
            <label className="custom-file-upload">
              <input name="image" type="file" />
              Upload Image
            </label>
            <button type="submit">Tweet</button>
          </div>
        </div>
      </form>
      {currentImgs &&
        currentImgs.map((val: any) => {
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
