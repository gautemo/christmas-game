const loadSprite = (file: string, path = 'sprites/') => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onerror = reject
    img.onload = () => resolve(img)
    img.src = path + file
  })
}

const loadSprites = () => {
  const sprites = ['snow_54.png', 'snow_113.png', 'santa3.png', 'gift_pink.png', 'coal.png']
  return Promise.all(sprites.map(file => loadSprite(file)))
}


const getSprites = async () => {
  const [ground, playerImg, santaImg, presentImg, coalImg] = await loadSprites()
  return {
    ground,
    playerImg,
    santaImg,
    presentImg,
    coalImg
  }
}

export { getSprites }