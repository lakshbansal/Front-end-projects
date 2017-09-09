	 // Enemies our player must avoid
	 name = prompt("enter the player's name"); //enter the name of player
	 score1 = 0;
	 moves1 = 0;
	 h_s1 = 0; //initiallization of variables
	 var Enemy = function(x, y) {
	     this.x = x;
	     this.y = y; // Variables applied to each of our instances go here,
	     this.speed = this.e_speed(); // we've provided one for you to get started
	     this.sprite = 'images/enemy-bug.png';
	 };
	 // Update the enemy's position, required method for game
	 // Parameter: dt, a time delta between ticks
	 // Draw the enemy on the screen, required method for game
	 Enemy.prototype.update = function(dt) { //function to update enemy

	     if (this.x < 500) {
	         this.x += this.speed * dt;

	     } else {
	         this.x = -100;
	         this.speed = this.e_speed();
	     } // You should multiply any movement by the dt parameter
	     // which will ensure the game runs at the same speed for
	     // all computers.
	 };
	 Enemy.prototype.e_speed = function() { //speed function of enemy
	     return Math.floor(Math.random() * (300 - 100 + 1) + 100);
	 };
	 Enemy.prototype.render = function() {
	     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	 };
	 // Now write your own player class
	 // This class requires an update(), render() and
	 // a handleInput() method.
	 var Player = function(x, y) {
	     this.x = x;
	     this.y = y;
	     this.sprite = 'images/char-cat-girl.png';
	 };
	 Player.prototype.reset = function() { //to reset player position
	     this.x = 0;
	     this.y = 430;
	 };
	 Player.prototype.update = function() { //function to update player
	     for (var i = 0; i < allEnemies.length; i++) {
	         if ((this.x < allEnemies[i].x + 64) && (this.x + 64 > allEnemies[i].x) && (this.y + 64 > allEnemies[i].y) && (this.y < allEnemies[i].y + 64)) {
	             this.reset();
	             document.getElementById("score").innerHTML = score1;
	             document.getElementById("moves").innerHTML = moves1;
	             document.getElementById("hs").innerHTML = h_s1;
	             alert("Game Over :-) " + "\n" + "Thanks for Playing " + name + "\n" + "Your score is " + score1)
	             score1 = 0;
	             moves1 = 0;
	             document.getElementById("score").innerHTML = score1;
	             document.getElementById("moves").innerHTML = moves1;
	             document.getElementById("hs").innerHTML = h_s1;
	         }
	     }
	 };
	 Player.prototype.handleInput = function(key) { //to handle keys
	     // make player move with appropriate keyboard key presse
	     if (key == 'left') {
	         if (this.x > 0) {
	             this.x -= 53;
	             moves1++;
	             document.getElementById("moves").innerHTML = moves1;
	         }
	     } else if (key == 'right') {
	         if (this.x < 372) {
	             this.x += 53;
	             moves1++;
	             document.getElementById("moves").innerHTML = moves1;
	         }
	     } else if (key == 'up') {
	         if (this.y > 10) {
	             this.y -= 70;
	             moves1++;
	             document.getElementById("moves").innerHTML = moves1;
	         } else {
	             //if water is hit player goes back to initial position
	             // and increment score by 1
	             score1 += 1;
	             document.getElementById("score").innerHTML = score1;
	             if (h_s1 < score1) {
	                 h_s1 = score1;
	             }
	             this.reset();
	         }
	     } else if (key == 'down') {
	         if (this.y < 410) {
	             this.y += 70;
	             moves1++;
	             document.getElementById("moves").innerHTML = moves1;
	         }
	     }
	 };
	 Player.prototype.render = function() {
	     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	 };

	 var player = new Player(0, 430);
	 // Now instantiate your objects.
	 // Place all enemy objects in an array called allEnemies
	 // Place the player object in a variable called player

	 //array for enemies
	 var allEnemies = [
	     new Enemy(0, 50),
	     new Enemy(0, 115),
	     new Enemy(0, 175),
	     new Enemy(0, 220)
	 ];
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