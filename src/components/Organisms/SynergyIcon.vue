<template lang="pug">
  .synergy-icon
    v-tooltip(right)
      template(v-slot:activator="{ on }")
        span(v-on="on")
          hexagon-icon(:tier="tier" :suffix="type" :name="id.toLowerCase()")
      synergy-tooltip(:id="id" :name="name.toLowerCase()" :type="type", :effectList="effectList")
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import router from "@/router";
import SynergyTooltip from "@/components/Molecules/SynergyTooltip.vue";
import HexagonIcon from "@/components/Atoms/HexagonIcon.vue";

@Component({
  name: "synergy-icon",
  components: {
    "hexagon-icon": HexagonIcon,
    "synergy-tooltip": SynergyTooltip
  }
})
export default class SynergyIcon extends Vue {
  @Prop({ required: true }) id!: string;
  @Prop({ required: true }) name!: string;
  @Prop({ required: true }) type!: "origin" | "class";
  @Prop({ required: true }) tier!: number;
  @Prop({ required: true }) effectList!: {
    require: number;
    bonus: string;
  }[];
}
</script>
<style lang="stylus" scoped>
.icon
  position absolute
  width 32px
  height 32px
  top -6px
  left 2px
  z-index 1
  filter brightness(.3)
.hexagon-inactive > .icon-class, .hexagon-inactive > .icon-origin
  filter brightness(1)
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
