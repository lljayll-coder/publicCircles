//file contains function to get followers

const instagramUrl = 'https://www.instagram.com/';

require('./delays.js')(); //add functions in delays file
require('./like.js')(); //add functions for liking photos
require('./filewrite.js')();
require('./followunfollow.js')();
require('./account.js')(); //add account storage functions
require('./detect.js')(); //add account storage functions



module.exports = function() {

    this.getFollowers = async function (page, programParameters) {

        await clickDelay(); //click delay 1-3 seconds

        await page.waitForSelector('main > div > header > section > ul > li > a'); //wait for followers selector

        let followersButton = (await page.$$('main > div > header > section > ul > li > a'))[0]; //assign followers link to button

        await followersButton.click(); //click followers

        await page.waitForSelector('div > div > div > div > span > a'); //wait for followers list selector

        //-----------------------------

        let userFollowers = await page.$$('div > div > div > div > span > a');

        try {
            for (i=0; i<10; i++) {

                await scrollDelay();
                
                console.log('Scrolling through followers...');
    
                await userFollowers[5*(i+1)].hover();
    
                await scrollDelay();
                
                userFollowers = await page.$$('div > div > div > div > span > a');
            }
          }
          catch(err) {
            console.log('Scrolling stopped. Continuing program');
          }

        

        //-----------------------------

         let account = await page.evaluate(() => { //used to choose random user that is displayed on screen

            let list = document.querySelectorAll('div > div > div > div > span > a');

            let max = list.length; 
            let min = 0;

            let randomNumber = Math.floor((Math.random() * (max - min) + min)); //generate random number to pick a user

            let name = list[randomNumber].innerText; //get user name string

            console.log('Choosing user: ' + randomNumber);

            return name;

        });
        
        
        
        await clickDelay(); //click delay 1-3 seconds
    
        await page.goto(`${instagramUrl}${account}`); //combine url and username and navigate to page

        await navigationDelay(page); //navigation delay

        let userCheck1 = await checkFollowed(account); //checking records 
        let userCheck2 = await checkLiked(account); //checking records 
        let detectPublicPrivate = await detectPhotosPrivate(page); //detect account type

        if (await userCheck1 == false && await userCheck2 == false) {
            
            let randomNumber = Math.floor((Math.random() * (programParameters.followRatio - 0) + 0)); //generate random number between 0-programParameter for random follow
            
            if (randomNumber==0) {
                
                if (detectPublicPrivate ==  'private' && programParameters.followPrivateAccounts == true) {
                await follow(page, programParameters); //follow user
                }
                else if (detectPublicPrivate != 'private' && programParameters.followPublicAccounts == true) {
                await follow(page, programParameters); //follow user
                }
                else {console.log("private or public follow parameters not met")}

            }

            else {console.log('Random follow false. Follow user skipped')}

            await likeAccountPhotos(page, programParameters); //call like photos function
            
            console.log('User has not been visited previously');

        }
      
        else {console.log('User has been visited previously');} 

    },

    this.navigateToTagUser = async function (page, programParameters, account) {

        await clickDelay(); //click delay 1-3 seconds
    
        await page.goto(`${instagramUrl}${account}`); //combine url and username and navigate to page

        await navigationDelay(page); //navigation delay

        let userCheck1 = await checkFollowed(account); //checking records 
        let userCheck2 = await checkLiked(account); //checking records 
        let detectPublicPrivate = await detectPhotosPrivate(page); //detect account type

        if (await userCheck1 == false && await userCheck2 == false) {
            
            let randomNumber = Math.floor((Math.random() * (programParameters.followRatio - 0) + 0)); //generate random number between 0-programParameter for random follow
            
            if (randomNumber==0) {
                
                if (detectPublicPrivate ==  'private' && programParameters.followPrivateAccounts == true) {
                await follow(page, programParameters); //follow user
                }
                else if (detectPublicPrivate != 'private' && programParameters.followPublicAccounts == true) {
                await follow(page, programParameters); //follow user
                }
                else {console.log("private or public follow parameters not met")}

            }

            else {console.log('Random follow false. Follow user skipped')}

            await likeAccountPhotos(page, programParameters); //call like photos function
            
            console.log('User has not been visited previously');

        }
      
        else {console.log('User has been visited previously');}

    };



};

