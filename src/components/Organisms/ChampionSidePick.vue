<template lang="pug">
  .champion-side-pick
    p(v-for="item in activeOriginSynergy" key="item.synergy") {{item.count}}
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import { championPick } from "@/store/index";
import { ActiveSynergy } from "@/models/type";

@Component({
  name: "champion-side-pick",
  components: {}
})
export default class ChampionSideDeck extends Vue {
  get activeOriginSynergy(): ActiveSynergy[] {
    return championPick.activeOriginSynergy;
  }

  get activeClassSynergy(): ActiveSynergy[] {
    return championPick.activeClassSynergy;
  }
}
</script>
<style lang="stylus" scoped>
.champion-side-pick
  background red
  height 200px
  width 200px
</style>
