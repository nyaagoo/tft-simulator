<template lang="pug">
  .composition
    .composition-container
      .title
        span {{ composition.name }}
      .tier
        span S
      .synergy
        span {{ composition.synergy }}
      .champion-list-container
        i.icon-champion(v-for="champion in composition.championList" :key="champion.id" :class="`icon-${champion.id.toLowerCase()}`")
      .information
        p {{ composition.patch.create }}
        p {{ composition.patch.valid }}
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import router from "@/router";
import { Composition } from "@/models/composition";

@Component({
  name: "comp",
  components: {}
})
export default class CompositionItem extends Vue {
  @Prop({ required: true }) composition!: Composition;
}
</script>
<style lang="stylus" scoped>
.composition
  border 2px solid #8f8
  border-radius 8px
  min-width 1280px
  max-width 1980px
.composition-container
  display flex
  align-items center
.title
  flex 1 1 240px
.tier
  flex 1 1 40px
.synergy
  flex 1 1 120px
.champion-list-container
  flex 1 1 800px
  display flex
  align-items center
  justify-content center
.icon-champion + .icon-champion
  margin-left 8px
.information
  flex 0 0 80px
.icon-champion
  border-radius 100px
</style>
