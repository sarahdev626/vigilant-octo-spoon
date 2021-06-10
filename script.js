///////////////////// Intersection Observers ////////////////////
//This is the increment of change as you scroll.
const numSteps = 20.0;

//Defining variables for the IO
let boxElement;
let textElement;
let prevRatio = 0.0;
let prevRatio2 = 0.0;
let increasingColor = "rgba(191,63,120, ratio)";
let decreasingColor = "rgba(219,248,174, ratio)";
let fontColor1 = "rgba(191,63,120, ratio)";
// let fontColor2 = "rgba(252,255,227, ratio)";

//This gets the process started
window.addEventListener("load", (event) => {
    boxElement = document.querySelector(".box");
    textElement = document.querySelector("p");
    createObserver();
    createObserver2();
}, false);

//This is how the observer is created.
//Create observer variable.
//Create the options, or "scenario"
//Root is what it needs to pass into for something to happen. If 
//left as "null", it will use the current viewport.
//Root margin adds a margin to that if you want. Not necessary, though. 
//Threshold is the increment from above.
//new IntersectionObserver creates the observer and uses handleIntersectColor/handleIntersectOpacity
//to do what you want when it's observed, and options to find it.
function createObserver() {
    let observer;

    let options = {
        root: null,
        rootMargin: "0px",
        threshold: buildThresholdList()
    };

    observer = new IntersectionObserver(handleIntersectColor, options);
    //By using querySelectorAll and looping through, you can change each one, each time!
    document.querySelectorAll(".wrapper .box").forEach(boxElement => {
        observer.observe(boxElement);
    });
}

function createObserver2() {
    let observer;

    let options = {
        root: null,
        rootMargin: "0px",
        threshold: buildThresholdList()
    };

    observer = new IntersectionObserver(handleIntersectOpacity, options);
    //By using querySelectorAll and looping through, you can change each one, each time!
    document.querySelectorAll(".wrapper .paragraph p").forEach(textElement => {
        observer.observe(textElement);
    });
}

//This function builds the array of different values between 0 and 1,
//which will be used to change the opacity of the box.
//As it loops the ratio will increase, and the color will get darker. 
function buildThresholdList() {
    let thresholds = [];
    let numSteps = 20;

    for (let i = 0; i <= numSteps; i++) {
        let ratio = i/numSteps;
        thresholds.push(ratio);
    }

    thresholds.push(0);
    return thresholds;
}

//This handleIntersectColor function will do something when the 
//element that is being observed appears or disappears from the
//root element, in this case change opacity and background color.
function handleIntersectColor(entries, observer) {
    entries.forEach((entry) => {
        if (entry.intersectionRatio > prevRatio) {
            entry.target.style.backgroundColor = increasingColor.replace("ratio", entry.intersectionRatio);
        } else {
            entry.target.style.backgroundColor = decreasingColor.replace("ratio", entry.intersectionRatio);
        }

        prevRatio = entry.intersectionRatio;

    });
}

function handleIntersectOpacity(entries, observer) {
    entries.forEach((entry) => {
        if (entry.intersectionRatio > prevRatio2) {
            entry.target.style.color = fontColor1.replace("ratio", entry.intersectionRatio);
        } 
        
        // else {
        //     entry.target.style.color = fontColor2.replace("ratio", entry.intersectionRatio);
        // }

        prevRatio2 = entry.intersectionRatio;

    });
}

////////////////// Pop Up Modal ////////////////////////////
//Get all the elements and put them into variables.
var modal = document.getElementById("modal");

var contact = document.getElementById("contact");

var closeBtn = document.getElementsByClassName("closeBtn")[0];

//Listen for click to open
contact.addEventListener('click', openPopUp);

//Listen for click to close
closeBtn.addEventListener('click', closePopUp);

//Listen for click outside content box
window.addEventListener('click', outsideBox);

function openPopUp() {
    modal.style.display = "block";
}

function closePopUp() {
    modal.style.display = "none";
}

function outsideBox(e) {
    if (e.target === modal) {
        modal.style.display = "none";
    }
}

////////////////// Counter Section ////////////////////////
//From MDN random number page
//Will return a random integer between the given values
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}


var currentDonations = 134312323;
var countdown = setInterval(function() {
    //This will increment the number up by a random integer value
    currentDonations = currentDonations + getRandomInt(1, 3);
    //Updates the number on the webpage.
    document.getElementById("number").innerHTML = currentDonations;

    //Keeps the number from going up into perpetuity...
    if(currentDonations === 134320000) {
        clearInterval(countdown);
    }
//This should update the number at a random interval.
//So instead of every second, every second, plus a random
//number from 1-5000.
}, 1000 + getRandomInt(1, 5000));



