<template lang="pug">
  .home-container
    .champion-container(v-for="champ in champions" :key="champ.name")
      p {{ champ.name }}
      img(height="100" width="100" :src="champ.image")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/views/Pages/HelloWorld.vue"; // @ is an alias to /src
import champions from "@/assets/champions.json";

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  champions = champions;
  greet: string = "hello world";
}
</script>
<style lang="stylus" scoped>
.home-container
  margin auto
  height calc(100vh - 200px)
  width 600px
  background #8FF
  display flex
  flex-wrap wrap
.champion-container
  width 100px
</style>
