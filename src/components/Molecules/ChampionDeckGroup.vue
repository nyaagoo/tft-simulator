<template lang="pug">
  .champion-deck-group.px-3(:style="{'borderColor': borderColor}")
    .class-title
      v-tooltip(top)
        template(v-slot:activator="{ on }")
          span(v-on="on")
            span {{ synergy.name }}
            span.tooltip-container.synergy-description.mx-1(v-for="(item,index) in synergy.effect" :key="`${synergy.id}${index}`") ({{ item.require }})
        synergy-tooltip(:synergy="synergy", :synergyType="synergyType")
    transition-group.champion-origin-inner(name="flip-list" tag="div")
      .champion-wrapper(v-for="champion in championList" :key="champion.name")
        champion-deck(:champ="champion" :originList="champion.origin" :classList="champion.class" :isDisplayDetail="true")
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import router from "@/router";
import { Champion } from "@/models/champion";
import { Synergy } from "@/models/type";
import ChampionDeck from "@/components/Molecules/ChampionDeck.vue";
import SynergyTooltip from "@/components/Molecules/SynergyTooltip.vue";

@Component({
  name: "champion-deck-group",
  components: {
    "champion-deck": ChampionDeck,
    "synergy-tooltip": SynergyTooltip
  }
})
export default class ChampionDeckGroup extends Vue {
  @Prop({ required: true }) championList!: Champion[];
  @Prop({ required: true }) synergy!: Synergy;
  @Prop({ required: true }) borderColor!: string;
  @Prop({ required: true }) synergyType!: "class" | "origin";
}
</script>
<style lang="stylus" scoped>
.champion-deck-group
  position relative
  display flex
  flex-wrap wrap
  border 1px solid
  border-radius 8px
  padding 8px
.class-title
  font-size .8rem
  position absolute
  top -10px
  left 12px
  background #424242
.champion-container
  width 100px
.tooltip-type
  max-width 400px
.champion-wrapper
  p
    width 60px
  padding 4px
.champion-img
  outline-style solid
  outline-width 3px
  outline-offset -3px
.champion-origin-inner
  display flex
  flex-wrap wrap
.flip-list-item
  display inline-block
.flip-list-move
  transition transform .4s
.tooltip-container .tooltip
  visibility hidden
  width 400px
  background-color black
  color #fff
  text-align center
  padding 5px 0
  border-radius 6px
  position absolute
  z-index 1
  bottom 100%
  left 50%
  margin-left -200px
.tooltip-container:hover .tooltip
  visibility visible
</style>
