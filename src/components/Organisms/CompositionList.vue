<template lang="pug">
  .comp-list
    .composition-item-wrapper(v-for="(item, index) in compList" :key="`item.id${index}`")
      composition-item(:composition="item")
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import { composition } from "@/store/index";
import { Composition } from "@/models/composition";
import CompositionItem from "@/components/Organisms/CompositionItem.vue";

@Component({
  name: "comp-list",
  components: {
    "composition-item": CompositionItem
  }
})
export default class CompositionList extends Vue {
  get compList(): Composition[] {
    return composition.compositionList;
  }
  created() {
    composition.LoadComposition();
  }
}
</script>
<style lang="stylus" scoped>
.composition-item-wrapper
  margin 20px
</style>
