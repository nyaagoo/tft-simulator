<template lang="pug">
  .drawer
    v-navigation-drawer(app fixed clipped v-model="drawer")
        v-list(dense='')
          v-list-tile(@click="transitPageChampion()")
            v-list-tile-action
              icon-base(width="30" height="30")
                icon-add
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
import IconBase from "@/components/Icon/IconBase.vue";
import IconAdd from "@/components/Icon/IconAdd.vue";

@Component({
  name: "drawer",
  components: {
    "icon-base": IconBase,
    "icon-add": IconAdd
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
}
</script>
<style lang="stylus" scoped></style>
