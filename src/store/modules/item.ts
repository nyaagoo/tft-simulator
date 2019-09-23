import { BuildItemIdList, BasicItemIdList } from "./../../models/item";
import basicItemList from "@/assets/data/9.16/basicItems.json";
import buildItemList from "@/assets/data/9.16/buildItems.json";
import {
  Mutation,
  Action,
  VuexModule,
  getModule,
  Module
} from "vuex-module-decorators";
import store from "@/store/store";
import { BasicItem, BuildItem, BuildFromBasicItem } from "@/models/item";

@Module({ dynamic: true, store, name: "item", namespaced: true })
class ItemModule extends VuexModule {
  // #region STATE
  readonly basicItemList: { [K in BasicItemIdList]: BasicItem } = basicItemList;
  readonly buildItemList: { [K in BuildItemIdList]: BuildItem } = buildItemList;

  itemPool: BasicItem[] = [];
  buildItemEachBasicItem: BuildFromBasicItem[] = [];
  // #endregion

  // #region MUTATION
  @Mutation
  public SET_BUILD_ITEM_EACH_BASIC_ITEM(list: BuildFromBasicItem[]) {
    this.buildItemEachBasicItem = list;
  }

  @Mutation
  public SET_ITEM_POOL(basicItemList: BasicItem[]) {
    this.itemPool = basicItemList;
  }

  // #endregion

  // #region ACTION
  @Action({ rawError: true })
  public separateBuildItem() {
    const buildItemEachBasicItem: BuildFromBasicItem[] = Object.values(
      this.buildItemList
    ).reduce<BuildFromBasicItem[]>((acc, current) => {
      current.recipe.forEach(recipeItemId => {
        const basicItem = acc.find(x => x.basicItem.id === recipeItemId);
        if (basicItem) {
          if (basicItem.buildItem.some(item => item.name === current.name))
            return;
          basicItem.buildItem.push(current);
        } else {
          const basicItem = this.basicItemList[recipeItemId as BasicItemIdList];
          acc.push({ basicItem: basicItem!, buildItem: [current] });
        }
      });
      return acc;
    }, []);

    buildItemEachBasicItem.forEach(x => {
      x.buildItem.sort((pre, cur) => {
        const firstIndex = pre.recipe.findIndex(y => x.basicItem.id === y);
        const firstRecipeItem = [...pre.recipe].splice(firstIndex, 1)[0];
        const secondIndex = cur.recipe.findIndex(y => x.basicItem.id === y);
        const secondRecipeItem = [...cur.recipe].splice(secondIndex, 1)[0];
        if (firstRecipeItem > secondRecipeItem) return 1;
        else if (firstRecipeItem < secondRecipeItem) return -1;
        return 0;
      });
    });

    buildItemEachBasicItem.sort((pre, cur) => {
      if (pre.basicItem.id > cur.basicItem.id) return 1;
      else if (pre.basicItem.id < cur.basicItem.id) return -1;
      return 0;
    });
    this.SET_BUILD_ITEM_EACH_BASIC_ITEM(buildItemEachBasicItem);
  }

  @Action({ rawError: true })
  public addItemPool(basicItem: BasicItem) {
    this.SET_ITEM_POOL([...this.itemPool, basicItem]);
  }

  @Action({ rawError: true })
  public removeItemPool(basicItem: BasicItem) {
    const itemPool2 = [...this.itemPool];
    itemPool2.splice(itemPool2.findIndex(x => x === basicItem), 1);
    this.SET_ITEM_POOL(itemPool2);
  }

  // #endregion
}
export const item = getModule(ItemModule);
