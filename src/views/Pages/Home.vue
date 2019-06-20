<template lang="pug">
  .home-container
    h1 origin
    .champion-origin-container
      .champion-origin-wrapper(v-for="origin in championListEachOrigin" :key="origin.origin")
        span.origin-title {{ origin.origin }}
        .champion-wrapper(v-for="champ in origin.championList" :key="champ.name")
          img(:style="{ 'outline': `3px solid ${costColor.get(champ.cost)}`, 'outline-offset': '-3px' }")(height="60" width="60" :src="champ.image")
          p.ma-0.text-truncate {{ champ.name }}
    h1 class
    .champion-class-container
      .champion-class-wrapper(v-for="eachClass in championListEachClass" :key="eachClass.class")
        span.class-title {{ eachClass.class }}
        .champion-wrapper(v-for="champ in eachClass.championList" :key="champ.name")
          img(:style="{ 'outline': `3px solid ${costColor.get(champ.cost)}`, 'outline-offset': '-3px' }")(height="60" width="60" :src="champ.image")
          p.ma-0.text-truncate {{ champ.name }}
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/views/Pages/HelloWorld.vue";
import {
  Champion,
  ChampionOrigin,
  ChampionClass,
  Origin,
  Class,
  costColor,
  originSynergy,
  classSynergy
} from "@/models/champion";
import champion from "@/assets/champions.json";

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  championList = champion;
  championListEachOrigin: ChampionOrigin[] = [];
  championListEachClass: ChampionClass[] = [];
  costColor: Map<number,string> = costColor;
  greet: string = "hello world";

  created() {
    const eachOrigin = this.championList.reduce<ChampionOrigin[]>(
      (acc, current) => {
        const currentOriginList = current.origin.split("\n");
        currentOriginList.forEach(currentOrigin => {
          const element = acc.find(p => p.origin === currentOrigin);
          if (element) element.championList.push(current);
          else
            acc.push({
              origin: currentOrigin as Origin,
              championList: [current]
            });
        });
        return acc;
      },
      []
    );
    this.championListEachOrigin = eachOrigin;

    const eachClass = this.championList.reduce<ChampionClass[]>(
      (acc, current) => {
        const currentClassList = current.class.split("\n");
        currentClassList.forEach(currentClass => {
          const element = acc.find(p => p.class === currentClass);
          if (element) element.championList.push(current);
          else
            acc.push({
              class: currentClass as Class,
              championList: [current]
            });
        });
        return acc;
      },
      []
    );
    this.championListEachClass = eachClass;

    /* eslint-disable no-console */
    console.info(eachOrigin);
    console.info(eachClass);
  }
}
</script>
<style lang="stylus" scoped>
.home-container
  margin auto
  height calc(100vh - 200px)
  width 100vw
  display flex
  flex-wrap wrap
.champion-class-container
.champion-origin-container
  display flex
  flex-wrap wrap
  padding 8px
  margin 8px
.class-title
.origin-title
  position absolute
  top -10px
  background #ffffff
.champion-class-wrapper
.champion-origin-wrapper
  position relative
  display flex
  flex-wrap wrap
  border 1px solid #88ff88
  padding 8px
  margin 8px
.champion-container
  width 100px
.champion-wrapper
  p
    width 60px
  padding 4px
</style>
