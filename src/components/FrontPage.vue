<template>
  <div class="container" :class="{night: nightmode}">
    <main>
      <h1>Er det noen {{nightmode ? 'slemme' : 'snille'}} barn her?</h1>
      <button @click="start">Start</button>
      <div class="settings">
        <label id="nightmode-toggle">
          <input type="checkbox" v-model="nightmode">
          <div class="ball"></div>
          <span>👿</span>
          <span>😇</span>
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
          <h3>Kreditering:</h3>
          <p>
            Grafikk er hentet fra 
            <ul>
              <li><a href="https://www.gameart2d.com/freebies.html" target="_blank" rel="noopener">Game Art 2D</a></li>
              <li><a href="https://opengameart.org/content/2d-platformer-snow-pack" target="_blank" rel="noopener">Tio Aimar @ opengameart.org</a></li>
              <li><a href="https://opengameart.org/content/poof-effect-spritesheet" target="_blank" rel="noopener">opengameart.org/content/poof-effect-spritesheet</a></li>
              <li><a href="https://opengameart.org/content/sweets-and-gifts" target="_blank" rel="noopener">opengameart.org/content/sweets-and-gifts</a></li>
              <li><a href='https://webstockreview.net/image/snowball-clipart/18900.html?no1' target="_blank" rel="noopener">https://webstockreview.net</a>,</li>
              <li><a href="https://www.jing.fm/iclip/ihTobR_bag-of-coal-clipart-2-by-angela-cartoon/" target="_blank" rel="noopener">jing.fm/iclip/ihTobR_bag-of-coal-clipart-2-by-angela-cartoon/</a></li>
              <li><a href="https://www.pikpng.com/pngvi/Tibwox_santa-claus-png-cute-santa-claus-clipart-transparent/" target="_blank" rel="noopener">Santa Claus Png - Cute Santa Claus Clipart Transparent Png @pikpng.com</a></li>
              <li><a href="https://www.pikpng.com/pngvi/iJihJTx_client-payday-2-santa-mask-clipart/" target="_blank" rel="noopener">Client - Payday 2 Santa Mask Clipart @pikpng.com</a></li>
              <li><a href="https://opengameart.org/content/thief-boy-game-character-sprites" target="_blank" rel="noopener">opengameart.org/content/thief-boy-game-character-sprites</a></li>
            </ul>
          </p>
        </section>
      </details>
    </main>
  </div>
</template>

<script lang="ts">
import { start } from '../game/gameControl'
import HighScore from './HighScore.vue'
import { nightmode } from '../composable/gameReactive'

export default {
  components: { HighScore },
  setup(){
    return { start, nightmode }
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
  justify-content: space-around;
}

#nightmode-toggle{
  background: var(--toggle-color, rgb(232 102 130));
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
}

#nightmode-toggle span{
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

#nightmode-toggle input{
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