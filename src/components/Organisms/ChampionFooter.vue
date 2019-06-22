<template lang="pug">
  .champion-footer
    .champion-thumbnail-container
      .champion-thumbnail(v-for="champion in championPicked" :key="champion.id" @click="removeChampion(champion)")
        img.champion-img(:style="{ 'outline-color': `${costColor.get(champion.cost)}` }")(:src="champion.image" :alt="champion.name")
    .synergy-container
      ul
        li(v-for="synergy in activeOriginSynergy" :key="activeOriginSynergy.type") {{synergy.type}}:{{synergy.synergy}}
        li(v-for="synergy in activeClassSynergy" :key="activeClassSynergy.type") {{synergy.type}}:{{synergy.synergy}}
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import { champion } from "@/store/index";
import { Champion, costColor, Synergy } from "@/models/champion";

@Component({
  name: "champion-footer",
  components: {}
})
export default class ChampionFooter extends Vue {
  costColor: Map<number, string> = costColor;

  get championPicked(): Champion[] {
    return champion.championPicked;
  }

  get activeOriginSynergy(): Synergy[] {
    return champion.activeOriginSynergy;
  }

  get activeClassSynergy(): Synergy[] {
    return champion.activeClassSynergy;
  }

  removeChampion(targetChampion: Champion) {
    champion.RemoveChampionPicked(targetChampion);
  }
}
</script>
<style lang="stylus" scoped>
.champion-footer
  text-align left
  background red
  height 160px
  width 100vw
  display flex
.champion-thumbnail-container
  display flex
  flex 0 0 336px
  flex-wrap wrap
  height 100%
  padding 8px
  background blue
.synergy-container
  flex 1 1 100px
  min-width 300px
  background green

.champion-thumbnail
  padding 8px
.champion-img
  outline-style solid
  outline-width 3px
  outline-offset -3px
  height 48px
  width 48px
</style>
