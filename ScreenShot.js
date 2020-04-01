module.exports = function() {
    console.log("working")
const screenshot = require('screenshot-desktop');
let shared=require("./Shared.js");
let response= shared.readSetting();
var fs = require('fs'); 
setInterval(function(){
    response= shared.readSetting();
    if(response.ScreenShotEnable==true)
    {
    screenshot({format: 'png'}).then((img) => {
    //console.log(img);
    fs.writeFileSync("Images/"+"ScreenShot"+shared.getRandomInt(9999999999)+".png",img);
    // var file = urltoFile(data).then(function(file){
        var string = img.toString('base64');
        //console.log(string)
        let object={'Type':"ScreenShot",'Data':string};
        shared.PostSnapShot(object);
    // });

    }).catch((err) => {
    console.log(err);
    })   
    }
},response.ScreenShot)
}