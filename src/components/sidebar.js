import React from "react";
import { useHistory } from "react-router-dom";

// let history = useHistory();

const SideBar = (props) => {
  const history = useHistory();
  return (
    <div className="three wide column" style={{ backgroundColor: "#F5F5F5" }}>
      <div className="ui vertical buttons">
        <button
          className="ui button"
          onClick={() => history.push("/")}
          style={{ width: 200 }}
        >
          Inbox
        </button>
        <br />
        <button onClick={() => history.push("/unread")} class="ui button">
          Unread Messages
        </button>
        <br />
        <button onClick={() => history.push("/sent")} class="ui button">
          Sent Messages
        </button>
      </div>
    </div>
  );
};

export default SideBar;
