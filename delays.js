//file contains all time delays meant to simulate a human user

module.exports = function() {

    this.clickDelay = async function () {

        //generate random number between 1 and 3 seconds
        let max = 2977;
        let min = 998;

        //return Math.random() * (max - min) + min;

        let random = Math.random() * (max - min) + min; 

        let final = Math.round(random); //round delay so it is easily readable

        console.log('Click delay for: ' + final/1000 + ' seconds.'); //display delay on screen

        await new Promise(resolve => setTimeout(resolve, random));

    },

    this.scrollDelay = async function () {

        //generate random number between 1 and 3 seconds
        let max = 1700;
        let min = 1600;

        //return Math.random() * (max - min) + min;

        let random = Math.random() * (max - min) + min; 

        let final = Math.round(random); //round delay so it is easily readable

        await new Promise(resolve => setTimeout(resolve, random));

    },

    this.likeDelay = async function () {

        //generate random number between 1 and 3 seconds
        let max = 4954;
        let min = 1967;

        //return Math.random() * (max - min) + min;

        let random = Math.random() * (max - min) + min; 

        let final = Math.round(random); //round delay so it is easily readable

        console.log('Like delay for: ' + final/1000 + ' seconds.'); //display delay on screen

        await new Promise(resolve => setTimeout(resolve, random));

    },

    this.navigationDelay = async function () {

        //generate random number between 1 and 3 seconds
        let max = 5954;
        let min = 1967;

        //return Math.random() * (max - min) + min;

        let random = Math.random() * (max - min) + min; 

        let final = Math.round(random); //round delay so it is easily readable

        console.log('Navigation delay for: ' + final/1000 + ' seconds.'); //display delay on screen

        await new Promise(resolve => setTimeout(resolve, random));

    },

    this.loginDelay = async function () {

        //generate random number between 1 and 3 seconds
        let max = 9000;
        let min = 10000;

        //return Math.random() * (max - min) + min;

        let random = Math.random() * (max - min) + min; 

        let final = Math.round(random); //round delay so it is easily readable

        console.log('Login delay for: ' + final/1000 + ' seconds.'); //display delay on screen

        await new Promise(resolve => setTimeout(resolve, random));

    },

    this.startDelay = async function () {

        //generate random number between 1 and 3 seconds
        let max = 300560;
        let min = 60194;

        //return Math.random() * (max - min) + min;

        let random = Math.random() * (max - min) + min; 

        let final = Math.round(random); //round delay so it is easily readable

        console.log('Start delay for: ' + final/1000 + ' seconds.'); //display delay on screen

        await new Promise(resolve => setTimeout(resolve, random));

    },

    this.dailyTimer = async function (startHour, startMinute, slotSizes) {
        
        let timerCondition = false;
    
        do {
        
             let now = new Date();
             let hours = now.getHours();
             let minutes = now.getMinutes();
             
        
             if ((hours >= startHour) && (hours <= (startHour + slotSizes - 1))) { //"startHour + slotSizes - 1" used for proper timing
        
                  timerCondition = await true
        
             }
        
             await new Promise(resolve => setTimeout(resolve, 5000));
        
             console.log('Current time: ' + hours + ":" + minutes + ', Start time: ' + startHour + ":" + startMinute);
        
        } while (timerCondition == false);
    
            //await startDelay();
        
             console.log('Program starting...');

    },

    this.followDelay = async function () {

        //generate random number between 1 and 3 seconds
        let max = 15954;
        let min = 3967;

        //return Math.random() * (max - min) + min;

        let random = Math.random() * (max - min) + min; 

        let final = Math.round(random); //round delay so it is easily readable

        console.log('Follow delay for: ' + final/1000 + ' seconds.'); //display delay on screen

        await new Promise(resolve => setTimeout(resolve, random));

    };

};

