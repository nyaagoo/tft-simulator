<template lang="pug">
  .deck-class
    h1 class
    .champion-class-container
      .champion-class-wrapper(v-for="eachClass in championListEachClass" :key="eachClass.class")
        span.class-title {{ eachClass.class }}
        .champion-wrapper(v-for="champ in eachClass.championList" :key="champ.name")
          img(:style="{ 'outline': `3px solid ${costColor.get(champ.cost)}`, 'outline-offset': '-3px' }")(height="60" width="60" :src="champ.image")
          p.ma-0.text-truncate {{ champ.name }}
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import { ChampionClass, costColor } from "@/models/champion";
import { champion } from "@/store/index";

@Component({
  name: "deck-class",
  components: {}
})
export default class DeckClass extends Vue {
  championListEachClass: ChampionClass[] = [];
  costColor: Map<number, string> = costColor;

  mounted() {
    champion.SeparateChampionDeckClass();
    this.championListEachClass = champion.championDeckClass;
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
  border 1px solid #88ff88
  border-radius 8px
  padding 8px
  margin 8px
.champion-container
  width 100px
.champion-wrapper
  p
    width 60px
  padding 4px
</style>
