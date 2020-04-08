let SetEnvirment=require("../../environments/environment.js");
console.log(SetEnvirment.SettingPath());
console.log(SetEnvirment.StoragePath());

var services=require("../core/services/userservice");

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
  let jsonData = require(SetEnvirment.SettingPath());
  return jsonData;
 }
 const GetData=()=>{
   let jsonData = require(SetEnvirment.StoragePath());
   return jsonData;
  }
 const PostData=(data)=>{
  var fs = require('fs'); 
   let response=[];
   response = require(SetEnvirment.StoragePath());
   console.log(response)
    response.push(data)

    fs.writeFileSync(SetEnvirment.StoragePath(),JSON.stringify(response));
 }
      const fnPostData=(path,data)=>{
        
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
                     PostData,
                     fnPostData,
                     GetData
                  };