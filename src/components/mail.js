import axios from "axios";
import React, { Component } from "react";
import Pagination from "./pagination";
import Display from "./display";
import SideBar from "./sidebar";
import { connect } from "react-redux";
import { InboxMessages } from "../store/actions/index.js";

class Mail extends Component {
  state = { array: [], data: [], sender: [], pageToken: "" };

  async componentDidMount() {
    let access_token = await localStorage.getItem("token");
    await axios
      .get(
        "https://gmail.googleapis.com/gmail/v1/users/qasimamin7877@gmail.com/messages?maxResults=25&labelIds=INBOX",
        {
          headers: {
            Authorization: "Bearer " + access_token,
          },
          // maxResults: 25,
        }
      )
      .then(async (res) => {
        this.setState({ array: res.data.messages });
        this.setState({ pageToken: res.data.nextPageToken });
        console.log(res);
        this.Rerendered();
      })
      .catch((err) => console.log("err", err));
  }

  Rerendered = async () => {
    let access_token = await localStorage.getItem("token");
    for (let i = 0; i < this.state.array.length; i++) {
      axios
        .get(
          `https://gmail.googleapis.com/gmail/v1/users/qasimamin7877@gmail.com/messages/${this.state.array[i].id}`,
          {
            headers: {
              Authorization: "Bearer " + access_token,
            },
          }
        )
        .then(async (result) => {
          this.setState({ data: [...this.state.data, result.data] });
          this.props.InboxMessages(this.state.data);
        })
        .catch((err) => console.log(err));
    }
  };

  NextPage = async () => {
    this.setState({ data: [] });
    let access_token = await localStorage.getItem("token");
    // https://gmail.googleapis.com/gmail/v1/users/qasimamin7877%40gmail.com/messages?maxResults=20&pageToken=06711908679528323284
    await axios
      .get(
        `https://gmail.googleapis.com/gmail/v1/users/qasimamin7877@gmail.com/messages?maxResults=25&pageToken=${this.state.pageToken}`,
        {
          headers: {
            Authorization: "Bearer " + access_token,
          },
          // maxResults: 25,
        }
      )
      .then(async (nextData) => {
        this.setState({ array: nextData.data.messages });
        this.setState({ pageToken: nextData.data.nextPageToken });
        this.Rerendered();
      })
      .catch((err) => console.log("err", err));
  };

  render() {
    // console.log(this.state);
    return [
      <Display data={this.props.reduxData} history={this.props.history} />,
      <div className="ui fluid center aligned container">
        <div
          aria-label="Pagination Navigation"
          role="navigation"
          className="ui pagination menu"
        >
          <a
            aria-current="false"
            aria-disabled="false"
            tabIndex="0"
            value="1"
            aria-label="Previous item"
            type="prevItem"
            className="item"
          >
            ⟨
          </a>
          <a
            onClick={this.NextPage}
            aria-current="false"
            aria-disabled="false"
            tabIndex="0"
            value="2"
            aria-label="Next item"
            type="nextItem"
            className="item"
          >
            ⟩
          </a>
        </div>
      </div>,
    ];
  }
}

const mapStateToProps = (state) => ({
  reduxData: state.totalMessages,
});
export default connect(mapStateToProps, { InboxMessages })(Mail);
