<template lang="pug">
  .champion-page
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
