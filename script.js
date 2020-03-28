var canvas;
var context;

var time;
var key;
var lockedKey;
var scene = [];

var	mapRes = [11, 8];





class Frog {
	constructor(){
		this.h = canvas.height / mapRes[1] / 4 * 3;
		this.w = this.h * 521 / 650;
		this.x = canvas.width / 2 - this.w / 2;
		this.y = canvas.height - this.h - 10;
		this.image = new Image();
		this.image.src = "assets/frog.png";
		this.d = -1;
	}

	move(dt){

		if(lockedKey) return;

		if(key == 37){ // sipka vlavo
			if( this.x - canvas.width / mapRes[0] >= 0 )
				this.x -= canvas.width / mapRes[0];
			lockedKey = true;
		}

		if(key == 39){ // sipka vpravo
			if( this.x + canvas.width / mapRes[0] < canvas.width )
				this.x += canvas.width / mapRes[0];
			lockedKey = true;
		}

		if(key == 38){ // sipka hore
			if( this.y - canvas.height / mapRes[1] >= 0 )
				this.y -= canvas.height / mapRes[1];
			lockedKey = true;
		}

		if(key == 40){ // sipka dole
			if( this.y + canvas.height / mapRes[1] < canvas.height )
				this.y += canvas.height / mapRes[1];
			lockedKey = true;
		}

	}

	draw(){
		context.save();
		context.drawImage(this.image, this.x, this.y, this.w, this.h);
		context.restore();
	}
}





class Enemy {
	constructor(row, d){
		this.h = canvas.height / mapRes[1];
		this.w = canvas.width / mapRes[0] * 2;
		this.x = (d < 0) ? canvas.width : -this.w;
		this.y = canvas.height - row * this.h;
		this.image = new Image();
		this.d = d;
	}

	move(dt){
		if( this.d == -1 ){
			if( this.x - 5 >= -this.w - 5 ) this.x -= 5;
		} else if( this.d == 1 ){
			if( this.x + 5 <= canvas.width + 5 ) this.x += 5;
		}
	}

	draw(){
		context.save();
		context.drawImage(this.image, this.x, this.y, this.w, this.h);
		context.restore();
	}
}

class Ram extends Enemy {
	constructor(row, d){
		super(row, d);
		this.w = this.h * 1103 / 675;
		this.image.src = (d < 0) ? "assets/ram-l.png" : "assets/ram-r.png";
	}
}

class Horse extends Enemy {
	constructor(row, d){
		super(row, d);
		this.w = this.h * 1147 / 991;
		this.image.src = (d < 0) ? "assets/horse-l.png" : "assets/horse-r.png";
	}
}

class Catapult extends Enemy {
	constructor(row, d){
		super(row, d);
		this.w = this.h * 1112 / 538;
		this.image.src = (d < 0) ? "assets/catapult-l.png" : "assets/catapult-r.png";
		this.x = canvas.width - this.w
		this.move = function(dt){}
	}
}





class Title {
	constructor(text){
		this.x = canvas.width / 2;
		this.y = 60;
		this.f = "30pt Calibri";
		this.a = "center";
		this.c = "white";
		this.t = text;
	}

	move(dt){}

	draw(){
		context.save();
		context.font = this.f;
		context.textAlign = this.a;
		context.fillStyle = this.c;
		context.fillText(this.t, this.x, this.y);
		context.restore();
	}
}





class Background {
	constructor(){
		this.h = canvas.height;
		this.w = canvas.width;
		this.x = 0;
		this.y = 0;
		this.image = new Image();
		this.image.src = "assets/background.jpg";
	}

	move(dt){}

	draw(){
		context.save();
		context.drawImage(this.image, this.x, this.y, this.w, this.h);
		context.restore();
	}
}





class Bonus {
	constructor(){
		this.h = canvas.height / mapRes[0] / 4 * 3;
		this.w = this.h;
		this.x = canvas.height / mapRes[0] / 4;
		this.y = this.x;
		this.image = new Image();
		this.image.src = "assets/bonus.png";
	}

	move(dt){}

	draw(){
		context.save();
		context.drawImage(this.image, this.x, this.y, this.w, this.h);
		context.restore();
	}
}





function step(){
	var now = Date.now();
	var dt = (now - time) / 100;
	time = now;

	context.fillStyle = "white";
	context.fillRect(0, 0, canvas.width, canvas.height);

	for(i in scene){
		scene[i].move(dt);
		scene[i].draw();
	}

	requestAnimationFrame(step)
}

window.onload = function(){
	canvas  = document.getElementById("canvas");
	context = canvas.getContext("2d");

	scene.push( 
		new Background(), 
		new Bonus(),
		new Frog(), 
		new Ram(2, -1),  
		new Horse(3, 1),  
		new Catapult(4, -1),  
		new Title("FROGGER") 
	);

	time = Date.now();
	requestAnimationFrame(step);
}

window.onkeydown = function(event){ key = event.keyCode; }
window.onkeyup = function(event){ 
	key = null; 
	lockedKey = false;
}