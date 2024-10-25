#!/usr/bin/env python3

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

"""
This is a helper script to configure, build, and serve the web app.

Before running this utility, please make sure that all JavaScript
dependencies are installed by running `npm install` in the repository
root dir.

To get help run:
    ./run.py --help
"""

import argparse
import os
import json
from pathlib import Path
from subprocess import Popen
from hexkit.config import config_from_yaml
from pydantic_settings import BaseSettings

ROOT_DIR = Path(__file__).parent.parent.resolve()

# define which parameters of the Config class shall not be translated
# into env vars for the React app (as performed by the `set_react_app_env_vars`
# function):
IGNORE_PARAMS_FOR_REACT_APP = ["host", "port"]


@config_from_yaml(prefix="data_portal_ui")
class Config(BaseSettings):
    """Config parameters and their defaults."""

    host: str = "localhost"
    port: int = 8080
    client_url: str = "https://data.staging.ghga.dev/"
    ribbon_text: str = "Development v$v"
    mass_url: str = "/api/mass"
    metldata_url: str = "/api/metldata"
    dis_url: str = "/api/dins"
    ars_url: str = "/api/ars"
    auth_url: str = "/api/auth"
    wps_url: str = "/api/wps"
    oidc_client_id: str = "ghga-client"
    oidc_redirect_url: str = f"{client_url}oauth/callback"
    oidc_scope: str = "openid profile email"
    oidc_authority_url: str = "https://login.aai.lifescience-ri.eu/oidc/"
    oidc_authorization_url: str = "authorize"
    oidc_token_url: str = "token"
    oidc_userinfo_url: str = "userinfo"
    oidc_use_discovery: bool = True
    default_data_access_duration_days: int = 365


def simplelog(text: str):
    print(f"\n>>> {text}\n")


def set_react_app_env_vars(config: Config):
    """This will translate the parameters from a Config object into environment
    variables that are picked up by the create-react-app framework.

    Note that the environment variables are passed via the application bundle.
    This means that the application must be built AFTER this method is called.
    """

    simplelog("Setting env vars for use in React App:")
    # pass the version as env var
    package = json.load(open(ROOT_DIR / "package.json"))
    os.environ["REACT_APP_VERSION"] = package["version"]
    # pass config params as env vars
    for name, value in config.model_dump().items():
        if name not in IGNORE_PARAMS_FOR_REACT_APP and value is not None:
            env_var_name = f"REACT_APP_{name.upper()}"
            os.environ[env_var_name] = str(value)
            print(f"  - set {name} as {env_var_name}")


def build():
    """Build a production ready version of the web app"""

    simplelog("Executing `npm build`")
    cmd_build = ["npm", "run", "build", "--prefix", str(ROOT_DIR)]

    exit_code_build = Popen(cmd_build).wait()

    if exit_code_build != 0:
        raise RuntimeError(
            f"`npm` terminated with non-zero exit code: {exit_code_build}."
        )


def serve(config: Config):
    """Serves a production ready build of the web app"""

    simplelog("Serve forever:")
    cmd_serve = [
        "serve",
        "--no-clipboard",
        "--listen",
        f"tcp://{config.host}:{config.port}",
        "--single",
        "--config",
        "../configure_build_serve/serve.json",
        str(ROOT_DIR / "build"),
    ]
    exit_code_serve = Popen(cmd_serve).wait()

    raise RuntimeError(f"Serving of app was interrupted: {exit_code_serve}.")


def dev_serve(config: Config):
    """Runs the web app using a development server"""

    # set environment variables for dev server:
    os.environ["HOST"] = config.host
    os.environ["PORT"] = str(config.port)

    simplelog("Serve forever:")
    print(
        "\n      --- Attention ---\n"
        "This app is running using a development server.\n"
        "Do not use for production!\n"
    )

    cmd_start = ["npm", "start", "--prefix", str(ROOT_DIR)]

    exit_code_start = Popen(cmd_start).wait()

    raise RuntimeError(f"Serving of app was interrupted: {exit_code_start}.")


def run():
    """Runs this script"""

    # run CLI:
    parser = argparse.ArgumentParser(
        prog="run.py",
        description="""This is a helper script to configure, build, and serve the web app.
        Before running this utility, please make sure that all JavaScript
        dependencies are installed by running `npm install` in the repository
        root dir.""",
    )

    parser.add_argument(
        "--dev",
        help="""If set, the script will skip the build process and
        will serve a development web server that will reload automatically
        once changes are made to the source code.
        Please Note: do not use this option for production.""",
        action="store_true",
    )

    args = parser.parse_args()

    # create config:
    config = Config()

    # set React App config params:
    set_react_app_env_vars(config)

    if args.dev:
        # run app using development server:
        dev_serve(config)
    else:
        # build and serve production server:
        build()
        serve(config)


if __name__ == "__main__":
    run()
