//file detects whether an account is private or public

module.exports = function() {

    this.detectPhotosPrivate = async function (page) {

        await page.waitForSelector('article > div > div');

        let type = await page.evaluate(() => {

            let x = document.querySelectorAll('article > div > div')[0].innerText; //for photos and private account

            return x;

        });

        if (await type == "") {
            console.log('Image(s) detected');
            return 'pics'
        }
        else if (await type == "No Posts Yet") {
            console.log('No images detected');
            return 'noPics'
        }
        else {
            console.log('Private account, images not visable');
            return 'private'}

    };

};