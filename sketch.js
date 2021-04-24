const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body

var helicopter, helicopterImage, package, packageImage, backGround, backgroundImage;
var ground, packageBody;// the bodies

var fall = {
	isStatic: false
}

function preload() {
	helicopterImage = loadImage("helicopter.png");
	packageImage = loadImage("package.png");
	backgroundImage = loadImage("background.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

	//ground properties
	ground = createSprite(width/2, height-10, width, 20);
	ground.shapeColor = "white";

	//background
	backGround = createSprite(width/2, height/2.6, 10, 10);
	backGround.addImage(backgroundImage);
	backGround.scale = 0.8;

	//package properties
	package = createSprite(10, 10, 10, 10);
	package.addImage(packageImage);
	package.scale = 0.4;

	//helicopter properties
	helicopter  = createSprite(width/2, height/5.2, 10, 10);
	helicopter.addImage(helicopterImage);
	helicopter.scale = 1.1;

	//creating a world
	engine = Engine.create();
	world = engine.world;

	//package's body. This will contain all the physical properties of the package.
	packageBody = Bodies.circle(width/2, height/5, 5, {restitution: 0.6, isStatic: true});
	World.add(world, packageBody);

	// base/ ground
	ground = Bodies.rectangle(width/2, height-30, width, height/30, {isStatic: true});
	World.add(world, ground);

	Engine.run(engine);
}

function draw() {
	Engine.update(engine)

	package.x = packageBody.position.x;
	package.y = packageBody.position.y;
	drop();

	drawSprites();
}


function drop() {
	if(keyDown('down')) {
		Body.setStatic(packageBody, false);
	}
}
