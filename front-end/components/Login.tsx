const Login = () => {
  const postLogin = async (e: any) => {
    e.preventDefault();
    const formData: any = new FormData();
    formData.append("email", e.target[0].value);

    formData.append("password", e.target[1].value);

    const fetchRest = await fetch("http://localhost:8080/user/login", {
      method: "POST",
      body: formData,
    });
    const fetchResult = await fetchRest.json();
    console.log(fetchResult);
  };
  return (
    <div className="wrapper">
      <form action="sumbit" onSubmit={postLogin}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" />
        <label htmlFor="password">Passowrd</label>
        <input type="password" name="password" />
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};
export default Login;
