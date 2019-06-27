<template lang="pug">
  .deck-favorite
    span {{ selectedOrigin }}
    
    span {{ selectedClass }}
    .origin-chips
      v-chip(v-for="(item, index) in championOrigin" :key="`favOrigin${index}`")(:outline="!isOriginSelected(item)" color="error")(@click="toggleSelectOrigin(item)") {{ item }}
    .class-chips
      v-chip(v-for="(item, index) in championClass" :key="`favClass${index}`")(:outline="!isClassSelected(item)" color="info")(@click="toggleSelectClass(item)") {{ item }}
    h1 favorite
    

</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import ChampionThumbnail from "@/components/Organisms/ChampionThumbnail.vue";
import { Origin, Class } from "@/models/champion";
import { imgPathOrigin, imgPathClass } from '@/static/path';
import { champion } from "@/store/index";


@Component({
  name: "deck-favorite",
  components: {
    "champion-thumbnail": ChampionThumbnail
  }
})
export default class DeckFavorite extends Vue {
  selectedOrigin: string[] = [];
  selectedClass: string[] = [];
  get championOrigin():string[] 
  {
    return champion.originList.map(x => x.name);
  }

    get championClass():string[] 
  {
    return champion.classList.map(x => x.name);
  }

  toggleSelectOrigin(checkedOrigin: string){
    const existList = this.selectedOrigin.some(o => o === checkedOrigin);
    if(existList) this.selectedOrigin = this.selectedOrigin.filter(x => x !== checkedOrigin);
    else this.selectedOrigin.push(checkedOrigin);
  }
  isOriginSelected(item: string): boolean {
    return this.selectedOrigin.some(o => o === item);
  }

  isClassSelected(item: string): boolean {
    return this.selectedClass.some(c => c === item);
  }

  toggleSelectClass(checkedClass: string){
    const existList = this.selectedClass.some(o => o === checkedClass);
    if(existList) this.selectedClass = this.selectedClass.filter(x => x !== checkedClass);
    else this.selectedClass.push(checkedClass);
  }
}
</script>
<style lang="stylus" scoped>
.deck-favorite
  margin auto
  width 100vw
  .origin-chips
  .class-chips
    display flex
    flex-wrap wrap
</style>
