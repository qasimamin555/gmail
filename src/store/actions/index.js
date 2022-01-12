const InboxMessages = (msg) => {
  return {
    type: "INBOX",
    payload: msg,
  };
};

const Unread = (msg) => {
  return {
    type: "UNREAD",
    payload: msg,
  };
};

const Sent = (msg) => {
  return {
    type: "SENT",
    payload: msg,
  };
};
export { InboxMessages, Unread, Sent };
