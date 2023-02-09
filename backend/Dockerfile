FROM debian:bullseye-20220527-slim as PortreeConverter

# Update and install packages
RUN apt-get update && apt-get install -y git cmake build-essential libtbb-dev

RUN mkdir tools && cd /tools
WORKDIR /tools

# Clone LAStools and PotreeConverter.exe
RUN git clone --depth 1 https://github.com/LAStools/LAStools.git -b v2.0.1
RUN git clone --depth 1 https://github.com/potree/PotreeConverter.git -b 2.1

WORKDIR /tools/LAStools
RUN LASToolsPath=`pwd` && cd LASzip && cp ../COPYING.txt .
WORKDIR /tools/LAStools/LASzip

# Build LAStools
RUN cmake .
WORKDIR /tools/PotreeConverter


RUN mkdir build
WORKDIR /tools/PotreeConverter/build

# Build PotreeConverter.exe
RUN cmake -DCMAKE_BUILD_TYPE=Release -DLASZIP_INCLUDE_DIRS=/opt/LAStools/LASzip/dll/ -DLASZIP_LIBRARY=/usr/local/lib/liblaszip.so ..  \
    && make


FROM python:3.9.7-slim-bullseye as base

    # python
ENV PYTHONUNBUFFERED=1 \
    # prevents python creating .pyc files
    PYTHONDONTWRITEBYTECODE=1 \
    \
    # pip
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    \
    # poetry
    # https://python-poetry.org/docs/configuration/#using-environment-variables
    POETRY_VERSION=1.1.13 \
    # make poetry install to this location
    POETRY_HOME="/opt/poetry" \
    # make poetry create the virtual environment in the project's root
    # it gets named `.venv`
    POETRY_VIRTUALENVS_IN_PROJECT=true \
    # do not ask any interactive question
    POETRY_NO_INTERACTION=1 \
    \
    # paths
    # this is where our requirements + virtual environment will live
    PYSETUP_PATH="/opt/pysetup" \
    VENV_PATH="/opt/pysetup/.venv"


# prepend poetry and venv to path
ENV PATH="$POETRY_HOME/bin:$VENV_PATH/bin:$PATH"


FROM base as python-deps

# Install poetry and compilation dependencies
RUN apt-get update && apt-get install -y --no-install-recommends curl build-essential libpq-dev
RUN curl -sSL https://install.python-poetry.org | python3 -

# copy project requirement files here to ensure they will be cached.
WORKDIR $PYSETUP_PATH
COPY poetry.lock pyproject.toml ./

# install runtime deps - uses $POETRY_VIRTUALENVS_IN_PROJECT internally
RUN poetry install --no-dev


FROM base as inter

RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq-dev \
    libgomp1 \
    libx11-6 \
    libgl1-mesa-glx \
    libtbb2 \
    rsync \
    ssh

# Copy virtual env from python-deps stage
COPY --from=python-deps $PYSETUP_PATH $PYSETUP_PATH

# Create and switch to a new user
RUN groupadd --gid 1000 laosysteem  \
    && useradd --uid 1000 --gid laosysteem --shell /bin/bash --create-home laosysteem
USER laosysteem

#COPY --chown=laosysteem . /laosysteem
COPY --chown=laosysteem --from=PortreeConverter /tools/PotreeConverter/build/PotreeConverter /laosysteem/app/point_cloud/LocalScripts/potree/PotreeConverter
COPY --chown=laosysteem --from=PortreeConverter /tools/PotreeConverter/build/liblaszip.so /tools/PotreeConverter/build/liblaszip.so
WORKDIR /laosysteem

RUN chmod +x /laosysteem/app/point_cloud/LocalScripts/potree/PotreeConverter

RUN mkdir storage && mkdir ~/.ssh

CMD ["/laosysteem/startup.sh"]



# ------------------ Development ------------------
FROM inter as development
ENV APP_ENV=development

USER root

# copy built poetry
COPY --from=python-deps $POETRY_HOME $POETRY_HOME

WORKDIR $PYSETUP_PATH

# install dev dependencies
RUN poetry install

WORKDIR /laosysteem


# ------------------ Production ------------------
FROM inter as production
WORKDIR /laosysteem

ENV APP_ENV=production

COPY --chown=laosysteem . /laosysteem

RUN mv .env.production .env
RUN chmod +x ./startup.sh
