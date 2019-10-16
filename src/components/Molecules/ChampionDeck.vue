<template lang="pug">
  .champion-deck(@click="championPick(champ)")
    .champion-img-wrapper.pointer.mb-2(:class="[{'grayscale': !isPicked(champ.id)}]")
      i.icon-champion.champion-img(:class="[`icon-${champ.id.toLowerCase()}`]" :style="{ 'outline-color': `${costColor.get(champ.cost)}`}")
      .champion-origin-wrapper(v-if="visibleOrigin && isDisplayDetail")
        i.icon-origin(v-for="(o, index) in originList" :class="`icon-${o.toLowerCase()}`")
      .champion-class-wrapper(v-if="visibleClass && isDisplayDetail")
        i.icon-class(v-for="(c, index) in classList" :class="`icon-${c.toLowerCase()}`")
      .champion-cost-wrapper(v-if="visibleCost && isDisplayDetail")
        span.champion-cost ${{ champ.cost }}
    p.ma-0.text-truncate.name(v-if="isDisplayDetail") {{ champ.name }}
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import router from "@/router";
import { Champion, costColor } from "@/models/champion";
import { championPick, setting } from "@/store/index";

@Component({
  name: "champion-deck",
  components: {}
})
export default class ChampionDeck extends Vue {
  @Prop({ required: true }) champ!: Champion;
  @Prop({ required: true }) originList!: string[];
  @Prop({ required: true }) classList!: string[];
  @Prop({ required: true }) isDisplayDetail!: boolean;
  costColor: Map<number, string> = costColor;
  get visibleOrigin() {
    return setting.visibleChampionOrigin;
  }
  get visibleClass() {
    return setting.visibleChampionClass;
  }
  get visibleCost() {
    return setting.visibleChampionCost;
  }
  championPick(c: Champion) {
    championPick.toggleChampionPicked(c);
  }
  isPicked(id: string): boolean {
    return championPick.championPicked.some(picked => picked.id === id);
  }
  get originAllList() {
    return championPick.originList;
  }
  get classAllList() {
    return championPick.classList;
  }
}
</script>
<style lang="stylus" scoped>
.champion-deck
  width 64px
.champion-img
  outline-style solid
  outline-width 3px
  outline-offset -3px
.icon-origin, .icon-class
  height 24px
  width 24px
.champion-img-wrapper
  height 64px
  position relative
  transition .25s ease
.grayscale
  filter grayscale(100%)
.champion-img-wrapper:hover
  cursor pointer
  filter grayscale(0%)
.champion-img-wrapper::after
  content url('/img/icon/remove_circle.png')
  position absolute
  top 12px
  left 14px
  opacity 0
  transition opacity .25s ease
  filter invert(100%)
.champion-img-wrapper.grayscale::after
  content url('/img/icon/add_circle.png')
  filter invert(100%)
.champion-img-wrapper:hover::after
  opacity 1
.champion-origin-wrapper
  position absolute
  display flex
  top 2px
  left 2px
.champion-class-wrapper
  position absolute
  display flex
  bottom 2px
  left 2px
.champion-cost-wrapper
  position absolute
  bottom 2px
  right 4px
.name
  font-size 10px
</style>
