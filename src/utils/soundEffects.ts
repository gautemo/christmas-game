import damagedGirl from '../assets/sound/damaged2.wav'
import damagedBoy from '../assets/sound/ManHurt.wav'
import freeze from '../assets/sound/freeze.wav'
import points from '../assets/sound/points.wav'
import snow from '../assets/sound/snow.wav'
import { nightmode } from '../composable/gameReactive'
import { sound } from '../composable/soundReactive'

const playHurt = () => {
  if(nightmode.value){
    playAudio(damagedBoy, 0.5)
  }else{
    playAudio(damagedGirl, 0.2)
  }
}

const playFreeze = () => {
  playAudio(freeze)
}

const playPoints = () => {
  playAudio(points)
}

const playSnow = () => {
  playAudio(snow)
}

const playAudio = (src, volume = 0.4) => {
  if (!sound.soundEffects) {
    return;
  }
  const audio = new Audio(src)
  audio.volume = volume
  audio.play();
}

export { playHurt, playFreeze, playPoints, playSnow }