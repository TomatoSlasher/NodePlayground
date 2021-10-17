import Link from "next/link";
import classes from "./Header.module.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Logout from "./Logut";
const Header = () => {
  const loginState = useSelector((state: any) => {
    return state.login;
  });

  return (
    <div className={classes["header-container"]}>
      <Link href="/">
        <h1>Twitter Clone</h1>
      </Link>
      <div>
        {!loginState.userId && (
          <>
            <Link href="/signup">
              <button>Signup</button>
            </Link>
            <Link href="/login">
              <button>Login</button>
            </Link>
          </>
        )}
        {loginState.userId && (
          <div className={classes["user-header"]}>
            <Link href={`/${loginState.username}`}>
              <h2>@{loginState.username}</h2>
            </Link>
            <Logout />
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;
