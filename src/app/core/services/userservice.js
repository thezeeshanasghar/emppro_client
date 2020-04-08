
    var firebase = require('@firebase/app');
    require('@firebase/auth');
    require('@firebase/database');
     firebase.default.initializeApp(
      {
        apiKey: "AIzaSyB03uXj4djfEFpYKppSnjopgjE6O5l8-YE",
        authDomain: "symbolic-datum-233317.firebaseapp.com",
        databaseURL: "https://symbolic-datum-233317.firebaseio.com",
        projectId: "symbolic-datum-233317",
        storageBucket: "symbolic-datum-233317.appspot.com",
        messagingSenderId: "412248865946",
        appId: "1:412248865946:web:f5df2c9fdca2108356f323",
        measurementId: "G-E1B75MFBL8"
     });
 



  const Post=(path,body,callback)=>{
          if(!path || !body) return
      firebase.default.database().ref(path).set(body,callback);
    }


module.exports = {

  Post
    };