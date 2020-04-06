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
 const GetWebCamData=()=>{
  let jsonData = require('../../../Storage/WebCamStorage.json');
  return jsonData;
 }
 const PostWebCam=(data)=>{
  var fs = require('fs'); 

   let response=[];
   response = require('../../../Storage/WebCamStorage.json');
   console.log(response)
  //  if(response.length!=0)
  //  {
    response.push(data)
  //  }else{
  //    response="["+data+"]";
  //  }
  
  fs.writeFileSync("../../../Storage/WebCamStorage.json",JSON.stringify(response));
 }
 //--------------------------------
 const GetSnapShotData=()=>{
  let jsonData = require('../../../Storage/ScreenShotStorage.json');
  return jsonData;
 }
 const PostSnapShot=(data)=>{
  var fs = require('fs'); 

   let response=[];
   response = require('../../../Storage/ScreenShotStorage.json');
   console.log(response)
  //  if(response.length!=0)
  //  {
    response.push(data)
  //  }else{
  //    response="["+data+"]";
  //  }
  
  fs.writeFileSync("../../../Storage/ScreenShotStorage.json",JSON.stringify(response));
 }
 //--------------------------------
 const GetKeyboardData=()=>{
  let jsonData = require('../../../Storage/KeyboardStorage.json');
  return jsonData;
 }
 const PostKeyboard=(data)=>{
  var fs = require('fs'); 

   let response=[];
   response = require('../../../Storage/KeyboardStorage.json');
   console.log(response)
  //  if(response.length!=0)
  //  {
    response.push(data)
  //  }else{
  //    response="["+data+"]";
  //  }
  
  fs.writeFileSync("../../../Storage/KeyboardStorage.json",JSON.stringify(response));
 }
  //--------------------------------
  const GetMouseData=()=>{
    let jsonData = require('../../../Storage/mouseStorage.json');
    return jsonData;
   }
   const PostMouse=(data)=>{
    var fs = require('fs'); 
  
     let response=[];
     response = require('../../../Storage/mouseStorage.json');
     console.log(response)
    //  if(response.length!=0)
    //  {
      response.push(data)
    //  }else{
    //    response="["+data+"]";
    //  }
    
    fs.writeFileSync("../../../Storage/mouseStorage.json",JSON.stringify(response));
   }
 module.exports = {
                     decodeBase64Image, 
                     getRandomInt,
                     readSetting,
                     PostWebCam,
                     GetWebCamData,
                     PostKeyboard,
                     GetKeyboardData,
                     GetSnapShotData,
                     PostSnapShot,
                     GetMouseData,
                     PostMouse
                  };