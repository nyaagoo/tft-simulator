<template lang="pug">
  .champion-data-table
    .card-container
      .card-container-title
        h3 ブックマーク
      v-card.champion-table-card
        .search-option-container
          .table-level-search
            .level-select
              span.pointer( @click="selectLevel(1)")
                icon-base(width=36 height=36 color="#8f8" iconName="level1")
                  icon-star(v-if="selectedLevel >= 1")
                  icon-star-border(v-else)
              span.pointer( @click="selectLevel(2)")
                icon-base(width=36 height=36 color="#8f8" iconName="level2" @click="selectLevel(2)")
                  icon-star(v-if="selectedLevel >= 2")
                  icon-star-border(v-else)
              span.pointer( @click="selectLevel(3)")
                icon-base(width=36 height=36 color="#8f8" iconName="level3" @click="selectLevel(3)")
                  icon-star(v-if="selectedLevel >= 3")
                  icon-star-border(v-else)
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
        table.champion-table.ma-3
          thead
            tr.table-row
              td
              td
              td オリジン
              td クラス
              td コスト
              td HP
              td DPS
              td ダメージ
              td 攻撃速度
              td 物理防御
              td 魔法防御
              td 射程
          tbody
            tr.table-row(v-for="champion in championList" :key="champion.id")
              td.data-img
                img.data-img.my-1(:src="champion.image" :alt="champion.id")
              td.data-name {{ champion.name }}
              td.data-origin
                span(v-for="originId in champion.origin" :key="originId")
                  i.icon-origin(:class="[`icon-${originId.toLowerCase()}`]")
              td.data-class
                span(v-for="classId in champion.class" :key="classId")
                  i.icon-class(:class="[`icon-${classId.toLowerCase()}`]")
              td.data-cost ${{ champion.cost }}
              td.data-hp {{ champion.hp }}
              td.data-dps {{ champion.dps }}
              td.data-dmg {{ champion.damage }}
              td.data-as {{ champion.attackSpeed }}
              td.data-armor {{ champion.armor }}
              td.data-mr {{ champion.magicRegist }}
              td.data-range {{ champion.range }}
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
  rating: number = 3;

  get search(): string {
    return championTable.searchWord;
  }
  set search(word: string) {
    championTable.SET_SEARCH_WORD(word);
  }

  get selectedLevel(): number {
    return championTable.selectLevel;
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
</style>
