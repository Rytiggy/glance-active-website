<template>
  <q-page class="">
    <div class="text-center q-my-xl">
      <!-- <div>
        <img alt="Quasar logo" src="" style="height: 200px" />
      </div> -->
      <div class="text-h1">
        Glance
        <span class="text-primary">Active</span>
      </div>
      <div class="subtitle">
        Glance Actice is a watchface for Fitbit devices that lets you see
        <div>your blood sugars at a glance.</div>
      </div>
    </div>
    <div class="flex flex-center">
      <img
        class="showcase-image"
        src="~assets/glance-active-showcase.png"
        alt="Hero"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "LandingPage",
});
</script>

<style scoped>
.showcase-image {
  width: 100%;
  /* max-width: 500px; */
}
</style>
>
