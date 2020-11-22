<template>
  <Game/>
  <FrontPage v-if="!state.playing"/>
</template>

<script>
import FrontPage from './components/FrontPage.vue'
import Game from './components/Game.vue'
import { state } from './composable/gameReactive'

export default {
  name: 'App',
  setup(){
    return { state }
  },
  components: {
    Game,
    FrontPage
  }
}
</script>
