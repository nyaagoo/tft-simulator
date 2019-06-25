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
import { BasicItem, BuildItem } from '@/models/item';

@Module({ dynamic: true, store, name: "item", namespaced: true })
class ItemModule extends VuexModule {
  // #region STATE
  readonly basicItemList: BasicItem[] = basicItemList;
  readonly buildItemList: BuildItem[] = buildItemList;
  counter: number = 0;

  // #endregion

  // #region MUTATION
  @Mutation // counter
  public SET_COUNTER(num: number) {
    this.counter = num;
  }

  // #endregion

  // #region ACTION
  @Action({ rawError: true })
  public decrement() {
    this.SET_COUNTER(this.counter + 1);
  }
  // #endregion

}
export const item = getModule(ItemModule);