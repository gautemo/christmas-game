import { getSprites } from './gameAssets'
import { DropItem, Player, Santa } from './gameClasses';
import { drawFloor, drawGameItem, drawGameItems, initCanvas, drawVisualElements } from './gameDraw';

let moveLeft = false
let moveRight = false

const start = async (updateScore: (score: number) => void) => {
  const sprites = await getSprites();
  const [width, height] = initCanvas();
  let score = 0;

  const player = new Player(width / 2, height - sprites.ground.height - sprites.playerImg.height, sprites.playerImg.width, sprites.playerImg.height, width)
  const santa = new Santa(50, sprites.santaImg.width, width)
  let dropItems: DropItem[] = []

  const tick = () => {
    player.move(moveLeft, moveRight)
    const dropItem = santa.tick()
    if(dropItem){
      dropItems.push(new DropItem(santa.x, santa.y + 10, sprites.presentImg.width, sprites.presentImg.height, height - sprites.ground.height))
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
        updateScore(score)
      }
      if(caught || dropItem.outOfGame()){
        dropItemsToRemove.push(dropItem.id)
      }
    }
    dropItems = dropItems.filter(item => !dropItemsToRemove.includes(item.id))

    drawVisualElements(width, height)
    drawFloor(sprites.ground, width, height)
    drawGameItem(sprites.playerImg, player)
    drawGameItem(sprites.santaImg, santa)
    drawGameItems(sprites.presentImg, dropItems.filter(item => item.type === 'present'))
    drawGameItems(sprites.coalImg, dropItems.filter(item => item.type === 'coal'))
  }

  setInterval(tick, 50)
}

const setMoveLeft = (value: boolean) => moveLeft = value
const setMoveRight = (value: boolean) => moveRight = value

export { start, setMoveLeft, setMoveRight }