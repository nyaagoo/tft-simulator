<template lang="pug">
  .drawer
    v-navigation-drawer(app fixed clipped v-model="drawer")
        v-list(dense='')
          v-list-tile(@click="transitPageChampion()")
            v-list-tile-action
              v-icon subtitles
            v-list-tile-content
              v-list-tile-title シナジーシミュレータ
          v-list-tile(@click="transitPageItem()")
            v-list-tile-action
              v-icon view_module
            v-list-tile-content
              v-list-tile-title アイテムビルダー
          // v-subheader.mt-3.grey--text.text--darken-1 Champion
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { setting } from "@/store/index";
import router from "@/router";

@Component({
  name: "drawer",
  components: {}
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
}
</script>
<style lang="stylus" scoped></style>
