import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UserImg from "../../public/user.png";
import classes from "./ProfileFeed.module.css";
const ProfileFeed: React.FC<{
  profile: { data: {}; userId: string };
}> = (props) => {
  const profile: any = props.profile.data;
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

    setEditContent("");
  };
  let profileTweets: any = [...profile.tweets];
  profileTweets.reverse();
  console.log(profile);

  return (
    <div className="tweets-feed">
      <div>
        {profileTweets.map((val: any, idx: number) => {
          return (
            <div key={val._id} className="tweet-container">
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
                  <div className={classes["tweet-header-container"]}>
                    <img
                      src={UserImg.src}
                      className={classes["tweet-profile-img"]}
                      alt=""
                    />
                    <div className={classes["tweet-content-container"]}>
                      <p className={classes["tweet-username"]}>
                        @{profile.username}
                      </p>
                      <p className={classes["tweet-content"]}>{val.content}</p>
                    </div>
                  </div>
                )}
                <div>
                  <form action="sumbit" onSubmit={deleteTweetHandler}>
                    <input type="hidden" value={val._id} />

                    <button type="submit">Delete</button>
                  </form>
                  <input type="hidden" value={val._id} />

                  <button onClick={() => setEditContent(val._id)}>Edit</button>
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
  );
};
export default ProfileFeed;
