let shared=require("./Shared.js");
let response=shared.readSetting();
var fs = require('fs'); 
function GetSettings()
{
    document.getElementById("SnapShot").value=parseInt(response.SnapShot)/1000;
    document.getElementById("Keyboard").value=parseInt(response.Keyboard)/1000;
    document.getElementById("Mouse").value=(parseInt(response.mouse)/1000);
}
function UpdateRecord()
{
    try
    {
    response.SnapShot= parseInt(document.getElementById("SnapShot").value) * 1000 ;
    response.Keyboard=parseInt( document.getElementById("Keyboard").value)*1000;
    response.mouse=parseInt( document.getElementById("Mouse").value)*1000;
    fs.writeFileSync("./Storage/Settings.json",JSON.stringify(response));
    GetSettings();
    alert("Record Updated Successfully");
    }catch(e)
    {
        alert("Operation unsuccessfull");
    }
   


}

GetSettings();