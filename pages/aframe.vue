<script setup lang="ts">
import 'aframe'

const vrVideoUrl = '/media/eagle-360.mp4'

</script>

<template>
  <div class="m-2 relative w-full h-[600px]">
    <a-scene embedded class="w-[800px] h-[600px]">
      <a-assets>
        <video id="video" :src="vrVideoUrl" loop="true" autoplay crossorigin="anonymous" />
      </a-assets>
      <a-videosphere src="#video" rotation="0 180 0" />
    </a-scene>
  </div>
</template>
