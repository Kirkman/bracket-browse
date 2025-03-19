load('sbbsdefs.js');
// load('json-client.js');
load('frame.js');
// load('tree.js');
load('js-date-format.js');
load('date.js');

// some of the custom functions I'm using
load('helper-functions.js');
load('frame-transitions.js');


// Screen size
var termRows = console.screen_rows;
var termCols = console.screen_columns;

var f = new File(js.exec_dir + "server.ini");
f.open("r");
var serverIni = f.iniGetObject();
f.close();

var nextWeek = new Date.today().clone().add({ days: 7 });

// CHARACTER SET NOTE:
// I edit this document in BBedit on the Mac. I've found I only get the right characters 
// if I save it in Western (Mac OS Roman) encoding. 

// COLORS
// http://wiki.synchro.net/custom:ctrl-a_codes

// low Red background
var lowRedHighWhite = 'HW1';
var lowBlueHighWhite = 'HW4';

// low cyan background
var lowCyanLowBlack = 'NK6';

// low White background
var lowWhiteHighRed = 'HR7';
var lowWhiteHighBlue = 'HB7';
var lowWhiteHighBlack = 'HK7';

var lowWhiteLowRed = 'NR7';
var lowWhiteLowBlue = 'NB7';
var lowWhiteLowBlack = 'NK7';



// CHARACTERS
var charHorizSingle = ascii(196);
var charHorizSingleDownSingle = ascii(197);
var charHorizSingleDownDouble = ascii(210);
var charVertDouble = ascii(186);
var charVertSingle = ascii(179);
var frac12 = ascii(171);

var shade1 = ascii(176);
var shade2 = ascii(177);
var shade3 = ascii(178);
var solid = ascii(219);

var blockUpper = ascii(223);
var blockLower = ascii(220);
var blockMid = ascii(254);

var upTriangle = ascii(30);
var downTriangle = ascii(31);


// Container frame for the bracket
var frame = new Frame(1, 1, termCols, termRows, BG_BLACK);
frame.checkbounds = false;
frame.v_scroll = true;
frame.h_scroll = true;

// Oversized bracket frame which can be scrolled inside the container frame
var bracketFrame = new Frame(1, 1, 238, 66, BG_BLACK, frame);
bracketFrame.checkbounds = false;
bracketFrame.v_scroll = true;
bracketFrame.h_scroll = true;
bracketFrame.load(js.exec_dir + '/graphics/full-size-bracket.bin', 238, 66);

// Canvas frame for repainting. This is what the user will actually see.
canvasFrame = new Frame(1, 1, termCols, termRows, BG_BLACK);
canvasFrame.transparent = false;


// Some of the NCAA's "short names" aren't short enough.
function checkLongNames(name) {
	var shortName = '';
	var nameConvert = [];
	nameConvert = [
		{
			long:  "Saint Louis",
			short: "St Louis U",
		},
		{
			long:  "St. John's",
			short: "St John's",
		},
		{
			long:  "Saint Mary's",
			short: "St Mary's",
		},
		{
			long:  "Saint Peter's",
			short: "St Peter's",
		},

		{
			long:  "Steph. F. Austin",
			short: "S.F. Austin",
		},
		{
			long:  "Geo. Washington",
			short: "Geo. Wash.",
		},
		{
			long:  "LIU Brooklyn",
			short: "LIU Brook.",
		},
		{
			long:  "James Madison",
			short: "J Madison ",
		},
		{
			long:  "Texas Southern",
			short: "Texas So.",
		},
		{
			long:  "Southern Univ.",
			short: "Southern",
		},
		{
			long:  "Wichita State",
			short: "Wichita St.",
		},
		{
			long:  "Western Kentucky",
			short: "W Kentucky",
		},
		{
			long:  "Eastern Kentucky",
			short: "E Kentucky",
		},
		{
			long:  "San Francisco",
			short: "San Fran.",
		},
		{
			long:  "San Diego St.",
			short: "S Diego St.",
		},
		{
			long:  "San Diego State",
			short: "S Diego St.",
		},
		{
			long:  "Oklahoma State",
			short: "Okla. St.",
		},
		{
			long:  "Colorado State",
			short: "Colo. St.",
		},
		{
			long:  "Mt. St. Mary\'s",
			short: "Mt St Mary's",
		},
		{
			long:  "Col of Charleston",
			short: "Charleston",
		},
		{
			long:  "Georgia State",
			short: "Georgia St.",
		},
		{
			long:  "Michigan State",
			short: "Michigan St.",
		},
		{
			long:  "Mississippi Val.",
			short: "Miss. Val.",
		},
		{
			long:  "New Mexico State",
			short: "N Mexico St.",
		},
		{
			long:  "New Mexico St.",
			short: "N Mexico St.",
		},
		{
			long:  "North Dakota",
			short: "N Dakota",
		},
		{
			long:  "South Dakota",
			short: "S Dakota",
		},
		{
			long:  "North Dakota St.",
			short: "N Dakota St.",
		},
		{
			long:  "South Dakota St.",
			short: "S Dakota St.",
		},
		{
			long:  "Long Beach St.",
			short: "L Beach St.",
		},
		{
			long:  "UNC Asheville",
			short: "NC-Asheville",
		},
		{
			long:  "St. Bonaventure",
			short: "St. Bona.",
		},
		{
			long:  "Providence",
			short: "Providnce",
		},
		{
			long:  "West Virginia",
			short: "W Virginia",
		},
		{
			long:  "Virginia Tech",
			short: "Va. Tech",
		},
		{
			long:  "Loyola Maryland",
			short: "Loyola, Md.",
		},
		{
			long:  "North Carolina",
			short: "N Carolina",
		},
		{
			long:  "North Carolina St.",
			short: "NC State",
		},
		{
			long:  "South Carolina",
			short: "S Carolina",
		},
		{
			long:  "UC San Diego",
			short: "UCSD",
		},

		{
			long:  "UC Santa Barbara",
			short: "UC SB",
		},
		{
			long:  "Middle Tenn.",
			short: "Mid. Tenn.",
		},
		{
			long:  "Fla. Gulf Coast",
			short: "Fla. GC",
		},
		{
			long:  "FGCU",
			short: "Fla. GC",
		},
		{
			long:  "Michigan St.",
			short: "Mich. St.",
		},
		{
			long:  'Massachusetts',
			short: 'UMass',
		},
		{
			long:  "Connecticut",
			short: "UConn",
		},
		{
			long:  "Prairie View",
			short: "Prairie Vw.",
		},

		{
			long:  "Chattanooga",
			short: "Chattn'ga",
		},

		{
			long:  "Kansas State",
			short: "Kansas St.",
		},
		{
			long:  "Oregon State",
			short: "Oregon St.",
		},
		{
			long:  "Miami (FL)",
			short: "Miami (FL)",
		},
		{
			long:  "Southern Miss.",
			short: "So. Miss.",
		},
		{
			long:  "Prairie View A&M",
			short: "P.V. A&M",
		},
		{
			long:  "Tennessee-Martin",
			short: "Tenn.-Martin",
		},
		{
			long:  "Western Mich.",
			short: "W Michigan",
		},
		{
			long:  "Cent. Michigan",
			short: "C Michigan",
		},
		{
			long:  "Florida State",
			short: "Florida St.",
		},
		{
			long:  "South Florida",
			short: "S Florida",
		},
		{
			long:  "CSU Northridge",
			short: "CSU Northr.",
		},
		{
			long:  "CSU Bakersfield",
			short: "CSU Bakersf.",
		},
		{
			long:  "Robert Morris",
			short: "Robt. Morris",
		},
		{
			long:  "North Florida",
			short: "N Florida",
		},
		{
			long:  "Northeastern",
			short: "N\'eastern",
		},
		{
			long:  "Saint Joseph's",
			short: "St Joseph's",
		},
		{
			long:  "UNI",
			short: "No. Iowa",
		},
		{
			long:  "Tennessee State",
			short: "Tenn. St.",
		},
		{
			long:  "Mississippi St.",
			short: "Miss. St.",
		},
		{
			long:  "Northwestern",
			short: "N'western",
		},
		{
			long:  "Alabama State",
			short: "Alabama St.",
		},
		{
			long:  "Savannah State",
			short: "Savannah St.",
		},
		{
			long:  "Fairleigh D'son",
			short: "Fairl. D'son",
		},
		{
			long:  "UNC-Asheville",
			short: "UNC Ashev.",
		},
		{
			long:  "UNCW",
			short: "UNC Wilm.",
		},
		{
			long:  "Jacksonville St.",
			short: "Jville St.",
		},
		{
			long:  "Northern Kentucky",
			short: "No. Kentucky",
		},
		{
			long:  "Montana State",
			short: "Mont. St.",
		},
		{
			long:  "Western Illinois",
			short: "W. Illinois",
		},
		{
			long:  "Arizona State",
			short: "Arizona St.",
		},
		{
			long:  "St. Francis (B\'klyn)",
			short: "St Fran (Brk)",
		},
		{
			long:  "St. Francis (Pa.)",
			short: "St Fran (Pa)",
		},
		{
			long:  "St. Mary's (CA)",
			short: "St. Mary's",
		},
		{
			long:  "Cal St. Fullerton",
			short: "Cal St Full.",
		},

		{
			long:  "St. Mary's (Cal.)",
			short: "St. Mary's",
		},
		{
			long:  "Loyola Chicago",
			short: "Loy. Chi.",
		},
		{
			long:  "UMBC",
			short: "Md.-Balt.",
		},
		{
			long:  "UNCG",
			short: "NC-Greensbo.",
		},
		{
			long:  "SFA",
			short: "SF Austin",
		},
		{
			long:  "UCF",
			short: "Central Fla.",
		},
		{
			long:  "Loyola Chicago",
			short: "Loyola Chi.",
		},
		{
			long:  "Nicholls State",
			short: "Nicholls St.",
		},
		{
			long:  "Northern Colo.",
			short: "North'n Colo",
		},
		{
			long:  "Abilene Christian",
			short: "Abilene Chr.",
		},
		{
			long:  "Gardner-Webb",
			short: "Gard.-Webb",
		},
		{
			long:  "Old Dominion",
			short: "Old Domin.",
		},
		{
			long:  "Seattle U",
			short: "Seattle",
		},
		{
			long:  "Bethune-Cookman",
			short: "Beth.-Cook.",
		},
		{
			long:  "Portland State",
			short: "Portland St.",
		},
		{
			long:  "Missouri State",
			short: "Missouri St.",
		}
	];

	for ( var i = 0; i < nameConvert.length; i++ ) {
		if ( name == nameConvert[i].long) {
			shortName = nameConvert[i].short;
		}
	}
	if ( shortName == '' ) {
		shortName = name;
	}
	return shortName;
}

function gameObject() {
	this.game = '';
	this.gameID = '';
	this.homeTeam = '';
	this.awayTeam = '';
	this.homeTop = '';
	this.awayTop = '';
	this.homeRec = '';
	this.awayRec = '';
	this.homeSeed = '';
	this.awaySeed = '';
	this.homeScore = '';
	this.awayScore = '';
	this.homeWinner = '';
	this.awayWinner = '';
	this.gameState = '';
	this.gamePeriod = '';
	this.round = '';
	this.regional = '';
	this.gameLoc = '';
	this.gameNetwork = '';
	this.gameDate = '';
	this.gameDayOfWeek = '';
	this.gameDayOfWeekShort = '';
	this.gameTime = '';
	this.gameTimeSuffix = '';
	this.gameTimeSuffixShort = '';
	this.gameWithinWeek = '';
	this.bothTeamsKnown = '';
}


function getRound( gameID ) {
	var round = 1;
	if ( options['gender'] == 'women' ) { gameID = gameID + 100; } // women don't have play-in round
	if (gameID < 200) { round = 1; }
	else if (gameID < 300) { round = 2; }
	else if (gameID < 400) { round = 3; }
	else if (gameID < 500) { round = 4; }
	else if (gameID < 600) { round = 5; }
	else if (gameID < 700) { round = 6; }
	else if (gameID == 701) { round = 7; }
	return round;
}


function getRegional( gameID ) {
	var regional;
	if ( options['gender'] == 'women' ) { gameID = gameID + 100; } // women don't have play-in round
	if (gameID > 200 && gameID < 209) { regional = 'region1' } //south
	else if (gameID > 216 && gameID < 225) { regional = 'region2' } //east
	else if (gameID > 208 && gameID < 217) { regional = 'region3' } //west
	else if (gameID > 224 && gameID < 233) { regional = 'region4' } //midwest

	else if (gameID > 300 && gameID < 305) { regional = 'region1' } //south
	else if (gameID > 308 && gameID < 313) { regional = 'region2' } //east
	else if (gameID > 304 && gameID < 309) { regional = 'region3' } //west
	else if (gameID > 312 && gameID < 317) { regional = 'region4' } //midwest

	else if (gameID == 401 || gameID == 402) { regional = 'region1' } //south
	else if (gameID == 405 || gameID == 406) { regional = 'region2' } //east
	else if (gameID == 403 || gameID == 404) { regional = 'region3' } //west
	else if (gameID == 407 || gameID == 408) { regional = 'region4' } //midwest

	else if (gameID == 501) { regional = 'region1' } //south
	else if (gameID == 503) { regional = 'region2' } //east
	else if (gameID == 502) { regional = 'region3' } //west
	else if (gameID == 504) { regional = 'region4' } //midwest

	else if (gameID == 601) { regional = 'finalfour1' } // south/west
	else if (gameID == 602) { regional = 'finalfour2' } // east/midwest
	else if (gameID == 701) { regional = 'champ' } // championship
	return regional;
}



// Get statistics from JSON.
// For simplicity, let's load from a static JSON file, rather than use Synchronet's whole JSON service.
function getData(gender,year) {
	var dataFilePath = js.exec_dir + 'json/data-' + gender + '-' + year + '.json';
	var dataFile = new File( dataFilePath );
	dataFile.open('r');
	var data = dataFile.read();
	dataFile.close();
	if (data) {
		return JSON.parse(data);
	}
	return false;
}

function displayTitle() {
	var titleFrame = new Frame(1, 1, termCols, termRows, BG_BLACK);
	titleFrame.load( js.exec_dir + 'graphics/bracket-title.bin');
	titleFrame.draw();

	// Wait for user input
	var userInput = '';
	userInput = console.getkey( K_UPPER );
	titleFrame.close();
	titleFrame.delete();
}


// Compare a canvas frame against data in another frame. Repaint characters that are different.
function repaintCanvas( newFrame, canvas ) {
	var newFrameData = newFrame.dump();
	for (var x=0; x<canvas.width; x++) {
		for (var y=0; y<canvas.height; y++) {
			var newChar = newFrameData[y][x];
			var oldChar = canvas.getData(x,y);
			// Compare corresponding characters on current canvas and the new frame.
			// If they are different, repaint the character on the canvas.
			if ( newChar && (newChar.attr !== oldChar.attr || newChar.ch !== oldChar.ch) ) {
				canvas.clearData(x,y);
				canvas.setData(x,y,newChar.ch,newChar.attr);
			}
			// If the new frame has a null instead of a character object,
			// treat that like an empty black space. Draw it on the canvas
			// if the corresponding character is not also an empty black space.
			else if ( newChar == null ) {
				if ( oldChar.ch != ascii(32) || oldChar.attr != BG_BLACK ) {
					canvas.clearData(x,y);
					canvas.setData(x,y,ascii(32),BG_BLACK);
				}
			}
		}
	}
}


function putMsgOversize(theFrame, x, y, attr, str) {
	var w = theFrame.width;
	var h = theFrame.height;

	for (var s=0; s<str.length; s++) {
		if ( ((x+s) < w) && (y<h) ) {
			theFrame.setData( x+s, y, str.charAt(s), attr);
		}
	}
}



function displayBracket(games) {
	bracketFrame.open();
	canvasFrame.open();
	canvasFrame.cycle();

	// BEGIN SUBROUTINE to sort games
	// Games are sometimes out of order in the JSON feed, so we need to re-sort them before iterating
	// Comparison function
	function compare(a,b) {
		if (a.bracketId < b.bracketId) { return -1; }
		if (a.bracketId > b.bracketId) { return 1; }
		else { return 0; }
	}
	// Sort the games using comparison function
	games.sort(compare);
	// END subroutine sorting games


	// BEGIN SUBROUTINE to filter out duplicate games.
	// I encountered this problem in the women's bracket,
	// where Game #104 was listed four times in the JSON feed.
	var distincts, uniqueList, newGames, index, entry, key, gameLen;
	distincts = {};
	uniqueList = [];
	newGames = [];
	gameLen = games.length;


	for (var i = 0; i < gameLen; i++ ) {
		entry = games[i];
		key = games[i].bracketId;
		if ( !distincts[key] ) {
			distincts[key] = true;
			uniqueList[i] = true;
		}
		else {
			uniqueList[i] = false;
		}
	}

	for (var i = 0; i < gameLen; i++ ) {
		if (uniqueList[i] == true) {
			newGames.push( games[i] );
		}
	}
	// END subroutine filtering out duplicate games.



	// Iterate over all the games
	for (var i = 0; i < newGames.length; i++ ) {
		var g = new gameObject();
		g.gameID = parseInt( newGames[i].bracketId );
		if (newGames[i].teams.length > 0) {
			for (var t=0; t<newGames[i].teams.length; t++) {
				var team = newGames[i].teams[t];
				var h = 'home';
				if (team.isHome == false) { h = 'away'; }
				g[h+'Team'] = checkLongNames(team.nameShort);
				g[h+'Top'] = team.isTop;
				g[h+'Rec'] = team.wins.toString() + '-' + team.losses.toString();
				g[h+'Score'] = '';
				if (team.score != null) {
					g[h+'Score'] = team.score.toString();
				}
				g[h+'Winner'] = team.winner;
				g[h+'Seed'] = team.seed.toString();
			}

			// Might need to tweak this. Basically only want "play-in" to show
			// for the 1st round (_after_ the "first four")
			if (newGames[i].teams.length == 1 && getRound( g.gameID ) <= 2) {
				g.awayTeam = '(Play-in)';
				g.awaySeed = (17 - newGames[i].teams[0].seed).toString();
			}

			g.gamePeriod = newGames[i].currentPeriod;

			g.gameState = newGames[i].gameState;
			g.gameNetwork = newGames[i].broadcaster;
			g.ansiColors = lowWhiteLowBlack;

			if (newGames[i].location) {
				g.gameLoc = newGames[i].location.location;
			}
			else {
				g.gameLoc = '';
			}
			var rawDate = newGames[i].startDate || '';
			var rawTime = newGames[i].startTimeEpoch || '';
		}
		// else {
		// 	debug('TEAMS LENGTH not > 0');
		// }




		// BEGIN SUBROUTINE to parse dates
		// All the dates on the bracket are relative to the publish date.
		// Also need to build variables for shortened day names for use
		// in certain parts of the bracket.

		// This subroutine makes use of Date.js  -  https://code.google.com/p/datejs/wiki/APIDocumentation 

		// process the time
		// these times are eastern, so specify that. Date.js will convert it to CST.
		if ( rawDate == '' || rawDate == null || rawDate == null ) {
			var d = null;
		}
		else if ( rawTime == '' ) {
			var d = Date.parse(rawDate);
		}
		else {
			var d = new Date(rawTime).add({hours: -1});
		}

		// Process day of the week
		if (d) {
			g.gameDayOfWeek = d.toString('dddd');
			g.gameDayOfWeekShort = g.gameDayOfWeek.replace('urday','').replace('day','').replace('nes','') + '.';
			g.gameDate = d.toString('MMM. dd').replace(/0(\d)/,'$1'); // Eliminates leading zeroes, ie April 02.
		}
		else {
			g.gameDayOfWeek = '';
			g.gameDayOfWeekShort = '';
			g.gameDate = '';
		}

		if (rawTime == '' || rawTime == null) {
			g.gameTime = '';
			g.gameTimeSuffix = '';
		}
		else if (rawTime == '11:00A.M.' && g.homeTeam == '' && g.awayTeam == '') {
			g.gameTime = '';
			g.gameTimeSuffix = '';
		}
		else {
			g.gameTime = d.toString('h:mm').replace(':00','');
			g.gameTimeSuffix = d.toString ('tt').toLowerCase().replace('m','.m.');
		}
		if ( g.gameTimeSuffix === 'p.m.') { g.gameTimeSuffixShort = '' }
		else { g.gameTimeSuffixShort = ' a.m.' }

		if ( d && d.isBefore(nextWeek) ) { g.gameWithinWeek = true; }
		else { g.gameWithinWeek = false; }

		// END subroutine dealing with dates



		// rounds
		g.round = getRound( g.gameID );

		// regionals
		g.regional = getRegional( g.gameID );

		// Construct this game's text blob
		var homeBlob = '';
		var awayBlob = '';
		var matchupBlob = '';
		var outputBlob = '';


		// PREVIEW
		// GameState = P    (P == "preview" maybe?)
		// GameStateCode = 1
		if (g.gameState == 'P') {
			homeBlob = g.homeSeed.rjust(2,' ') + ' ' + g.homeTeam.ljust(12,' ').slice(0,9) + ' ' +  g.homeRec.rjust(5,' ');
			awayBlob = g.awaySeed.rjust(2,' ') + ' ' + g.awayTeam.ljust(12,' ').slice(0,9) + ' ' +  g.awayRec.rjust(5,' ');
			matchupBlob = '';
			g.ansiColors = lowWhiteHighBlack;
		}

		// ABOUT TO START?
		// GameState = P    (P == "preview" maybe?)
		// GameStateCode = 2
		// Saw this with Michigan vs. Colorado State right at game time.
		// Still "P", but GameStateCode was at "2" ... presumably this triggers the "Live" label
		// even though game hasn't _quite_started.


		// LIVE GAME
		// GameState = I    (I == "in-progress" maybe?)
		// GameStateCode = 3
		else if (g.gameState == 'I') {
			homeBlob = g.homeSeed.rjust(2,' ') + ' ' + g.homeTeam.ljust(12,' ') + g.homeScore.rjust(3,' ');
			awayBlob = g.awaySeed.rjust(2,' ') + ' ' + g.awayTeam.ljust(12,' ') + g.awayScore.rjust(3,' ');
			matchupBlob = '';
			g.ansiColors = lowWhiteLowRed;
		}

		// FINAL
		// GameState = F    (F == "final" maybe?)
		// GameStateCode = 4

		else if (g.gameState == 'F') {
			// I'm not putting a space between team name and scores. Most scores will be two-digit, which will have a space built in.
			// But if there are any three digit scores, they may run into the team name.
			homeBlob = g.homeSeed.rjust(2,' ') + ' ' + g.homeTeam.ljust(12,' ') + g.homeScore.rjust(3,' ');
			awayBlob = g.awaySeed.rjust(2,' ') + ' ' + g.awayTeam.ljust(12,' ') + g.awayScore.rjust(3,' ');
			matchupBlob = '';
			g.ansiColors = lowWhiteLowBlack;
		} // END final score construction



		// assemble the blob
		if ( g.homeTop == true || g.awayTop == false ) {
			outputLines = [homeBlob, awayBlob];
		}
		else {
			outputLines = [awayBlob, homeBlob];
		}


		// Determine game position
		var x, y, xOffset, yOffset;
		if (g.regional == 'region1' || g.regional == 'region2' || g.regional == 'region3' || g.regional == 'region4' || g.regional == 'finalfour1' || g.regional == 'finalfour2') {
			gameWithinRound = (g.gameID % 100);
			gameRoundNumber = Math.floor(g.gameID / 100);
			gameZeroIndex = gameWithinRound - 1;
			roundZeroIndex = g.round - 2;
			var yMultipliers = [4,8,16,32,32];
			var yMultiplierDiff = [16,8,4,2,1];
			var yStarts = [1,3,7,15,32,32];
			var xMultiplier = 21;

			// CALCULATE Y OFFSET
			// Left side of bracket
			if (g.regional == 'region1' || g.regional == 'region3' || g.regional == 'finalfour1') {
				yOffset = (gameZeroIndex*yMultipliers[roundZeroIndex]);
			}
			// Right side of bracket. Need to reset the gameZeroIndex to get it back to the top of the bracket
			else {
				yOffset = ((gameZeroIndex-yMultiplierDiff[roundZeroIndex])*yMultipliers[roundZeroIndex]);
			}


			// CALCULATE X OFFSET
			xOffset = roundZeroIndex*xMultiplier;
			// Later rounds are space slightly closer
			if (g.round == 5 || g.round == 6 ) {
				xOffset = xOffset-(roundZeroIndex-2);
			}


			// CALCULATE Y
			y = yStarts[roundZeroIndex] + yOffset;
			// Top of bracket. 
			if (g.regional == 'region1' || g.regional == 'region2') {
			}
			// Bottom of bracket. Add some extra space in the middle of the bracket to visually separate regions
			else if (g.regional == 'region3' || g.regional == 'region4') {
				y = y+2;
			}


			// CALCULATE X
			// Left side of bracket. 
			if (g.regional == 'region1' || g.regional == 'region3' || g.regional == 'finalfour1') {
				x = 1 + xOffset;
			}
			// Right side of bracket. Instead of adding from 1, we need to subtract offset from farther right
			else {
				x = 219 - xOffset;
			}
		}

		else if (g.regional == 'champ') {
			x = 110;
			y = 32;
		} // championship

		// Ignore play-ins for now
		if ( g.gameID > 199 ) {
			for (var s=0; s<outputLines.length; s++) {
				putMsgOversize(bracketFrame, x, y+s, g.ansiColors, outputLines[s]);
			}
			frame.cycle();
			// debug('----------------');
			// debug(g.gameID);
			// debug(g.regional);
			// debug('gameWithinRound: ' + gameWithinRound);
			// debug('gameRoundNumber: ' + gameRoundNumber);
			// debug('gameZeroIndex: ' + gameZeroIndex);
			// debug('roundZeroIndex: ' + roundZeroIndex);
			// debug('xOffset: ' + xOffset);
			// debug('yOffset: ' + yOffset);
			// debug(x + ', ' + y);
			// debug(outputBlob);
		}

	} // end of main for-loop through all the games

	repaintCanvas( frame, canvasFrame );
	canvasFrame.cycle();



	// ALLOW USER TO SCROLL BRACKET
	var userInput = '';
	var topLeft, botRight;
	var w = bracketFrame.width;
	var h = bracketFrame.height;

	while( ascii(userInput) != 13 && userInput != 'Q' && userInput != 'X' && ascii(userInput) != 27) {
		userInput = console.getkey(K_UPPER | K_NOCRLF);

		// Find positions of the corners of bracketFrame
		topLeft = {
			x: bracketFrame.x,
			y: bracketFrame.y
		}
		botRight = {
			x: topLeft.x + w,
			y: topLeft.y + h
        }

		var moved = false;

		// debug('topLeft:');
		// debug(topLeft);
		// debug('botRight:');
		// debug(botRight);

		// LEFT
		if ( userInput == KEY_LEFT ) {
			if (topLeft.x+8 < 8) {
				// debug('KEY_LEFT');
				bracketFrame.move(8,0);
				moved = true;
			}
		}
		// RIGHT
		else if ( userInput == KEY_RIGHT ) {
			if (botRight.x-8 > termCols-7) {
				// debug('KEY_RIGHT');
				bracketFrame.move(-8,0);
				moved = true;
			}
		}
		// UP
		else if ( userInput == KEY_UP ) {
			if (topLeft.y+4 < 4) {
				// debug('KEY_UP');
				bracketFrame.move(0,4);
				moved = true;
			}
		}
		// DOWN
		else if ( userInput == KEY_DOWN ) {
			if (botRight.y-4 > termRows-4) {
				// debug('KEY_DOWN');
				bracketFrame.move(0,-4);
				moved = true;
			}
		}



		// HOME
		if ( userInput == KEY_HOME ) {
			// debug('KEY_HOME');
			bracketFrame.moveTo(1,topLeft.y);
			moved = true;
		}
		// END
		else if ( userInput == KEY_END ) {
			// debug('KEY_END');
			bracketFrame.moveTo((termCols+1)-w,topLeft.y);
			moved = true;
		}
		// PAGE_UP
		else if ( userInput == KEY_PAGEUP ) {
			// debug('KEY_PAGEUP');
			bracketFrame.moveTo(topLeft.x, 1);
			moved = true;
		}
		// PAGE_DOWN
		else if ( userInput == KEY_PAGEDN ) {
			// debug('KEY_PAGEDN');
			bracketFrame.moveTo(topLeft.x, (termRows+1)-h);
			moved = true;
		}



		if (moved) {
			repaintCanvas( frame, canvasFrame );

			canvasFrame.cycle();
		}
	}
}





function range(start_year, end_year) {
	var years = [];
	for (var i=end_year; i>start_year-1; i--) {
		years.push(i.toString());
	}
	return years;
};



var cleanUp = function() {
	bracketFrame.close();
	frame.close();
	bracketFrame.delete();
	frame.delete();
}




/* MAIN FUNCTION */
console.clear();
frame.open();

// Changed years array to be created dynamically.
// range() creates an array of year strings, in reverse chronological order.
// e.g. ['2024', '2023', '2022', '2021' ...]
var current_season = new Date().getFullYear() - 1;
var years = range(2017, current_season);

var genders = ['men','women'];

var options = {
	'year': years[0],
	'gender': genders[0],
};

function setOptions(opt, val) {
	if (opt in options) {
		options[opt] = val;
	}
}

function launcher(options) {
	var rawData = getData(options['gender'],options['year']);
	var bracketData = {};

	if (rawData.hasOwnProperty('data')) {
		bracketData = rawData.data.mmlContests;
	}
	else {
		bracketData = rawData.games;
	}

	displayBracket(bracketData);
}


// Display the title screen
displayTitle();

launcher(options);

// When done, remove all the frames
cleanUp();

// Quit
exit();
