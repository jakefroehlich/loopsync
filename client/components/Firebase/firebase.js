import app from "firebase/app";

const config = {
    apiKey: "AIzaSyAKvA9riHNlzQyUQX-lafEGRpUPfJ6ld2I",
    authDomain: "loopsync-e134e.firebaseapp.com",
    databaseURL: "https://loopsync-e134e.firebaseio.com",
    projectId: "loopsync-e134e",
    storageBucket: "loopsync-e134e.appspot.com",
    messagingSenderId: "674341392048",
    appId: "1:674341392048:web:e136551336f21856b4b575",
    measurementId: "G-XP91HJKC4T"
  };

  class Firebase {
      constructor() {
          app.initializeApp(config);
      };
  }

  export default Firebase;