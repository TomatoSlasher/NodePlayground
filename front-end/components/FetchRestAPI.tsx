import { useEffect, useRef, useState } from "react";

const FetchRestAPI: React.FC = () => {
  const [restData, setRestData]: any = useState([]);
  const inputRef = useRef<HTMLInputElement>(null);
  // useEffect(() => {
  //   const fetchDataHandler = async () => {
  //     const fetchRest = await fetch("http://localhost:8080/data/feed");
  //     const restData = await fetchRest.json();
  //     console.log(restData);
  //     setRestData(restData);
  //   };
  //   fetchDataHandler();
  // }, []);

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
    const restData2 = await fetchRest.json();
    var joined = restData.concat(restData2.post.content);
    console.log(joined);
    setRestData(joined);
  };
  return (
    <div>
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
