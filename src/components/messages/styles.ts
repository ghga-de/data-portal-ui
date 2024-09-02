// Copyright 2021 - 2024 Universität Tübingen, DKFZ and EMBL
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

import {
  faInfoCircle,
  faCheckCircle,
  faExclamationTriangle,
  faTimesCircle,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

export type MessageType = "info" | "warning" | "success" | "error";

export const messageStyles: Record<
  MessageType,
  { title: string; icon: IconDefinition; iconClass: string; bg: string }
> = {
  info: {
    title: "Note",
    icon: faInfoCircle,
    iconClass: "text-info",
    bg: "info",
  },
  success: {
    title: "Success",
    icon: faCheckCircle,
    iconClass: "text-success",
    bg: "success",
  },
  warning: {
    title: "Warning",
    icon: faExclamationTriangle,
    iconClass: "text-warning",
    bg: "warning",
  },
  error: {
    title: "Error",
    icon: faTimesCircle,
    iconClass: "text-danger",
    bg: "danger",
  },
};
