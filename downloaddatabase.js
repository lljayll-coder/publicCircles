//the following file downloads from firebase. The file also contains upload commands used when counters, followers, and likes are reset.

let admin = require("firebase-admin"); 

let serviceAccount = require("./serviceAccountKey.json"); //firebase keys in directory

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore(); 

module.exports = function() {

    this.downloadDatabase = async function (serverNumber) {

        let programParameters = {};
        let accountParameters = {};
        let server = await 'server';
        let slot = await 'server' + `${serverNumber}`;
        let data = await {};
        
        //searcher for server1. This ensures server can pick up on customer which is assigned server slot
        await db.collection('CustomerServer').where(`${server}`, '==', `${slot}`).get().then((snapshot) => { 
          snapshot.forEach((doc) => {
              
              data = doc.data(); //parse data
      
            programParameters = {
      
              "followPublicAccounts" : convertYesNoToBoolean(data.followPublicAccounts),
              "followPrivateAccounts" : convertYesNoToBoolean(data.followPrivateAccounts),
              
              "headless": convertToBoolean(data.headless),
              "followRatio" : parseInt(data.followRatio), 
              
              "maxFollowsPerDay" : parseInt(data.maxFollowsPerDay),
              "maxLikesPerDay" : parseInt(data.maxLikesPerDay),
              "daysToUnfollow" : parseInt(data.daysToUnfollow),
              "proxy" : data.proxy,
              "proxyUsername" : data.proxyUsername,
              "proxyPassword" : data.proxyPassword,
              "active" : convertToBoolean(data.active)
      
            };
      
            //parse account and hastag data
            let accounts = data.accounts.split(',');
            let hashTags = data.hashTags.split(',');

            accountParameters = {

                "accounts" : accounts,
                "hashTags" : hashTags,
                "username" : data.username,
                "password" : data.password,
                "newUser" : data.newUser,
                "id" : data.id.toString(),
                "server": data.server
                     
              };
      
        }); });

          console.log(programParameters); //display data on screen for troubleshooting purposes
          console.log(accountParameters);
      
          return [programParameters, accountParameters]
        
    },

    this.uploadProgramActiveFalse = async function (id) { //upload to database to deactivate program

      await db.collection('CustomerServer').doc(id).update({
            
          'active': "false"
          
      });

    },

    this.uploadNewUserFalse = async function (id) { //upload to database that user no longer a new user after reset of counters, followers, and liked

      await db.collection('CustomerServer').doc(id).update({
          
          'newUser': "false"
          
      });

    };

};

function convertToBoolean(string) {

  if (string=="true") {
      return true
  }

  else {
      return false
  }


};

function convertYesNoToBoolean(string) {

  if (string=="Yes") {
      return true
  }

  else {
      return false
  }


};