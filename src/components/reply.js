import React, { useState } from "react";
import axios from "axios";
import base64 from "base-64";

const Reply = (props) => {
  const [btnStatus, setBtnStatus] = useState(false);
  const [farwardStatus, setFarwardStatus] = useState(false);
  const [value, setValue] = useState("");
  const [subject, setSubject] = useState("");
  const [farwardData, setForwardData] = useState({
    From: "",
    to: "",
    Date: "",
    SubjectTitle: "",
    body: "",
  });
  const [farwardto, setFarwardTo] = useState("");

  const sendMessage = async (event) => {
    event.preventDefault();
    let access_token = await localStorage.getItem("token");
    let to = props.data.payload.headers.find((val, inde) => {
      return val.name === "From" ? val.value : null;
    });
    let from = props.data.payload.headers.find((val, inde) => {
      return val.name === "To" ? val.value : null;
    });

    var mail = base64
      .encode(
        `From: ${
          from.value.includes("<")
            ? from.value.split("<")[1].split(">")[0]
            : from.value
        }\n` +
          `To: ${
            to.value.includes("<")
              ? to.value.split("<")[1].split(">")[0]
              : to.value
          }\n` +
          `Subject:${subject} \n\n` +
          `${value}\n\n`
      )
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
    // console.log(mail);
    // //  https://gmail.googleapis.com/gmail/v1/users/qasimamin7877%40gmail.com/messages/send

    axios
      .post(
        `https://gmail.googleapis.com/gmail/v1/users/qasimamin7877@gmail.com/messages/send`,
        {
          raw: mail,
        },
        {
          headers: {
            Authorization: "Bearer " + access_token,
          },
        }
      )
      .then(async (result) => {
        console.log(result);
        if (result.status === 200) {
          console.log(result);
          alert("message sent succcesssfully ");
          setValue("");
          setBtnStatus(false);
        } else {
          alert("something went wrong");
        }
      })
      .catch((err) => alert(err.message));
  };

  const farwardEmail = async () => {
    alert("btn is working");
    let access_token = localStorage.getItem("token");
    let from = props.data.payload.headers.find((val, inde) => {
      return val.name === "To" ? val.value : null;
    });

    console.log("this is from", from);

    var mail = base64
      .encode(
        `From: ${
          from.value.includes("<")
            ? from.value.split("<")[1].split(">")[0]
            : from.value
        }\n` +
          `To: ${farwardto}\n` +
          `Subject:${farwardData.SubjectTitle} \n\n` +
          ` --------- Farwarded Email  --------- \n\n From :${farwardData.From}\n Date: ${farwardData.Date}\n To:${farwardData.to}\n\n ${farwardData.body}\n\n`
      )
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
    //  https://gmail.googleapis.com/gmail/v1/users/qasimamin7877%40gmail.com/messages/send
    console.log(mail);
    axios
      .post(
        `https://gmail.googleapis.com/gmail/v1/users/qasimamin7877@gmail.com/messages/send`,
        {
          raw: mail,
        },
        {
          headers: {
            Authorization: "Bearer " + access_token,
          },
        }
      )
      .then(async (result) => {
        console.log(result);
        if (result.status === 200) {
          alert("message sent succcesssfully ");
          setFarwardTo("");
          setFarwardStatus(false);
        } else {
          alert("something went wrong");
        }
      })
      .catch((err) => alert(err.message));
  };

  const farwardDetail = () => {
    if (btnStatus) {
      setBtnStatus(false);
    }
    setFarwardStatus(true);

    let from = props.data.payload.headers.find((val, inde) => {
      return val.name === "From" ? val.value : null;
    });
    let to = props.data.payload.headers.find((val, inde) => {
      return val.name === "To" ? val.value : null;
    });
    let date = props.data.payload.headers.find((val, inde) => {
      return val.name === "Date" ? val.value : null;
    });
    let subject = props.data.payload.headers.find((val, inde) => {
      return val.name === "Subject" ? val.value : null;
    });
    setForwardData({
      From: from.value,
      Date: date.value,
      to: to.value,
      SubjectTitle: subject.value,
      body: props.data.snippet,
    });
  };

  const ReplyThreads = () => {
    if (farwardStatus) {
      setFarwardStatus(false);
    }
    setBtnStatus(!btnStatus);
    // axios
    //   .get(
    //     "https://gmail.googleapis.com/gmail/v1/users/qasimamin7877@gmail.com/threads/17e4e203e3f08c3c",
    //     {
    //       headers: {
    //         Authorization: "Bearer " + access_token,
    //       },
    //     }
    //   )
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="ui buttons">
        <button className="ui button" onClick={() => ReplyThreads()}>
          Reply
        </button>
        <button className="ui button" onClick={farwardDetail}>
          Forward
        </button>
      </div>
      <br />
      <br />
      {btnStatus ? (
        <form className="ui form" onSubmit={sendMessage}>
          <div className="field">
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              type={"text"}
              placeholder="Subject"
            />
            <br />
            <br />
            <textarea
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter message here ..."
            ></textarea>
          </div>
          <div className="field">
            <div className="ui checkbox">
              <input
                type="checkbox"
                className="hidden"
                readonly=""
                tabIndex="0"
              />
            </div>
          </div>
          <div className="field">
            <button type="submit" className="ui primary button">
              send
            </button>
          </div>
        </form>
      ) : null}
      {farwardStatus ? (
        <div>
          <div className="ui labeled input">
            <div className="ui label">To : </div>
            <input
              value={farwardto}
              onChange={(e) => setFarwardTo(e.target.value)}
              type="text"
              placeholder="@gmail.com"
            />
          </div>
          <br />
          <br />

          <div className="sub header">
            ---------- Forwarded message ---------
          </div>

          <div className="sub header">
            <b>From :</b> {farwardData.From}
          </div>

          <div className="sub header">
            <b>Date :</b> {farwardData.Date}
          </div>

          <div className="sub header">
            <b>Subject :</b> {farwardData.SubjectTitle}
          </div>

          <div className="sub header">
            <b>To :</b> {farwardData.to}
          </div>

          <br />
          <br />
          <div className="ui center aligned container">
            {props.data.snippet}
          </div>
          <hr />
          <button className="ui primary button" onClick={farwardEmail}>
            Forward
          </button>
        </div>
      ) : null}
    </div>
  );
};
export default Reply;
