import { createReducer, createAction } from "@reduxjs/toolkit";
import { getHighestId } from "../selectors/chatSelectors";

export interface IChatState {
  messages: IMessage[];
  input: string;
}

const initialState: IChatState = {
  messages: [
    {
      id: 1,
      author: "moi",
      content: "cc sava?",
    },
    {
      id: 2,
      author: "moi",
      content: "aallloooo?",
    },
    {
      id: 3,
      author: "lui",
      content: "aallloooo?",
    },
  ],
  input: "",
};

export const addMessage = createAction<string>("CHAT/ADD_MESSAGE");

export const changeInput = createAction<string>("CHAT/CHANGE_INPUT");

export const chatReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addMessage, (state) => {
      const newMessage = {
        author: "moi",
        id: getHighestId(state.messages) + 1,
        content: state.input,
      };
      state.messages.push(newMessage);
      state.input = "";
    })
    .addCase(changeInput, (state, action) => {
      state.input = action.payload;
    });
});
