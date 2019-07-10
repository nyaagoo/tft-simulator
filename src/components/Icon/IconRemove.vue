<template lang="pug">
  g
    path(d="M19 13H5v-2h14v2z")
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";

@Component({
  name: "icon-remove",
  components: {}
})
export default class IconRemove extends Vue {}
</script>
