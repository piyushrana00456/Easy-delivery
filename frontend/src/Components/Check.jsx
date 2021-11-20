import React from "react";
import axios from "axios";
import Pusher from "pusher-js";

export const Check = () => {
  const [data, setData] = React.useState([]);

  const fetchData = async () => {
    await axios.get("http://localhost:5000/package").then((res) => {
      console.log(res.data.data);
      setData(res.data.data);
    });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    const pusher = new Pusher("dad35ca4556ca6ecf0c3", {
      cluster: "ap2",
      encrypted: true,
    });
    const channel = pusher.subscribe("package");
    channel.bind("inserted", (el) => {
      setData([...data, el]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [data]);

  console.log("Data", data);

  return (
    <div style={{ border: "2px solid green" }}>
      {data?.map((el) => {
        return <h4 key={el._id}>{el?.package || el?.packageName}</h4>;
      })}
    </div>
  );
};