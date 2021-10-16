import Link from "next/link";
import classes from "./Header.module.css";
const Header = () => {
  return (
    <div className={classes["header-container"]}>
      <h1>Twitter Clone</h1>
      <div>
        <Link href="/signup">
          <button>Signup</button>
        </Link>
        <Link href="/login">
          <button>Login</button>
        </Link>
        <button className={classes["logout-btn"]}>Logout</button>
      </div>
    </div>
  );
};
export default Header;
