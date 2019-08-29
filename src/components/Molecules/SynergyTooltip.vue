<template lang="pug">
  .synergy-tooltip
    .header
      i.vertical-bottom(:class="[`icon-${type.toLowerCase()}`, `icon-${id.toLowerCase()}`]")
      span.synergy-type-txt {{ name }}
    p(v-for="(effect, index) in effectList" :key="`effect${index}`") ({{ effect.require }}) {{ effect.bonus }}
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import router from "@/router";

@Component({
  name: "synergy-tooltip",
  components: {}
})
export default class SynergyTooltip extends Vue {
  @Prop({ required: true }) id!: string;
  @Prop({ required: true }) name!: string;
  @Prop({ required: true }) type!: "origin" | "class";
  @Prop({ required: true }) effectList!: {
    require: number;
    bonus: string;
  }[];
}
</script>
<style lang="stylus" scoped>
.synergy-tooltip
  width 440px
.icon-origin, .icon-class
  height 28px
  width 28px
  padding-left 16px
.vertical-bottom
  vertical-align bottom
.header
  margin 8px 0
  font-size 24px
</style>
