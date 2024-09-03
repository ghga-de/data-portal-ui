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

export enum IVAState {
  Unverified = "Unverified",
  CodeRequested = "CodeRequested",
  CodeCreated = "CodeCreated",
  CodeTransmitted = "CodeTransmitted",
  Verified = "Verified",
}
export enum IVAStatePrintable {
  Unverified = "Unverified",
  CodeRequested = "Code Requested",
  CodeCreated = "Code Created",
  CodeTransmitted = "Code Transmitted",
  Verified = "Verified",
}
export enum IVAType {
  Phone = "Phone",
  Fax = "Fax",
  PostalAddress = "PostalAddress",
  InPerson = "InPerson",
}
export enum IVATypePrintable {
  Phone = "SMS",
  Fax = "Fax",
  PostalAddress = "Postal Address",
  InPerson = "In Person",
}
export interface IVA {
  id: string;
  type: IVAType;
  value: string;
  changed: string;
  state: IVAState;
}

export interface UserWithIVA {
  id: string;
  type: IVAType;
  value: string;
  changed: string;
  state: IVAState;
  user_id: string;
  user_name: string;
  user_email: string;
}
