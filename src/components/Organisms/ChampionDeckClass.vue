<template lang="pug">
  .deck-class
    h1 class
    .champion-class-container
      .champion-class-wrapper(v-for="eachClass in championListEachClass" :key="eachClass.class")
        span.class-title {{ eachClass.class }}
        transition-group.champion-origin-inner(name="flip-list" tag="div")
          .champion-wrapper(v-for="champ in eachClass.championList" :key="champ.name")
            champion-thumbnail(:champ="champ" :originList="champ.origin" :classList="champ.class")
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import { ChampionClass, costColor } from "@/models/champion";
import { champion } from "@/store/index";
import ChampionThumbnail from "@/components/Organisms/ChampionThumbnail.vue";

@Component({
  name: "deck-class",
  components: {
    "champion-thumbnail": ChampionThumbnail
  }
})
export default class DeckClass extends Vue {
  costColor: Map<number, string> = costColor;

  mounted() {
    champion.SeparateChampionDeckClass();
  }
  get championListEachClass(): ChampionClass[] {
    return champion.deckClass;
  }
}
</script>
<style lang="stylus" scoped>
.deck-class
  margin auto
  width 100vw
.champion-class-container
  display flex
  flex-wrap wrap
  padding 8px
  margin 8px
.class-title
  position absolute
  top -10px
  background #303030
  padding-left 4px
  padding-right  4px
.champion-class-wrapper
  position relative
  display flex
  flex-wrap wrap
  border 1px solid #00C853
  border-radius 8px
  padding 8px
  margin 8px
.champion-container
  width 100px
.champion-wrapper
  p
    width 60px
  padding 4px
.champion-img
  outline-style solid
  outline-width 3px
  outline-offset -3px
.champion-origin-inner
  display flex
  flex-wrap wrap
.flip-list-item
  display inline-block
.flip-list-move
  transition transform 0.4s
</style>
