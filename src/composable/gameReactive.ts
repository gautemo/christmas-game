import { reactive } from 'vue'

const state = reactive({
  playing: false,
  score: 0,
})

const started = () => {
  state.playing = true
}

const finished = () => {
  state.playing = false
}

const updateScore = (newScore: number) => {
  state.score = newScore
}

export { started, finished, updateScore, state }