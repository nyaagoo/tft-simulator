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

  showDrawer: boolean = false;
  // #endregion

  // #region MUTATION
  @Mutation
  public SET_VISIBLE_CHAMPION_ORIGIN(visibility: boolean) {
    this.visibleChampionOrigin = visibility;
  }
  @Mutation
  public SET_VISIBLE_CHAMPION_CLASS(visibility: boolean) {
    this.visibleChampionClass = visibility;
  }
  @Mutation
  public SET_VISIBLE_CHAMPION_COST(visibility: boolean) {
    this.visibleChampionCost = visibility;
  }
  @Mutation
  public SET_DRAWER(isShow: boolean) {
    this.showDrawer = isShow;
  }

  // #endregion

  // #region ACTION
  @Action({ rawError: true })
  public toggleDrawer() {
    this.SET_DRAWER(!this.showDrawer);
  }

  // #endregion
}
export const setting = getModule(SettingModule);
