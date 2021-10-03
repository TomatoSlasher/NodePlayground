import { useEffect, useState } from "react";

const FetchRestAPI: React.FC = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchDataHandler = async () => {
      const fetchRest = await fetch("http://localhost:8080/feed");

      const restData = await fetchRest.json();
      console.log(restData);
      setData(restData);
    };
    fetchDataHandler();
  }, [data]);
  return <div>{data}</div>;
};
export default FetchRestAPI;
