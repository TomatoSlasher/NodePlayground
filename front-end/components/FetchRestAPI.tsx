import { useEffect, useRef, useState } from "react";

const FetchRestAPI: React.FC = () => {
  const [errorMsg, setErrorMsg]: any = useState("");

  const [restData, setRestData]: any = useState([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const postTask = async () => {
    const fetchRest = await fetch("http://localhost:8080/data/todo", {
      method: "POST",
      body: JSON.stringify({
        title: "urgernt",
        content: `${inputRef.current?.value}`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(postTask);
    const restData2 = await fetchRest.json();
    console.log(restData2);
    if (restData2.status === 400) {
      return setErrorMsg(restData2.message);
    }
    var joined = restData.concat(restData2.post.content);
    setRestData(joined);
    setErrorMsg("");
  };
  return (
    <div>
      {errorMsg && <h1>{errorMsg}</h1>}

      <form action="sumbit">
        <input ref={inputRef} placeholder="To-Do" type="text" />
        <button
          onClick={(e) => {
            postTask();
            e.preventDefault();
          }}
        >
          {" "}
          Submit
        </button>
      </form>
      <ul>
        {restData.length > 0 &&
          restData.map((val: any) => {
            return <li>{val}</li>;
          })}
      </ul>
    </div>
  );
};
export default FetchRestAPI;
