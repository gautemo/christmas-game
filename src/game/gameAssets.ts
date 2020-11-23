import groundImg from '../assets/sprites/snow_54.png'
import groundIceImg from '../assets/sprites/snow_05.png'
import idle1Img from '../assets/sprites/Idle1.png'
import idle2Img from '../assets/sprites/Idle3.png'
import badIdle1Img from '../assets/sprites/bad_idle1.png'
import badIdle2Img from '../assets/sprites/bad_idle2.png'
import badLeftImg from '../assets/sprites/bad_left.png'
import badRightImg from '../assets/sprites/bad_right.png'
import runLeftImg from '../assets/sprites/RunLeft.png'
import runRightImg from '../assets/sprites/RunRight.png'
import santaImg from '../assets/sprites/santa.png'
import santaBadImg from '../assets/sprites/santa_evil.png'
import poof1Img from '../assets/sprites/poof1.png'
import poof2Img from '../assets/sprites/poof2.png'
import poof3Img from '../assets/sprites/poof3.png'
import pinkImg from '../assets/sprites/gift_pink.png'
import orangeImg from '../assets/sprites/gift_orange.png'
import blueImg from '../assets/sprites/gift_blue.png'
import coalImg from '../assets/sprites/coal.png'
import iceImg from '../assets/sprites/IceBox.png'
import snowballImg from '../assets/sprites/snowball.png'
import bgImg from '../assets/sprites/BG.png'
import snowmanImg from '../assets/sprites/SnowMan.png'
import stoneImg from '../assets/sprites/Stone.png'
import tree1Img from '../assets/sprites/Tree_1.png'
import tree2Img from '../assets/sprites/Tree_2.png'
import iglooImg from '../assets/sprites/Igloo.png'

const loadSprite = (file) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onerror = reject
    img.onload = () => resolve(img)
    img.src = file
  })
}

const loadSprites = () => {
  const sprites = [
    groundImg, groundIceImg, 
    idle1Img, idle2Img, runLeftImg, runRightImg, 
    badIdle1Img, badIdle2Img, badLeftImg, badRightImg,
    santaImg, poof1Img, poof2Img, poof3Img, santaBadImg, 
    pinkImg, orangeImg, blueImg, coalImg, iceImg, snowballImg, 
    bgImg, snowmanImg, stoneImg, tree1Img, tree2Img, iglooImg
  ]
  return Promise.all(sprites.map(file => loadSprite(file)))
}


const getSprites = async () => {
  const [ground, groundIce, idle1, idle2, runLeft, runRight, badIdle1, badIdle2, badLeft, badRight, santa, poof1, poof2, poof3, santaBad, pink, orange, blue, coal, ice, snowball, bg, snowman, stone, tree1, tree2, igloo] = await loadSprites()
  return {
    ground,
    groundIce,
    player: {
      idle1, idle2, runLeft, runRight, badIdle1, badIdle2, badLeft, badRight
    },
    santa,
    santaBad,
    presents: {
      blue, orange, pink
    },
    coal,
    poof: [poof1, poof2, poof3],
    ice,
    snowball,
    bg, snowman, stone, tree1, tree2, igloo
  }
}

export { getSprites }