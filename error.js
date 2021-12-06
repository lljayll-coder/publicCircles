//this file is used to detect bad login information. Detects both wrong username and wrong password

module.exports = function() {

    this.detectUserExists = async function (page) {

        await page.waitForSelector('body > div');

        let exists = await page.evaluate(() => {

            let x = document.querySelectorAll('body > div')[0].innerText; 

            if (x.includes('Sorry, this page') == true) {return true} 

            else {return false}

        });

        return exists

    },

    this.detectBadLogin = async function (page) {

        let wrongPassword = await page.evaluate(() => {

            let x = document.querySelectorAll('body > div')[0].innerText; 

            if (x.includes('try again') == true || x.includes('password was incorrect') == true) {return true} 

            else {return false}

        });

        return wrongPassword

    };

};