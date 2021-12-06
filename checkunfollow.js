require('./delays.js')(); //add functions in delays file
require('./filewrite.js')(); //add file read and write functions
require('./navigate.js')(); //add navigate function which types in search bar


module.exports = function() {

    this.checkUnfollowed = async function (page, programParameters) {

        let file = await returnFollowed();

        let date = await Date.now(); //current date and time

        let loopCondition = await true; //condition allows for loop to exexute once each time instead of contuing. Done in order to not look like a bot

        for (let i= 0; i < await file.length && await loopCondition == true; i++) {

            let days = (date-file[i][0])/(24 * 60 * 60 * 1000); //convert JS time to number of days from todays date

            if (await days>programParameters.daysToUnfollow) {

                await removeFollow(file[i][1]); //remove user from from file
                await navigateToUnfollow(page, file[i][1], programParameters); //input username to unfollow navigation function
                loopCondition = await false;
                
            }

        }

    };

};