import { useRouter } from "next/router";

const Signup = () => {
  const router = useRouter();

  const postSignup = async (e: any) => {
    e.preventDefault();
    const formData: any = new FormData();
    formData.append("username", e.target[0].value);

    formData.append("email", e.target[1].value);

    formData.append("password", e.target[2].value);

    const fetchRest = await fetch(
      "https://twitter-tomato.herokuapp.com/user/signup",
      {
        method: "POST",
        body: formData,
      }
    );
    const fetchResult = await fetchRest.json();
    console.log(fetchResult);
    router.push("/login");
  };
  return (
    <div className="wrapper">
      <form action="sumbit" onSubmit={postSignup}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" />
        <label htmlFor="password">Passowrd</label>
        <input type="password" name="password" />
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};
export default Signup;
