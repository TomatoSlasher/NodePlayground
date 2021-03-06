import { useRouter } from "next/router";
import { loginActions } from "../store/index";
import { useDispatch } from "react-redux";
const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const postLogin = async (e: any) => {
    e.preventDefault();
    const formData: any = new FormData();
    formData.append("email", e.target[0].value);

    formData.append("password", e.target[1].value);

    const fetchRest = await fetch(
      "https://twitter-tomato.herokuapp.com/user/login",
      {
        method: "POST",
        body: formData,
      }
    );
    const fetchResult = await fetchRest.json();
    dispatch(
      loginActions.loginState({
        userId: fetchResult.userId,
        username: fetchResult.username,
      })
    );

    localStorage.setItem("token", fetchResult.token);
    router.push("/");
  };
  return (
    <div className="wrapper">
      <form action="sumbit" onSubmit={postLogin}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" />
        <label htmlFor="password">Passowrd</label>
        <input type="password" name="password" />
        <div>
          <button type="submit">Login2</button>
        </div>
      </form>
    </div>
  );
};
export default Login;
