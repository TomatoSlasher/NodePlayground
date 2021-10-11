import { EventHandler, useEffect, useRef, useState } from "react";

const FetchRestAPI: React.FC = () => {
  const [tweets, setTweets]: any = useState();
  const [previewImage, setPreviewImage] = useState("");
  const [postState, setPostState] = useState(false);
  const [editContent, setEditContent] = useState("");
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
    const formData: any = new FormData();
    formData.append("image", e.target[1].files[0]);

    formData.append("content", e.target[0].value);

    const fetchRest = await fetch("http://localhost:8080/tweet/create", {
      method: "POST",
      body: formData,
    });
    const fetchResult = await fetchRest.json();
    setPreviewImage("");
    setPostState(!postState);
  };
  const deleteTweetHandler = async (e: any) => {
    e.preventDefault();
    const formData: any = new FormData();

    formData.append("id", e.target[0].value);
    const fetchRest = await fetch("http://localhost:8080/tweet/delete", {
      method: "POST",
      body: formData,
    });
    const restData2 = await fetchRest.json();
    setPostState(!postState);
  };
  const editTweetHandler = async (e: any) => {
    e.preventDefault();
    const formData: any = new FormData();

    formData.append("id", e.target[0].value);
    formData.append("content", e.target[1].value);

    const fetchRest = await fetch("http://localhost:8080/tweet/edit", {
      method: "POST",
      body: formData,
    });
    const restData2 = await fetchRest.json();
    console.log(restData2);
    setPostState(!postState);
    setEditContent("");
  };
  useEffect(() => {
    const getTweet = async () => {
      const fetchRest = await fetch("http://localhost:8080/tweet/all");
      const restData2 = await fetchRest.json();
      console.log(restData2);
      setTweets(restData2.reverse());
    };
    getTweet();
  }, [postState]);

  return (
    <div className="wrapper">
      <div className="feed-container">
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
        <div className="tweets-feed">
          <div>
            {tweets &&
              tweets.map((val: any, idx: number) => {
                return (
                  <div key={idx} className="tweet-container">
                    <div className="tweet-header">
                      {editContent === val._id ? (
                        <div>
                          <form action="sumbit" onSubmit={editTweetHandler}>
                            <input type="hidden" value={val._id} />
                            <textarea
                              className="tweet-box edit-box"
                              name="content"
                              defaultValue={val.content}
                            />
                            <button type="submit">Complete</button>
                          </form>
                        </div>
                      ) : (
                        <p className="tweet-content">{val.content}</p>
                      )}
                      <div>
                        <form action="sumbit" onSubmit={deleteTweetHandler}>
                          <input type="hidden" value={val._id} />

                          <button type="submit">Delete</button>
                        </form>
                        <input type="hidden" value={val._id} />

                        <button onClick={() => setEditContent(val._id)}>
                          Edit
                        </button>
                      </div>
                    </div>

                    <img
                      className="uploaded-img"
                      src={`http://localhost:8080/${val.imageUrl.substring(5)}`}
                      alt=""
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default FetchRestAPI;
