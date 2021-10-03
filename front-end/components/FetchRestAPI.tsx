import { useEffect, useState } from "react";

const FetchRestAPI: React.FC = () => {
  const [data, setData]: any = useState("intitial");
  useEffect(() => {
    const fetchDataHandler = async () => {
      const fetchRest = await fetch("http://localhost:8080/data/feed");
      const restData = await fetchRest.json();
      console.log(restData);
      setData(restData);
    };
    fetchDataHandler();
  }, []);
  return <div>{data.message}</div>;
};
export default FetchRestAPI;
