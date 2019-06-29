<template lang="pug">
  .champion-deck-group.px-3(:style="{'borderColor': borderColor}")
    .class-title
      span {{ groupDescription.name }}
      span.synergy-description.mx-1(v-for="(item, index) in groupDescription.synergy" :key="`${groupDescription.id}${index}`") ({{item.require}})
    transition-group.champion-origin-inner(name="flip-list" tag="div")
      .champion-wrapper(v-for="champion in championList" :key="champion.name")
        champion-deck(:champ="champion" :originList="champion.origin" :classList="champion.class")
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import router from "@/router";
import { Champion } from "@/models/champion";
import ChampionDeck from "@/components/Molecules/ChampionDeck.vue";
import { ClassOriginData } from "@/models/type";

@Component({
  name: "champion-deck-group",
  components: {
    "champion-deck": ChampionDeck
  }
})
export default class ChampionDeckGroup extends Vue {
  @Prop({ required: true }) championList!: Champion[];
  @Prop({ required: true }) groupDescription!: ClassOriginData;
  @Prop({ required: true }) borderColor!: string;
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
  margin 8px
.class-title
  font-size 0.8rem
  position absolute
  top -10px
  left 12px
  background #303030
.champion-container
  width 100px
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
  transition transform 0.4s
</style>
