<template lang="pug">
  .champion-deck(@click="championPick(champ)")
    .champion-img-wrapper.pointer.mb-2
      img.champion-img(
        :class="{ 'grayscale': !isPicked(champ.id) }"
        :style="{ 'outline-color': `${costColor.get(champ.cost)}` }"
        :src="champ.image"
        :alt="champ.name")
      .champion-origin-wrapper(v-if="visibleOrigin")
        img.champion-origin(
          v-for="(o, index) in originList"
          width=20 height=20
          :src="originAllList[o].img"
          :alt="champ.name")
      .champion-class-wrapper(v-if="visibleClass")
        img.champion-class(v-for="(c, index) in classList" width=20 height=20 :src="classAllList[c].img" :alt="champ.name")
      .champion-cost-wrapper(v-if="visibleCost")
        span.champion-cost ${{ champ.cost }}
    p.ma-0.text-truncate.name {{ champ.ruby }}
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import router from "@/router";
import { Champion, costColor } from "@/models/champion";
import { champion, setting } from "@/store/index";

@Component({
  name: "champion-deck",
  components: {}
})
export default class ChampionDeck extends Vue {
  @Prop({ required: true }) champ!: Champion;
  @Prop({ required: true }) originList!: string[];
  @Prop({ required: true }) classList!: string[];
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
    champion.ToggleChampionPicked(c);
  }
  isPicked(id: number): boolean {
    return champion.championPicked.some(picked => picked.id === id);
  }
  get originAllList() {
    return champion.originList;
  }
  get classAllList() {
    return champion.classList;
  }
}
</script>
<style lang="stylus" scoped>
.champion-deck
p
  width 60px
.champion-img
  outline-style solid
  outline-width 3px
  outline-offset -3px
  heigth 60px
  width 60px
.champion-img-wrapper
  height 60px
  width 60px
  position: relative;
.grayscale
  filter: grayscale(100%);
.champion-origin-wrapper
  position absolute
  display flex
  height 20px
  width 20px
  top 0
  left 0
.champion-class-wrapper
  position absolute
  display flex
  height 20px
  width 20px
  bottom 0
  left 0
.champion-cost-wrapper
  position absolute
  bottom 0
  right 4px
.name
  font-size 10px
</style>
