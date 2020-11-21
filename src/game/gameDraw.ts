import { DropItem, GameItem, Player, Santa } from './gameClasses'

let ctx

const initCanvas = () => {
  ctx = document.querySelector<HTMLCanvasElement>('#canvas').getContext('2d')
  return [ctx.canvas.width, ctx.canvas.height]
}

const drawVisualElements = (width: number, height: number) => {
  ctx.clearRect(0, 0, width, height)
  ctx.fillStyle = 'lightblue'
  ctx.fillRect(0, 0, width, height)
}

const drawFloor = (img: HTMLImageElement, width: number, height: number) => {
  for (let i = 0; i < width / img.width; i++) {
    ctx.drawImage(img, i * img.width, height - img.height)
  }
}

const drawGameItem = (img: HTMLImageElement, item: GameItem) => {
  ctx.drawImage(img, item.x, item.y)
}

const drawGameItems = (img: HTMLImageElement, items: GameItem[]) => {
  for (let item of items) {
    drawGameItem(img, item)
  }
}

export { initCanvas, drawFloor, drawGameItem, drawGameItems, drawVisualElements }