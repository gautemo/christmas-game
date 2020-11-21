const random = max => Math.floor(Math.random() * Math.floor(max));

class GameItem{
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

class Player extends GameItem{
  height: number;
  width: number;
  speed: number;
  gameWidth: number;

  constructor(x: number, y: number, width: number, height: number, gameWidth: number) {
    super(x, y);
    this.height = height;
    this.width = width;
    this.speed = 50;
    this.gameWidth = gameWidth;
  }

  move(left: boolean, right: boolean) {
    if (left && !right) {
      this.x = Math.max(0, this.x - this.speed);
    }
    if (right && !left) {
      this.x  = Math.min(this.gameWidth - this.width, this.x + this.speed)
    }
  }

  collision(item: DropItem) {
    return this.x < item.x + this.width &&
      this.x + this.width > item.x &&
      this.y < item.y + item.height &&
      this.y + this.height > item.y
  }
}

class Santa extends GameItem{
  width: number;
  gameWidth: number;
  appearTime = 50
  appearTimeLeft = 10

  constructor(y: number, width: number, gameWidth: number) {
    super(0, y);
    this.width = width;
    this.gameWidth = gameWidth;
    this.randomMove()
  }

  randomMove() {
    this.x = random(this.gameWidth - this.width);
  }

  tick(){
    this.appearTimeLeft--
    if(this.appearTimeLeft === 0){
      this.randomMove()
      this.appearTimeLeft = this.appearTime
      this.appearTime = Math.max(5, this.appearTime - 1)
      return true
    }
    return false
  }
}

class DropItem extends GameItem{
  height: number;
  width: number;
  speed: number;
  ground: number;
  id: number;
  type: 'present' | 'coal' | 'ice'

  constructor(x: number, y: number, width: number, height: number, ground: number) {
    super(x,y);
    this.height = height;
    this.width = width;
    this.ground = ground;
    this.id = Date.now();
    const randomType = random(50)
    if (randomType <= 10){
      this.type = 'coal'
      this.speed = 15
    }else{
      this.type = 'present'
      this.speed = 10
    }
  }

  fall(){
    this.y += this.speed;
  }

  outOfGame(){
    return this.y + this.height >= this.ground
  }
}

export { Player, Santa, DropItem, GameItem }