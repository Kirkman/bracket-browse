#!/usr/bin/env bash

# Keep track of the script's directory
cwd=$(cd `dirname $0` && pwd)

# Keep track of the user directory.
ud=~

script_dir="${cwd}"

# Activate scraper's virtualenv
source "${ud}/.virtualenvs/brackets/bin/activate"

# Run the Python script
python "${script_dir}/scrape-bracket.py"



