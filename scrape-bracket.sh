#!/usr/bin/env bash

# Switching from a traditional shebang in hopes that using `env` will be cross-platform.
# Prior to this I had problems because bash was in different places:
#   * My Mac uses /bin/bash
#   * FreeBSD uses /usr/local/bin/bash
# See https://stackoverflow.com/questions/16365130/what-is-the-difference-between-usr-bin-env-bash-and-usr-bin-bash


# Store the script's directory
cwd=$(cd `dirname $0` && pwd)

# Store user directory (On the server, this will be `/home/newsroom/`. On development, it might be something like `/Users/stlrenaj`)
ud=~

script_dir="${cwd}"

# Activate Crime app virtualenv
source "${ud}/.virtualenvs/brackets/bin/activate"

# This Python script runs the others.
# The main reason I decided to use Python to call these functions
# instead of a shell script is that I need to know if county_api_scraper()
# found new data or not. That way we only send an email when
# there's new data.
python "${script_dir}/scrape-bracket.py"



