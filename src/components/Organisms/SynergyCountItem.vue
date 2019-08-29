<template lang="pug">
  .synergy-count-item
    .active-synergy(v-if="synergy.isActive")
      synergy-icon(:id="synergy.id" :name="synergy.data.name" :type="synergy.type" :tier="synergy.bonus.tier" :effectList="synergy.data.effect")
    .inactive-synergy(v-else)
      synergy-icon(:id="synergy.id" :name="synergy.data.name" :type="synergy.type" tier="none" :effectList="synergy.data.effect")
    .champion-count {{ synergy.count }}
    .synergy-detail
      .name.text-truncate {{ synergy.data.name }}
      .synergy-data
        .synergy-data-each(v-for="item in synergy.data.effect" :key="item.require") {{ item.require }}
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { ActiveSynergy } from "@/models/type";
import SynergyIcon from "@/components/Organisms/SynergyIcon.vue";

@Component({
  name: "synergy-count-item",
  components: {
    "synergy-icon": SynergyIcon
  }
})
export default class SynergyCountItemActive extends Vue {
  @Prop({ required: true }) type!: "origin" | "class";
  @Prop({ required: true }) synergy!: ActiveSynergy;
}
</script>
<style lang="stylus" scoped>
.temp
  position relative
.synergy-count-item
  display flex
  align-items center
  background #16161650
  border-radius 6px
  padding-left 8px
  margin-bottom 8px
  width 220px
.active-origin
  display flex
  align-items center
  background #16161650
  border-radius 6px
  padding-left 8px
  margin-bottom 6px
.champion-count
  font-size 24px
  margin 4px
  margin-left 14px
  padding-top 2px
  height 36px
  width 36px
  border-radius 6px
  background #393839
.name
  text-align left
  width 96px
.synergy-data
  display flex
.synergy-data-each + .synergy-data-each::before
  content '>'
.synergy-detail
  padding-left 10px
  font-size 16px
  padding-top 4px
</style>
