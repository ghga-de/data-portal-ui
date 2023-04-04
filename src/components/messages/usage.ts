// Copyright 2021 - 2023 Universität Tübingen, DKFZ and EMBL
// for the German Human Genome-Phenome Archive (GHGA)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

import { createStore, useStore } from "zustand";
import { MessageType } from "./styles";

type MessageWithId = {
  id: number;
  type?: MessageType;
  title?: string;
  detail?: string;
  modal?: boolean; // by default assumed as false (modal dialog)
  // only relevant for toast messages
  delay?: number; // by default assumed as 5 seconds (0 = sticky)
  // only relevant for modal messages
  callback1?: () => void;
  label1?: string;
  callback2?: () => void;
  label2?: string;
};

type Message = Omit<MessageWithId, "id">;

export type MessageStore = {
  messages: MessageWithId[];
  // show message
  showMessage: (message: Message) => void;
  // dismiss message
  dismissMessage: (id: number) => void;
  // get first modal message
  getModal: () => MessageWithId | undefined;
  // get all toast messages
  getToasts: () => MessageWithId[];
};

let currentId = 0;

export const messageStore = createStore<MessageStore>((set, get) => ({
  messages: [],
  showMessage: (message) => {
    if (
      message.modal !== false &&
      (message.callback1 ||
        message.callback2 ||
        message.label1 ||
        message.label2)
    ) {
      message.modal = true;
    }
    const lastMessage = get().messages.at(-1);
    if (
      lastMessage &&
      lastMessage.modal === message.modal &&
      lastMessage.title === message.title &&
      lastMessage.detail === message.detail
    ) {
      return; // do not show duplicate messages
    }
    set((state) => ({
      messages: [...state.messages, { id: ++currentId, ...message }],
    }));
  },
  dismissMessage: (id) => {
    set((state) => ({
      messages: state.messages.filter((message) => message.id !== id),
    }));
  },
  getModal: () => {
    return get().messages.find((message) => message.modal);
  },
  getToasts: () => {
    return get().messages.filter((message) => !message.modal);
  },
}));

// for usage in components
export const useMessages = () => useStore(messageStore);

// for usage outside components
export const showMessage = (message: Message) => {
  messageStore.getState().showMessage(message);
};
