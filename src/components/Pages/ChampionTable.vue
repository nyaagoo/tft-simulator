<template lang="pug">
  .champion-table-page
    champion-table-template
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import ChampionTableTemplate from "@/components/Templates/ChampionTable.vue";
@Component({
  name: "champion-table-page",
  components: {
    "champion-table-template": ChampionTableTemplate
  }
})
export default class ChampionTablePage extends Vue {}
</script>
<style lang="stylus" scoped></style>
