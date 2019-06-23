<template lang="pug">
  .champion-footer
    .champion-thumbnail-container(:class="{'thumbnail-container-collapse': !isOpen}")
      .champion-thumbnail(v-for="champion in championPicked" :key="champion.id" @click="removeChampion(champion)")
        img.champion-img(:style="{ 'outline-color': `${costColor.get(champion.cost)}` }")(:src="champion.image" :alt="champion.name")
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
    .toggle-footer
      v-btn(color="primary" outline dark @click="toggleFooter") Active Synergy

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
  isOpen: boolean = true;

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
  background blue
.thumbnail-container-collapse
  flex 0 0 100vw
  justify-content center
  height 64px
  padding 0
.synergy-container
  flex 10000 1 680px
  min-width 680px
  background black
  padding 8px
  height 200px
.champion-thumbnail
  padding 8px
.champion-img
  outline-style solid
  outline-width 3px
  outline-offset -3px
  height 48px
  width 48px
.toggle-footer
  position absolute
  top -50px
  left 40%
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
  background #4FC3F7
  border 1px solid #E1F5FE
  border-radius 8px
.type-chip-class
  color #222222
  width 80px
  background #DCE775
  border 1px solid #F9FBE7
  border-radius 8px
ul
  list-style none
</style>
