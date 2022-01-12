let initial_state = {
  totalMessages: [],
  unreadMessages: [],
  sentMessages: [],
};

const TotalMessages = (state = initial_state, action) => {
  if (action.type === "INBOX") {
    return {
      ...state,
      totalMessages: action.payload,
    };
  } else if (action.type === "UNREAD") {
    return {
      ...state,
      unreadMessages: action.payload,
    };
  } else if (action.type === "SENT") {
    return {
      ...state,
      sentMessages: action.payload,
    };
  } else {
    return state;
  }
};
export default TotalMessages;
