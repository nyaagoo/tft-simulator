<template lang="pug">
  .synergy-tooltip
    .header
      i.vertical-bottom(:class="[`icon-${synergyType.toLowerCase()}`, `icon-${synergy.id.toLowerCase()}`]")
      span.synergy-type-txt {{ synergy.id }}
    p(v-for="(effect, index) in synergy.effect" :key="`effect${index}`") ({{ effect.require }}) {{ effect.bonus }}
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Synergy } from "@/models/type";
import router from "@/router";

@Component({
  name: "synergy-tooltip",
  components: {}
})
export default class SynergyTooltip extends Vue {
  @Prop({ required: true }) synergy!: Synergy;
  @Prop({ required: true }) synergyType!: "origin" | "class";
}
</script>
<style lang="stylus" scoped>
.synergy-tooltip
  width 440px
.icon-origin,
.icon-class
  height 28px
  width 28px
  padding-left 16px
.vertical-bottom
  vertical-align bottom
.header
  margin 8px 0
  font-size 24px
</style>
