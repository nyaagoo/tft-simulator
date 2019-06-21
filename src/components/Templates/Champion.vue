<template lang="pug">
  .champion-template
    h1 origin
    .champion-origin-container
      .champion-origin-wrapper(v-for="origin in championListEachOrigin" :key="origin.origin")
        span.origin-title {{ origin.origin }}
        .champion-wrapper(v-for="champ in origin.championList" :key="champ.name")
          img(:style="{ 'outline': `3px solid ${costColor.get(champ.cost)}`, 'outline-offset': '-3px' }")(height="60" width="60" :src="champ.image")
          p.ma-0.text-truncate {{ champ.name }}
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
import {
  ChampionOrigin,
  ChampionClass,
  costColor,
  originSynergy,
  classSynergy
} from "@/models/champion";
import router from "@/router";
import { champion } from "@/store/index";

@Component({
  name: "champion-template",
  components: {}
})
export default class ChampionTemplate extends Vue {
  championListEachOrigin: ChampionOrigin[] = [];
  championListEachClass: ChampionClass[] = [];
  costColor: Map<number, string> = costColor;

  mounted() {
    champion.SeparateChampionDeckOrigin();
    this.championListEachOrigin = champion.championDeckOrigin;
    champion.SeparateChampionDeckClass();
    this.championListEachClass = champion.championDeckClass;
  }
}
</script>
<style lang="stylus" scoped>
.champion-template
  margin auto
  height calc(100vh - 200px)
  width 100vw
  display flex
  flex-wrap wrap
.champion-class-container
.champion-origin-container
  display flex
  flex-wrap wrap
  padding 8px
  margin 8px
.class-title
.origin-title
  position absolute
  top -10px
  background #303030
  padding-left 4px
  padding-right  4px
.champion-class-wrapper
.champion-origin-wrapper
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
