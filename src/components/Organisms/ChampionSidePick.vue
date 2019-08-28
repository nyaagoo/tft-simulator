<template lang="pug">
  .champion-side-pick
    transition-group(name="list-transition" tag="div")
      .active-synergy.list-transition-item(v-for="item in activeOriginSynergy" :key="item.id")
        active-synergy-item(:type="item.type" :synergy="item")
      .inactive-synergy.list-transition-item(v-for="item in inactiveOriginSynergy" :key="item.id")
        active-synergy-item(:type="item.type" :synergy="item")
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { championPick } from "@/store/index";
import { ActiveSynergy } from "@/models/type";
import SynergyCountItem from "@/components/Organisms/SynergyCountItem.vue";
@Component({
  name: "champion-side-pick",
  components: {
    "active-synergy-item": SynergyCountItem
  }
})
export default class ChampionSideDeck extends Vue {
  get activeOriginSynergy(): ActiveSynergy[] {
    return [
      ...championPick.activeOriginSynergy,
      ...championPick.activeClassSynergy
    ]
      .filter(x => x.isActive)
      .sort((a, b) =>
        a.bonus!.tier === b.bonus!.tier ? 0 : a.bonus!.tier - b.bonus!.tier
      );
  }
  get inactiveOriginSynergy(): ActiveSynergy[] {
    return [
      ...championPick.activeOriginSynergy,
      ...championPick.activeClassSynergy
    ]
      .filter(x => !x.isActive)
      .sort((a, b) => (b.count === a.count ? 0 : b.count - a.count));
  }
}
</script>
<style lang="stylus" scoped>
.champion-side-pick
  padding-left 8px
  width 240px
.active-synergy + .inactive-synergy
  margin-top 40px
.list-transition-item
  transition all .3s
  display inline-block
.list-transition-move
  transition transform .3s
.list-transition-enter, .list-transition-leave-to
  opacity 0
  transform translateX(-30px)
.list-transition-leave-active
  position absolute
</style>
