<template lang="pug">
  .champion-side-pick
    .active-origin(v-for="item in activeOriginSynergy" key="item.synergy")
      active-synergy-item(:type="item.type" :synergy="item")
    .active-origin(v-for="item in activeClassSynergy" key="item.synergy")
      active-synergy-item(:type="item.type" :synergy="item")
    .inactive-origin(v-for="item in inactiveOriginSynergy" key="item.synergy")
      inactive-synergy-item(:type="item.type" :synergy="item")
    .inactive-origin(v-for="item in inactiveClassSynergy" key="item.synergy")
      inactive-synergy-item(:type="item.type" :synergy="item")
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { championPick } from "@/store/index";
import { ActiveSynergy } from "@/models/type";
import ActiveSynergyCountItem from "@/components/Organisms/SynergyCountItemActive.vue";
import InactiveSynergyCountItem from "@/components/Organisms/SynergyCountItemInactive.vue";

@Component({
  name: "champion-side-pick",
  components: {
    "active-synergy-item": ActiveSynergyCountItem,
    "inactive-synergy-item": InactiveSynergyCountItem
  }
})
export default class ChampionSideDeck extends Vue {
  get activeOriginSynergy(): ActiveSynergy[] {
    return championPick.activeOriginSynergy.filter(x => x.isActive);
  }
  get inactiveOriginSynergy(): ActiveSynergy[] {
    return championPick.activeOriginSynergy.filter(x => !x.isActive);
  }
  get activeClassSynergy(): ActiveSynergy[] {
    return championPick.activeClassSynergy.filter(x => x.isActive);
  }
  get inactiveClassSynergy(): ActiveSynergy[] {
    return championPick.activeClassSynergy.filter(x => !x.isActive);
  }
}
</script>
<style lang="stylus" scoped>
.champion-side-pick
  padding-left 20px
  width 240px
.active-origin + .inactive-origin
  margin-top 40px
</style>
