<template lang="pug">
  .footer-open
    v-layout(row wrap)
      v-flex(xs12 md5 lg4)
        .champion-thumbnail-container.mx-3
          pick-counter
          .champion-thumbnail-wrapper
            .champion-thumbnail(v-for="champion in championPicked" :key="`champion${champion.id}`" @click="removeChampion(champion)")
              champion-deck(:champ="champion" :originList="champion.origin" :classList="champion.class" :isDisplayDetail="false")
            .champion-thumbnail(v-for="index in (maxCount - championPicked.length)" :key="`index${index}`")
              i.icon-champion.icon-undefined
      v-flex(xs12 md7 lg8 grow shrink)
        .synergy-container.mx-3
          ul.pl-1
            li.synergy-list.pa-1(v-for="synergy in activeOriginSynergy" :key="activeOriginSynergy.type")
              .synergy-item-wrapper
                span.type-chip-origin {{synergy.type}}
                span.synegy-description.pl-2 {{synergy.synergy}}
            li.synergy-list.pa-1(v-for="synergy in activeClassSynergy" :key="activeClassSynergy.type")
              .synergy-item-wrapper
                span.type-chip-class {{synergy.type}}
                span.synegy-description.pl-2 {{synergy.synergy}}
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { championPick } from "@/store/index";
import { Champion, costColor, ActiveSynergy } from "@/models/champion";
import router from "@/router";
import PickCoutenr from "@/components/Organisms/ChampionPickCounter.vue";
import ChampionDeck from "@/components/Molecules/ChampionDeck.vue";

@Component({
  name: "footer-open",
  components: {
    "pick-counter": PickCoutenr,
    "champion-deck": ChampionDeck
  }
})
export default class ChampionFooterOpen extends Vue {
  costColor: Map<number, string> = costColor;

  get championPicked(): Champion[] {
    return championPick.championPicked;
  }

  get maxCount(): number {
    return championPick.maxCountPickChampion;
  }

  get activeOriginSynergy(): ActiveSynergy[] {
    return championPick.activeOriginSynergy;
  }

  get activeClassSynergy(): ActiveSynergy[] {
    return championPick.activeClassSynergy;
  }

  removeChampion(targetChampion: Champion) {
    championPick.RemoveChampionPicked(targetChampion);
  }
}
</script>
<style lang="stylus" scoped>
.footer-open
  width 100%
.champion-footer
  text-align left
  width 100vw
  display flex
  flex-wrap wrap
.champion-thumbnail-container
  background #212121
  border 2px solid #757575
  border-radius 24px
.synergy-container
  font-size 14px
  color #ffffffdd
  padding 8px
  min-height 240px
  background #212121
  border 2px solid #757575
  border-radius 24px
.champion-thumbnail-wrapper
  display grid
  grid-template-columns repeat(5, 80px)
  grid-template-rows repeat(2, 94px)
  align-items center
  justify-content center
  @media screen and (max-width: 960px)
    display flex
    flex-wrap wrap
    background transparent
.champion-thumbnail
  padding 8px
.champion-img
  outline-style solid
  outline-width 3px
  outline-offset -3px
  height 64px
  width 64px
  @media screen and (max-width: 960px)
    height 48px
    width 48px
.champion-img-undefined
  height 64px
  width 64px
  @media screen and (max-width: 960px)
    height 48px
    width 48px
.toggle-footer-btn
  position absolute
  top -50px
  left calc(50vw - 85px)
.synergy-item-wrapper
  display flex
  align-items center
  text-align left
  padding 1px
.type-chip-origin
  font-size 11px
  font-weight bold
  text-align center
  color #222222
  flex 0 0 80px
  height 20px
  background #00B8D4
  border 1px solid #E1F5FE
  border-radius 8px
.type-chip-class
  font-size 11px
  font-weight bold
  text-align center
  color #222222
  flex 0 0 80px
  height 20px
  background #00C853
  border 1px solid #F9FBE7
  border-radius 8px
.synegy-description
  flex 1 1 auto
ul
  list-style none
</style>
