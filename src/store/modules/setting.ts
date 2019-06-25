import {
  Mutation,
  Action,
  VuexModule,
  getModule,
  Module
} from "vuex-module-decorators";
import store from "@/store/store";

@Module({ dynamic: true, store, name: "setting", namespaced: true })
class SettingModule extends VuexModule {
  // #region STATE
  visibleChampionOrigin: boolean = true;
  visibleChampionClass: boolean = true;
  visibleChampionCost: boolean = true;
  // #endregion

  // #region MUTATION
  @Mutation // counter
  public SET_VISIBLE_CHAMPION_ORIGIN(visibility: boolean) {
    this.visibleChampionOrigin = visibility;
  }
  @Mutation // counter
  public SET_VISIBLE_CHAMPION_CLASS(visibility: boolean) {
    this.visibleChampionClass = visibility;
  }
  @Mutation // counter
  public SET_VISIBLE_CHAMPION_COST(visibility: boolean) {
    this.visibleChampionCost = visibility;
  }

  // #endregion

  // #region ACTION
  @Action({ rawError: true })
  public decrement() {}

  // #endregion
}
export const setting = getModule(SettingModule);
