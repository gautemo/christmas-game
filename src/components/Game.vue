<template>
  <p id="score">{{score}} poeng</p>
  <canvas id="canvas"
    @keydown.left="setMoveLeft(true)" 
    @keyup.left="setMoveLeft(false)" 
    @keydown.right="setMoveRight(true)" 
    @keyup.right="setMoveRight(false)" 
    tabindex="0"></canvas>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
import { start, setMoveLeft, setMoveRight } from '../game/gameControl'

export default {
  setup(){
    const score = ref(0)
    const updateScore = (value: number) => {
      score.value = value
    }

    onMounted(async () => {
      start(updateScore)
    })

    return { setMoveLeft, setMoveRight, score }
  }
}
</script>

<style scoped>
#canvas{
  width: 100%;
  height: 100%;
}

#score{
  position: absolute;
  top: 15px;
  right: 15px;
}
</style>