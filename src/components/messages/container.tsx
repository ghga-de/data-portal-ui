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

import ToastContainer from "react-bootstrap/ToastContainer";
import { ModalMessage } from "./modal";
import { ToastMessage } from "./toast";
import { useMessages } from "./usage";

export const MessageContainer = () => {
  const { getModal, getToasts } = useMessages();

  let modalMessage = null;
  const modal = getModal();
  if (modal) {
    modalMessage = (
      <ModalMessage
        id={modal.id}
        key={modal.id}
        type={modal.type}
        title={modal.title}
        detail={modal.detail}
        callback1={modal.callback1}
        label1={modal.label1}
        callback2={modal.callback2}
        label2={modal.label2}
      ></ModalMessage>
    );
  }
  let toastMessages = null;
  const toasts = getToasts();
  if (toasts) {
    toastMessages = (
      <ToastContainer
        position="top-center"
        containerPosition="fixed"
        style={{ margin: 6 }}
      >
        {toasts.map((toast) => (
          <ToastMessage
            id={toast.id}
            key={toast.id}
            type={toast.type}
            title={toast.title}
            detail={toast.detail}
            delay={toast.delay}
          ></ToastMessage>
        ))}
      </ToastContainer>
    );
  }

  return (
    <>
      {modalMessage}
      {toastMessages}
    </>
  );
};
