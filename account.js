//file contains functions to store user names for regular accounts and hastag photos

module.exports = function() {

    this.storeUsernameUsername = async function (page) {

        await page.waitForSelector('header > section > div'); //find username
        
        let name = await page.evaluate(() => {

            let usernameType1 = document.querySelectorAll('header > section > div')[0].innerText; //for hastag pictures

            return usernameType1;

        });

        let str = await name; //the following lines are required due to instagram changing the layout for some usernames. 

        let location = await str.indexOf('\n');

        let username = await str.substring(0, location);

        return await username

    },

    this.storeHastagUsername = async function (page) {

        await page.waitForSelector('header > div > div > div > span'); //find hashtag username

        let name = await page.evaluate(() => {

            let usernameType2 = document.querySelectorAll('header > div > div > div > span')[1].innerText; //for hastag pictures

            
            if (usernameType2 == '•') //added due to instagram layout change
                
                {
                    usernameType2 = document.querySelectorAll('header > div > div > div > span')[0].innerText; //for hastag pictures
                } 
            
            return usernameType2;

        });

        return await name
    };

};