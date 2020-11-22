const random = (max: number) => Math.floor(Math.random() * Math.floor(max));

const GroundHeight = 128;

class GameItem{
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

class Player extends GameItem{
  static height = 151;
  static width = 138;
  gameWidth: number;
  normalSpeed = 50;
  icy = 0;
  snowball = 0;
  left = false;
  right = false;

  constructor(x: number, y: number, gameWidth: number) {
    super(x, y - Player.height - GroundHeight);
    this.gameWidth = gameWidth;
  }

  move() {
    let useSpeed = this.normalSpeed
    if(this.isIcy()){
      useSpeed += 150
    }
    if(this.isSnowball()){
      useSpeed -= 44
    }
    if (this.movesLeft()) {
      this.x = Math.max(0, this.x - useSpeed);
    }
    if (this.movesRight()) {
      this.x = Math.min(this.gameWidth - Player.width, this.x + useSpeed)
    }
    this.icy--
    this.snowball--
  }

  movesLeft(){
    return this.left && !this.right
  }

  movesRight(){
    return this.right && !this.left
  }

  makeIcy(){
    this.icy = 100
  }

  isIcy(){
    return this.icy > 0
  }

  makeSnowball() {
    this.snowball = 80
  }

  isSnowball() {
    return this.snowball > 0
  }

  collision(item: DropItem) {
    return this.x < item.x + Player.width &&
      this.x + Player.width > item.x &&
      this.y < item.y + DropItem.height &&
      this.y + Player.height > item.y
  }
}

class Santa extends GameItem{
  static width = 225;
  gameWidth: number;
  appearTime: number;
  appearTimeLeft: number;
  minimumAppearTime = 20
  poofTime = 9

  constructor(y: number, gameWidth: number) {
    super(0, y);
    this.gameWidth = gameWidth;
    this.randomMove()
    this.appearTime = 50
    this.appearTimeLeft = 10
  }

  randomMove() {
    this.x = random(this.gameWidth - Santa.width);
  }

  tick(){
    this.appearTimeLeft--
    if(this.appearTimeLeft === 0){
      this.randomMove()
      this.appearTime = Math.max(this.minimumAppearTime, this.appearTime - 1)
      this.appearTimeLeft = this.appearTime
    }
    return this.appearTimeLeft === this.appearTime - this.poofTime
  }
}

class DropItem extends GameItem{
  static height = 130;
  static width = 130;
  speed: number;
  groundY: number;
  id: number;
  type: 'present' | 'coal' | 'ice' | 'snowball'
  color: 'pink' | 'blue' | 'orange'

  constructor(x: number, y: number, gameHeight: number) {
    super(x,y);
    this.groundY = gameHeight - GroundHeight
    this.id = Date.now();
    const randomType = random(100)
    if (randomType <= 15){
      this.type = 'coal'
      this.speed = 15
    }else if(randomType <= 25){
      this.type = 'ice'
      this.speed = 12
    }else if(randomType <= 35){
      this.type = 'snowball'
      this.speed = 16
    }else{
      this.type = 'present'
      this.speed = 10
      const randomColor = random(3)
      if(randomColor === 0){
        this.color = 'pink'
      }else if(randomColor === 1){
        this.color = 'blue'
      }else{
        this.color = 'orange'
      }
    }
  }

  fall(){
    this.y += this.speed;
  }

  outOfGame(){
    return this.y + DropItem.height >= this.groundY
  }
}

export { Player, Santa, DropItem, GameItem, GroundHeight }