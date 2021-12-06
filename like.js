//file contains function to like images in both tags and user names. Part 1 of 3.

require('./account.js')(); //add account storage functions
require('./filewrite.js')(); //add file writing to save usernames
require('./likedp2.js')(); //add additional like functions

module.exports = function() {

    this.likeTagPhotos = async function (page, programParameters) {

        try {

        await page.waitForSelector('article > div:nth-child(3) img[crossorigin="anonymous"]'); //wait for first image of most recent

        let images = await page.$$('article > div:nth-child(3) img[crossorigin="anonymous"]'); //look for image array of most recent
  
        await likeOneOrTwoHastag(page, images, programParameters); //Like one or two images
        
        }

        catch(err) {
            console.log('Hastag not valid for use')
        }
    },

    this.likeAccountPhotos = async function (page, programParameters) {

        await page.waitForSelector('article > div > div'); //wait for first image of most recent //img removed for private accounts

        let accountType = await detectPhotosPrivate(page); //detects if account is private and has photos

        if (await accountType == 'pics') { //condition specifies that there are at least one image to like

            let images = await page.$$('article > div > div img'); //look for image array of most recent

            await likeOneOrTwoAccount(page, images, programParameters); //like one or two account photos

        }
        
    };

};