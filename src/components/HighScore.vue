<template>
  <label v-if="state.finalScore > 0">
    <p>Ny score:</p>
    <input type="text" v-model="state.name">
    <p>{{state.finalScore}} poeng</p>
    <button @click="addScoreClicked">Send inn</button>
  </label>
  <ul v-if="scores.length > 0">
    <li v-for="score in scores" :key="score.id">
      {{score.name}} - {{score.score}}
    </li>
  </ul>
</template>

<script lang="ts">
import { ref } from 'vue'
import { getScores, addScore } from '../firebase/database'
import { state } from '../composable/gameReactive'

export default {
  async setup(){
    const scores = ref(await getScores())

    const addScoreClicked = async () => {
      await addScore(state.name, state.finalScore)
      state.finalScore = 0
      scores.value = await getScores()
    }

    return { scores, state, addScoreClicked }
  }
}
</script>

<style scoped>
label{
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>