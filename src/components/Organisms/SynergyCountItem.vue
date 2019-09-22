<template lang="pug">
  .synergy-count-item
    v-tooltip(right v-if="synergy.isActive" )
      template(v-slot:activator="{ on }")
        .hexagon.hexagon-active(v-on="on" :class="`tier-${synergy.bonus.tier}`")
          .icon(:class="[`icon-${synergy.id.toLowerCase()}`, `icon-${type}`]")
      synergy-tooltip(:synergy="synergy.data", :synergyType="synergy.type")
    v-tooltip(right v-else)
      template(v-slot:activator="{ on }")
        .hexagon.hexagon-inactive(v-on="on")
          .icon(:class="[`icon-${synergy.id.toLowerCase()}`, `icon-${type}`]")
      synergy-tooltip(:synergy="synergy.data", :synergyType="synergy.type")
    .champion-count {{ synergy.count }}
    .synergy-detail
      .name.text-truncate {{ synergy.data.name }}
      .synergy-data
        .synergy-data-each(v-for="item in synergy.data.effect" :key="item.require") {{ item.require }}
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { ActiveSynergy } from "@/models/type";
import SynergyTooltip from "@/components/Molecules/SynergyTooltip.vue";

@Component({
  name: "synergy-count-item",
  components: {
    "synergy-tooltip": SynergyTooltip
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
.icon-class, .icon-origin
  position absolute
  width 32px
  height 32px
  top -6px
  left 2px
  z-index 1
.hexagon-inactive > .icon-class, .hexagon-inactive > .icon-origin
  filter brightness(.6)
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
.hexagon
  text-align left
  position relative
  width 36px
  height 20.78px
  background-color #0c0c0c
  margin 10.39px 0
.hexagon:before, .hexagon:after
  content ''
  position absolute
  width 0
  border-left 18px solid transparent
  border-right 18px solid transparent
.hexagon:before
  bottom 100%
  border-bottom 10.39px solid #0c0c0c
.hexagon:after
  top 100%
  width 0
  border-top 10.39px solid #0c0c0c
.tier-1
  background-color #ffb93b
.tier-1:before
  border-bottom-color #ffb93b
.tier-1:after
  border-top-color #ffb93b
.tier-2
  background-color #92b1bd
.tier-2:before
  border-bottom-color #92b1bd
.tier-2:after
  border-top-color #92b1bd
.tier-3
  background-color #ca9372
.tier-3:before
  border-bottom-color #ca9372
.tier-3:after
  border-top-color #ca9372
</style>
