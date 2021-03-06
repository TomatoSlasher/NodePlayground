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

      const fetchRest = await fetch(
        "https://twitter-tomato.herokuapp.com/tweet/all",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const fetchResult = await fetchRest.json();
      //etract tweets from following object
      const followingTweets = fetchResult.followingTweets.following;
      const arr: any = [];
      followingTweets.map((val: any) => {
        return arr.push(...val.tweets);
      });
      console.log(arr);
      setUserFollowingTweets(arr);
    };
    getTweets();
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
                      src={`https://twitter-tomato.herokuapp.com/${val.imageUrl.substring(
                        5
                      )}`}
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
