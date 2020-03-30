module.exports = function() {
const screenshot = require('screenshot-desktop')
var fs = require('fs'); 
   
let shared=require("./Shared.js");

screenshot({format: 'png'}).then((img) => {
  console.log(img);
 // var file = shared.decodeBase64Image(img);
  fs.writeFileSync("Images/"+"ScreenShot"+shared.getRandomInt(9999999999)+".png",img);
}).catch((err) => {
  console.log(err);
})
}
