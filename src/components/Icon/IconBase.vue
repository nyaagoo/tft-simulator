<template>
  <svg xmlns="http://www.w3.org/2000/svg" 
    :width="width" 
    :height="height" 
    viewBox="0 0 18 18"
    :aria-labelledby="iconName" 
    role="presentation"
  >
    <title :id="iconName" lang="en">{{iconName}} icon</title>
    <g fill="#8f8">
      <slot />
    </g>
  </svg>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  name: "champion-deck-group",
  components: {}
})
export default class Sdsafdasa extends Vue {
  @Prop({default:"box"}) iconName: string = "box";
  @Prop({default:18}) width!: number;
  @Prop({default:18}) height!: number;
  @Prop({default:"#8f8"}) iconColor: string = "#8f8";

}
</script>

<style scoped>
svg {
  display: inline-block;
  vertical-align: baseline;
}
</style>