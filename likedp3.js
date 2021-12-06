//file contains liked.js function. Liked.js was split to make code more easily readable. Final part 3 of 3.

require('./filewrite.js')(); 

module.exports = function() {

    this.likeImage = async function (page, images, programParameters, randomNumber1) {

        let numberOfLikes = await returnLikes(); //calls function that checks total number of liked for the day

        let imageClick1 = await images[randomNumber1];

        await clickDelay(); //click delay 1-3 seconds

        await console.log('Like image: ' + randomNumber1);
    
        await imageClick1.click(); //click image

        await navigationDelay(); //navigation delay 3-10 seconds
        
        //-------------------------------------------------------------------------

        await page.waitForSelector('section > span > button > div > span');

        let type = await page.evaluate(() => {

            let x = document.querySelectorAll('section > span > button > div > span')[0].innerHTML; 

            let value = x.includes('Unlike');

            return value;

        });

        //-------------------------------------------------------------------------

        if (await numberOfLikes<programParameters.maxLikesPerDay && await type == false) {

            await page.waitForSelector('section > span > button')[0]; //wait for like button
    
            let isLikable = (await page.$$('section > span > button'))[0]; 
        
            await isLikable.click(); //click like button
                      
            let user = await storeUsernameUsername(page); //get username --old storeHastagUsername(page);

            await counter(3); //add to like counter

            await writeLiked(user); //write username to file
        
        }

        else {console.log('Max likes per day reached or previously liked')}



    },

    this.closeWindow = async function (page) {

        await clickDelay(); //click delay 1-3 seconds

        await page.waitForSelector('[aria-label="Close"]')[0]; //wait for close button

        let close = (await page.$$('[aria-label="Close"]'))[0]; //assign close button

        await clickDelay(); //click delay 1-3 seconds

        await close.click(); //close window
    };

};



