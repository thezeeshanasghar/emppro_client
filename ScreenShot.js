module.exports = function() {
    console.log("working")
const screenshot = require('screenshot-desktop');
let shared=require("./Shared.js");
let response= shared.readSetting();
var fs = require('fs'); 
setInterval(function(){
    response= shared.readSetting();
    console.log(response.ScreenShot)
    if(response.ScreenShotEnable==true)
    {
        console.log("Inside")
    screenshot({format: 'png'}).then((img) => {
    console.log(img);
    fs.writeFileSync("Images/"+"ScreenShot"+shared.getRandomInt(9999999999)+".png",img);
    let object=[{'Type':"ScreenShot",'Data':img}];
    shared.PostData(object);
    console.log("done")
    }).catch((err) => {
    console.log(err);
    })   
    }
},response.ScreenShot)
}