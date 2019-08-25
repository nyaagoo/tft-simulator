<template lang="pug">
  .synergy-count-item
    .hexagon
      .icon(:class="[`icon-${synergy.id.toLowerCase()}`, `icon-${type}`]")
    .champion-count {{ synergy.count }}
    .synergy-detail
      .name.text-truncate {{ synergy.data.name }}
      .synergy-data
        .synergy-data-each(v-for="item in synergy.data.effect" :key="item.require") {{ item.require }}

</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { ActiveSynergy } from "@/models/type";

@Component({
  name: "synergy-count-item",
  components: {}
})
export default class SynergyCountItemInactive extends Vue {
  @Prop({ required: true }) type!: "origin" | "class";
  @Prop({ required: true }) synergy!: ActiveSynergy;
}
</script>
<style lang="stylus" scoped>
.synergy-count-item
  display flex
  align-items center
  background #16161650
  border-radius 6px
  padding-left 8px
  margin-bottom 8px
.icon-class, .icon-origin
  position absolute
  width 32px
  height 32px
  top -6px
  left 2px
  z-index 1
.active-origin
  display flex
  align-items center
  background #16161650
  border-radius 6px
  padding-left 8px
  margin-bottom 8px
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
</style>
