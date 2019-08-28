<template lang="pug">
  .champion-footer
    transition(name="component-fade" mode="out-in")
      component(:is="footerChoose()")
    .toggle-footer-btn
      v-btn(color="primary" dark @click="toggleFooter") Active Synergy

</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import { Champion, costColor } from "@/models/champion";
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

  footerChoose() {
    return this.isOpen ? "footer-open" : "footer-close";
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
  display flex
  justify-content center
  text-align left
  width 100%
  flex-wrap wrap
  font-size .9rem
.toggle-footer-btn
  display flex
  position absolute
  top -50px
.component-fade-enter-active, .component-fade-leave-active
  transition all .12s ease
.component-fade-enter
  transform translateY(250px)
.component-fade-leave-to
  transform translateY(250px)
</style>
