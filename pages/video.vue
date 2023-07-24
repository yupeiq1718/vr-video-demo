<script setup lang="ts">

const options = {
  plugins: {
    panorama: {
      clickAndDrag: true,
      clickToToggle: true,
      autoMobileOrientation: true,
      backToVerticalCenter: false,
      backToHorizonCenter: false
    }
  }
}

onMounted(() => {
  window.videojs('player', options, () => {

  })
})

</script>

<template>
  <div class="player-wrapper">
    <video
      id="player"
      class="player video-js vjs-default-skin vjs-big-play-centered"
      crossorigin="anonymous"
      preload="metadata"
      autoplay
      controls
    >
      <source poster="https://raw.githubusercontent.com/Pierrinho/elephant/master/elephant.jpg" src="https://raw.githubusercontent.com/Pierrinho/elephant/master/elephant.mp4">
    </video>
  </div>
</template>

<style scoped>
.player-wrapper {
  position: relative;
  width: 100%;
  height: 100vh;

  .player {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
}
</style>
