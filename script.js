const showInscreen = document.getElementById('showInscreen'); //create a variable to show on my screen what happend on my game
class Spaceship { //class Spaceship 
  constructor(accuracy, firepower, hull) { //constructor with propreties accuracy, firepower,hull
    this.accuracy = .7;
    this.firepower = 5;
    this.hull = 20;
  }

  attack(target) { //function attack for the spaceship
    let accuracyShoot = Math.random();   //set accuracyShoot to random
    const logMessage = document.createElement('p'); // show the accuracy on my screen
    console.log(`The Accuracy is ${accuracyShoot}`); //check the accuracy on my terminal

    if (accuracyShoot < this.accuracy) { //if statement comparing random accuracyShoot and the accuracy set for the ship
      console.log(`It's a direct hit!`); 
      logMessage.textContent += 'Its a direct hit!';
      target.hull -= this.firepower; //each time alienShip get hit his hull decrease 
      if (target.hull < 0) { //if the hull is negative 
        target.hull = 0; //set it to zero to prevent negative value
      }
      console.log(`AlienShip has ${target.hull} life left.`); // log the remaining hull for the alienship
      logMessage.textContent += ` AlienShip has ${target.hull} life left.`; //append the hull status
      if (target.hull <= 0) { //check if the hull of alienship is zero or less mean is destroyed
        console.log(`Alien ship is destroyed. You win Round ${currentRound}!`); // log to my console that spaceship win and destroy alienship
        logMessage.textContent += `Alien ship is destroyed. You win Round ${currentRound}!`

        document.getElementById('ussaHull').textContent = ussShip.hull; // update the health of the spaceship in my page
        document.getElementById('alienHull').textContent = alienShip.hull; // update the health of the alienship in my page
      }
    } else {
      console.log(`You missed!`); //log that our attack was missed 
      logMessage.textContent += `You missed!`; //show in my page that I missed target
    }
    showInscreen.appendChild(logMessage); //append the message in console to my screen
  }
}

class AlienShip { //class Alienship
  constructor() { // with a constructor 
    this.hull = Math.floor(Math.random() * (6 - 3 + 1)) + 3; //set hull to random between 6 to 3 
    this.firepower = Math.floor(Math.random() * (4 - 2 + 1)) + 2; //set random firepower between 0.6 to 0.8 
    this.accuracy = Math.random() * (0.8 - 0.6) + 0.6; // set accuracy to random between .6 and .8
  }

  attack(target) { //the method attack or function attack called when alienship attack spaceship
    let accuracyShoot = Math.random(); // set a random value to the alienship attack
    const logMessage = document.createElement('p'); //create a variable to display our text on page
    console.log(`the Accuracy  ${accuracyShoot}`); // cosole the random accuracy of the alienship
    if (accuracyShoot < this.accuracy) { //
      console.log(`You have been hit by the AlienShip`); // follow the same logic we had in our attack function for spaceship
      logMessage.textContent += `You have been hit by the AlienShip`;
      target.hull = target.hull - this.firepower;
      if (target.hull < 0) { //if hull negative 
        target.hull = 0; // reset to 0 to prevent negative value
      }
      console.log(`USSship has ${target.hull} life left.`); 
      logMessage.textContent += ` USSship has ${target.hull} life left. `;
    } else {
      console.log(`You escaped the attack`);
      logMessage.textContent += `You escaped the attack`;
    }
    showInscreen.appendChild(logMessage); //append our game result to the page
  }
}

//===== function for randome value we will use for each round to give random propreties of each class
// will turn hull and accuracy randomly for each start of round 
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let currentRound = 1; // initiate the current round to 1
const maxRounds = 6; // fix the maximum round to 6
let ussShip; // variable to represente spaceship player
let alienShip; // variable to represente alienship player


//====== create function or method to start new  Round of the game ============== 
function startRound() {
  ussShip = new Spaceship(Math.random(), getRandomValue(2, 5), getRandomValue(3, 6)); //give random attribut to our spaceship and alienship
  alienShip = new AlienShip(Math.random(), getRandomValue(2, 5), getRandomValue(3, 6));
  console.log(`Round ${currentRound} begins!`);
  document.getElementById('ussaHull').textContent = ussShip.hull;
  document.getElementById('alienHull').textContent = alienShip.hull;
  document.getElementById('roundCounter').textContent = currentRound;
}

//============= create function for the end of the round ================
function endRound() { 
  if (ussShip.hull <= 0) { //If the player spaceship is destroyed update the webpage
    console.log(`USS Aship is destroyed. Aliens win Round ${currentRound}!`);
    document.getElementById('attackButton').disabled = true; //disable the attack button after our round finish
    document.getElementById('nextRoundButton').disabled = true; //disable the next round button because lost
    document.getElementById('restartButton').disabled = false; // enable the restart button to play the game again
  } else if (alienShip.hull <= 0) { //if alienship destroyed update the infor to screen
    console.log(`Alien ship is destroyed. You win Round ${currentRound}!`); // console the round winning and move to next 
    document.getElementById('attackButton').disabled = true; // disable button because we cannot attack again
    if (currentRound < maxRounds) { // if the maximum round is not reached enable next round button
      document.getElementById('nextRoundButton').disabled = false;
    }
    document.getElementById('restartButton').disabled = false; //enable the restart button
  }
}
startRound(); //invoke our method or call our startgame function  
     //add event listner to our attack button
    document.getElementById('attackButton').addEventListener('click', function () {
      showInscreen.innerHTML=''; //clear our screen or page
      if (ussShip.hull > 0 && alienShip.hull > 0) {// Check if both spaceships and alienship are still not damaged 
        ussShip.attack(alienShip); // Player spaceship attacks the alienship
        if (alienShip.hull > 0) { //check if the alienship is not completly damaged 
          alienShip.attack(ussShip); //alienship attack spaceship
        }
        document.getElementById('ussaHull').textContent = ussShip.hull; //update the hull for spaceship
        document.getElementById('alienHull').textContent = alienShip.hull;// update the hull for alienship
        endRound();
      }
    });

    document.getElementById('nextRoundButton').addEventListener('click', function () { //add event listner to our next round button
      showInscreen.innerHTML=''; //clear our screen or our webpage
      if (currentRound < maxRounds) { //if there more round to play
        currentRound++; //increment our round each we click next 
        startRound();
        // Enable the "Attack" button, disable the "Next Round" button, and disable the "Restart" button.
        document.getElementById('attackButton').disabled = false;
        document.getElementById('nextRoundButton').disabled = true;
        document.getElementById('restartButton').disabled = true;
      }
    });
    //add event listner to restart button 
    document.getElementById('restartButton').addEventListener('click', function () {
      showInscreen.innerHTML=''; //clear my screen or page
      currentRound = 1;
      startRound(); // invoke startround method once we click on restart button 
      // Enable the "Attack" button, disable the "Next Round" button, and disable the "Restart" button.
      document.getElementById('attackButton').disabled = false;
      document.getElementById('nextRoundButton').disabled = true;
      document.getElementById('restartButton').disabled = true;
    });


