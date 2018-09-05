# CarlXPrintRemix
For libraries using the TLC Carl.X Integrated Library System. Remix Carl.X print jobs, e.g., Hold/In-transit slips

CarlXPrintRemix 

0. CONFIGURE PRINT RECEIPT JOBS 
0.1.	TO ADD DATA FROM CARL.X CUSTOM PRINT RECEIPTS 
0.1.1.	Carl.X Admin > Tools > Print Receipt Editor 
0.1.2.	Select the appropriate Type and Template 
0.1.3.	Ensure all print areas use only Consolas 10pt font. Styling in Proportional fonts will create unexpected space characters. 
0.1.4.	Insert/edit desired token fields. 
0.1.4.1.	Tokens are documented at https://carlcommunity.com/wp-content/uploads/2017/04/Admin-Workstation-Tools.pdf?page=14 but that documentation is not current. See TLC Helpdesk ticket #428563 
0.1.4.2.	Each key/value entry should look like 
	FIELD_CODE LEFTBRACE LEFTBRACE DOLLAR FIELD_CODE RIGHTBRACE RIGHTBRACE NEWLINE, e.g., BRD {{$BRD}} 
0.1.4.3. Each template should start with 
	Type {{[verbatim type value]}}, e.g., Type {{Hold/In-transit Receipt}} 
	Template {{[verbatim template value]}}, e.g., Template {{LIMITLESS}} 
0.1.4.4. Ensure added tokens are in the CarlXPrintRemix.js TOKEN LIBRARY section 
0.2.	TO ADD DATA FROM CARL.X APIS 
// TO DO : more instructions on using APIs, including caveat of "plan for API downtime!" 
0.3.	TO REARRANGE THE PRINT JOB 
// EPSON ESC/POS information at http://www.epsonexpert.com/Epson_Assets/ESCPOS_Commands_FAQs.pdf 
// AND http://download.delfi.com/SupportDL/Epson/Manuals/TM-T88IV/Programming%20manual%20APG_1005_receipt.pdf 
 
CarlXPrintRemix Installation 
 
1.INSTALL JSCRIPT 
1.1.	Use Google Chrome. Copy CarlXPrintRemix.js from https://github.com/Nashville-Public-Library/CarlXPrintRemix/blob/master/CarlXPrintRemix.js to 'C:\Program Files\CarlX\Live\CarlXPrintRemix.js' 
 
2.INSTALL REDMON 1.9 
2.1.	Information on RedMon can be found at http://pages.cs.wisc.edu/~ghost/redmon/ 
2.2.	RedMon version 1.9 supporting Windows 7, Vista and XP SP3 7 can be downloaded from http://pages.cs.wisc.edu/~ghost/gsview/download/redmon19.zip 
2.3.	In Downloads folder, right click redmon19.zip > Select Extract all... 
2.4.	In Extraction Wizard, select Next 
2.5.	Extract files to this directory: C:\gs\redmon > Next 
2.6.	Check Show extracted files > Finish 
2.7.	Right click C:\gs\redmon\setup64.exe > Select Run as Administrator... 
2.8.	User Account Control warning: Yes 
2.9.	RedMon – Redirection Port Monitor > Do you want to install the RedMon redirection port monitor? Yes 
2.10.	Installation successful dialog > Select OK 
2.11.	Close the Windows Explorer window 
 
3. CONFIGURE PRINTER PORT RP1: 
3.1.	In Windows 7, Open "Print Management" 
3.2.	In the Print Management left pane, navigate to Print Management > Print Servers [LOCAL COMPUTER NAME] > Ports 
3.3.	In the Print Management left pane, right click Ports 
3.4.	Select Add Port... 
3.5.	In Printer Ports dialog, select Redirected Port and click New Port... button 
3.6.	Port Name: RPT1: [should be default value]
3.7.	In Print Management central pane, right click RPT1: and select Configure Port... 
3.8.	In the RPT1: Properties dialog 
3.8.1.	Redirect this port to the program: cscript 
3.8.2.	Arguments for the program are: /nologo "C:\Program Files\CarlX\Live\CarlXPrintRemix.js" 
3.8.3.	Output: Copy stdout to printer 
3.8.4.	Printer: EPSON TM-T88[...] 
3.8.5.	Run: Normal 
3.8.6.	Run  as User [checked] 
3.8.7.	Click OK 
3.9.	In the Print Management left pane, right click Printers 
3.10.	Select Add Printer... 
3.11.	In the Network Printer Installation Wizard dialog: 
3.11.1.	Add a new printer using an existing port: RPT1: 
3.11.2.	Use an existing printer driver on the computer: EPSON TM-T88[...] 
3.11.3.	Printer Name: CarlX [job] Printer, e.g., CarlX Transit Slip Printer 
3.11.4.	[Do not share] 
3.11.5.	Next > Next [no test print – it will fail] 
3.12.	In the Print Management left pane, navigate to > Print Servers > [LOCAL COMPUTER NAME] > Printers 
3.13.	In the Print Management left pane, right click Printers 
3.14.	Select Add Printer... 
3.15.	In the Network Printer Installation Wizard, select Add a new printer to an existing port 
3.16.	In the ports dropdown, select the Redirected port you created (RPT1 or RPT2) 
3.17.	Click Next > 
3.18.	In the Printer Driver page of the Network Printer Installation Wizard, select Use an existing printer driver on the computer 
3.19.1.	In the dropdown, select Generic / Text Only. If that selection is not present then 
3.19.2.1.	Select Install a new driver 
3.19.2.2.	In the Printer installation page, select Manufacturer: Generic, Printers: Generic / Text Only 
3.20.1.	In the Printer Name and Sharing Settings page 
3.20.2.	Set Printer Name: CARLX RECEIPT PRINTER 
3.20.3.	Uncheck Share this printer 
3.20.4. Click Next > 
3.21.	Click Next > 
3.22.	Do not print a test page - it will fail 
3.23.	Click Finish 
 
4. CONFIGURE TRUSTED SITES 
4.1.	Navigate to Internet Options > Security > Trusted Sites > Sites > 
4.2.	[Uncheck Require server verification (https:) for all sites in this zone] 
4.3.	Add this website to the zone: nashapp.library.nashville.org 
	// may need more at ActiveX controls and plug-ins 
	// Initialize and script ActiveX controls not marked as safe for scripting [doubtful...] 
