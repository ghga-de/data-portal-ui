# Copyright 2021 - 2024 Universität Tübingen, DKFZ and EMBL
# for the German Human Genome-Phenome Archive (GHGA)
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

FROM node:lts-alpine3.18

# update and install dependencies
RUN apk update && apk upgrade
RUN apk add --no-cache gcc
RUN apk add --update alpine-sdk

# install python
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools

# copy app source code
WORKDIR /service
COPY . /service

# set up non-root user
RUN chown -R node:node /service
USER node
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

# install run script and npm modules
RUN python3 -m pip install --user -r /service/configure_build_serve/requirements.txt
RUN npm install
RUN npm install -g serve

# build application and serve frontend
# (note that we need to build late in order to pass environment variables)
ENTRYPOINT ["/service/configure_build_serve/run.py"]
