<template lang="pug">
  .pick-counter.mt-1
    span.mr-3 {{ pickCount }} / {{ maxCount }}
    v-btn(text small outlined color="info" @click="decrementMaxCount()")
      icon-base(color="#2196f3")
        icon-remove
    v-btn(text small outlined color="info" @click="incrementMaxCount()")
      icon-base(color="#2196f3")
        icon-add
    v-btn.ml-4(color="error" dark outlined @click="resetPickChampion()") CLERA
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { champion } from "@/store/index";
import router from "@/router";
import IconBase from "@/components/Icon/IconBase.vue";
import IconAdd from "@/components/Icon/IconAdd.vue";
import IconRemove from "@/components/Icon/IconRemove.vue";

@Component({
  name: "pick-counter",
  components: {
    "icon-base": IconBase,
    "icon-add": IconAdd,
    "icon-remove": IconRemove
  }
})
export default class PickCoutenr extends Vue {
  get pickCount(): number {
    return champion.championPicked.length;
  }

  get maxCount(): number {
    return champion.maxCountPickChampion;
  }

  incrementMaxCount() {
    if (10 <= champion.maxCountPickChampion) return;
    const increment = champion.maxCountPickChampion + 1;
    champion.SET_MAX_COUNT_PICK_CHAMPION(increment);
  }

  decrementMaxCount() {
    if (champion.maxCountPickChampion <= 1) return;
    const decrement = champion.maxCountPickChampion - 1;
    champion.SET_MAX_COUNT_PICK_CHAMPION(decrement);
    champion.SET_CHAMPION_PICKED_LENGTH(decrement);
  }

  resetPickChampion() {
    champion.resetPickChampion();
  }
}
</script>
<style lang="stylus" scoped>
.pick-counter
  font-size 20px
  text-align center
  vertical-align bottom
</style>
