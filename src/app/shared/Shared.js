var  ApplicationPath=require('path').resolve(__dirname, '../../../');
var services=require("../core/services/userservice");
services.print();
console.log(ApplicationPath);
const decodeBase64Image = (dataString) => {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
      response = {};
  
    if (matches.length !== 3) {
      return new Error('Invalid input string');
    }
  
    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');
  
    return response;
 }
 
 const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max)); 
 }
 const readSetting=()=>{
  let jsonData = require('../../../Storage/Settings.json');
  return jsonData;
 }
 const GetKeyboardData=()=>{
   let jsonData = require('../../../Storage/KeyboardStorage.json');
   return jsonData;
  }
 const PostKeyboard=(data)=>{
  var fs = require('fs'); 
   let response=[];
   response = require('../../../Storage/KeyboardStorage.json');
   console.log(response)
    response.push(data)

    fs.writeFileSync(ApplicationPath+"/Storage/KeyboardStorage.json",JSON.stringify(response));
 }
      const fnPostData=(path,data)=>{
         services.print();
      services.Post(path,data,messagehandler);
    }

   const messagehandler=(err)=>{
    
    if(!!err)
    {
        confirm.log(err);
    }else{
        console.log("success");
    }
    }

 module.exports = {
                     decodeBase64Image, 
                     getRandomInt,
                     readSetting,
                     PostKeyboard,
                     fnPostData,
                     GetKeyboardData
                  };