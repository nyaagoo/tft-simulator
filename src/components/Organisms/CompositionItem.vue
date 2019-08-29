<template lang="pug">
  .composition
    .composition-container
      .title
        span {{ composition.name }}
      .tier
        span S
      .synergy
        span.ml-1(v-for="synergy in activeSynergyList" :key="synergy.id")
          synergy-icon(:id="synergy.id" :name="synergy.data.name" :type="synergy.type" :tier="synergy.bonus.tier" :effectList="synergy.data.effect")
      draggable(class="list-group" tag="div" v-model="composition.championList" v-bind="dragOptions" @start="drag = true" @end="drag = false")
        transition-group.champion-list-container(type="transition" :name="!drag ? 'flip-list' : null")
          .icon-champion(v-for="(champion, index) in composition.championList" :key="champion.champion.id" :class="[`icon-${champion.champion.id.toLowerCase()}`]")
      .information
        p {{ composition.patch.create }}
        p {{ composition.patch.valid }}
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import router from "@/router";
import { Composition } from "@/models/composition";
import draggable from "vuedraggable";
import { ActiveSynergy } from "@/models/type";
import SynergyIcon from "@/components/Organisms/SynergyIcon.vue";
@Component({
  name: "comp",
  components: {
    draggable: draggable,
    "synergy-icon": SynergyIcon
  }
})
export default class CompositionItem extends Vue {
  @Prop({ required: true }) composition!: Composition;
  drag: boolean = false;
  dragOptions = {
    animation: 200,
    group: "description",
    disabled: false,
    ghostClass: "ghost"
  };

  get activeSynergyList(): ActiveSynergy[] {
    return this.composition.synergy.filter(x => x.isActive);
  }
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
  display flex
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
.icon-list-item
  height 64px
  width 64px
  background blue
  border-radius 8px
  margin 2px
</style>
