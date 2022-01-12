import React, { Component } from "react";
import Display from "./display";
import axios from "axios";
import { Sent } from "../store/actions/index";
import { connect } from "react-redux";

class SentMessages extends Component {
  state = { array: [], data: [], pageToken: "" };

  async componentDidMount() {
    let access_token = await localStorage.getItem("token");
    axios
      .get(
        `https://gmail.googleapis.com/gmail/v1/users/qasimamin7877@gmail.com/messages/?maxResults=25&labelIds=SENT`,
        {
          headers: {
            Authorization: "Bearer " + access_token, //the token is a variable which holds the token
          },
        }
      )
      .then(async (result) => {
        this.setState({ array: result.data.messages });
        this.setState({ pageToken: result.data.nextPageToken });
        this.Rerendered();
      })
      .catch((err) => console.log(err));
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
          this.props.Sent(this.state.data);
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
        `https://gmail.googleapis.com/gmail/v1/users/qasimamin7877@gmail.com/messages?maxResults=25&pageToken=${this.state.pageToken}&labelIds=SENT`,
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
    return [
      <Display
        data={this.props.sentingMessages}
        history={this.props.history}
      />,
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
  sentingMessages: state.sentMessages,
});
export default connect(mapStateToProps, { Sent })(SentMessages);
