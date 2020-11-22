<template>
  <p id="score" v-if="state.playing">
    <img src="../assets/sprites/gift_pink.png" width="50" alt="present">
    <span>{{state.score}} poeng</span>
  </p>
  <p id="time" v-if="state.playing">
    <span>{{state.timeLeft}}s</span>
  </p>
  <canvas id="canvas"
    @keydown.left="setMoveLeft(true)" 
    @keyup.left="setMoveLeft(false)" 
    @keydown.right="setMoveRight(true)" 
    @keyup.right="setMoveRight(false)" 
    tabindex="0"></canvas>
  <button id="left" @touchstart="setMoveLeft(true)" @touchend="setMoveLeft(false)"></button>
  <button id="right" @touchstart="setMoveRight(true)" @touchend="setMoveRight(false)"></button>
</template>

<script lang="ts">
import { onMounted, ref, watch, watchEffect } from 'vue'
import { init, setMoveLeft, setMoveRight } from '../game/gameControl'
import { state } from '../composable/gameReactive';

export default {
  setup(){
    onMounted(async () => {
      init()
    })

    watchEffect(() => {
      if(state.playing){
        document.querySelector('#canvas').focus();
      }
    })

    return { setMoveLeft, setMoveRight, state }
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
  background: #c24537;
  color: whitesmoke;
  font-weight: bold;
  border-radius: 100px;
  padding: 10px 20px 10px 30px;
}

#score img{
  position: absolute;
  left: -20px;
  top: -10px;
}

#time{
  position: absolute;
  top: 70px;
  right: 15px;
  background: #c24537;
  color: whitesmoke;
  font-weight: bold;
  border-radius: 100px;
  padding: 10px 20px;
}

#left, #right{
  position: absolute;
  bottom: 5px;
  background: #c24537;
  height: 40px;
  width: 60px;
  border: none;
}

#left{
  left: 5px;
  clip-path: polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%);
}

#right{
  right: 5px;
  clip-path: polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%);
}

@media only screen and (min-width: 1200px) {
  #right, #left{
    display: none;
  }
}
</style>