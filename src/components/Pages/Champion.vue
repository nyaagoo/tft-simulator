<template lang="pug">
  .champion-page
    champion-template
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ChampionTemplate from "@/components/Templates/Champion.vue";
import { setting } from "@/store/index";

@Component({
  components: {
    "champion-template": ChampionTemplate
  }
})
export default class ChampionPage extends Vue {
  created() {
    setting.LoadSetting();
  }
}
</script>
<style lang="stylus" scoped></style>
