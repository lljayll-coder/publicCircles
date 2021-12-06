//file contains liked.js function. Liked.js was split to make code more easily readable. Part 2 of 3.

require('./filewrite.js')(); 
require('./likedp3.js')(); 

module.exports = function() {

    this.likeOneOrTwoHastag = async function (page, images, programParameters) {
              
        await navigationDelay(); //navigation delay 3-10 seconds

        await clickDelay(); //click delay 1-3 seconds

        let randomNumberLikePhotos = await twoRandomNumbers(images.length); //generate two random numbers in an array [x,x]

        let imageClick1 = await images[randomNumberLikePhotos[0]];

        await clickDelay(); //click delay 1-3 seconds
        
        await console.log('Click hastag image: ' + randomNumberLikePhotos[0]);
    
        await imageClick1.click(); //click image

        await navigationDelay(); //navigation delay 3-10 seconds

        let userName = await storeHastagUsername(page); //await storeHastagUsername(page) -- previous

        await navigateToTagUser(page, programParameters, userName);

    },

    this.likeOneOrTwoAccount = async function (page, images, programParameters) {

        if (await images.length == 1) {

            await navigationDelay(); //navigation delay 3-10 seconds

            await clickDelay(); //click delay 1-3 seconds

            await likeImage(page, images, programParameters, 0); //like single image 0       

            //await addComment(page);

            await closeWindow(page);

        }

        else {

            await navigationDelay(); //navigation delay 3-10 seconds

            await clickDelay(); //click delay 1-3 seconds

            let randomNumberLikePhotos = await twoRandomNumbers(images.length); //generate two random numbers in an array [x,x]

            await likeImage(page, images, programParameters, randomNumberLikePhotos[0]);       

            //await addComment(page);

            await closeWindow(page);


        //---------------------------Like more than one image-------------------------------

        let randomNumberLikeTwo = Math.floor((Math.random() * (3 - 0) + 0)); //generate random number between 0-2 choose one or two images 

        if (randomNumberLikeTwo==2) { //if statment ensures two images are only liked 1/3 of the time. 2/3 of the time a single image will be liked

            await page.waitForSelector('article > div > div img'); //wait for first image of most recent //img removed for private accounts

            await likeImage(page, images, programParameters, randomNumberLikePhotos[1]);        

            //await addComment(page);

            await closeWindow(page);

        }

        }

    
    };

};

//-------------------------------------------------------------------------------------------------------------------

function twoRandomNumbers(length) {

    let randomNumber1 = 0;
    let randomNumber2 = 0;

        const max = length; //only choose from 8 photos
        const min = 0;

        do {

            randomNumber1 = Math.floor((Math.random() * (max - min) + min)); //generate random number to pick a image
            randomNumber2 = Math.floor((Math.random() * (max - min) + min)); //generate random number to pick second image
        
        }
        while (randomNumber1 == randomNumber2);

        return [randomNumber1, randomNumber2]

}