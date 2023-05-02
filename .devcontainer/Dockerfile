# FROM mcr.microsoft.com/vscode/devcontainers/python:3.9-bullseye

# ENV PYTHONUNBUFFERED 1

# [Choice] Node.js version: 18, 16, 14
ARG VARIANT="16-bullseye"
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-${VARIANT}

# # Update args in docker-compose.yaml to set the UID/GID of the "node" user.
# ARG USER_UID=1000
# ARG USER_GID=$USER_UID
# RUN if [ "$USER_GID" != "1000" ] || [ "$USER_UID" != "1000" ]; then groupmod --gid $USER_GID node && usermod --uid $USER_UID --gid $USER_GID node; fi

# [Option] Install Node.js
# ARG INSTALL_NODE="true"
# ARG NODE_VERSION="lts/*"
# RUN if [ "${INSTALL_NODE}" = "true" ]; then su node -c "umask 0002 && . /usr/local/share/nvm/nvm.sh && nvm install ${NODE_VERSION} 2>&1"; fi

# Copy install and launcher script to bin:
COPY ./dev_install /bin
COPY ./dev_launcher /bin

CMD ["sleep", "infinity"]
