<template lang="pug">
  .champion-footer
    footer-close(v-if="!isOpen")
    footer-open(v-else)
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
  components: {
    "footer-close": () =>
      import("@/components/Organisms/ChampionFooterClose.vue"),
    "footer-open": () => import("@/components/Organisms/ChampionFooterOpen.vue")
  }
})
export default class ChampionFooter extends Vue {
  costColor: Map<number, string> = costColor;
  isOpen: boolean = false;

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
  width 100%
  display flex
  flex-wrap wrap
  font-size .9rem
.toggle-footer-btn
  position absolute
  top -50px
  left calc(50vw - 85px)
</style>
