import { useEffect, useRef, useState } from "react";

const FetchRestAPI: React.FC = () => {
  const [errorMsg, setErrorMsg]: any = useState("");
  const [fileImg, setFile]: any = useState();
  const [restData, setRestData]: any = useState([]);
  const [img, setImg]: any = useState();
  const inputRef = useRef<HTMLInputElement>(null);

  const postTask = async () => {
    const fetchRest = await fetch("http://localhost:9000/data/todo", {
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
    if (restData2.status === 400) {
      return setErrorMsg(restData2.message);
    }
    var joined = restData.concat(restData2.post.content);
    setRestData(joined);
    setErrorMsg("");
  };

  const handleFileChange = (event: any) => {
    setFile(event.target.files);
  };

  const postImage = async () => {
    const formData: any = new FormData();
    formData.append("image", fileImg[0]);
    formData.append("title", "postData.title");
    formData.append("content", "postData.content");
    const fetchRest = await fetch("http://localhost:8080/data/image", {
      method: "POST",
      body: formData,
    });
    const restData2 = await fetchRest.json();
    const path = restData2.post.imageUrl;
    const imageUrl = `http://localhost:8080/${restData2.post.imageUrl.substring(
      5
    )}`;

    setImg(imageUrl);
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
        }}
      >
        <input ref={inputRef} placeholder="To-Do" type="text" />
        <input type="submit" value="Submit" />
      </form>
      <ul>
        {restData.length > 0 &&
          restData.map((val: any, idx: number) => {
            return <li key={idx}>{val}</li>;
          })}
      </ul>
      <form
        encType="multipart/form-data"
        action="sumbit"
        onSubmit={(e) => {
          postImage();

          e.preventDefault();
        }}
      >
        <input type="file" onChange={handleFileChange} name="image" />
        <input type="submit" value="Submit" />
      </form>
      {img && <img src={img} alt="" />}
    </div>
  );
};
export default FetchRestAPI;
