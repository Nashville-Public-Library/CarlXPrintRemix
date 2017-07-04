// CarlXPrintRemix.js
// James Staub
// Nashville Public Library
// remix CarlX print jobs that are simple text
// e.g., order record print

/* ASSUMPTIONS
page is 80 characters wide
we need to get this done - program for Nashville, not for every conceivable customer
basic order of printout is 
	record type, record number (e.g., b1000008), Last Updated:, Created:, Revisions:
	fixed-length field table
	variable-length fields
	with bib record information first, item or order information second 
each variable-length label happens at the first position in the line
length of fixed-length variable label and value label determine width of order ficed length field column
	e.g., in order record, a column composed of LOCATION, CDATE, CLAIM, COPIES, CODE1, CODE2, CODE3, PBACK will be 9 characters wide (LOCATION = 8, plus one padding space)
	ergo, we've got to explicitly look for each variable name
we don't need to grab the full label for fixed-length values that span multiple lines
*/

// SCRIPT
var printed = "";
var newPrint = "";

do {
	printed += WScript.StdIn.ReadLine() + "\n";
}
while (!WScript.StdIn.AtEndOfStream)

// TRANSIT SLIP


// HOLD
var hold = true;
/*
// DESTINATION BRANCH 
var re = /\n.*SEND TO: (.{2,5})/;
var matches = re.exec(printed);
var destination = matches[1];
// Set MNPS header
// if (destination.length == 5) { destination = substr(destination,2,3); }
if (destination.length == 5) { destination = "MNPS"; }
// Set School label

// PATRON GUID? BARCODE

// ITEM ID FINAL 4 DIGITS

// PULL FROM HOLDSHELF DATE

// PATRON LAST NAME

// PATRON FIRST NAME

*/

// COMPOSE PRINTED PAGE
// EPSON ESC/POS information at http://www.epsonexpert.com/Epson_Assets/ESCPOS_Commands_FAQs.pdf
// AND http://download.delfi.com/SupportDL/Epson/Manuals/TM-T88IV/Programming%20manual%20APG_1005_receipt.pdf
newPrint += "\x1B" + "@" // Initialize printer

//newPrint += printed + "\n";

// TRANSIT AREA
newPrint += "\x1B" + "a" + "\x01"; // centered
newPrint += "\x1D" + "!" + "\x33"; // quad-width, quad-height
// HOLD
if (hold) {
	newPrint += "\x1D" + "B" + "\x01"; // reverse black and white
	newPrint += "   HOLD   \n";
	newPrint += "\x1D" + "B" + "\x00"; // cancel reverse black and white
}
// DESTINATION BRANCH 
//newPrint += destination + "\n";
newPrint += "\x1D" + "!" + "\x00"; // cancel quad-width, quad-height
newPrint += "\x1B" + "a" + "\x00"; // left-justified

// PATRON GUID? BARCODE

// ITEM ID FINAL 4 DIGITS

// PULL FROM HOLDSHELF DATE

// PATRON FIRST NAME
newPrint += "\x1B" + "V" + "\x01"; // 90 degree clockwise rotation
newPrint += "\x1D" + "!" + "\x22"; // double-width, double-height
newPrint += nameFirst + "\n";
newPrint += "\x1D" + "!" + "\x00"; // cancel quad-width, quad-height
newPrint += "\x1B" + "V" + "\x01"; // cancel 90 degree clockwise rotation

// PATRON LAST NAME
newPrint += "\x1B" + "V" + "\x01"; // 90 degree clockwise rotation
newPrint += "\x1D" + "!" + "\x22"; // triple-width, triple-height
newPrint += nameLast + "\n";
newPrint += "\x1D" + "!" + "\x00"; // cancel quad-width, quad-height
newPrint += "\x1B" + "V" + "\x01"; // cancel 90 degree clockwise rotation

newPrint += "------------------------------------------\n";
newPrint +=  "\n"; // necessary?
newPrint +=  "\n"; // necessary?
newPrint += "\x1D" + "V" + "\x42"; // feed, partial cut


// PRINT!

WScript.StdOut.WriteLine("JAMES LOOK HERE->");
WScript.StdOut.WriteLine(newPrint);
WScript.StdOut.WriteLine("<-HERE LOOK JAMES");
