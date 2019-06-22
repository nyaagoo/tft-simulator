<template lang="pug">
  .champion-thumbnail(@click="championPick(champ)")
    .champion-img-wrapper.mb-2
      img.champion-img(:class="{ 'grayscale': !isPicked(champ.id) }" :style="{ 'outline-color': `${costColor.get(champ.cost)}` }")(:src="champ.image" :alt="champ.name")
    p.ma-0.text-truncate {{ champ.name }}
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import router from "@/router";
import { Champion, costColor } from "@/models/champion";
import { champion } from "@/store/index";

@Component({
  name: "champion-thumbnail",
  components: {}
})
export default class components extends Vue {
  @Prop({ required: true }) champ!: Champion;
  costColor: Map<number, string> = costColor;

  championPick(c: Champion) {
    champion.ToggleChampionPicked(c);
  }
  isPicked(id: number): boolean {
    return champion.championPicked.some(picked => picked.id === id);
  }
}
</script>
<style lang="stylus" scoped>
.champion-thumbnail
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
</style>
