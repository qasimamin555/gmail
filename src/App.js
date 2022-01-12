import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Mail from "./components/mail";
import Auth from "./components/auth";
import UnreadMessages from "./components/UnreadMessages";
import DisplayMessage from "./components/displayMessage";
import SideBar from "./components/sidebar";
import Pagination from "./components/pagination";
import SentMessages from "./components/sent";

const App = (props) => {
  console.log("app props", props);
  return (
    <BrowserRouter>
      <div
        className="ui grid"
        style={{ margin: 25, border: "1px solid #F5F5F5" }}
      >
        <SideBar />
        <Route exact path="/" component={Auth} />
        <Route path="/success" component={Mail} />
        <Route path="/display" component={DisplayMessage} />
        <Route path="/unread" component={UnreadMessages} />
        <Route path="/sent" component={SentMessages} />
      </div>
      <br />
    </BrowserRouter>
  );
};
export default App;
