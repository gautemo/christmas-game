import { reactive, watchEffect } from 'vue';
import jingle from '../assets/sound/JingleBells.mp3'
import metalChristmas from '../assets/sound/metal_christmas.mp3'
import { nightmode } from './gameReactive';

const sound = reactive({
  music: false,
  soundEffects: false,
})

const music = new Audio(jingle);
music.loop = true;

watchEffect(() => {
  if(nightmode.value){
    music.src = metalChristmas
    music.volume = 0.03;
  }else{
    music.src = jingle
    music.volume = 0.02;
  }
  if (sound.music) {
    music.play();
  } else {
    music.pause();
  }
})


export { sound }