<template>
  <div ref="container" />
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js'

export default {
  setup () {
    const container = ref(null)
    let scene = null
    let camera = null
    let renderer = null
    let videoTexture = null
    let videoElement = null
    const controls = null

    onMounted(() => {
      init()
      animate()
    })

    onBeforeUnmount(() => {
      // Cleanup when component is unmounted
      if (videoElement) {
        videoElement.pause()
        videoElement = null
      }
      if (renderer) {
        renderer.dispose()
        renderer.forceContextLoss()
        renderer.domElement = null
      }
      if (scene) {
        scene.dispose()
        scene = null
      }
    })

    const init = () => {
      // Initialize Three.js scene, camera, and renderer
      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      renderer = new THREE.WebGLRenderer()
      renderer.setSize(window.innerWidth, window.innerHeight)
      container.value.appendChild(renderer.domElement)
      renderer.xr.enabled = true
      document.body.appendChild(VRButton.createButton(renderer))

      // Load VR 360 video
      videoElement = document.createElement('video')
      videoElement.src = '/media/eagle-360.mp4'
      videoElement.setAttribute('webkit-playsinline', 'true')
      videoElement.setAttribute('playsinline', 'true')
      videoElement.setAttribute('crossorigin', 'anonymous')
      videoElement.setAttribute('loop', 'true')
      videoElement.play()

      // Create Three.js video texture
      videoTexture = new THREE.VideoTexture(videoElement)
      videoTexture.minFilter = THREE.LinearFilter
      videoTexture.magFilter = THREE.LinearFilter
      videoTexture.format = THREE.RGBFormat

      // Create Three.js sphere and bind the video texture to it
      const sphereGeometry = new THREE.SphereGeometry(500, 60, 40)
      sphereGeometry.scale(-1, 1, 1) // Invert the sphere to make the video inside
      const sphereMaterial = new THREE.MeshBasicMaterial({ map: videoTexture })
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
      scene.add(sphere)

      // Set the camera position
      camera.position.set(0, 0, 0)
    }

    const animate = () => {
      renderer.setAnimationLoop(render)
    }

    const render = () => {
      // Update the video texture
      if (videoTexture) { videoTexture.needsUpdate = true }

      // Update VR controls
      controls.update()

      // Render the scene
      renderer.render(scene, camera)
    }

    return {
      container,
      controls
    }
  }
}
</script>

<style>
/* Add any custom styles here if needed */
</style>
