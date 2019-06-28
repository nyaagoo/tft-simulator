<template lang="pug">
  .champion-deck-group(:style="{ 'border-color': `${borderColor}` }")
    span.class-title {{ name }}
    transition-group.champion-origin-inner(name="flip-list" tag="div")
      .champion-wrapper(v-for="champ in championList" :key="champ.name")
        champion-deck(:champ="champ" :originList="champ.origin" :classList="champ.class")
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import router from "@/router";
import { Champion } from '@/models/champion';
import ChampionDeck from "@/components/Molecules/ChampionDeck.vue";

@Component({
  name: "champion-deck-group",
  components: {
     "champion-deck": ChampionDeck
  }
})
export default class ChampionDeckGroup extends Vue {
  @Prop({ required: true }) name!: string;
  @Prop({ required: true }) championList!: Champion[];
  @Prop({ required: true }) borderColor!: string;

}
</script>
<style lang="stylus" scoped>
.champion-deck-group
  position relative
  display flex
  flex-wrap wrap
  border 1px solid #00C853
  border-radius 8px
  padding 8px
  margin 8px
.class-title
  position absolute
  top -10px
  background #303030
  padding-left 4px
  padding-right  4px
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