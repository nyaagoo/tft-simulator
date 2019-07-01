import basicItemList from "@/assets/json/basicItems.json";
import buildItemList from "@/assets/json/buildItems.json";
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
  readonly basicItemList: BasicItem[] = basicItemList;
  readonly buildItemList: BuildItem[] = buildItemList;

  buildItemEachBasicItem: BuildFromBasicItem[] = [];
  // #endregion

  // #region MUTATION
  @Mutation
  public SET_BUILD_ITEM_EACH_BASIC_ITEM(list: BuildFromBasicItem[]) {
    this.buildItemEachBasicItem = list;
  }

  // #endregion

  // #region ACTION
  @Action({ rawError: true })
  @Action({ rawError: true })
  public separateBuildItem() {
    const buildItemEachBasicItem = item.buildItemList.reduce<
      BuildFromBasicItem[]
    >((acc, current) => {
      current.recipe.forEach(recipeItemId => {
        const basicItem = acc.find(x => x.basicItem.id === recipeItemId);
        if (basicItem) {
          if (basicItem.buildItem.some(item => item.name === current.name))
            return;
          basicItem.buildItem.push(current);
        } else {
          const basicItem = item.basicItemList.find(
            basicItem => basicItem.id === recipeItemId
          );
          acc.push({ basicItem: basicItem!, buildItem: [current] });
        }
      });
      return acc;
    }, []);

    buildItemEachBasicItem.forEach(x => {
      x.buildItem.sort((pre, cur) => {
        if (pre.recipe[1] > cur.recipe[1]) return 1;
        else if (pre.recipe[1] < cur.recipe[1]) return -1;
        return 0;
      });
    });

    buildItemEachBasicItem.sort((pre, cur) => {
      if (pre.basicItem.id > cur.basicItem.id) return 1;
      else if (pre.basicItem.id < cur.basicItem.id) return -1;
      return 0;
    });

    this.SET_BUILD_ITEM_EACH_BASIC_ITEM(buildItemEachBasicItem);

    // eslint-disable-next-line no-console
    console.log(this.buildItemEachBasicItem);
  }

  // #endregion
}
export const item = getModule(ItemModule);
