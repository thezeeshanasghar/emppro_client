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
 
 module.exports = {
    decodeBase64Image, 
    getRandomInt,
     // anotherMethod
 };