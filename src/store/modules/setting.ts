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

  showDrawer: boolean = true;
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

  @Action({ rawError: true })
  public SaveSetting() {
    const setting = {
      visibleClass: this.visibleChampionClass,
      visibleOrigin: this.visibleChampionOrigin,
      visibleCost: this.visibleChampionCost
    };
    const json = JSON.stringify(setting);
    localStorage.setItem("visibility", json);
  }

  @Action({ rawError: true })
  public LoadSetting() {
    const visibility = localStorage.getItem("visibility");
    if (!visibility) return;

    const setting: {
      visibleClass: boolean;
      visibleOrigin: boolean;
      visibleCost: boolean;
    } = JSON.parse(visibility);

    this.SET_VISIBLE_CHAMPION_ORIGIN(setting.visibleOrigin);
    this.SET_VISIBLE_CHAMPION_CLASS(setting.visibleClass);
    this.SET_VISIBLE_CHAMPION_COST(setting.visibleCost);
  }

  // #endregion
}
export const setting = getModule(SettingModule);
