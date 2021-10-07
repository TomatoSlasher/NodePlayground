import { useEffect, useRef, useState } from "react";

const FetchRestAPI: React.FC = () => {
  const [errorMsg, setErrorMsg]: any = useState("");
  const [fileImg, setFile]: any = useState();
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
    const restData2 = await fetchRest.json();
    console.log(restData2);
    if (restData2.status === 400) {
      return setErrorMsg(restData2.message);
    }
    var joined = restData.concat(restData2.post.content);
    setRestData(joined);
    setErrorMsg("");
  };

  const handleFileChange = (event: any) => {
    console.log(event);
    setFile(event.target.files);
  };
  if (fileImg) {
    console.log(fileImg);
  }
  const postImage = async () => {
    const formData = new FormData();
    formData.append("image", fileImg[0]);
    const fetchRest = await fetch("http://localhost:8080/data/todo", {
      method: "POST",
      body: formData,
    });
    const restData2 = await fetchRest.json();
    console.log(restData2);
  };
  return (
    <div>
      {errorMsg && <h1>{errorMsg}</h1>}

      <form
        action="sumbit"
        encType="mulipart/form-data"
        onSubmit={(e) => {
          postTask();

          e.preventDefault();
          console.log(e);
        }}
      >
        <input ref={inputRef} placeholder="To-Do" type="text" />
        {/* <input type="file" onChange={handleFileChange} name="image" /> */}
        <input type="submit" value="Submit" />
      </form>
      <ul>
        {restData.length > 0 &&
          restData.map((val: any, idx: number) => {
            return <li key={idx}>{val}</li>;
          })}
      </ul>
    </div>
  );
};
export default FetchRestAPI;
