<template lang="pug">
  .deck-favorite
    h1 favorite

</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import ChampionThumbnail from "@/components/Organisms/ChampionThumbnail.vue";

@Component({
  name: "deck-favorite",
  components: {
    "champion-thumbnail": ChampionThumbnail}
})
export default class DeckFavorite extends Vue {}
</script>
<style lang="stylus" scoped>
.deck-favorite
  margin auto
  width 100vw
</style>