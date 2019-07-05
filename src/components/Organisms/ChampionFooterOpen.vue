<template lang="pug">
  .footer-open
    v-layout(row wrap)
      v-flex(xs12 md4)
        .champion-thumbnail-container.ma-4
          .champion-thumbnail(v-for="champion in championPicked" :key="`champion${champion.id}`" @click="removeChampion(champion)")
            img.champion-img(:style="{ 'outline-color': `${costColor.get(champion.cost)}` }")(:src="champion.image" :alt="champion.name")
          .champion-thumbnail(v-for="index in (10 - championPicked.length)" :key="`index${index}`")
            img.champion-img-undefined(src="/img/Champion/Undefined.png" :alt="index")
      v-flex(xs12 md8 grow)
        .synergy-container.ma-4
          ul
            li.synergy-list(v-for="synergy in activeOriginSynergy" :key="activeOriginSynergy.type")
              .synergy-item-wrapper
                .type-chip-origin {{synergy.type}}
                span {{synergy.synergy}}
            li.synergy-list(v-for="synergy in activeClassSynergy" :key="activeClassSynergy.type")
              .synergy-item-wrapper
                .type-chip-class {{synergy.type}}
                span {{synergy.synergy}}
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { champion } from "@/store/index";
import { Champion, costColor, Synergy } from "@/models/champion";
import router from "@/router";

@Component({
  name: "footer-open",
  components: {}
})
export default class ChampionFooterOpen extends Vue {
  costColor: Map<number, string> = costColor;

  get championPicked(): Champion[] {
    return champion.championPicked;
  }

  get activeOriginSynergy(): Synergy[] {
    return champion.activeOriginSynergy;
  }

  get activeClassSynergy(): Synergy[] {
    return champion.activeClassSynergy;
  }

  removeChampion(targetChampion: Champion) {
    champion.RemoveChampionPicked(targetChampion);
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
  font-size .9rem
.champion-thumbnail-container
  display flex
  flex-wrap wrap
  justify-content center
  padding 8px
  background #263238
.thumbnail-container-collapse
  flex 0 0 90vw
  justify-content center
  align-items center
  padding 0
  margin auto
  background transparent
.synergy-container
  flex 10000 1 600px
  min-width 600px
  padding 8px
  height 200px
  box-sizing border-box
  background #263238
.champion-thumbnail
  padding 8px
.champion-img
  outline-style solid
  outline-width 3px
  outline-offset -3px
  height 48px
  width 48px
.champion-img-undefined
  height 48px
  width 48px
.toggle-footer-btn
  position absolute
  top -50px
  left calc(50vw - 85px)
.synergy-list
  line-height 1.7
.synergy-item-wrapper
  display flex
  text-align center
  height 20px
  padding 1px
  span
    margin-left 8px
.type-chip-origin
  color #222222
  width 80px
  background #00B8D4
  border 1px solid #E1F5FE
  border-radius 8px
.type-chip-class
  color #222222
  width 80px
  background #00C853
  border 1px solid #F9FBE7
  border-radius 8px
ul
  list-style none
</style>