import { nightmode } from '../composable/gameReactive'
import { getSprites } from './gameAssets'
import { DropItem, GameItem, GroundHeight, Player, Santa } from './gameClasses'

interface GameElements{
  player: Player,
  santa: Santa,
  presents: DropItem[],
  coals: DropItem[],
  iceCubes: DropItem[],
  snowballs: DropItem[],
  ticks: number,
}

const initCanvas = async (width: number, height: number) => {
  const ctx = document.querySelector<HTMLCanvasElement>('#canvas').getContext('2d')
  ctx.canvas.width = width
  ctx.canvas.height = height
  const sprites = await getSprites();

  const drawVisualElements = () => {
    ctx.clearRect(0, 0, width, height)
    ctx.drawImage(sprites.bg, 0, 0, width, height)
    ctx.drawImage(sprites.tree1, width - 400, height - GroundHeight + 1 - sprites.tree1.height)
    ctx.drawImage(sprites.igloo, width - 50 - sprites.igloo.width, height - GroundHeight + 1 - sprites.igloo.height)
    ctx.drawImage(sprites.snowman, 100, height - GroundHeight + 1 - sprites.snowman.height)
    ctx.drawImage(sprites.stone, 1100, height - GroundHeight + 1 - sprites.stone.height)
    ctx.drawImage(sprites.tree2, 1000, height - GroundHeight + 1 - sprites.tree2.height)
    ctx.drawImage(sprites.tree2, width - 450, height - GroundHeight + 1 - sprites.tree2.height)
  }

  const drawGameItem = (img: HTMLImageElement, item: GameItem) => {
    ctx.drawImage(img, item.x, item.y)
  }

  const drawGameItems = (img: HTMLImageElement, items: GameItem[]) => {
    for (let item of items) {
      drawGameItem(img, item)
    }
  }

  const drawFloor = (player: Player) => {
    const img = player.isIcy() ? sprites.groundIce : sprites.ground
    for (let i = 0; i < width / img.width; i++) {
      ctx.drawImage(img, i * img.width, height - img.height)
    }
  }

  const drawSanta = (santa: Santa) => {
    if (santa.appearTimeLeft > santa.appearTime - 2) {
      ctx.drawImage(sprites.poof[0], santa.x, santa.y)
    } else if (santa.appearTimeLeft > santa.appearTime - 4) {
      ctx.drawImage(sprites.poof[1], santa.x, santa.y)
    } else if (santa.appearTimeLeft > santa.appearTime - 7) {
      ctx.drawImage(sprites.poof[2], santa.x, santa.y)
    } else if (santa.appearTimeLeft < 3) {
      ctx.drawImage(sprites.poof[1], santa.x, santa.y)
    } else {
      ctx.drawImage(nightmode.value ? sprites.santaBad : sprites.santa, santa.x, santa.y)
    }
  }

  const drawPlayer = (player: Player, ticks: number) => {
    if(player.isSnowball()){
      ctx.drawImage(sprites.snowman, player.x, player.y + 1, Player.width, Player.height)
    }else if(player.movesLeft()){
      drawGameItem(nightmode.value ? sprites.player.badLeft : sprites.player.runLeft, player)
    }else if(player.movesRight()){
      drawGameItem(nightmode.value ? sprites.player.badRight : sprites.player.runRight, player)
    }else{
      const animationStance = Math.ceil(ticks / 10) % 2 === 0
      if(nightmode.value){
        drawGameItem(animationStance ? sprites.player.badIdle1 : sprites.player.badIdle2, player)
      }else{
        drawGameItem(animationStance ? sprites.player.idle1 : sprites.player.idle2, player)
      }
    }
  }

  const drawGame = (gameElements: GameElements) => {
    drawVisualElements()
    drawFloor(gameElements.player)
    drawSanta(gameElements.santa)
    drawGameItems(sprites.coal, gameElements.coals)
    drawGameItems(sprites.ice, gameElements.iceCubes)
    drawGameItems(sprites.snowball, gameElements.snowballs)
    drawGameItems(sprites.presents.blue, gameElements.presents.filter(p => p.color === 'blue'))
    drawGameItems(sprites.presents.orange, gameElements.presents.filter(p => p.color === 'orange'))
    drawGameItems(sprites.presents.pink, gameElements.presents.filter(p => p.color === 'pink'))
    drawPlayer(gameElements.player, gameElements.ticks)
    if(nightmode.value){
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)'
      ctx.fillRect(0, 0, width, height)
    }
  }

  return { drawGame }
}

export { initCanvas }