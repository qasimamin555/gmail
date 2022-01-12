import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "./sidebar";
import Reply from "./reply";

const DisplayMessage = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    let access_token = localStorage.getItem("token");
    axios
      .get(
        `https://gmail.googleapis.com/gmail/v1/users/qasimamin7877@gmail.com/messages/${props.history.location.state.id}`,
        {
          headers: {
            Authorization: "Bearer " + access_token,
          },
        }
      )
      .then(async (result) => {
        setData(result.data);
        console.log(result.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    // <div>
    <div className="twelve wide column" style={{ marginTop: 25 }}>
      <div className="ui sizer vertical segment">
        {data.length !== 0 &&
          data.payload.headers.map((name, key) => {
            return (
              <div key={key} style={{ fontSize: 30 }}>
                <div className="ui massive header">
                  {name.name === "Subject" && name.value}
                </div>
                <div style={{ margin: 25 }}>
                  {name.name === "From" && name.value}
                </div>
              </div>
            );
          })}
      </div>

      {data.length !== 0 && <div className="ui header">{data.snippet}</div>}
      <Reply data={data} />
    </div>
  );
};
export default DisplayMessage;
