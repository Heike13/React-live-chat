import { RootState } from "../store";

export const getMessages = (store: RootState) => store.chat.messages;

export const getMyMessages = (store: RootState) => {
    return store.chat.messages.filter((m) => m.author === "moi")
}

export const getHighestId = (messages: IMessage[]) => {
    const ids = messages.map(m => m.id);
    return Math.max(...ids)
}