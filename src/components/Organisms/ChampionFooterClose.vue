<template lang="pug">
  .footer-close
    .champion-thumbnail.champion-img-wrapper(v-for="champion in championPicked" :key="`champion${champion.id}`" @click="removeChampion(champion)")
      i.icon-champion.outline(:class="[`icon-${champion.id.toLowerCase()}`]" :style="{ 'outline-color': `${costColor.get(champion.cost)}` }")
    .champion-thumbnail(v-for="index in (maxCount - championPicked.length)" :key="`index${index}`")
      i.icon-champion.icon-undefined
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import { champion } from "@/store/index";
import { Champion, costColor } from "@/models/champion";

@Component({
  name: "footer-close",
  components: {}
})
export default class ChampionFooterClose extends Vue {
  costColor: Map<number, string> = costColor;
  get maxCount(): number {
    return champion.maxCountPickChampion;
  }
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
  flex-wrap wrap
  justify-content center
  margin auto
.champion-thumbnail
  padding 8px
.icon-champion
  height 48px
  width 48px
.outline
  outline-style solid
  outline-width 3px
  outline-offset -3px
.champion-img-wrapper
  position relative
  transition .25s ease
.champion-img-wrapper:hover
  cursor pointer
  filter grayscale(20%)
.champion-img-wrapper::after
  content url('/img/icon/remove_circle.png')
  position absolute
  top 12px
  left 14px
  opacity 0
  transition opacity .25s ease
  filter invert(100%)
.champion-img-wrapper:hover::after
  opacity 1
</style>
