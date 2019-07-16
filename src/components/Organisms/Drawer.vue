<template lang="pug">
  .drawer
    v-navigation-drawer(v-model="drawer" app fixed clipped)
        v-list(dense)
          v-list-tile(@click="transitPageChampion()")
            v-list-tile-action
              icon-base
                icon-subtitle
            v-list-tile-content
              v-list-tile-title シナジーシミュレータ
          v-list-tile(@click="transitPageItem()")
            v-list-tile-action
              icon-base
                icon-view-module
            v-list-tile-content
              v-list-tile-title アイテムビルダー
          v-list-tile(@click="transitChampionTable()")
            v-list-tile-action
              icon-base
                icon-view-module
            v-list-tile-content
              v-list-tile-title チャンピオンデータ
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
