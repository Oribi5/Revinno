

class Firebase {
  constructor() {
    // Your web app's Firebase configuration
    this.firebaseConfig = {
      apiKey: "AIzaSyAeAHsVopOyWDuIenyKE7pJYddf8r1DPo8",
      authDomain: "revinno-eef54.firebaseapp.com",
      databaseURL: "https://revinno-eef54.firebaseio.com",
      projectId: "revinno-eef54",
      storageBucket: "revinno-eef54.appspot.com",
      messagingSenderId: "290130648897",
      appId: "1:290130648897:web:cddc9fb7d7fd01a0c2cbc0",
      measurementId: "G-VJ7GJFEDY2"
    };

    this.connectionData = {
      connected: true,

      lastPingTimeStamp: 0,
      latestPingSuccessful: true,

      onConnect: function() {},

    }
  }


  connect() {
    // Initialize Firebase
    firebase.initializeApp(this.firebaseConfig);
    firebase.analytics();

    this.database = firebase.database();
  }


  //Used to set firebase data
  set(directory, dataObject, onCompletion=null, onError=null) {

    let ref = this.database.ref(directory)
      .set(dataObject, function(error) {

        if ( error ) {
          onError != null ? onError():void(0);
        } else {
          onCompletion != null ? onCompletion():void(0);
        }
      });
    // let data = {name: "APCH", score: parseInt(50*Math.random())};
    // ref.push(data);
  }

  //Used to get relevant firebase data
  get(directory, callback) {
    this.database.ref('/'+directory).once('value').then(function(snapshot) {
      callback(snapshot.val());
    });
  }

  bind(directory, callback) {
    this.database.ref('/'+directory).on('value', function(snapshot) {
      callback(snapshot.val());
    });
  }

  //Maybe move this to a worker
  initPing() {
    let obj = this;
    setInterval(function() {
      obj.ping();
    }, 1000)
  }

  //Used to monitor current connection
  ping() {
    // if ( !this.connectionData.latestPingSuccessful ) {
    //   return;
    // }

    this.set(`user-status/${hash}`,
      {
        "latest-ping": Date.now(),
        "login-status": true,
      }
    );
  }










}
