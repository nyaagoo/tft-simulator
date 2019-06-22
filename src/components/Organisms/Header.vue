<template lang="pug">
  .tft-header
    v-toolbar(app)
        v-toolbar-title.white--text TFT Simulator
        v-spacer
        router-link(to="/") Champion
        span  | 
        router-link(to="/item") Item
        v-btn(icon='')
          v-icon search
        v-btn(icon='')
          v-icon apps
        v-btn(icon='')
          v-icon refresh
        v-btn(icon='')
          v-icon more_vert
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";

@Component({
  name: "tft-header",
  components: {}
})
export default class TFTHeader extends Vue {}
</script>
<style lang="stylus" scoped></style>
