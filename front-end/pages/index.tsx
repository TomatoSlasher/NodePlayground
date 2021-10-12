import type { NextPage } from "next";
import FetchRestAPI from "../components/FetchRestAPI";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      <Link href="/signup">
        <button>SignUp</button>
      </Link>
      <Link href="/login">
        <button>Login</button>
      </Link>
      <FetchRestAPI />
    </div>
  );
};

export default Home;
