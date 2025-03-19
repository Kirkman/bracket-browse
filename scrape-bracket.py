#!/usr/bin/env python
import re
import datetime
import json
import sys
import platform
import os
from os.path import expanduser
from json import encoder
from random import choice
import mechanize
from urllib.error import URLError, HTTPError

user_agents = [
	'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36',
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9) AppleWebKit/537.71 (KHTML, like Gecko) Version/7.0 Safari/537.71',
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36',
	'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:25.0) Gecko/20100101 Firefox/25.0',
	'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36',
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36',
	'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36',
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:25.0) Gecko/20100101 Firefox/25.0',
]

genders = [
	'men',
	# 'women',
]
year = str( datetime.datetime.now().year - 1 )


script_path = os.path.dirname(os.path.abspath(__file__))

# Sniff out whether we're on the BBS server, or local machine
PRODUCTION = False
if platform.system() in ['FreeBSD', 'Linux'] and 'sbbs' in script_path:
	PRODUCTION = True

local_dir = os.path.join(script_path, 'json')

if PRODUCTION:
	local_dir = '/sbbs/xtrn/brackets/json'



def log(message):
	# If we're running from command line, then print output
	if sys.stdout.isatty():
		print(message)
	# Otherwise, it's a cronjob, so let's suppress output


# Pull brackets for both men and women
for gender in genders:
	# Construct the URL to the bracket JSON file
	# url = 'http://data.ncaa.com/carmen/brackets/championships/basketball-' + gender + '/d1/' + year + '/data.json'

	# NEW SCHEME IN 2022-23. Updated for 2024-25.
	# Looks like there are three "operationName" values. 
	# Each one gets a different sha256Hash value in the persistedQuery.

	operations = [
		# { 'year': '2022', 'name':'scores_current_web', 'hash':'3e1de1bf338658aeac88c93e5cfdc3ddaaaac2d1a91c14e9c300174a46a9d91b'},
		# { 'year': '2022', 'name':'scores_bracket_web', 'hash':'f21cac8420a55a7d190f2f686a441e2507d8fb80f25eac5c91131ddd9df588da'},
		# { 'year': '2022', 'name':'official_bracket_web', 'hash':'5214677a0d6c0df6619a440e97006fe55abcd89c46692ac349a7b781adf5f1ad'},
		{ 'year': '2024', 'name':'scores_current_web', 'hash':'2d9054b672f94e541c1de408ab4af3c6d014ba37915a58eca97b8198bcc198da'},
		{ 'year': '2024', 'name':'scores_bracket_web', 'hash':'9b3e0ae3018a2c3cc81877867705189763367a6fca416a36e5196bb4851470a4'},
		{ 'year': '2024', 'name':'official_bracket_web', 'hash':'58cd1e8be6f2902dd6d7fed23392b885c7349ea6ff04b740f95cfe8f8c226595'},
	]

	url = 'https://sdataprod.ncaa.com/?operationName='+operations[1]["name"]+'&variables={"seasonYear":'+year+'}&extensions={"persistedQuery":{"version":1,"sha256Hash":"'+operations[1]["hash"]+'"}'+'}';
	log(url)

	# Construct a path where we'll save our copy
	local_file = 'data-'+gender+'-'+year+'.json'
	local_path = os.path.join(local_dir, local_file)

	# Use Mechanize to read the JSON file
	try:
		br = mechanize.Browser()
		br.set_handle_robots(False)
		random_user_agent = choice(user_agents)
		br.addheaders = [('User-agent', random_user_agent)]
		r = br.open(url)
		data = r.read()

		# If we actually got data, save it.
		if data:
			log( gender + ': Successful' )
			parsed_json = json.loads(data.decode('utf-8'))

			with open(local_path, 'w') as f:
				f.write(json.dumps(parsed_json, sort_keys=True, indent='\t'))

	# If it failed, print an error message
	except HTTPError as e:
		log( gender + ': ERROR CODE ' +  str(e.code) )
		log(url)




