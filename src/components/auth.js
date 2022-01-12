import React, { Component } from "react";
import { Redirect } from "react-router-dom";

const Scopes =
  "https://mail.google.com/ https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.readonly";

class Auth extends Component {
  state = { isSignedIn: null };

  componentDidMount() {
    console.log("component is working");
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "83014570125-6pcdhppi27kqqsr01v45iddb1n7ka44i.apps.googleusercontent.com",
          scope: Scopes,
        })
        .then(async () => {
          this.auth = window.gapi.auth2.getAuthInstance();
          //   await this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          await window.localStorage.setItem(
            "token",
            JSON.stringify(this.auth.currentUser.Mb.vc.access_token)
          );
          this.auth.isSignedIn.get()
            ? this.props.history.push("/success")
            : alert("not");
          console.log(this.auth.currentUser.Mb.vc.access_token);
        });
    });
  }

  signIn = () => {
    this.auth.signIn();
  };

  render() {
    console.log("auth props", this.props);
    return (
      <div
        style={{ height: "100vh" }}
        className="ui middle aligned center aligned grid"
      >
        <div className="ui column">
          <div>
            <h2 className="ui header">
              <img
                className="ui image"
                alt="images"
                src="https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Gmail.max-1100x1100.png"
              />
              <div className="content">WELCOME TO THE GMAIL</div>
            </h2>
            {/* <br /> */}
            <button className="ui blue google button" onClick={this.signIn}>
              <i className="google icon" />
              Sign in with Google
            </button>
            <button
              className="ui blue google button"
              onClick={() => this.auth.signOut()}
            >
              <i className="google icon" />
              SignOut your Account
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Auth;
