<template lang="pug">
  .champion-side-pick
    transition-group(name="list-complete" tag="div")
      .active-origin.list-complete-item(v-for="item in activeOriginSynergy" :key="item.id")
        active-synergy-item(:type="item.type" :synergy="item")
      .active-class.list-complete-item(v-for="item in activeClassSynergy" :key="item.id")
        active-synergy-item(:type="item.type" :synergy="item")
      .inactive-origin.list-complete-item(v-for="item in inactiveOriginSynergy" :key="item.id")
        inactive-synergy-item(:type="item.type" :synergy="item")
      .inactive-class.list-complete-item(v-for="item in inactiveClassSynergy" :key="item.id")
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
.active-origin + .inactive-origin, .active-class + .inactive-class, .active-origin + .inactive-class, .active-class + .inactive-origin
  margin-top 40px
.list-complete-item
  transition all .3s
  display inline-block
  margin-right 10px
.list-complete-enter, .list-complete-leave-to
  opacity 0
  transform translateX(-30px)
</style>
