import { reactive, ref } from 'vue'
import { logEvent } from '../firebase/firebase';
const state = reactive({
  playing: false,
  score: 0,
  finalScore: 0,
  timeLeft: 0,
  name: ''
})

const nightmode = ref(false);

const started = () => {
  state.playing = true
  state.finalScore = 0
  state.score = 0
  logEvent('start')
}

const finished = () => {
  state.playing = false
  state.finalScore = state.score
  logEvent('finished')
}

const updateScore = (newScore: number) => {
  state.score = newScore
}

const updateTime = (timeLeft: number) => {
  state.timeLeft = timeLeft
}

export { started, finished, updateScore, updateTime, state, nightmode }