<template lang="pug">
  .home
    img(alt="Vue logo" src="../../assets/logo.png")
    HelloWorld(msg="Welcome to Your Vue.js + TypeScript App2")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/views/Pages/HelloWorld.vue"; // @ is an alias to /src

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {}
</script>
