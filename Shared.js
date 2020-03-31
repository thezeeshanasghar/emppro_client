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
  let jsonData = require('./Storage/Settings.json');
  return jsonData;
 }
 const GetPostedData=()=>{
  let jsonData = require('./Storage/Data.json');
  return jsonData;
 }
 const PostData=(data)=>{
  var fs = require('fs'); 

   let response=[];
   response = require('./Storage/Data.json');
   console.log(response)
  //  if(response.length!=0)
  //  {
    response.push(data)
  //  }else{
  //    response="["+data+"]";
  //  }
  
  fs.writeFileSync("./Storage/Data.json",JSON.stringify(response));
 }
 module.exports = {
    decodeBase64Image, 
    getRandomInt,
    readSetting,
    PostData,
    GetPostedData
 };