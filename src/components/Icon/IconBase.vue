<template lang="pug">
  svg(xmlns='http://www.w3.org/2000/svg', :width='width', :height='height', viewBox='0 0 24 24', :aria-labelledby='name', role='presentation')
    title(:id='name', lang='en') {{ name }} icon
    g(:fill='color')
      slot
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  name: "icon-base",
  components: {}
})
export default class IconBase extends Vue {
  @Prop({ default: "box" }) name!: string;
  @Prop({ default: 24 }) width!: number;
  @Prop({ default: 24 }) height!: number;
  @Prop({ default: "#ffffff" }) color!: string;
}
</script>

<style lang="stylus" scoped>
svg
  display inline-block
  vertical-align baseline
</style>
