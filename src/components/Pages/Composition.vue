<template lang="pug">
  .composition-page
    tft-header
    tft-drawer
    composition-list.composition-list
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import Header from "@/components/Organisms/Header.vue";
import Drawer from "@/components/Organisms/Drawer.vue";
import CompositionList from "@/components/Organisms/CompositionList.vue";

@Component({
  name: "composition-page",
  components: {
    "tft-header": Header,
    "tft-drawer": Drawer,
    "composition-list": CompositionList
  }
})
export default class CompositionPage extends Vue {}
</script>
<style lang="stylus" scoped>
.composition-list
  padding 20px
  margin 20px
</style>
