<template lang="pug">
  .comp-list
    v-btn.ml-4(outlined color="info" @click="saveComposition()")
      v-icon mdi-file-download-outline
    v-btn.ml-4(outlined color="info" @click="loadComposition()")
      v-icon mdi-file-upload-outline
    .composition-item-wrapper(v-for="item in compList" :key="item.id")
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

  saveComposition() {
    composition.SaveComposition();
  }
  loadComposition() {
    composition.LoadComposition();
  }
}
</script>
<style lang="stylus" scoped>
.composition-item-wrapper
  margin 20px
</style>
