import { EventHandler, useEffect, useRef, useState } from "react";
const FetchRestAPI: React.FC = () => {
  const [tweets, setTweets]: any = useState();
  const [editContent, setEditContent] = useState("");

  const deleteTweetHandler = async (e: any) => {
    e.preventDefault();
    const formData: any = new FormData();
    const token = localStorage.getItem("token");

    formData.append("id", e.target[0].value);
    const fetchRest = await fetch("http://localhost:8080/tweet/delete", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const restData2 = await fetchRest.json();
    console.log(restData2);
    // setPostState(!postState);
  };
  const editTweetHandler = async (e: any) => {
    e.preventDefault();
    const formData: any = new FormData();
    const token = localStorage.getItem("token");

    formData.append("id", e.target[0].value);
    formData.append("content", e.target[1].value);

    const fetchRest = await fetch("http://localhost:8080/tweet/edit", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const restData2 = await fetchRest.json();
    console.log(restData2);

    // setPostState(!postState);
    setEditContent("");
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    const getTweet = async () => {
      const fetchRest = await fetch("http://localhost:8080/tweet/all", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const restData2 = await fetchRest.json();
      setTweets(restData2.reverse());
    };
    getTweet();
  }, []);

  return (
    <div className="wrapper">
      <div className="feed-container">
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
