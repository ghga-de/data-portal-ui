#!/usr/bin/env python3

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
from pathlib import Path
from subprocess import Popen
from hexkit.config import config_from_yaml
from pydantic import BaseSettings

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
    client_url: str = "https://data.ghga-dev.de/"
    svc_search_url: str = f"{client_url}api/search"
    svc_repository_url: str = f"{client_url}api/repository"
    svc_api_url: str = f"{client_url}api"
    svc_users_url: str = f"{client_url}api/auth/users"
    svc_wps_url: str = f"{client_url}api/wps"
    oidc_client_id: str = "ghga-client"
    oidc_redirect_url: str = f"{client_url}oauth/callback"
    oidc_scope: str = "openid profile email"
    oidc_authority_url: str = "https://proxy.aai.lifescience-ri.eu/"
    oidc_authorization_url: str = f"{oidc_authority_url}saml2sp/OIDC/authorization"
    oidc_token_url: str = f"{oidc_authority_url}OIDC/token"
    oidc_userinfo_url: str = f"{oidc_authority_url}OIDC/userinfo"
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
    for name, value in config.dict().items():
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
