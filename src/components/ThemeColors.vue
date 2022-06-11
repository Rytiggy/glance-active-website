<template>
  <div class="inline">
    <div class="pill" :style="`background: ${props.primary}`"></div>
    <div class="pill" :style="`background: ${props.secondary}`"></div>
    <div class="pill" :style="`background: ${props.tertiary}`"></div>
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: ["primary", "secondary", "tertiary"],
  setup(props) {
    return {
      props,
    };
  },
});
</script>
<style scoped>
.pill {
  width: 14px;
  height: 32px;
  transform: rotate(30deg);
  border-radius: 10px;
  margin: 0 2.5px;
  display: inline-block;
}
</style>
