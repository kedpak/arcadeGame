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

Player.prototype.update = function(dt) {
    
    
    this.collision();
    this.crossed();
    this.gemCollect();
    this.bombHit();


    
};

var collision = false;
Player.prototype.collision = function() {
        
        for(i = 0; i < allEnemies.length; i++) {
        var playerChar = {x: this.x, y: this.y, width:40, height:70};
        var enemyChar = {x: allEnemies[i].x, y: allEnemies[i].y, width:50, height:60};
        if(playerChar.x < enemyChar.x + enemyChar.width &&
            playerChar.x + playerChar.width > enemyChar.x &&
            playerChar.y < enemyChar.y + enemyChar.height &&
            playerChar.height + playerChar.y > enemyChar.y) {

            console.log('collision');
            this.playerReset()
            collision = true;
           
            }

        }
      
};
var reset = false;
Player.prototype.playerReset = function(){
            this.x = 255;
            this.y = 450;
            
};

Player.prototype.crossed = function() {
    if(this.y < 20) {
        this.playerReset()
        reset = true;
        moveBomb = true;
        }
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 80,130);
     
    }; 
    

Player.prototype.handleInput = function(keys) {
    switch(keys){
        case 'up':
            this.y -= 50;
            console.log("Pressed up key")
            break
        case 'down':
            this.y += 50;
            console.log("Pressed down key")
            break
        case 'left':
            this.x -= 50;
            console.log("Pressed left key")
            break
        case 'right':
            this.x += 50;
            console.log("Pressed Right key")
            break
    }; 
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
    };
    
};

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
var moveBomb = false;
Player.prototype.bombHit = function() {
        
    for(i = 0; i < allBombs.length; i++) {
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
        };
    }
}




var LifeHearts = function(a,b) {
    this.lifeHearts = 'images/Heart.png';
    this.a = a;
    this.b = b;
};

LifeHearts.prototype.render = function() {
    ctx.drawImage(Resources.get(this.lifeHearts),this.a,this.b,64,100)
};

LifeHearts.prototype.lifeLoss = function() {
    if(collision == true && hearts.length > 0) {
        hearts.pop(0);
        console.log("heartloss") 

        collision = false;
    }
    
};

LifeHearts.prototype.update = function() {
    this.lifeLoss();
    this.gameOver();
};

LifeHearts.prototype.gameOver = function() {
    if(hearts.length < 1) {
        alert("Game over! Your score was " + start + "!! Click OK to try again!!");
        location.reload();
    }
};

var Score = function(x,y) {
    this.x = x;
    this.y = y;
};

var winPoint = false;


Score.prototype.update = function() {
    this.points();
};

Score.prototype.points = function() {
    if(reset == true) {
        winPoint = true;

    }
};


var start = 0
Score.prototype.render = function(){
    
    ctx.font = "50px Ariel";
    ctx.fillStyle = "black";
    ctx.fillText(start, this.x, this.y); 
    if(winPoint == true) {
        
        start ++;
        gemBlue = false;
        winPoint = false;
        reset = false;
        console.log("point up");
        
    };


};

var Gem = function(x,y) {
    this.sprite = "images/Gem Blue.png";
    this.x = x;
    this.y = y;

};

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y,60,100)
    

};

Gem.prototype.update = function(){
   
};

randomGemX = function() {
    return Math.round(Math.random() * 560) + 1;
};

randomGemY = function() {
    return Math.round(Math.random() * 360) + 70;
};

var Bomb = function(x,y) {
    this.sprite = "images/bomb.png";
    this.x = x;
    this.y = y;
};

Bomb.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y,70,70)
};

Bomb.prototype.moveBomb = function() {
    
    if (moveBomb == true) {
        bomb.x = Math.round(Math.random() * 560) + 1;
        bomb.y = Math.round(Math.random() * 360) + 90;
        bomb2.x = Math.round(Math.random() * 560) + 1;
        bomb2.y = Math.round(Math.random() * 360) + 90;
        bomb3.x = Math.round(Math.random() * 560) + 1;
        bomb3.y = Math.round(Math.random() * 360) + 90;
        moveBomb = false;
    }

};

Bomb.prototype.update = function() {
    this.moveBomb();
}

var PointText = function(x,y) {
    this.x = x;
    this.y = y;
}

PointText.prototype.render = function() {
    ctx.font = "50px Ariel";
    ctx.fillStyle = "green";
    ctx.fillText("+1", this.x, this.y); 
};



PointText.prototype.update = function() {
    if (winPoint == true) {
        pointText.render();
        console.log("YAY")
    }
}




// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
 enemy = new Enemy(0,70);
 enemy2 = new Enemy(0,160);
 enemy3 = new Enemy(0,255);
 enemy4 = new Enemy(0,340);
 //enemy4 = new Enemy();
 //enemy5 = new Enemy();
 heart1 = new LifeHearts(20,550)
 heart2 = new LifeHearts(80,550)
 heart3 = new LifeHearts(140,550)
 

 bomb = new Bomb(randomGemX(),randomGemY());
 bomb2 = new Bomb(randomGemX(),randomGemY());
 bomb3 = new Bomb(randomGemX(),randomGemY());

 var allEnemies = [enemy,enemy2,enemy3,enemy4];
 var player = new Player(255,460);
 var hearts = [heart1,heart2,heart3];
 var score = new Score(520,600);
 var gem = new Gem(randomGemX(),randomGemY());
 var allBombs = [bomb,bomb2,bomb3];
 var pointText = new PointText(player.x,player.y)
 //var timer = new Timer();


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

