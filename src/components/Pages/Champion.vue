<template lang="pug">
  .champion-page
    router-link(to="/") Champion
    span  | 
    router-link(to="/item") Item
    champion-template
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import ChampionTemplate from "@/components/Templates/Champion.vue";

@Component({
  components: {
    "champion-template": ChampionTemplate
  }
})
export default class ChampionPage extends Vue {}
</script>
<style lang="stylus" scoped></style>
