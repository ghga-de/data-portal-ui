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

FROM node:lts-alpine3.20

# install Python and pip
RUN apk add --no-cache python3 py3-pip

# copy app source code
WORKDIR /service
COPY . /service

# set up non-root user
RUN chown -R node:node /service
USER node
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

# install run script and npm modules
RUN pip install --user --break-system-packages -r /service/configure_build_serve/requirements.txt
RUN npm install
RUN npm install -g serve

# build application and serve frontend
# (note that we need to build late in order to pass environment variables)
ENTRYPOINT ["/service/configure_build_serve/run.py"]
