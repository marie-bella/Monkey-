var monkey, monkey_running;
var food, bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var ground, invisibleGround;
var score;
var survivalTime = 0;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600, 600);

  // creating monkey
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  console.log(ground.x);

  invisibleGround = createSprite(400, 360, 900, 10);
  invisibleGround.visible = false;

  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
  var score = 0;

}


function draw() {
  background("white");

  stroke("white");
  textSize(20);
  fill("white");
  score = Math.ceil(frameCount / frameRate());
  text("Score: " + score, 350, 50);

  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount / frameRate());
  text("Survival Time: " + survivalTime, 100, 50);

  if (keyDown("space") && monkey.y > 100) {
    monkey.velocityY = -12;
  }

  if (ground.x < 300) {
    ground.x = ground.width / 2;
  }
  
  if (monkey.isTouching(bananaGroup)){
    score = score + 1;
  }

  monkey.velocityY = monkey.velocityY + 0.8;
  
  

  spawnObstacles();
  food();

  monkey.collide(ground);


  drawSprites();

}

function food() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(600, 50, 40, 10);
    banana.y = Math.round(random(120, 200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;

    //assign lifetime to the variable
    banana.lifetime = 500;


    //add each banana to the group
    bananaGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(600, 315, 10, 40);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -6;

    // assign lifetime to the variable
    obstacle.lifetime = 300;
  }
}