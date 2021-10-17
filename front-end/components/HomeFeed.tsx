import { useEffect, useState } from "react";
import classes from "./HomeFeed.module.css";
import { useSelector } from "react-redux";
import UserImg from "../public/user.png";
import Link from "next/link";
const HomeFeed = () => {
  const loginState = useSelector((state: any) => {
    return state.login;
  });
  const [userFollowingTweets, setUserFollowingTweets]: any = useState([]);
  useEffect(() => {
    const getTweets = async () => {
      const token = localStorage.getItem("token");

      const fetchRest = await fetch("http://localhost:8080/tweet/all", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const fetchResult = await fetchRest.json();
      //etract tweets from following objec
      const followingTweets = fetchResult.followingTweets.following;

      followingTweets.map((val: any) =>
        userFollowingTweets.push(...val.tweets)
      );
    };
    getTweets();
    console.log(userFollowingTweets);
  }, []);
  return (
    <div className="wrapper">
      <div className={classes["feed-container"]}>
        <div>
          {userFollowingTweets.length && (
            <>
              {userFollowingTweets.map((val: any, idx: number) => {
                return (
                  <div key={val._id} className={classes["tweet-container"]}>
                    <div className="tweet-header">
                      <div className={classes["tweet-header-container"]}>
                        <img
                          src={UserImg.src}
                          className={classes["tweet-profile-img"]}
                          alt=""
                        />
                        <div className={classes["tweet-content-container"]}>
                          <Link href={`/${val.creator.username}`}>
                            <p className={classes["tweet-username"]}>
                              @{val.creator.username}
                            </p>
                          </Link>
                          <p className={classes["tweet-content"]}>
                            {val.content}
                          </p>
                        </div>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default HomeFeed;
