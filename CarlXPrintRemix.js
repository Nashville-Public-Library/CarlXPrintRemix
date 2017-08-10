// CarlXPrintRemix.js
// James Staub
// Nashville Public Library
// remix CarlX print jobs

// FUNCTIONS
function LimitlessLibraries_PatronAPI_ChargeReceipt(patronId) {
	var strResult;
	try
	{
		// Create the WinHTTPRequest ActiveX Object.
		// TO DO : make the call the response parser more XMLish
		// var xmlhttp = new ActiveXObject("WinHttp.XMLHttpRequest"); // yields WinHTTP error 429
		var xmlhttp = new ActiveXObject("WinHttp.WinHttpRequest.5.1");
		//  Create an HTTP request.
		var temp = xmlhttp.Open("POST", "http://nashapp.library.nashville.org:8080/CarlXAPI/PatronAPI.wsdl", false);
		//  Send the HTTP request.
		var sr = '<soapenv:Envelope ' +
				'xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ' +
				'xmlns:pat="http://tlcdelivers.com/cx/schemas/patronAPI" ' +
				'xmlns:req="http://tlcdelivers.com/cx/schemas/request"> ' +
				'<soapenv:Header/> ' +
				'<soapenv:Body> ' +
					'<pat:GetPatronInformationRequest> ' +
						'<pat:SearchType>Patron ID</pat:SearchType> ' +
						'<pat:SearchID>' + patronId + '</pat:SearchID> ' +
						'<pat:Modifiers></pat:Modifiers> ' +
					'</pat:GetPatronInformationRequest> ' +
				'</soapenv:Body> ' +
			'</soapenv:Envelope>';
		xmlhttp.SetRequestHeader('Content-Type', 'text/xml');
        xmlhttp.Send(sr);
        //  Retrieve the response text.
        strResult = xmlhttp.ResponseText;
    }
    catch (objError)
    {
        strResult = objError + "\n"
        strResult += "WinHTTP returned error: " + 
            (objError.number & 0xFFFF).toString() + "\n\n";
        strResult += objError.description;
    }
    //  Return the response text.
    return strResult;
}

// SCRIPT
var hold=false;
var newPrint="";
var printed="";

do {
	printed += WScript.StdIn.ReadLine() + "\n";
}
while (!WScript.StdIn.AtEndOfStream);

// SCHOOLS LOOKUP
// TO DO : Determine whether Carl.X API could be reliable enough to use instead of this static lookup
var schools = {
	"00152" : "Davis Early Learning Center",
	"01681" : "Ross Early Learning Center",
	"03186" : "Casa Azafran Early Learning Center-delivery via Martin Center",
	"04419" : "Cambridge Early Learning Center-delivery via Martin Center",
	"10105" : "Amqui Elementary ",
	"11122" : "Lakeview Elementary",
	"12135" : "Bellshire Elementary",
	"13145" : "Norman Binkley Elementary",
	"14165" : "Buena Vista Elementary",
	"15175" : "Caldwell Elementary",
	"16184" : "Cane Ridge Elementary",
	"17185" : "Carter Lawrence Elementary",
	"18200" : "Chadwell Elementary",
	"19205" : "Charlotte Park Elementary",
	"1A215" : "Cockrill Elementary",
	"1B225" : "Cole Elementary",
	"1C230" : "Hattie Cotton Elementary",
	"1D235" : "Crieve Hall Elementary",
	"1E240" : "Cumberland Elementary",
	"1F252" : "Dodson Elementary",
	"1G265" : "Dupont Elementary",
	"1H280" : "Eakin Elementary",
	"1I308" : "Fall-Hamilton Elementary",
	"1J310" : "Moss Elementary",
	"1K315" : "Gateway Elementary",
	"1L320" : "Glencliff Elementary",
	"1M330" : "Glendale Elementary",
	"1N335" : "Glengarry Elementary",
	"1O340" : "Glenn Elementary",
	"1P345" : "Glenview Elementary",
	"1Q350" : "Goodlettsville Elementary",
	"1R360" : "Gower Elementary",
	"1S370" : "Granbery Elementary",
	"1T375" : "Alex Green Elementary",
	"1U380" : "Julia Green Elementary",
	"1V395" : "Harpeth Valley Elementary",
	"1W405" : "Haywood Elementary",
	"1X415" : "Hermitage Elementary",
	"1Y420" : "Hickman Elementary",
	"1Z451" : "Hull-Jackson Montessori ",
	"20455" : "Inglewood Elementary",
	"21460" : "Andrew Jackson Elementary",
	"22465" : "Joelton Elementary",
	"23485" : "Jones Paideia Magnet Elementary",
	"24495" : "Tom Joy Elementary",
	"25496" : "A. Z. Kelley Elementary",
	"26500" : "Robert E Lillard Elementary",
	"27505" : "Kirkpatrick Elementary",
	"28520" : "Lockeland Elementary",
	"29522" : "Ruby Major Elementary",
	"2A530" : "McGavock Elementary",
	"2B552" : "Maxwell Elementary",
	"2C560" : "Dan Mills Elementary",
	"2D575" : "Thomas A. Edison Elementary",
	"2E576" : "Mt. View Elementary",
	"2F590" : "Napier Elementary",
	"2G595" : "Neely's Bend Elementary",
	"2H610" : "Old Center Elementary",
	"2I618" : "Paragon Mills Elementary",
	"2J620" : "Park Avenue Elementary",
	"2K640" : "Pennington Elementary",
	"2L650" : "Percy Priest Elementary",
	"2M670" : "Rosebank Elementary",
	"2N682" : "Shayne Elementary",
	"2O685" : "Shwab Elementary",
	"2P686" : "Smith Springs Elementary",
	"2Q690" : "Stanford Montessori Elementary",
	"2R710" : "Stratton Elementary",
	"2S715" : "Sylvan Park  Elementary",
	"2T717" : "Tulip Grove  Elementary",
	"2U725" : "Tusculum Elementary",
	"2V735" : "Una Elementary",
	"2W755" : "Warner Elementary",
	"2X765" : "Waverly-Belmont Elementary",
	"2Y775" : "Westmeade Elementary",
	"2Z784" : "Robert Churchwell Elementary",
	"30790" : "Whitsitt Elementary",
	"40100" : "Margaret Allen Middle",
	"41111" : "Antioch Middle",
	"43120" : "Jere Baxter Middle",
	"44130" : "Bellevue Middle",
	"45238" : "Croft Middle",
	"46260" : "Donelson Middle",
	"47270" : "Dupont Hadley Middle",
	"48275" : "Dupont Tyler Middle",
	"49285" : "John Early Middle",
	"4A296" : "East Literature Middle",
	"4B355" : "Goodlettsville Middle",
	"4C365" : "Gra-Mar Middle",
	"4D400" : "Haynes Middle",
	"4E410" : "Head Middle Magnet",
	"4F434" : "Hill, H. G. Middle",
	"4G470" : "Joelton Middle",
	"4H498" : "J F Kennedy Middle",
	"4I510" : "Litton Middle ",
	"4J535" : "McKissack Middle",
	"4K540" : "McMurray Middle",
	"4L545" : "Madison Middle",
	"4M551" : "Marshall Middle",
	"4N555" : "Meigs Middle Magnet",
	"4O563" : "J.T. Moore Middle",
	"4P577" : "Apollo Middle",
	"4S612" : "Oliver Middle",
	"4T675" : "Rose Park Middle",
	"4U730" : "Two Rivers Middle",
	"4V770" : "West End Middle",
	"4W783" : "Creswell Arts Middle",
	"4X805" : "Wright Middle ",
	"4Y540" : "McMurray Annex @ Tusculum",
	"60110" : "Antioch High ",
	"61182" : "Cane Ridge High ",
	"62242" : "Nashville School of the Arts",
	"63290" : "East Literature High",
	"64325" : "Glencliff High ",
	"65397" : "Harris Hillman",
	"66435" : "Hillsboro High",
	"67440" : "Hillwood High",
	"68448" : "Cora Howe School",
	"69450" : "Hume-Fogg High Magnet",
	"6A452" : "Hunter's Lane High",
	"6C497" : "MLK Jr. Magnet",
	"6D532" : "McGavock High",
	"6E550" : "Maplewood High",
	"6F615" : "Overton High",
	"6G632" : "Pearl-Cohn High",
	"6H705" : "Stratford High",
	"6I787" : "Whites Creek High",
	"70142" : "Nashville Big Picture High-delivery via Martin Center",
	"71181" : "Cameron College Prep",
	"72211" : "Academy at Old Cochrill-delivery via Martin Center",
	"73422" : "Academy at Hickory Hollow-delivery via Martin Center",
	"74562" : "Middle College High-delivery via Martin Center",
	"76613" : "Academy at Opry Mills-delivery via Martin Center",
	"77655" : "Martin Professional Development Center",
	"78508" : "LEAD Academy High",
	"79118" : "Brick Church College Prep",
	"7A504" : "KIPP Nashville Collegiate High",
	"7B507" : "LEAD Prep Southeast",
	"7C743" : "Valor Flagship Academy",
	"7D744" : "Valor Voyager Academy",
	"7E601" : "Neely’s Bend College Prep" };
// END SCHOOLS

// TOKEN LIBRARY
//
// Receipt Type
var re = /Type \{\{(.+?)\}\}/;
var matches = re.exec(printed);
var receiptType = matches[1];
// Receipt Template
var re = /Template \{\{(.+?)\}\}/;
var matches = re.exec(printed);
var receiptTemplate = matches[1];
// BRC = Branch Code
var BRC = "";
var re = /BRC \{\{(.+?)\}\}/;
var matches = re.exec(printed);
if (matches !== null) { BRC = matches[1] };
// BRD = Send To Library Defined Field
var BRD = "";
var re = /BRD \{\{(.+?)\}\}/;
var matches = re.exec(printed);
if (matches !== null) { BRD = matches[1] };
// BRI = Library Defined Field
var BRI = "";
var re = /BRI \{\{(.+?)\}\}/;
var matches = re.exec(printed);
if (matches !== null) { BRI = matches[1] };
// BRN = Branch Name
var BRN = "";
var re = /BRN \{\{(.+?)\}\}/;
var matches = re.exec(printed);
if (matches !== null) { BRN = matches[1] };
// BRP = Branch Phone Number
var BRP = "";
var re = /BRP \{\{(.+?)\}\}/;
var matches = re.exec(printed);
if (matches !== null) { BRP = matches[1] };
// CAN = Call Number
var CAN = "";
var re = /CAN \{\{(.+?)\}\}/;
var matches = re.exec(printed);
if (matches !== null) { CAN = matches[1] };
// CID = Computer ID
var CID = "";
var re = /CID \{\{(.+?)\}\}/;
var matches = re.exec(printed);
if (matches !== null) { CID = matches[1] };
// CDT = Current Date
var CDT = "";
var re = /CDT \{\{(.+?)\}\}/;
var matches = re.exec(printed);
if (matches !== null) { CDT = matches[1] };
// CTM = Current Time
var CTM = "";
var re = /CTM \{\{(.+?)\}\}/;
var matches = re.exec(printed);
if (matches !== null) { CTM = matches[1] };
// DDT = Due Date
var DDT = "";
var re = /DDT \{\{(.+?)\}\}/;
var matches = re.exec(printed);
if (matches !== null) { DDT = matches[1] };
// DNS = Due/NNA/SU Date
var DNS = "";
var re = /DNS \{\{(.+?)\}\}/;
var matches = re.exec(printed);
if (matches !== null) { DNS = matches[1] };
// INS = Institution Name
var INS = "";
var re = /INS \{\{(.+?)\}\}/;
var matches = re.exec(printed);
if (matches !== null) { INS = matches[1] };
// ITN = Item Number
var ITN = "";
var re = /ITN \{\{(.+?)\}\}/;
var matches = re.exec(printed);
if (matches !== null) { ITN = matches[1] };
// ITZ = Item Number last 4 digits
var ITZ = "";
var re = new RegExp('(.{4})$');
var matches = ITN.match(re);
if (matches !== null) { ITZ = matches[1] };
// MSG = Custom Message
var MSG = "";
var re = /MSG \{\{(.+?)\}\}/;
var matches = re.exec(printed);
if (matches !== null) { MSG = matches[1] };
// P4I = Last 4 PID
var P4I = "";
var re = /P4I \{\{(.+?)\}\}/;
var matches = re.exec(printed);
if (matches !== null) { P4I = matches[1] };
// P4N = First 4 Last Name
var P4N = "";
var re = /P4N \{\{(.+?)\}\}/;
var matches = re.exec(printed);
if (matches !== null) { P4N = matches[1] };
// PF1 = Last Name 1st Initial
var PF1 = "";
var re = /PF1 \{\{(.+?)\}\}/;
var matches = re.exec(printed);
if (matches !== null) { PF1 = matches[1] };
// PIF = Patron ID - Full
var PIF = "";
var re = /PIF \{\{(.+?)\}\}/;
var matches = re.exec(printed);
if (matches !== null) { PIF = matches[1] };
// PIM = Patron ID - Masked
var PIM = "";
var re = /PIM \{\{(.+?)\}\}/;
var matches = re.exec(printed);
if (matches !== null) { PIM = matches[1] };
// PNF = Patron Name – Full
var PNF = "";
var re = /PNF \{\{(.+?)\}\}/;
var matches = re.exec(printed);
if (matches !== null) { PNF = matches[1] };
// PNM = Patron Name - Masked
var PNM = "";
var re = /PNM \{\{(.+?)\}\}/;
var matches = re.exec(printed);
if (matches !== null) { PNM = matches[1] };
// PNY = Patron Name Last
// PNZ = Patron Name First, etc
var PNY = "";
var PNZ = "";
if (PF1 !== null && PF1 !== "") {
	var re = /^(.*?),/;
	var matches = re.exec(PF1);
	if (matches !== null) { 
		PNY = matches[1];
		var re = new RegExp('^' + PNY + '(.*?)$');
		var matches = PNF.match(re);
		if (matches !== null) {
			PNZ = matches[1];
		}
	}
}
// PPN = Patron Phone Number
var PPN = "";
var re = /PPN \{\{(.+?)\}\}/;
var matches = re.exec(printed);
if (matches !== null) { PPN = matches[1] };
// PSP = Patron Secondary Phone Number
var PSP = "";
var re = /PSP \{\{(.+?)\}\}/;
var matches = re.exec(printed);
if (matches !== null) { PSP = matches[1] };
// RAB = Returned At (Branch)
var RAB = "";
var re = /RAB \{\{(.+?)\}\}/;
var matches = re.exec(printed);
if (matches !== null) { RAB = matches[1] };
// RDT = Return Date
var RDT = "";
var re = /RDT \{\{(.+?)\}\}/;
var matches = re.exec(printed);
if (matches !== null) { RDT = matches[1] };
// RTE = Route
var RTE = "";
var re = /RTE \{\{(.+?)\}\}/;
var matches = re.exec(printed);
if (matches !== null) { RTE = matches[1] };
// SID = Staff ID
var SID = "";
var re = /SID \{\{(.+?)\}\}/;
var matches = re.exec(printed);
if (matches !== null) { SID = matches[1] };
// STB = Send To (Branch)
var STB = "";
var re = /STB \{\{(.+?)\}\}/;
var matches = re.exec(printed);
if (matches !== null) { STB = matches[1] };
// STB Set MNPS header
if (STB.length == 5) { 
	LLBranchLabel = schools[STB];
	STB = "MNPS"; 
}
// TTL = Title
var TTL = "";
var re = /TTL \{\{(.+?)\}\}/;
var matches = re.exec(printed);
if (matches !== null) { TTL = matches[1] };
// END TOKEN LIBRARY

// LIMITLESS LIBRARIES PATRON API CALLS
var isLL = false;
var re = /LIMITLESS/;
var matches = re.exec(receiptTemplate);
if (matches !== null) { isLL = true };

var LLResponse = "";
var LLBranchCode = "";
var LLHomeroom = "";
if (isLL == true) {
	LLResponse = LimitlessLibraries_PatronAPI_ChargeReceipt(PIF);
	var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
	xmlDoc.loadXML(LLResponse);
	LLBranchCode = xmlDoc.getElementsByTagName("ns4:DefaultBranch").item(0).text
	LLBranchLabel = schools[LLBranchCode];
	LLHomeroom = xmlDoc.getElementsByTagName("ns4:SponsorName").item(0).text
}

// HOLD IN TRANSIT RECEIPT
if (receiptType == "Hold/In-transit Receipt") {
	hold = true;
}

// PULL FROM HOLDSHELF DATE
var pullDateString = ""
if (hold == true) {
	var today = new Date();
	var pull = new Date();
	pull.setDate(today.getDate()+9);
	pullDateString = pull.toDateString();
}

// COMPOSE PRINTED PAGE
newPrint += "\x1B" + "@"; // Initialize printer
newPrint += "\x1B" + "D" + "\x26" + "\x01"; // set a single horizontal tab to 36th character 
newPrint += "\x1D" + "b" + "\x01"; // smoothing mode on
newPrint += "__________________________________________\n";

// SINGLE SLIP
if (isLL == false && (receiptType == "Hold-shelf Slip" || receiptType == "In-transit Receipt" || receiptType == "Hold/In-transit Receipt")) {
//if (receiptType == "Hold/In-transit Receipt") {
	// TRANSIT AREA
	newPrint += "\x1B" + "a" + "\x01"; // centered
	newPrint += "\x1D" + "!" + "\x43"; // 5 x width, 4 x height
	// HOLD
	if (hold) {
		newPrint += "\x1D" + "B" + "\x01"; // reverse black and white
		newPrint += "  HOLD  \n";
		newPrint += "\x1D" + "B" + "\x00"; // cancel reverse black and white
	} 
	// DESTINATION BRANCH 
	newPrint += STB + "\n";
	newPrint += "\x1D" + "!" + "\x00"; // single-width, single-height
	if (STB == "MNPS") {
		newPrint += LLBranchLabel + "\n";
	}
	newPrint += "\x1B" + "a" + "\x00"; // left-justified
	// MNPS PATRON BARCODE
	if (STB == "MNPS") {
		newPrint += "\n\n";
		newPrint += "\x1D" + "\x68" + "\x50"; // set barcode height to 80 pt
		newPrint += "\x1D" + "k" + "\x45" + "\x09" + PIF.toUpperCase(); // CODE39 barcode, might be wrong
		newPrint += "\n\n\n\n\n\n\n"; 
	} else {
		newPrint += "\n\n\n\n\n\n\n\n\n\n\n";
	}
	if (hold == false) {
		newPrint += "\n\n\n\n";
	}
	// PULL FROM HOLDSHELF DATE
	newPrint += pullDateString + "\t";
	// ITEM ID FINAL 4 DIGITS
	newPrint += ITZ + "\n\n";
	// PATRON FIRST NAME
	newPrint += "\x1B" + "V" + "\x01"; // 90 degree clockwise rotation
	newPrint += "\x1D" + "!" + "\x00"; // single-width, single-height
	PNZ += "                    "; // add 20 spaces
// TO DO : DETERMINE WHETHER ESC T C + ESC V 1 can eliminate the reverse()
	newPrint += PNZ.substr(0,20).split("").reverse().join("") + "\n";
	newPrint += "\x1D" + "!" + "\x00"; // cancel width, height
	newPrint += "\x1B" + "V" + "\x00"; // cancel 90 degree clockwise rotation
	// PATRON LAST NAME
	newPrint += "\x1B" + "V" + "\x01"; // 90 degree clockwise rotation
	newPrint += "\x1D" + "!" + "\x22"; // triple-width, triple-height
	PNY += "       "; // add 7 spaces
// TO DO : DETERMINE WHETHER ESC T C + ESC V 1 can eliminate the reverse()
	newPrint += PNY.substr(0,7).split("").reverse().join("") + "\n";
	newPrint += "\x1D" + "!" + "\x00"; // cancel width, height
	newPrint += "\x1B" + "V" + "\x00"; // cancel 90 degree clockwise rotation
}

// LL STICKY SLIP
if (receiptType == "Hold/In-transit Receipt" && isLL == true) {
	newPrint += "\x1D" + "\x68" + "\x50"; // set barcode height to 80 pt
	newPrint += "\x1D" + "k" + "\x45" + "\x09" + PIF.toUpperCase(); // CODE39 barcode, might be wrong
// TO DO : determine whether I can encode function keys (F2/F3) or ALT+ keys to control Carl.X staff client
}

if ((receiptType == "Charge Receipt" || receiptType == "Patron Receipt") && isLL == true) {
	if (receiptType == "Patron Receipt") { DDT = DNS; }
	newPrint += "\t" + ITZ + "\n";
	newPrint += "\x1B" + "a" + "\x01"; // centered
	newPrint += "\x1D" + "!" + "\x01"; // 2 x width, 2 x height
	newPrint += "Only to be removed by NPL\n\n";
	newPrint += "\x1D" + "!" + "\x11"; // 2 x width, 2 x height
	newPrint += "LIMITLESS LIBRARIES\n\n";
	newPrint += "\x1D" + "!" + "\x00"; // single-width, single-height
	newPrint += "\x1B" + "a" + "\x00"; // left-justified
	newPrint += "__________________________________________\n\n";
	newPrint += "SCHOOL:  " 
	newPrint += "\x1B" + "E" + "\x01"; // emphasis on
	newPrint += LLBranchLabel + "\n\n";
	newPrint += "\x1B" + "E" + "\x00"; // emphasis off
	newPrint += "STUDENT: " 
	newPrint += PNF + "\n\n";
	newPrint += "ROOM:    "
	newPrint += LLHomeroom + "\n\n";
	newPrint += "DUE:     "
	newPrint += "\x1B" + "E" + "\x01"; // emphasis on
	newPrint += DDT + "\n\n";
	newPrint += "\x1B" + "E" + "\x00"; // emphasis off
	newPrint += "Students and Educators: return to your \nschool library or any NPL location\n\n";
	newPrint += "School Librarians: return to NPL\n\n";
	newPrint += "NPL Staff: remove label and check in\n";
}

// THE END
// newPrint += "__________________________________________\n";
newPrint += "\x1D" + "V" + "\x42"; // feed, partial cut
// TO DO: CAN GS V C or GS V D reduce the wasted paper at the top of each page?
//newPrint += "\x1D" + "V" + "\x67" + "\x10"; // feed, partial cut

// PRINT!

//WScript.StdOut.WriteLine("TOP TOP TOP");
WScript.StdOut.WriteLine(newPrint);
//WScript.StdOut.WriteLine("BOTTOM BOTTOM BOTTOM");
