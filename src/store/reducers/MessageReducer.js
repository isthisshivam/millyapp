const initialState = {
  status: null,
  error: undefined,
  messages: [],
  thread: [],
  message: undefined,
  MapOfReplies: [],
};

const Create_Message = "Create_Message";
const Delete_Message = "Delete_Message";
const Get_Messages = "Get_Messages";
const Clear_Thread = "Clear_Thread";
const Get_Message_Thread = "Get_Message_Thread";
const Reply_Message = "Reply_Message";
const Get_Messages_Requested = "Get_Messages_Requested";
const API_Request_Completed = "API_Request_Completed";
const API_Request_Error = "API_Request_Error";

export const MessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case Create_Message:
      var TimeDate = new Date();
      //let newState = { ...state };
      let newMsg = {
        attachments: action.payload.data.attachments,
        customerFlag: "Sent",
        flag: "New",
        fromClient: false,
        logDate: TimeDate.toLocaleDateString("en-US"),
        logTime: TimeDate.toLocaleTimeString(),
        messageContent: action.payload.data.messagecontent,
        subject: action.payload.data.subject,
        sequenceNumber: action.payload.sequenceNumber,
        category: action.payload.data.category,
      };

      if (!state.MapOfReplies[newMsg.sequenceNumber]) {
        state.MapOfReplies[newMsg.sequenceNumber] = [];
      }
      state.MapOfReplies[newMsg.sequenceNumber].push(newMsg);

      return {
        ...state,
        messages: [...state.messages, newMsg],
        status: true,
        error: undefined,
        message: "New Message Successfully Submitted",
        MapOfReplies: state.MapOfReplies,
      };
    case Reply_Message:
      var TimeDate = new Date();
      let reply = {
        attachments: action.payload.reply.attachments,
        logDate: TimeDate.toLocaleDateString("en-US"),
        logTime: TimeDate.toLocaleTimeString(),
        fromClient: false,
        flag: "Delivered",
        messageContent: action.payload.reply.messagecontent,
        replynumber: action.payload.reply.replyNumber,
        sequenceNumber: action.payload.sequenceNumber,
        subject: action.payload.reply.subject,
      };

      let listOfReplies = state.MapOfReplies;
      listOfReplies[action.payload.reply.sequenceNumber]?.push(reply);
      return {
        ...state,
        status: true,
        error: undefined,
        message: "Reply Successfully Submitted",
        MapOfReplies: listOfReplies,
        thread: listOfReplies[action.payload.reply.sequenceNumber],
      };

    case Delete_Message:
      let newReplies = state.MapOfReplies;
      let messages = state.messages.filter(
        (item) =>
          item.sequenceNumber != action.payload &&
          item.replyNumber != action.payload
      ); //subjects
      delete newReplies[action.payload];

      return {
        ...state,
        messages: messages,
        MapOfReplies: newReplies,
        status: true,
        error: undefined,
        message: "Message Successfully Deleted",
      };

    case Get_Messages:
      let subjects = [];

      for (const [key, value] of Object.entries(action.payload.inbox)) {
        subjects.push(value[0]);
      }
      let MapOfReplies = action.payload.inbox;

      return {
        ...state,
        status: "fetched",
        messages: subjects,
        deleted: action.payload.deleted,
        MapOfReplies: MapOfReplies,
      };

    case Get_Message_Thread:
      return {
        ...state,
        thread: action.payload,
      };

    case Clear_Thread:
      return {
        ...state,
        thread: [],
      };
    case Get_Messages_Requested:
      return {
        ...state,
        status: "pending",
      };
    case API_Request_Completed:
      return {
        ...state,
        status: false,
        error: undefined,
      };
    case API_Request_Error:
      return {
        ...state,
        status: "Error",
        error: action.payload,
      };
    default:
      return state;
  }
};
