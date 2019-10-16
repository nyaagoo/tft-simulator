<template lang="pug">
  .drawer
    v-navigation-drawer(v-model="drawer" app fixed clipped)
        v-list(rounded)
          v-list-item(@click="transitPageChampion()")
            v-icon.mr-3 {{ icon.mdiOctagonOutline }}
            v-list-item-content
              v-list-item-title シナジーシミュレータ
          v-list-item(@click="transitPageItem()")
            v-icon.mr-3 {{ icon.mdiWidgets }}
            v-list-item-content
              v-list-item-title アイテムビルダー
          v-list-item(@click="transitChampionTable()")
            v-icon.mr-3 {{ icon.mdiViewList }}
            v-list-item-content
              v-list-item-title チャンピオンデータ
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { setting } from "@/store/index";
import router from "@/router";
import { mdiOctagonOutline, mdiWidgets, mdiViewList } from "@mdi/js";

@Component({
  name: "drawer",
  components: {}
})
export default class Drawer extends Vue {
  icon = { mdiOctagonOutline, mdiWidgets, mdiViewList };

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
