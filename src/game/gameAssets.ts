const loadSprite = (file: string, path = 'sprites/') => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onerror = reject
    img.onload = () => resolve(img)
    img.src = path + file
  })
}

const loadSprites = () => {
  const sprites = [
    'snow_54.png', 'snow_05.png', 
    'Idle1.png', 'Idle3.png', 'RunLeft.png', 'RunRight.png', 
    'santa3.png', 'poof1.png', 'poof2.png', 'poof3.png',
    'gift_pink.png', 'gift_orange.png', 'gift_blue.png', 'coal.png', 'IceBox.png', 'snowball.png',
    'BG.png', 'SnowMan.png', 'Stone.png', 'Tree_1.png', 'Tree_2.png', 'Igloo.png'
  ]
  return Promise.all(sprites.map(file => loadSprite(file)))
}


const getSprites = async () => {
  const [ground, groundIce, idle1, idle2, runLeft, runRight, santa, poof1, poof2, poof3, pink, orange, blue, coalImg, ice, snowball, bg, snowman, stone, tree1, tree2, igloo] = await loadSprites()
  return {
    ground,
    groundIce,
    player: {
      idle1, idle2, runLeft, runRight
    },
    santa,
    presents: {
      blue, orange, pink
    },
    coalImg,
    poof: [poof1, poof2, poof3],
    ice,
    snowball,
    bg, snowman, stone, tree1, tree2, igloo
  }
}

export { getSprites }