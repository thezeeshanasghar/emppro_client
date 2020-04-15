let shared=require("../shared/Shared.js");
let response=shared.readSetting();
const ipc = require('electron').ipcRenderer,

Return = document.querySelector('#Return');

var fs = require('fs'); 
function GetSettings()
{
    document.getElementById("SnapShot").value=parseInt(response.SnapShot) / (60*1000) ;
    document.getElementById("Keyboard").value=parseInt(response.Keyboard) / (60*1000) ;
    document.getElementById("Mouse").value=parseInt(response.mouse) / (60*1000) ;
    document.getElementById("ScreenShot").value=parseInt(response.mouse) / (60*1000) ;
    document.getElementById("PostRequest").value=parseInt(response.mouse) / (60*1000) ;

}
function UpdateRecord()
{
    try
    {
    response.SnapShot= parseInt(document.getElementById("SnapShot").value) * (60*1000)  ;
    response.Keyboard=parseInt( document.getElementById("Keyboard").value) *(60*1000);
    response.mouse=parseInt( document.getElementById("Mouse").value)*(60*1000);
    response.PostRequest=parseInt( document.getElementById("PostRequest").value)*(60*1000);
    response.PostRequest=parseInt( document.getElementById("ScreenShot").value)*(60*1000);
    fs.writeFileSync("../../../Storage/Settings.json",JSON.stringify(response));
    GetSettings();
    alert("Record Updated Successfully");
    }catch(e)
    {
        alert("Operation unsuccessfull");
    }
   


}

GetSettings();
Return.addEventListener('click', () => {
    ipc.sendSync('return', 'Enable');

});