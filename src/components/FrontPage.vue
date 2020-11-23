<template>
  <div class="container" :class="{night: nightmode}">
    <main>
      <h1>Er det noen {{nightmode ? 'slemme' : 'snille'}} barn her?</h1>
      <button @click="start">Start</button>
      <div class="settings">
        <label class="toggle nightmode">
          <input type="checkbox" v-model="nightmode">
          <div class="ball"></div>
          <span>👿</span>
          <span>😇</span>
        </label>
        <label class="toggle music" :class="{checked: sound.music}">
          <input type="checkbox" v-model="sound.music">
          <div class="ball"></div>
          <span>🎵</span>
          <span>🤫</span>
        </label>
      </div>
       <Suspense>
        <template #default>
          <HighScore/>
        </template>
        <template #fallback>
          <p>Laster leaderboard </p>
        </template>
      </Suspense>
      <details>
        <summary><h2>Om spillet</h2></summary>
          <section>
          <h3>Regler:</h3>
          <div class="row">
            <img src="../assets/sprites/gift_pink.png" width="70" alt="present">
            <p>Snille barn får gaver ({{nightmode ? '-55' : '+50'}} poeng)</p>
          </div>
          <div class="row">
            <img src="../assets/sprites/coal.png" width="70" alt="present">
            <p>Slemme barn får kull ({{nightmode ? '+50' : '-55'}} poeng)</p>
          </div>
          <div class="row">
            <img src="../assets/sprites/IceBox.png" width="70" alt="present">
            <p>Har du husket skøytene?</p>
          </div>
          <div class="row">
            <img src="../assets/sprites/snowball.png" width="70" alt="present">
            <p>Liker du å lage snømenn?</p>
          </div>
        </section>
        <section>
          <h3>Skaperen:</h3>
          <p>
            ?
          </p>
        </section>
        <section>
          <Credits/>
        </section>
      </details>
    </main>
  </div>
</template>

<script lang="ts">
import { start } from '../game/gameControl'
import HighScore from './HighScore.vue'
import Credits from './Credits.vue'
import { nightmode } from '../composable/gameReactive'
import { sound } from '../composable/soundReactive'

export default {
  components: { HighScore, Credits },
  setup(){
    return { start, nightmode, sound }
  }
}
</script>

<style scoped>
.container{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: grid;
  place-items: center;
  background: var(--container-color,rgba(245, 245, 245, 0.8));
  margin: 15vh 20vw;
  border-radius: 25px;
  padding: 20px;
  color: var(--text-color, #222);
}

button{
  background: radial-gradient(#a61715 30%, #c24537);
  border: none;
  border-radius: 15px;
  width: 90%;
  padding: 20px;
  color: whitesmoke;
  font-weight: bold;
  font-size: 2em;
  box-shadow: rgba(0, 0, 0, 0.6) 0px 2px 9px 1px;
}

main{
  overflow: auto;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

main::-webkit-scrollbar
{
  width: 12px;
  background: none;
}

main::-webkit-scrollbar-thumb
{
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: #D62929;
}

details{
  width: 100%;
}

summary{
  display: flex;
  align-items: center;
  cursor: pointer;
}

.row{
  display: flex;
  align-items: center;
  margin: 15px 0;
}

.row p{
  font-size: 1.5em;
  margin: 0 0 0 20px;
}

.settings{
  margin: 15px 0 5px 0;
  display: flex;
  gap: 30px;
  justify-content: space-around;
}

.toggle{
  border-radius: 100px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  position: relative;
  height: 39px;
  width: 75px;
  box-sizing: border-box;
  transition: all 0.2s linear;
  background: #eea551;
}

.toggle.checked{
  background: #0891ae;
}

.toggle.nightmode{
  background: var(--toggle-color, rgb(232 102 130));
}

.toggle span{
  font-size: 1.2em;
  margin: 0 2px 2px 2px;
}

.ball{
  background: var(--toggle-ball, rgb(250, 250, 250));
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: 3px;
  height: 33px;
  width: 33px;
  transform: translateX(0px);
  transition: all 0.2s linear;
}

.toggle input{
  opacity: 0;
  position: absolute;
}

input[type="checkbox"]:checked + .ball{
  transform: translateX(37px);
}

.night{
  --toggle-color: #333;
  --toggle-ball: #999;
  --container-color: rgba(0, 0, 0, 0.8);
  --text-color: rgba(250, 250, 250);
}

@media only screen and (max-width: 1000px) {
  .container{
    margin: 5vh 10vw;
  }
}
</style>