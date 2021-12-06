/*

File contains follow functions for user accounts and navigated hastags. File also contains unfollow function.

*/

require('./delays.js')(); //add functions in delays file
require('./filewrite.js')(); 

module.exports = function() {

    this.follow = async function (page, programParameters) {

        let followCounter = await returnFollows(); //get follow counter

        await page.waitForSelector('header > section > div > div > div button'); //wait for first image of most recent

        let button = (await page.$$('header > section > div > div > div button'))[0]; 

        let type = await page.evaluate(() => {

            let x = document.querySelectorAll('header > section > div > div > div button')[0].innerText; //for photos and private account

            return x;

        });

        if (type == 'Follow' && followCounter < programParameters.maxFollowsPerDay) {

            let username = await storeUsernameUsername(page);

            await writeFollowed(username);
            
            await followDelay();
            await button.click();
            await counter(1); //add to follow counter
            console.log('Random follow. Following user');

        }

        else if (followCounter == programParameters.maxFollowsPerDay) {

            console.log('Max follows per day reached')

        }

        else {console.log('Follow request already sent or already following')}
    
    },

    this.followTag = async function (page, username, programParameters) {

        let followCounter = await returnFollows(); //get follow counter

        await page.waitForSelector('header > div > div > div button'); //wait for first image of most recent

        let button = (await page.$$('header > div > div > div button'))[0]; 

        let type = await page.evaluate(() => {

            let x = document.querySelectorAll('header > div > div > div button')[0].innerText; //for photos and private account

            return x;

        });

        if (type == 'Follow' && followCounter < programParameters.maxFollowsPerDay) {
            
            await followDelay();
            await button.click();

            let username = await storeHastagUsername(page);

            await writeFollowed(username);
            
            await counter(1); //add to follow counter
            console.log('Random tag follow. Following user');

        }
        
        else if (followCounter == programParameters.maxFollowsPerDay) {

            console.log('Max follows per day reached')

        }

        else {console.log('Follow tag request already sent or already following')}

        
    
    },


    this.unfollow = async function (page) {

        await page.waitForSelector('header > section > div > div > div > div button'); //wait for unfollow/follow/requested button

        let button = (await page.$$('header > section > div > div > div > div button'))[0]; 

        let type = await page.evaluate(() => {

            let x = document.querySelectorAll('header > section > div > div > div > div button')[0].innerText; //for unfollow type

            return x;

        });

        if (await type == 'Follow') {

            console.log('User was not followed previously')

        }

        else if (await type == 'Requested') {

            await clickDelay(); //delay before click

            await button.click();

            await page.waitForSelector('div > div > div > div > div button');

            let final = (await page.$x("//button[text()='Unfollow']"))[0]; 

            await clickDelay(); //delay before click

            await final.click();   

            await counter(1); //add to follow counter

        }

        else if (await type == 'Message') {

            let unfollowButton = (await page.$$('header > section > div > div > div > div button'))[1]; 
            
            await clickDelay(); //delay before click

            await unfollowButton.click();

            await page.waitForSelector('div > div > div > div > div button');
    
            let final = (await page.$x("//button[text()='Unfollow']"))[0]; 

            await clickDelay(); //delay before click

            await final.click();

            await counter(1); //add to follow counter

        } 

        else {console.log('Error in unfollow function')}



    };


};