<template>
  <label v-if="state.finalScore > 0">
    <p>Ny score:</p>
    <input type="text" v-model="state.name" v-if="state.finalScore > lowestScore" maxlength="30" :class="{required: requiredDisplay}">
    <p>{{state.finalScore}} poeng</p>
    <button @click="addScoreClicked" v-if="state.finalScore > lowestScore">Send inn</button>
  </label>
  <section v-if="shownScores.length > 0">
    <h2>Leaderboard - Topp 10</h2>
    <ul>
      <li v-for="(score, i) in shownScores" :key="score.id">
        <h3>{{i + 1}}</h3>
        <p class="name">{{score.name}}</p>
        <p>{{score.score}} poeng</p>
      </li>
    </ul>
    <button v-if="scores.length > 3 && !expanded" @click="expanded = true">Se flere</button>
    <button v-if="expanded" @click="expanded = false">Se færre</button>
  </section>
</template>

<script lang="ts">
import { computed, ref } from 'vue'
import { getScores, addScore, leaderboardPlaces } from '../firebase/database'
import { state } from '../composable/gameReactive'

export default {
  async setup(){
    const scores = ref(await getScores())
    const expanded = ref(false)

    const shownScores = computed(() => {
      if(expanded.value){
        return scores.value
      }
      return scores.value.slice(0, 3)
    })

    const lowestScore = computed(() => {
      if(scores.value.length < leaderboardPlaces){
        return 0
      }
      return scores.value[leaderboardPlaces-1].score
    })

    const requiredDisplay = ref(false)
    const addScoreClicked = async () => {
      if(state.name.trim().length === 0){
        requiredDisplay.value = true
        return
      }
      await addScore(state.name, state.finalScore)
      state.finalScore = 0
      scores.value = await getScores()
    }

    return { scores, shownScores, expanded, state, addScoreClicked, lowestScore, requiredDisplay }
  }
}
</script>

<style scoped>
label{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  font-size: 1.5em;
  margin: 10px 0;
}

label p{
  margin: 0;
}

section{
  width: 100%;
}

ul{
  list-style: none;
}

li{
  display: flex;
  align-items: center;
  gap: 25px;
}

li h3,
li p{
  margin: 10px;
  font-size: 1.3em;
}

.required{
  box-shadow: #a61715 0 0 2px 2px;
  border: none;
}

.name{
  min-width: 120px;
}

</style>