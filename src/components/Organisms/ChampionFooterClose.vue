<template lang="pug">
  .footer-close
    p aa
    i.icon.icon-brawler
    .champion-thumbnail(v-for="champion in championPicked" :key="`champion${champion.id}`" @click="removeChampion(champion)")
      img.champion-img(:style="{ 'outline-color': `${costColor.get(champion.cost)}` }")(:src="champion.image" :alt="champion.name")
    .champion-thumbnail(v-for="index in (10 - championPicked.length)" :key="`index${index}`")
      img.champion-img-undefined(src="/img/Champion/Undefined.png" :alt="index")
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import { champion } from "@/store/index";
import { Champion, costColor, Synergy } from "@/models/champion";

@Component({
  name: "footer-close",
  components: {}
})
export default class ChampionFooterClose extends Vue {
  costColor: Map<number, string> = costColor;
  get championPicked(): Champion[] {
    return champion.championPicked;
  }
  removeChampion(targetChampion: Champion) {
    champion.RemoveChampionPicked(targetChampion);
  }
}
</script>
<style lang="stylus" scoped>
.footer-close
  display flex
  justify-content center
  margin auto
.champion-thumbnail
  padding 8px
.champion-img
  outline-style solid
  outline-width 3px
  outline-offset -3px
  height 48px
  width 48px
.champion-img-undefined
  height 48px
  width 48px
.icon
  background-image url("/img/champion-sprite.png")
  display inline-block
.icon-assassin
  width 32px
  height 32px
  background-position 0px 0px
.icon-blademaster
  width 32px
  height 32px
  background-position -32px 0px
.icon-brawler
  width 32px
  height 32px
  background-position 0px -32px
</style>
