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
    this.speed = randomIntFromInterval(100,250);
    console.log("randomSpeed = "+ this.speed);
}




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
    
    //player.playerReset();
    player.collision();
    //player.lifeHearts(20,3)

    
};



var collision = false;
Player.prototype.collision = function() {
        
        for(i = 0; i < allEnemies.length; i++) {
        var playerChar = {x: this.x, y: this.y, width:60, height:60};
        var enemyChar = {x: allEnemies[i].x, y: allEnemies[i].y, width:70, height:60};
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

Player.prototype.playerReset = function(){
            this.x = 255;
            this.y=  450;
           
}






Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
     //ctx.drawImage(Resources.get(this.lifeHearts),80,550,64,100)
    //ctx.drawImage(Resources.get(this.lifeHearts),140,550,64,100)
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
    else if (this.x > 560) {
        this.x = 530;
    }
    else if (this.y < 0) {
        this.y =0;
    }
    else if (this.y > 500) {
        this.y = 500;
    };
    
};

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
    /*else if(collision == true && hearts.length == 1) {
        hearts.splice(1,1);
    }*/
};

LifeHearts.prototype.update = function() {
    this.lifeLoss();
};
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
 heart4 = new LifeHearts(200,550)

 var allEnemies = [enemy,enemy2,enemy3,enemy4];
 var player = new Player(255,460);
 var hearts = [heart1,heart2,heart3]
 






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

