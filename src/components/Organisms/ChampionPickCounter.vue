<template lang="pug">
  .pick-counter
    span.mr-3 {{ pickCount }} / {{ maxCount }}
    v-btn(flat icon small outlined color="info" @click="decrementMaxCount()")
      icon-base(color="#2196f3")
        icon-remove
    v-btn(flat icon small outlined color="info" @click="incrementMaxCount()")
      icon-base(color="#2196f3")
        icon-add
    v-btn(color="error" dark outlined @click="resetPickChampion()") CLERA
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { championPick } from "@/store/index";
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
    return championPick.championPicked.length;
  }

  get maxCount(): number {
    return championPick.maxCountPickChampion;
  }

  incrementMaxCount() {
    if (10 <= championPick.maxCountPickChampion) return;
    const increment = championPick.maxCountPickChampion + 1;
    championPick.SET_MAX_COUNT_PICK_CHAMPION(increment);
  }

  decrementMaxCount() {
    if (championPick.maxCountPickChampion <= 1) return;
    const decrement = championPick.maxCountPickChampion - 1;
    championPick.SET_MAX_COUNT_PICK_CHAMPION(decrement);
    championPick.SET_CHAMPION_PICKED_LENGTH(decrement);
  }

  resetPickChampion() {
    championPick.resetPickChampion();
  }
}
</script>
<style lang="stylus" scoped>
.pick-counter
  font-size 20px
  text-align center
  vertical-align bottom
</style>
