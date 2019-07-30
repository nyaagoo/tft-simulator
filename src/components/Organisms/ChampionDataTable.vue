<template lang="pug">
  .champion-data-table
    .card-container
      .card-container-title
        h3 ブックマーク
      v-card.champion-table-card.pa-5(flat)
        .search-option-container
          .table-level-search
            .level-select.text-xs-center
              v-rating(v-model='selectedLevel' :length="3")
                template(v-slot:item='props')
                  v-icon(:color="props.isFilled ? genColor(props.index) : 'grey lighten-1'", large, @click='props.click') mdi-star
            .search-wrapper
              v-text-field(v-model="search", label='Search', single-line, hide-details)
          .origin-class-select
            .origin-select-wrapper.mr-1
              p オリジン
              .origin-select
                .origin-item.pointer(v-for="originItem in originList" :key="originItem.id" :class="{'origin-item-selected': isOriginSelected(originItem.id)}" @click="toggleSelectOrigin(originItem.id)")
                  i.icon-origin(:class="[`icon-${originItem.id.toLowerCase()}`]")
            .origin-select-wrapper
              p クラス
              .class-select
                .class-item.pointer(v-for="classItem in classList" :key="classItem.id" :class="{'class-item-selected': isClassSelected(classItem.id)}" @click="toggleSelectClass(classItem.id)")
                  i.icon-class(:class="`icon-${classItem.id.toLowerCase()}`")
        v-data-table.elevation-1(:headers='headers', :items="championList" multi-sort hide-default-footer items-per-page=60)
          template(v-slot:item.image="{ item }")
            i.icon-champion.mr-1.vertical-bottom(:class="`icon-${item.id.toLowerCase()}-s`")
          template(v-slot:item.origin="{ item }")
            .data-origin
              span(v-for="originId in item.origin" :key="originId")
                i.icon-origin(:class="[`icon-${originId.toLowerCase()}`]")
          template(v-slot:item.class="{ item }")
            .data-class
              span(v-for="classId in item.class" :key="classId")
                i.icon-class(:class="[`icon-${classId.toLowerCase()}`]")
          template(v-slot:item.skill="{ item }")
            i.icon-skill.mr-1.vertical-bottom(:class="`icon-${item.skill.id.toLowerCase()}-s`")

</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import { championTable, champion } from "@/store/index";
import IconBase from "@/components/Icon/IconBase.vue";
import IconStar from "@/components/Icon/IconStar.vue";
import IconAdd from "@/components/Icon/IconAdd.vue";
import IconStarBorder from "@/components/Icon/IconStarBorder.vue";

@Component({
  name: "champion-data-table",
  components: {
    "icon-base": IconBase,
    "icon-star": IconStar,
    "icon-add": IconAdd,
    "icon-star-border": IconStarBorder
  }
})
export default class ChampionDataTable extends Vue {
  rating: number = 1;
  colors: string[] = ["green", "purple", "orange"];

  headers = [
    {
      text: "",
      align: "left",
      sortable: false,
      value: "image"
    },
    {
      text: "名前",
      align: "left",
      value: "name",
      width: "200px"
    },
    { text: "オリジン", value: "origin" },
    { text: "クラス", value: "class" },
    { text: "コスト", value: "cost" },
    { text: "HP", value: "hp" },
    { text: "DPS", value: "dps" },
    { text: "ダメージ", value: "damage" },
    { text: "攻撃速度", value: "attackSpeed" },
    { text: "物理防御", value: "armor" },
    { text: "魔法防御", value: "magicRegist" },
    { text: "射程", value: "range" },
    { text: "スキル", value: "skill" }
  ];
  genColor(i: number): string {
    return this.colors[i];
  }

  get search(): string {
    return championTable.searchWord;
  }
  set search(word: string) {
    championTable.SET_SEARCH_WORD(word);
  }

  get selectedLevel(): number {
    return championTable.selectLevel;
  }
  set selectedLevel(level: number) {
    championTable.SelectChampionLevel(level);
  }

  get originList() {
    return Object.values(champion.originList);
  }
  get classList() {
    return Object.values(champion.classList);
  }

  toggleSelectOrigin(originId: string) {
    championTable.toggleSelectOrigin(originId);
  }

  toggleSelectClass(classId: string) {
    championTable.toggleSelectClass(classId);
  }
  isOriginSelected(originId: string): boolean {
    return championTable.selectOriginList.includes(originId);
  }

  isClassSelected(classId: string): boolean {
    return championTable.selectClassList.includes(classId);
  }

  created() {
    championTable.SelectChampionLevel(1);
  }
  get championList() {
    let filteredChampionList = championTable.championTable;

    if (championTable.searchWord) {
      filteredChampionList = championTable.championTable.filter(
        x =>
          x.name.includes(this.search) ||
          x.id.toLowerCase().includes(this.search.toLowerCase())
      );
    }
    if (championTable.selectOriginList.length !== 0) {
      filteredChampionList = filteredChampionList.filter(x =>
        x.origin.some(o => championTable.selectOriginList.includes(o))
      );
    }
    if (championTable.selectClassList.length !== 0) {
      filteredChampionList = filteredChampionList.filter(x =>
        x.class.some(c => championTable.selectClassList.includes(c))
      );
    }
    return filteredChampionList;
  }

  selectLevel(level: number) {
    championTable.SelectChampionLevel(level);
  }
}
</script>
<style lang="stylus" scoped>
.champion-table
  min-width 720px
.champion-table-card
  margin 16px
.table-level-search
  width 100%
  display flex
  justify-content flex-end
  align-items center
.origin-class-select
  display flex
  text-align left
.origin-select-wrapper > p
  margin 0
  padding 0
.origin-select
  border 1px solid #00B8D4
  border-radius 4px
  padding 4px
  display flex
.class-select
  border 1px solid #00c853
  border-radius 4px
  padding 4px
  display flex
.origin-item
  height 32px
  border-radius 8px
.origin-item-selected
  background #00B8D4
.class-item
  height 32px
  border-radius 8px
.class-item-selected
  background #00c853

.class-item + .class-item
.origin-item + .origin-item
  margin-left 4px
.table-header
  border-bottom 1px solid #ffffff80
table
  border-collapse collapse
.table-row
  margin 2px 0
  border-bottom 1px solid #ffffff80
table > tr > td
  min-width 80px
.table-row:nth-child(2n-1)
  background #333333
.table-row:nth-child(2n)
  background #444444
.data-img
  height 36px
  width 36px
.level-select
  margin-top: 20px;
img
  vertical-align bottom
.search-wrapper
  width 300px
.vertical-bottom
  vertical-align bottom
</style>
