##########################################
#                                        #
#             BRACKET BROWSE             #
#             for Synchronet             #
#                                        #
#      author: Kirkman                   #
#       email: josh [] joshrenaud.com    #
#        date: Mar. 17, 2023             #
#                                        #
##########################################



==========================================

INSTALLATION

Clone the repo, into a `brackets` subdirectory within your `xtrn` directory.

THEN...


-------------------------
A. Scraper requirements
-------------------------

NOTE: The scraper depends on a Bash shell script, which should run fine under Linux or MacOS. Windows users will need to adapt this into a .BAT file or something else.

Make sure you are running Python 3.8 or later, with `virtualenvwrapper` installed. Then run the following commands to create a virtual environment for the scraper:

```
mkvirtualenv brackets --python=python3
pip3 install mechanize
```

Finally, make sure scrape-bracket.sh is executable:

```
chmod +x scrape-bracket.sh 
```


--------------------
B. Synchronet config
--------------------

1. Launch SCFG
2. Go to External Programs > Online Programs (Doors)
3. Choose an externals section to place BRACKETS into.
4. Hit [enter] on a blank line to create a new item.
5. Change the following settings, leaving the rest as they are:

   Name                       Elex
   Internal Code              ELEX
   Start-up Directory         ../xtrn/brackets
   Command Line               ?brackets.js

6. Go to External Programs > Timed Events
7. Hit [enter] on a blank line to create a new item.
8. Choose an "Event Internal Code" such as "BKCCACHE"
9. Hit [enter] on the line with the new entry, to edit it.
8. Change the following settings, leaving the rest as they are:

   Internal Code              BKCCACHE
   Start-up Directory         ../xtrn/brackets
   Command Line               scrape-bracket.sh
   Execution Node             1
   Execution Months           March
   Execution Days of Month    Any
   Execution Days of Week     All
   Execution Frequency        96 times a day
   Native Executable/Script   Yes
   Background Execution       Yes



==========================================

MY STORY:

I thought it would be a fun challenge to make a retro version 
of a college basketball bracket that could be rendered in an 
80x24 ANSI BBS terminal window.

You can see it in action on my BBS: telnet://guardian.synchro.net.

Use the arrow keys to move around the bracket. Hit [Q] to quit.

--Kirkman

