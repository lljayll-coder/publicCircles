/*

File contains function which writes to files for liked images and follows. The file also contains a function that reads files to see if username has
been liked or username has been followed

*/

module.exports = function() {

    this.writeLiked = async function (account) {

        let fs =  require('fs');

        fs.readFile(readDirectory()+'liked.json', (err, data) => {

            if (err) throw err; //if error found

            let file =  JSON.parse(data); //convert file to json format
            
            file[file.length] =  account; //take account and append to array

            
            let final = JSON.stringify(file);
            
                fs.writeFile(readDirectory()+'liked.json', final, (err) => {
                    if(err) throw err;
                    console.log(account + ' saved to file from liked photo @'+readDirectory());
                });
            
        });
       
    },

    this.writeFollowed = async function (account) {

        let fs =  require('fs');

        fs.readFile(readDirectory()+'followed.json', (err, data) => {

            let date = Date.now(); //current date and time

            if (err) throw err; //if error found

            let file =  JSON.parse(data); //convert file to json format
            
            file[file.length] =  [date, account]; //take account and append to array

            let final = JSON.stringify(file);
            
                fs.writeFile(readDirectory()+'followed.json', final, (err) => {
                    if(err) throw err;
                    console.log(account + ' saved to file from follow @'+readDirectory());
                });
            
        });
        

    },

    this.writeSchedule = async function (schedule) {

        let fs =  require('fs');

        fs.readFile('schedule.json', (err, data) => {

            if (err) throw err; //if error found

            let final = JSON.stringify(schedule);
            
                fs.writeFile('schedule.json', final, (err) => {
                    if(err) throw err;
                    console.log('Schedule.json updated');
                });
            
        });
       
    },

    this.writeDirectory = async function (slot) {

        let fs =  require('fs');
    
        fs.readFile('directory.json', (err, data) => {
    
            if (err) throw err; //if error found
    
            let file =  JSON.parse(data); //convert file to json format
            
            file[0] =  slot; //take account and append to array
    
            let final = JSON.stringify(file);
            
                fs.writeFile('directory.json', final, (err) => {
                    if(err) throw err;
                    console.log('Slot ' + slot + ' written to directory.json file. Current directory set to /slots/' + slot +'/');
                });
            
        });
    
    },

    writeServerComplete = async function (server, schedule) {

        let fs =  require('fs');

        let location = 0;

        for (i=0;i<schedule.length;i++) {

            if (schedule[i][0] == server) {location = i+1}

        }
    
        fs.readFile('schedule.json', (err, data) => {
    
            if (err) throw err; //if error found
    
            let file =  JSON.parse(data); //convert file to json format
            
            file[location-1] =  [location, 0]; //take account and append to array
    
            let final = JSON.stringify(file);
            
                fs.writeFile('schedule.json', final, (err) => {
                    if(err) throw err;
                    console.log('Server ' + server + ' completed. Removing from daily schedule');
                });
            
        });
    
    },

    this.checkFollowed = function (account) {

        let fs = require('fs');
        let array = fs.readFileSync(readDirectory()+'followed.json').toString(); //convert file contents to string

        let response = array.includes(account); //check each element for the username

        return response

    },

    this.returnFollowed = function () {

        let fs = require('fs');

        let array = fs.readFileSync(readDirectory()+'followed.json')

        let file =  JSON.parse(array); //convert file to json format

        return file

    },

    this.checkLiked = function (account) {

        let fs = require('fs');
        let array = fs.readFileSync(readDirectory()+'liked.json').toString(); //convert file contents to string

        let response = array.includes(account); //check each element for the username

        return response

    },

    this.removeFollow = async function (account) {

        let fs =  require('fs');


        fs.readFile(readDirectory()+'followed.json', (err, data) => {

            if (err) throw err; //if error found

            let file =  JSON.parse(data); //convert file to json format

            let location = 0;

            for (let i=0; i<file.length; i++ ) {

                if (file[i][1] == account) {

                    location = i;

                }

            };

            file.splice(location,1) //remove username, 1 is the index of username
            
            let final = JSON.stringify(file);
            
                fs.writeFile(readDirectory()+'followed.json', final, (err) => {
                    if(err) throw err;
                    console.log(account + ' removed from followed file @'+readDirectory());
                });
            
        });
       
    },

    this.counter = async function (command) {

        let fs =  require('fs');

        fs.readFile(readDirectory()+'counter.json', (err, data) => { //counter.json has two numbers. The first number are the follows and the second are the likes for the day

            if (err) throw err; //if error found

            let file =  JSON.parse(data); //convert file to json format
            
            if (command == 0) {
                
                file[0] = 0; //reset counter for first number (follows)
                console.log('Follow counter set to ' + file[0] +' @'+readDirectory());

            }

            else if (command == 1) {

                file[0] = file[0] + 1; //add to counter for first number (follows)
                console.log('Follow/unfollow counter set to ' + file[0]+' @'+readDirectory());
            }

            else if (command == 2) {

                file[1] = 0;
                console.log('Like counter set to ' + file[1]+' @'+readDirectory());
            }

            else if (command == 3) {

                file[1] = file[1] + 1;
                console.log('Like counter set to ' + file[1]+' @'+readDirectory());
            }

            else if (command == 4) {

                file[0] = 0; //set both counters to zero
                file[1] = 0;
                file[2] = 0;
                console.log('All counters reset'+' @'+readDirectory());
            }

            else if (command == 5) {

                file[2] = file[2] + 1;
                console.log('Error counter set to ' + file[2]+' @'+readDirectory());
            }

            else {console.log('Error in filewrite.js counter function')}

            let final = JSON.stringify(file);
            
                fs.writeFile(readDirectory()+'counter.json', final, (err) => {
                    if(err) throw err;
                });
            
        });

        
       
    },

    this.returnFollows = function () {

        let fs = require('fs');

        let array = fs.readFileSync(readDirectory()+'counter.json')

        let file =  JSON.parse(array); //convert file to json format

        return file[0]

    },

    this.returnLikes = function () {

        let fs = require('fs');

        let array = fs.readFileSync(readDirectory()+'counter.json')

        let file =  JSON.parse(array); //convert file to json format

        return file[1]

    },

    this.returnRestarts = function () {

        let fs = require('fs');

        let array = fs.readFileSync(readDirectory()+'counter.json')

        let file =  JSON.parse(array); //convert file to json format

        return file[2]

    },

    this.returnSchedule = function () {

        let fs = require('fs');

        let array = fs.readFileSync('schedule.json')

        let file =  JSON.parse(array); //convert file to json format

        return file

    },

    this.resetLiked = async function () {

        let fs =  require('fs');

        fs.readFile(readDirectory()+'liked.json', (err, data) => {

            if (err) throw err; //if error found

            let file =  JSON.parse(data); //convert file to json format
            
            file = []; //take account and append to array

            let final = JSON.stringify(file);
            
                fs.writeFile(readDirectory()+'liked.json', final, (err) => {
                    if(err) throw err;
                    console.log('liked.json reset'+' @'+readDirectory());
                });
            
        });
       
    },

    this.resetFollowed = async function () {

        let fs =  require('fs');


        fs.readFile(readDirectory()+'followed.json', (err, data) => {

            if (err) throw err; //if error found

            let file =  JSON.parse(data); //convert file to json format
            
            file = []; //take account and append to array

            
            let final = JSON.stringify(file);
            
                fs.writeFile(readDirectory()+'followed.json', final, (err) => {
                    if(err) throw err;
                    console.log('followed.json reset'+' @'+readDirectory());
                });
            
        });
       
    };
    
};

function readDirectory() {

    let fs = require('fs');

    let directory = fs.readFileSync('directory.json')

    let file =  JSON.parse(directory); //convert file to json format

    return ('slots/'+file[0]+'/')

};
