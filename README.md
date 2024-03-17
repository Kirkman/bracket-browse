Bracket Browse
==============

![screenshot](https://raw.githubusercontent.com/Kirkman/bracket-browse/master/elexforecast-animation.gif)

### What is this?

Bracket Browse is my attempt to create college basketball bracket that can be viewed on bulletin board systems in beautiful ANSI. I first created this in 2022, and updated it in 2023 when the NCAA changed it's data format.

### WHY?

I like finding ways to take modern data streams and apply them to old media. Many years ago, I used these basketball data feeds in my day job to produce brackets for a print newspaper. Years later, I thought it would be a fun challenge to make a retro version that would render in an 80x24 ANSI BBS terminal window.

### Want to try it?

See it in action by visiting my BBS: telnet://guardian.synchro.net. You'll want to do this from a terminal. The MacOS terminal will work, but [SyncTerm](https://syncterm.bbsdev.net/) will give an authentic 1990s BBSing experience.

Connect to my BBS, then follow the menus to create an account. 

Once you're at the main menu, the following sequence will launch Election Forecast:

* Press [X] for "External Programs" 
* Press [2] for the "Information" category
* Press [1] to launch "NCAA Bracket"

When the "Bracket Browse" title screen appears, you can hit any key to display the bracket. The bracket is far larger than can be displayed in a standard 80x24 terminal screen. So, use the arrow keys (or home, end, pageup, and pagedn) to move around and view different parts of the bracket. 

When you're finished, hit "Q" to quit.

Feel free to explore the rest of the BBS. Whenever you're ready to log off, hit [Q] as many times as necessary to quit any submenus and return to the main menu. From the main menu, press [O] to Log Off.

### Requirements

- [Synchronet](http://www.synchro.net) BBS software
- You need Python 3 to run the data scraper/parser

### Installation

See the `readme.txt` file.

### Acknowledgments

The data used in this BBS door must be obtained from the NCAA.
