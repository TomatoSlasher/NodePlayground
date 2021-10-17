import Link from "next/link";
import classes from "./Header.module.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Logout from "./Logut";
const Header = () => {
  const loginState = useSelector((state: any) => {
    return state.login;
  });
  useEffect(() => {
    console.log(loginState);
  }, [loginState]);
  return (
    <div className={classes["header-container"]}>
      <h1>Twitter Clone</h1>
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
            <h2>@{loginState.username}</h2>
            <Logout />
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;
