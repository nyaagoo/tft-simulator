<template lang="pug">
  .drawer
    v-navigation-drawer(v-model="drawer" app fixed clipped)
        v-list(rounded)
          v-list-item(@click="transitPageChampion()")
            v-list-item-icon.mr-3
              v-icon mdi-octagon-outline
            v-list-item-content
              v-list-item-title シナジーシミュレータ
          v-list-item(@click="transitPageItem()")
            v-list-item-icon.mr-3
              v-icon mdi-widgets
            v-list-item-content
              v-list-item-title アイテムビルダー
          v-list-item(@click="transitChampionTable()")
            v-list-item-icon.mr-3
              v-icon mdi-view-list
            v-list-item-content
              v-list-item-title チャンピオンデータ
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { setting } from "@/store/index";
import router from "@/router";
import IconBase from "@/components/Icon/IconBase.vue";
import IconSubtitle from "@/components/Icon/IconSubtitle.vue";
import IconViewModule from "@/components/Icon/IconViewModule.vue";

@Component({
  name: "drawer",
  components: {
    "icon-base": IconBase,
    "icon-subtitle": IconSubtitle,
    "icon-view-module": IconViewModule
  }
})
export default class Drawer extends Vue {
  get drawer(): boolean {
    return setting.showDrawer;
  }
  set drawer(isShow: boolean) {
    setting.SET_DRAWER(isShow);
  }

  transitPageChampion() {
    router.push("/");
  }
  transitPageItem() {
    router.push("/item");
  }
  transitChampionTable() {
    router.push("/table");
  }
}
</script>
<style lang="stylus" scoped></style>
