<template lang="pug">
  .pick-counter
    span.mr-3 {{ pickCount }} / {{ maxCount }}
    v-btn(flat icon small outline color="info" @click="decrementMaxCount()")
      v-icon remove
    v-btn(flat icon small outline color="info" @click="incrementMaxCount()")
      v-icon add
    v-btn(color="error" dark outline @click="resetPickChampion()") CLERA
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { champion } from "@/store/index";
import router from "@/router";

@Component({
  name: "pick-counter",
  components: {}
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
