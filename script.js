//hint: spaceship is human ship or player one
//alienship is the enemy or player 2

//create a global variable to show on my screen what happend on my game
const showInscreen = document.getElementById("showInscreen");

//class Spaceship===============================
class Spaceship {
  constructor() {
    this.accuracy = 0.7;
    this.firepower = 5;
    this.hull = 20;
  }

  //function attack for the spaceship when he attack the alienship ================
  attack(target) {
    let accuracyShoot = Math.random(); // create a variable accuracyShoot and set it randmoly
    const logMessage = document.createElement("p"); // create a variable that let us to create a strings in our html and display them
    console.log(`The Accuracy is ${accuracyShoot}`); //consolelog the random accuracy in my console

    if (Math.random() < this.accuracy) {
      // statement if the accuracyshoot less than the set accuracy Alienship will be hit
      console.log(`It's a direct hit!`);
      logMessage.textContent += "Its a direct hit!  "; // display on my screen that alienship got hit
      target.hull -= this.firepower; // whatever Alienship got hit the hull decrease
      if (target.hull < 0) {
        //statement if the target hull negative we bring it to zero to prevent negative value
        target.hull = 0;
      }
      console.log(`AlienShip has ${target.hull} life left.`); //check the hull alienship on my console
      logMessage.textContent += ` AlienShip has ${target.hull} life left.`; // display the hull left on my screen
      if (target.hull <= 0) {
        // statement if there is no hull left mean the alienship is destroyed
        console.log(`Alien ship is destroyed. You win Round ${currentRound}!`); //show on my console that alienship destroyed
        logMessage.textContent += `Alien ship is destroyed. You win Round ${currentRound}!`; //show on my screen alienship distroyed
        triggerExplosion();
        //hint currentRound declared in the bottom to display the round playing

        document.getElementById("ussaHull").textContent = ussShip.hull; //access to the ussShip shield
        document.getElementById("alienHull").textContent =
          currentAlienShip.hull; // access to alienship shield
      }
    } else {
      // statement that accuracyShoot is higher than the accuracy set mean we missed target
      console.log(`You missed!`); // consolelog on my console that we missed the target
      logMessage.textContent += `You missed! your attack`;
    }
    showInscreen.appendChild(logMessage);
  }
}

//class Alienship ========================================

class AlienShip {
  constructor() {
    //alienship propreties set to random using math floor and between certain variable that was given
    this.hull = Math.floor(Math.random() * (6 - 3 + 1)) + 3;
    this.firepower = Math.floor(Math.random() * (4 - 2 + 1)) + 2;
    this.accuracy = Math.random() * (0.8 - 0.6) + 0.6;
  }

  //function attack alienship to spaceship ================

  attack(target) {
    //function attack
    let accuracyShoot = Math.random(); // set accuracyshoot to random to do the comparison with alienship accuracy
    const logMessage = document.createElement("p"); // creat p element to to show the console messages on my screen
    console.log(`the Accuracy  ${accuracyShoot}`); // conolelog the accuracyshoot
    if (Math.random() < this.accuracy) {
      // the same logic with attack target for spaceship, just in opposite side
      // now when the alienship attack the spaceship
      console.log(`You have been hit by the AlienShip`);
      logMessage.textContent += `You have been hit by the AlienShip`;
      target.hull = target.hull - this.firepower;
      if (target.hull < 0) {
        target.hull = 0;
      }
      console.log(`USSship has ${target.hull} life left.`);
      logMessage.textContent += ` USSship has ${target.hull} life left. `;
      if (target.hull <= 0) {
        console.log("spaceship is destoyed, you loose !!!!!");
        logMessage.textContent += "Game Over you lost";
        triggerExplosion();
      }
    } else {
      console.log(`You escaped the attack`);
      logMessage.textContent += `You escaped the attack`;
    }
    showInscreen.appendChild(logMessage); // use appendChild on my variable logMessgae to my screen not just a console
  }
}

//create function getRandom value to have a random values of each proprietes for the alienships
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const alienShips = []; //set an array to save each alienships on it with random values
for (let i = 0; i < 6; i++) {
  alienShips.push(new AlienShip());
  //access the alien ships from the alienShips array for each round.
}

const alienShipImages = [
  //set each alineship different shape and look for each alien
  "images/alienShip1.png",
  "images/alienShip2.png",
  "images/alienShip3.png",
  "images/alienShip4.png",
  "images/alienShip5.png",
  "images/alienShip6.png",
];

let currentRound = 1; //set to start from roud one
const maxRounds = 6; // set maximum rounds to 6
let ussShip;
let currentAlienShip; // to acces to our array for each alienship

// Function to load the alien ship image for the current round
function loadAlienShipImage() {
  const alienImage = document.getElementById("alienShipImage");
  alienImage.src = alienShipImages[currentRound - 1];
}

//function when we start a round
function startRound() {
  ussShip = new Spaceship();
  currentAlienShip = alienShips[currentRound - 1]; // because index start from 0 and round from one if
  // we have round 2 mean the index of Currentalienship [1] and is alienship number 2

  loadAlienShipImage(); // Load the alien ship image for the current round

  console.log(`Round ${currentRound} begins!`);
  document.getElementById("ussaHull").textContent = ussShip.hull; //access to spaceship hull
  document.getElementById("alienHull").textContent = currentAlienShip.hull; //access to current alienship hull
  document.getElementById("roundCounter").textContent = currentRound; // access to the current round
}

//function for the end of the round is more about the role of my buttons

function endRound() {
  if (ussShip.hull <= 0) {
    // if the spaceship hull less or zero mean is destoreyed
    // that mean my attack and next round button are disabled because I lost. I only can restart the game
    console.log(
      `USS A-Ship is destroyed. Aliens win Round ${currentRound}! Game Over`
    );
    document.getElementById("attackButton").disabled = true;
    document.getElementById("nextRoundButton").disabled = true;
    document.getElementById("restartButton").disabled = false;
  } else if (currentAlienShip.hull <= 0) {
    document.getElementById("attackButton").disabled = true;
    // that mean alienship is destroyed already and i don't need to attack, i have to go to next round

    if (currentRound < maxRounds) {
      //statement to check if I am not in the last round to disable next round button
      document.getElementById("nextRoundButton").disabled = false;
    }
    document.getElementById("restartButton").disabled = false;
    document.getElementById("retreatButton").disabled = false;
  }
}

startRound(); // invoke function start round for my Attack button and the fontionality of the attack buttom

document.getElementById("attackButton").addEventListener("click", function () {
  showInscreen.innerHTML = ""; //once I click attack, my screen will remove precedent text
  if (ussShip.hull > 0 && currentAlienShip.hull > 0) {
    // statement that both they can attack each other
    ussShip.attack(currentAlienShip); // always spaceshup attack first
    if (currentAlienShip.hull > 0) {
      // statement if the Alienship not destroyed by the first attack that cane attack back
      currentAlienShip.attack(ussShip);
    }
    document.getElementById("ussaHull").textContent = ussShip.hull; // update the health for each ship
    document.getElementById("alienHull").textContent = currentAlienShip.hull;
    endRound(); // invoke the function endround
  }
});

// the foncionality of the next button when we can click it and when is disabled

document
  .getElementById("nextRoundButton")
  .addEventListener("click", function () {
    showInscreen.innerHTML = ""; // once we click next round will erase the precedent round text
    if (currentRound < maxRounds) {
      currentRound++;
      startRound();
      document.getElementById("attackButton").disabled = false;
      document.getElementById("nextRoundButton").disabled = true; // we cannot access to next round if we don't win in the first round
      document.getElementById("restartButton").disabled = true;
      document.getElementById("retreatButton").disabled = true;
    }
  });

// the fonctionality of the restart button and when we can click it

document.getElementById("restartButton").addEventListener("click", function () {
  showInscreen.innerHTML = ""; // once we click restart will clean all the previous text
  currentRound = 1;
  startRound();
  document.getElementById("attackButton").disabled = false;
  document.getElementById("nextRoundButton").disabled = true;
  document.getElementById("retreatButton").disabled = true;
  document.getElementById("restartButton").disabled = true; //restart button is unbaled when we loose or we go over all the rounds exist
});

//functionality of retreat button

const exitScreen = document.getElementById("exitScreen");
exitScreen.style.display = "none"; // i added it because I had issue that prompt screen show up in the start 
// of the game it will only show when retreat is clicked 



// addeventlistner for my retreat button if we want to exit or no with yes and no buttons 
document.getElementById("retreatButton").addEventListener("click", function () {
  const exitScreen = document.getElementById("exitScreen");
  exitScreen.style.display = "block";

  document
    .getElementById("confirmYesButton")
    .addEventListener("click", function () {
      console.log("You chose to exit the game");
      showInscreen.innerHTML = "<p>Game Over</p>";
      exitScreen.style.display = "none";
      window.close();
    });

  document
    .getElementById("confirmNoButton")
    .addEventListener("click", function () {
      console.log("You chose to keep playing");
      exitScreen.style.display = "none";
    });
});

// function my move is laser shooting once we click in attack button
// I took it from w3school and put some modification on it

function myMove1() {
  let id = null;
  const elem = document.querySelector(".lasershoot1");
  let pos = 0;
  clearInterval(id);
  id = setInterval(frame, 3);
  function frame() {
    if (pos == window.innerWidth / 1) {
      clearInterval(id);
    } else {
      pos++;
      elem.style.left = pos + "px";
      // Update only the horizontal position
    }
  }
}
const attackButton1 = document.getElementById("attackButton");
attackButton1.addEventListener("click", myMove1);

// function my move is laser shooting once we click in attack button
// first one mymove1 shoot last from left to right and mymove 2 shoot laser from right to left
function myMove2() {
  let id = null;
  const elem = document.querySelector(".lasershoot2");
  let pos = window.innerWidth; // Set the initial position to the right edge
  clearInterval(id);
  id = setInterval(frame, 3);
  function frame() {
    if (pos == 0) {
      clearInterval(id);
    } else {
      pos--;
      elem.style.left = pos + "px";
    }
  }
}
const attackButton2 = document.getElementById("attackButton"); // both trigged when I click attack button
// i call it atackButton2 for not confused with the first variable in mymove1
attackButton2.addEventListener("click", myMove2);


function triggerExplosion(target) {
  const alienShipImage = document.getElementById('alienShipImage'); 

  // Apply the explosion animation to the alien ship image
  alienShipImage.style.animation = 'explode 3s ease-in-out';
  alienShipImage.style.animationFillMode = 'forwards';

  // Delay removal of the explosion effect and reset the animation
  setTimeout(function () {
    alienShipImage.style.animation = '';
    alienShipImage.style.animationFillMode = '';
  }, 2000); // 
}


