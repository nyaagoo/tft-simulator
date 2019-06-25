<template lang="pug">
  .champion-footer
    .champion-thumbnail-container(:class="{'thumbnail-container-collapse': !isOpen}")
      .champion-thumbnail(v-for="champion in championPicked" :key="`champion${champion.id}`" @click="removeChampion(champion)")
        img.champion-img(:style="{ 'outline-color': `${costColor.get(champion.cost)}` }")(:src="champion.image" :alt="champion.name")
      .champion-thumbnail(v-for="index in (10 - championPicked.length)" :key="`index${index}`")
        img.champion-img-undefined(src="@/assets/Champion/Undefined.png" :alt="index")
    .synergy-container(v-if="isOpen")
      ul
        li.synergy-list(v-for="synergy in activeOriginSynergy" :key="activeOriginSynergy.type")
          .synergy-item-wrapper
            .type-chip-origin {{synergy.type}}
            span {{synergy.synergy}}
        li.synergy-list(v-for="synergy in activeClassSynergy" :key="activeClassSynergy.type")
          .synergy-item-wrapper
            .type-chip-class {{synergy.type}}
            span {{synergy.synergy}}
    .toggle-footer-btn
      v-btn(color="primary" dark @click="toggleFooter") Active Synergy

</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import { champion } from "@/store/index";
import { Champion, costColor, Synergy } from "@/models/champion";

@Component({
  name: "champion-footer",
  components: {}
})
export default class ChampionFooter extends Vue {
  costColor: Map<number, string> = costColor;
  isOpen: boolean = false;

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

  toggleFooter() {
    if (this.isOpen) this.closeFooter();
    else this.openFooter();
  }
  openFooter() {
    this.isOpen = true;
  }
  closeFooter() {
    this.isOpen = false;
  }
}
</script>
<style lang="stylus" scoped>
.champion-footer
  text-align left
  width 100vw
  display flex
  flex-wrap wrap
  font-size .9rem
.champion-thumbnail-container
  display flex
  flex 1 1 336px
  flex-wrap wrap
  justify-content center
  padding 8px
  box-sizing: content-box;
  margin: 4px 16px;
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
  margin: 4px 40px 4px 16px;
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
