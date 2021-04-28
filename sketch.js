var backImage, backgr;
var player, player_running;
var ground, ground_img;

var FoodGroup, bananaImage;
var obstaclesGroup, obstacle_img;

var gameOver;
var score = 0;


function preload() {
  backImage = loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");



  bananaImage = loadImage("banana.png");
  obstacle_img = loadImage("stone.png");

}

function setup() {
  createCanvas(displayWidth, displayHeight - 100);

  backgr = createSprite(0, 0, displayWidth * 2, displayHeight);
  backgr.addImage(backImage);
  backgr.scale = 2.5;
  backgr.x = backgr.width / 2;
  backgr.velocityX = -4;

  player = createSprite(100, 500, 20, 50);
  player.addAnimation("Running", player_running);
  player.scale = 0.15;

  ground = createSprite(displayHeight, 500, displayWidth, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  ground.visible = false;

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
   camera.position.x= displayWidth/2
  camera.position.y= displayHeight/2
}

function draw() {

  background(255);


  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  // if(backgr.x<0){
  //   backgr.x=backgr.width/2;
  // }
  if (backgr.x < 300) {
    backgr.x = width / 2
  }
  if (FoodGroup.isTouching(player)) {
    FoodGroup.destroyEach();
    score = score + 2;
  }
  switch (score) {
    case 10: player.scale = 0.12;
      break;
    case 20: player.scale = 0.14;
      break;
    case 30: player.scale = 0.16;
      break;
    case 40: player.scale = 0.18;
      break;
    default: break;
  }

  if (keyDown("space")) {
    player.velocityY = -12;
  }
  player.velocityY = player.velocityY + 0.8;

  player.collide(ground);
  spawnFood();
  spawnObstacles();

  if (obstaclesGroup.isTouching(player)) {
    player.scale = 0.08;
    // score=score-2;
  }

  drawSprites();

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500, 50);
}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var banana = createSprite(width, random(320, 400), 40, 10);

    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
    //assign lifetime to the variable
    banana.lifetime = 300;
    player.depth = banana.depth + 1;

    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 100 === 0) {
    var obstacle = createSprite(displayWidth, 500, 10, 40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);

    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;

    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}



