import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UserImg from "../../public/user.png";
import classes from "./ProfileFeed.module.css";
const ProfileFeed: React.FC<{
  profile: { data: {}; userId: string };
}> = (props) => {
  const profile: any = props.profile.data;
  const [editContent, setEditContent] = useState("");
  const [showEditMenu, setShowEditMenu] = useState("");
  const deleteTweetHandler = async (e: any) => {
    e.preventDefault();
    const formData: any = new FormData();
    const token = localStorage.getItem("token");

    formData.append("id", e.target[0].value);
    const fetchRest = await fetch(
      "https://twitter-tomato.herokuapp.com/tweet/delete",
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const restData2 = await fetchRest.json();
    console.log(restData2);
  };
  const editTweetHandler = async (e: any) => {
    e.preventDefault();
    const formData: any = new FormData();
    const token = localStorage.getItem("token");

    formData.append("id", e.target[0].value);
    formData.append("content", e.target[1].value);

    const fetchRest = await fetch(
      "https://twitter-tomato.herokuapp.com/tweet/edit",
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const restData2 = await fetchRest.json();
    console.log(restData2);

    setEditContent("");
  };
  let profileTweets: any = [...profile.tweets];
  profileTweets.reverse();
  console.log(profile._id);
  console.log(props.profile.userId);

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
                {props.profile.userId === profile._id && (
                  <div className={classes["edit-tweet-container"]}>
                    <svg
                      className={classes["edit-tweet-icon"]}
                      width="30"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="ellipsis-h"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      onClick={() => {
                        showEditMenu === val._id
                          ? setShowEditMenu("")
                          : setShowEditMenu(val._id);
                      }}
                    >
                      <path
                        fill="rgb(0, 140, 255)"
                        d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"
                      ></path>
                    </svg>
                    {showEditMenu === val._id && (
                      <div className={classes["edit-tweet-menu"]}>
                        <form action="sumbit" onSubmit={deleteTweetHandler}>
                          <input type="hidden" value={val._id} />

                          <button
                            className={classes["tweet-menu-btn"]}
                            type="submit"
                          >
                            Delete
                          </button>
                        </form>
                        <input type="hidden" value={val._id} />

                        <button
                          className={classes["tweet-menu-btn"]}
                          onClick={() => setEditContent(val._id)}
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <img
                className="uploaded-img"
                src={`https://twitter-tomato.herokuapp.com/${val.imageUrl.substring(
                  5
                )}`}
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
