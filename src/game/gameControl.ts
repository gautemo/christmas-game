import { DropItem, Player, Santa } from './gameClasses';
import { initCanvas } from './gameDraw';
import { finished, started, updateScore, updateTime } from '../composable/gameReactive';

const gameWidth = 4200
const gameHeight = 1900
let player: Player
let santa: Santa
let dropItems: DropItem[] = []
let score = 0;
let ticksLeft = 0;

const init = async () => {
  const { drawGame } = await initCanvas(gameWidth, gameHeight);
  player = new Player(gameWidth / 2, gameHeight, gameWidth)
  santa = new Santa(50, gameWidth)
  santa.appearTime = santa.minimumAppearTime
  santa.appearTimeLeft = santa.minimumAppearTime

  const tick = () => {
    ticksLeft--
    updateTime(Math.ceil((ticksLeft * 50)/1000))
    player.move()
    const santaDroppedItem = santa.tick()
    if(santaDroppedItem){
      dropItems.push(new DropItem(santa.x, santa.y + 10, gameHeight))
    }
    const dropItemsToRemove = []
    for(let dropItem of dropItems){
      dropItem.fall()
      const caught = player.collision(dropItem)
      if(caught){
        if(dropItem.type === 'coal'){
          score = Math.max(0, score - 55)
        }
        if(dropItem.type === 'present'){
          score += 50
        }
        if(dropItem.type === 'ice'){
          player.makeIcy()
        }
        if(dropItem.type === 'snowball'){
          player.makeSnowball()
        }
        updateScore(score)
      }
      if(caught || dropItem.outOfGame()){
        dropItemsToRemove.push(dropItem.id)
      }
    }
    dropItems = dropItems.filter(item => !dropItemsToRemove.includes(item.id))

    drawGame({
      santa,
      player,
      coals: dropItems.filter(item => item.type === 'coal'),
      iceCubes: dropItems.filter(item => item.type === 'ice'),
      presents: dropItems.filter(item => item.type === 'present'),
      snowballs: dropItems.filter(item => item.type === 'snowball'),
      ticks: ticksLeft
    })

    if (ticksLeft === 0) {
      finished()
    }
  }

  setInterval(tick, 50)
}

const start = () => {
  score = 0;
  ticksLeft = 1200;
  updateTime(Math.ceil((ticksLeft * 50) / 1000))

  player = new Player(gameWidth / 2, gameHeight, gameWidth)
  santa = new Santa(50, gameWidth)
  dropItems = []

  started()
}

const setMoveLeft = (value: boolean) => {
  if (player) {
    player.left = value
  }
}
const setMoveRight = (value: boolean) => {
  if (player) {
    player.right = value
  }
}

export { init, start, setMoveLeft, setMoveRight }