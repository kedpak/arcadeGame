'use strict';
// Alert message for game instructions before game starts
alert('Get as many points in 60 seconds! Use arrow keys to move! Cross to water = +1 point; Gem = +1 Point; Bomb = -1 Point; Good Luck!');

//////////Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses  
    // a helper we've provided to easily load images
    
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
};     


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    
    if(this.x < 600){
        this.x += this.speed * dt;
    } else{
        this.randomSpeed();
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Randomizes the speed of each enemy bug
Enemy.prototype.randomSpeed = function(){
    function randomIntFromInterval(min,max)
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    }
    this.x = 1;
    this.speed = randomIntFromInterval(100,300);
    console.log("randomSpeed = "+ this.speed);
};




// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



//Player functions//////////////////

var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    
    
};
// Updates player related interactions when colliding with enemy, crossing to water, and collecting items.
Player.prototype.update = function(dt) {
    
    this.collision();
    this.crossed();
    this.gemCollect();
    this.bombHit();
};

// Function which handles player/enemy collision.
var collision = false;
Player.prototype.collision = function() {
        
        for(var i = 0; i < allEnemies.length; i++) {
        var playerChar = {x: this.x, y: this.y, width:40, height:60};
        var enemyChar = {x: allEnemies[i].x, y: allEnemies[i].y, width:50, height:60};
        if(playerChar.x < enemyChar.x + enemyChar.width &&
            playerChar.x + playerChar.width > enemyChar.x &&
            playerChar.y < enemyChar.y + enemyChar.height &&
            playerChar.height + playerChar.y > enemyChar.y) {

            this.playerReset();
            collision = true;
           
            }
       }
};

// Reset function for when player collides with an enemy.
var reset = false;
Player.prototype.playerReset = function(){
            this.x = 255;
            this.y = 450;
            
};

// Function to reset bomb location when player crosses to river, and resets player location.
Player.prototype.crossed = function() {
    if(this.y < 20) {
        this.playerReset();
        reset = true;
        moveBomb = true;
        }
};

// Renders the player sprite onto the game screen. 
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 80,130);
     
    }; 
    
// Implements keyboard controls into the game. 
Player.prototype.handleInput = function(keys) {
    
    var movement = 50;
    switch(keys){
        case 'up':
            this.y -= movement;
            console.log("Pressed up key");
            break;
        case 'down':
            this.y += movement;
            console.log("Pressed down key");
            break;
        case 'left':
            this.x -= movement;
            console.log("Pressed left key");
            break;
        case 'right':
            this.x += movement;
            console.log("Pressed Right key");
            break;
    }
    if (this.x < 0) {
        this.x = 0;
    }
    else if (this.x > 520) {
        this.x = 520;
    }
    else if (this.y < 0) {
        this.y =0;
    }
    else if (this.y > 500) {
        this.y = 500;
    }
    
};

// Function for collision detection between player and gem item.
Player.prototype.gemCollect = function() {
        var playerChar = {x: this.x, y: this.y, width:60, height:60};
        var gems = {x: gem.x, y: gem.y, width:60, height:60};

    if(playerChar.x < gems.x + gems.width &&
            playerChar.x + playerChar.width > gems.x &&
            playerChar.y < gems.y + gems.height &&
            playerChar.height + playerChar.y > gems.y) {

            console.log('gem collected');
            gem.x = Math.round(Math.random() * 560) + 1;
            gem.y = Math.round(Math.random() * 360) + 70;
            reset = true;
            
        }
    };

// Function for collision detection between player and bomb item.
var moveBomb = false;
Player.prototype.bombHit = function() {
        
    for(var i = 0; i < allBombs.length; i++) {
        var playerChar = {x: this.x, y: this.y, width:60, height:50};
        var bombs = {x: allBombs[i].x, y: allBombs[i].y, width:32, height:32};


    if(playerChar.x < bombs.x + bombs.width &&
            playerChar.x + playerChar.width > bombs.x &&
            playerChar.y < bombs.y + bombs.height &&
            playerChar.height + playerChar.y > bombs.y) {

            console.log('gem collected');
            allBombs[i].x = Math.round(Math.random() * 560) + 1;
            allBombs[i].y = Math.round(Math.random() * 360) + 70;
            start -= 1;
            moveBomb = false;
        }
    }
};


// Functions render the lifes hearts onto game screen and initiates heart loss mechanics.

var LifeHearts = function(a,b) {
    this.lifeHearts = 'images/Heart.png';
    this.a = a;
    this.b = b;
};

LifeHearts.prototype.render = function() {
    ctx.drawImage(Resources.get(this.lifeHearts),this.a,this.b,64,100);
};

LifeHearts.prototype.lifeLoss = function() {
    if(collision === true && hearts.length > 0) {
        hearts.pop(0);
        collision = false;
    }
    
};

LifeHearts.prototype.update = function() {
    this.lifeLoss();
    this.gameOver();
};




// Initiates game over alert when heart hits 0 OR time clock hits 0
LifeHearts.prototype.gameOver = function() {
    if(hearts.length < 1 || sec === 0) {
        alert("Game over! Your score was " + start + "!! Click OK to try again!!");
        location.reload();
    }
};


// Functions that render player's score and updates accordingly.
var Score = function(x,y) {
    this.x = x;
    this.y = y;
};

var winPoint = false;
var timePoint = false;

Score.prototype.update = function() {
    this.points();
};

Score.prototype.points = function() {
    if(reset === true) {
         winPoint = true;
         timePoint = true;

    }
};

// Renders the scoreboard onto the games screen.

var start = 0;
var timePoint = false;
Score.prototype.render = function(){
    
    ctx.font = "50px Ariel";
    ctx.fillStyle = "black";
    ctx.fillText(start, this.x, this.y); 
    if(winPoint === true) {
        
        start ++;
        winPoint = false;
        reset = false;
        
    }
};



// Functions render gem item and updates their activity accordingly.
var Gem = function(x,y) {
    this.sprite = "images/Gem Blue.png";
    this.x = x;
    this.y = y;

};

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y,60,100);
    
};


var randomGemX = function() {
    return Math.round(Math.random() * 560) + 1;
};

var randomGemY = function() {
    return Math.round(Math.random() * 360) + 70;
};


// Functions render bomb items and updates their activity accordingly.
var Bomb = function(x,y) {
    this.sprite = "images/bomb.png";
    this.x = x;
    this.y = y;
};

Bomb.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y,70,70);
};

Bomb.prototype.moveBomb = function() {
    
    if (moveBomb === true) {
        bomb.x = Math.round(Math.random() * 560) + 1;
        bomb.y = Math.round(Math.random() * 360) + 100;
        bomb2.x = Math.round(Math.random() * 560) + 1;
        bomb2.y = Math.round(Math.random() * 360) + 100;
        bomb3.x = Math.round(Math.random() * 560) + 1;
        bomb3.y = Math.round(Math.random() * 360) + 100;
        moveBomb = false;
    }

};

Bomb.prototype.update = function() {
    this.moveBomb();
};



// Function renders timer text onto the game screen.
var TimerText = function(x,y) {
    this.x = x;
    this.y = y;
};

var sec = 60;
TimerText.prototype.render = function() { 
   

    ctx.font = "50px Ariel";
    ctx.fillStyle = "yellow";
    ctx.fillText(sec, this.x, this.y);

    
};

// Sets up a countdown function to give game a time limit. 
var timer = function(){
    sec--;};
    
    var countDown = function(){
        var timeDown = setInterval(timer,1000);
        setInterval(timer,1000);
        clearInterval(timeDown);
    };

countDown();






// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
 var enemy = new Enemy(0,70);
 var enemy2 = new Enemy(0,160);
 var enemy3 = new Enemy(0,255);
 var enemy4 = new Enemy(0,340);
 //enemy4 = new Enemy();
 //enemy5 = new Enemy();
 var heart1 = new LifeHearts(20,550);
 var heart2 = new LifeHearts(80,550);
 var heart3 = new LifeHearts(140,550);
 

 var bomb = new Bomb(randomGemX(),randomGemY());
 var bomb2 = new Bomb(randomGemX(),randomGemY());
 var bomb3 = new Bomb(randomGemX(),randomGemY());

 var allEnemies = [enemy,enemy2,enemy3,enemy4];
 var player = new Player(255,460);
 var hearts = [heart1,heart2,heart3];
 var score = new Score(520,600);
 var gem = new Gem(randomGemX(),randomGemY());
 var allBombs = [bomb,bomb2,bomb3];
 var timerText = new TimerText(520,120);
 


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
}); 

