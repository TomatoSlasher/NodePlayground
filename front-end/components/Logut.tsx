import classes from "./Header.module.css";
import { loginActions } from "../store/index";
import { useDispatch } from "react-redux";
const Logout = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(
      loginActions.loginState({
        userId: "",
        username: "",
      })
    );
  };
  return (
    <div>
      <button onClick={logoutHandler} className={classes["logout-btn"]}>
        Logout
      </button>
    </div>
  );
};
export default Logout;
