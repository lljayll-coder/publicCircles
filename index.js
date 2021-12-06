/*

main file that runs using node js in a server environment in headless form. Also contains all variables that control options with true/false
boolean values. All program parameters are downloaded here using firebase.

*/

'use strict';

require('./delays.js')(); //add functions in delays file
require('./navigate.js')(); //add navigation functions
require('./checkunfollow.js')(); //add functions that check if users need to be unfollowed
require('./filewrite.js')(); //add functions that read and write to files that store counters, liked users, and followed users
require('./downloaddatabase.js')(); //add function that downloads user database from firebase
require('./error.js')(); //add function that checks for invalid username or password
require('./email.js')();
require('./scaling.js')();

const puppeteer = require('puppeteer'); //load required library that interacts with chromium browser
const instagramUrl = 'https://www.instagram.com/'; 

//variables needed for program and user parameters that are filled with firebase database values
let username = [];
let password = [];
let newUser = [];
let id = [];

let accounts = [];
let hashTags = [];

let programParameters = {};

let databaseCounter = 0;
let browser = {};
let page = {};

let startHour = 0;
let startMinute =  0;
let serverNumber = 0;

//---------------------------------- //only change this//---------------------------------- //

const schedule = [[6,16],[7,18]]; //ex. [1,7] means slot 1 starts at 7am UTC
const slotSizes = 2; //ex. 2 means there are two hours between each slot

//---------------------------------- //only change this//---------------------------------- //

let getCurrentschedule = [];

async function start() {

    while (true) {
    
        await navigationDelay();  

        await main(); //call main function
    
    }
}

start();

async function main() {

    await navigationDelay();    

    getCurrentschedule = await checkSchedule(schedule);

    //check if conditions to reset are met
    if (await getCurrentschedule != 'complete') {

        startHour = await getCurrentschedule[1];
        serverNumber = await getCurrentschedule[0];

        await writeDirectory(serverNumber);

        await dailyTimer(startHour, startMinute, slotSizes);
        
        await getDatabase(); //download database

    } else if (await getCurrentschedule == 'complete') {

        console.log('Restarting parameters for next day');

        await resetSchedule();

        await navigationDelay();

        await updateSchedule(schedule);

        await restartProgram(browser);

        return

    }
    
    browser = await puppeteer.launch({headless: true,
        "executablePath": '/usr/bin/chromium-browser',
        args: [
            `--proxy-server=${programParameters.proxy}`,
            // Use proxy for localhost URLs
            '--proxy-bypass-list=<-loopback>',
	    '--blink-settings=imagesEnabled=false',		
            '--disable-setuid-sandbox',
            '--no-sandbox',
            '--disable-gpu',
          ]
    }); //headless optional 

    if (await newUser == 'true') { //reset all counters, followed, and liked

        await counter(4);
        await resetFollowed();
        await resetLiked();
        await uploadNewUserFalse(id);

    }
    
    try {

        page = await browser.newPage(); //open new tab

        await navigationDelay();

        try {
            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'); //set to desktop browser
        }
        catch(err) {
            console.log('Switch of browser type not required')
        }
        
        await page.authenticate({username: `${programParameters.proxyUsername}`, password: `${programParameters.proxyPassword}`});
        
        await page.goto(instagramUrl); //load instagam page

        await navigationDelay(); //navigation delay 3-10 seconds
        
        await loginPage(page, browser); //function call to login user

    }

    catch (err) {

        console.log('Error, program restarting. One minute delay activated');

        await counter(5);

        let numRestarts = await  returnRestarts();
        
        await new Promise(resolve => setTimeout(resolve, (1*60*1000))); //set timer to 1 minute

        //-----------------------------------------

        if (await numRestarts >= 5) {

            await counter(4) //restart counter

            await uploadProgramActiveFalse(id); //disable server for user

            await sendEmail('Server# ' + serverNumber + ' down');

            await navigationDelay();

            await writeServerComplete(serverNumber, schedule);

            await navigationDelay();

            getCurrentschedule = await checkSchedule(schedule);

            await navigationDelay();

        }

        //-----------------------------------------

        restartProgram(browser);

    }
 
};

async function loginPage(page, browser) {

    //wait for page to load all required elements before continuing
    await page.waitForSelector('input[name="username"]'); 
    await page.waitForSelector('input[name="password"]');

    await clickDelay(); //click delay 1-3 seconds

    await page.type('input[name="username"]', username, {delay: 110}); //username field //delay must be randomized

    await clickDelay(); //click delay 1-3 seconds

    await page.type('input[name="password"]', password, {delay: 330}); //password field 
    
    await clickDelay(); //click delay

    //--------------------------------------
    
    const loginButton = (await page.$x("//button[.//text() = 'Log In']"))[0]; //login button

    await loginButton.click(); //click login button

    await loginDelay(); 
    
    if (await detectBadLogin(page) == false) {

    await sendEmail('Server# ' + serverNumber + ' started.'); //email for start of program

    await operations1(page, browser); //call main operations function


    } else {

        console.log('bad login detected. updating user file.');
        await uploadProgramActiveFalse(id); //deactivate program in database since wrong username or password
        await sendEmail('Server# ' + serverNumber + ' down. Wrong email or password.');
        await writeServerComplete(serverNumber, schedule); //remove from daily schedule
        await restartProgram(browser);

    }

  };


//--------------------------------------------------------------------------------------------------------------------
//operations 1 is called first which then calls operations 2, then operations 2 calls operations 1 for a constant loop

async function operations1(page, browser) {

    let randomNumber = Math.floor((Math.random() * (accounts.length - 0) + 0)); //generate random number between 0-2 to choose random account from list
    let randomNumber2 = Math.floor((Math.random() * (2 - 0) + 0)); //generate random number between 0-2 to choose to proceed (makes it random between hastag/account navigation)


    if (randomNumber2==0 && accounts) {
        await navigateToAccount(page, accounts[randomNumber], programParameters); //begin navigation   
    }

    await operations2(page, browser); //call operations function 2 to start loop

};

async function operations2(page, browser) {

    let randomNumber = Math.floor((Math.random() * (hashTags.length - 0) + 0)); //generate random number between 0-2 to choose random hastag from list
    let randomNumber2 = Math.floor((Math.random() * (2 - 0) + 0)); //generate random number between 0-2 to choose to proceed (makes it random between hastag/account navigation)


    if (randomNumber2==0 && hashTags.length>0) { //add empty tag field
        await navigateToTag(page, hashTags[randomNumber], programParameters); //begin navigation   
    }

    await operations3(page, browser); //call operations function 1 to continue 

};


async function operations3(page, browser) {

    await console.log('...');

    let totalFollows = await returnFollows(); //get total follows
    let totalLikes = await returnLikes(); //get total likes

    if (await totalFollows <= programParameters.maxFollowsPerDay) {

        await checkUnfollowed(page, programParameters); //check if accounts need to be unfollowed

        await navigationDelay();

    };

    if (await totalFollows >= programParameters.maxFollowsPerDay && await totalLikes >= programParameters.maxLikesPerDay) {

        await browser.close(); //close browser

        await writeServerComplete(serverNumber, schedule); //remove from daily schedule

        await console.log('Like and follow conditions met. Program complete for client');

        await sendEmail('Server# ' + serverNumber + ' completed.'); 

        await counter(4); //reset all counters

        return //exit customer loop

    }

    await operations4(page, browser);

};

async function operations4(page, browser) {

    databaseCounter = await databaseCounter + 1; //counter used to detect what cycle program is in so database can be downloaded

    console.log(await "Database counter set to: " + databaseCounter)

    if (await databaseCounter == 5) { //at 10th cycle database is downloaded from firebase to ensure updated values

        await getDatabase();

        databaseCounter = await 0;

    };

    //await checkTimeWithinLimits(browser)

    await operations1(page, browser);

};



//---------------------------------------------------------------------------------------------------------

async function restartProgram(browser) { //this closes the browser and restarts the program

    try {

        await browser.close(); //close browser
      
    }
      catch(err) {

        console.log('Browser has not been opened. Close not required');

      }

    username = []; //reset all variables
    password = [];
    newUser = [];
    id = [];

    accounts = [];
    hashTags = [];

    programParameters = {};

    databaseCounter = 0;
    browser = {};
    page = {};

    startHour = 0;
    startMinute =  0;
    serverNumber = 0;

};

async function getDatabase() { //get database function which downloads database and populates variables to be used throughout the program

    let programInfo = await downloadDatabase(serverNumber);

        if (await programInfo[0].active==false) { //changed to if from while

            await writeServerComplete(serverNumber, schedule); //remove from daily schedule

            await sendEmail('Server# ' + serverNumber + ' is disabled. Removed from daily list');

            console.log('program disabled. Removing from daily list');

            await navigationDelay();

            getCurrentschedule = await checkSchedule(schedule);

            await navigationDelay();

            await restartProgram(browser);

        }

    //populate variables    
    username = await programInfo[1].username;
    password = await programInfo[1].password;
    newUser = await programInfo[1].newUser;
    id = await programInfo[1].id;


    accounts = await programInfo[1].accounts;
    hashTags = await programInfo[1].hashTags;

    programParameters = await programInfo[0];
        
    console.log(await "");
    console.log(await "");
    console.log(await "");
    console.log(await "Database for user: " + programInfo[1].username + " downloaded from server successfully.");
    console.log(await "");
    console.log(await "");

};

async function checkTimeWithinLimits(browser) {

    let now = new Date();
    let hours = now.getHours();

    if (!((hours >= startHour) && (hours <= (startHour + slotSizes - 1)))) { //"startHour + slotSizes - 1" used for proper timing

        console.log('Time limit reached. Restarting browser')

         await restartProgram(browser);

    }

    else {

        console.log('Time check complete. Within limits.')

    }


}    


