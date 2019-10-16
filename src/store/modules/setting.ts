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
  visibleSideSynergyViewer: boolean = true;
  visibleChampionOrigin: boolean = true;
  visibleChampionClass: boolean = true;
  visibleChampionCost: boolean = true;

  showDrawer: boolean = true;
  // #endregion

  // #region MUTATION
  @Mutation
  public setVisibleSideSynergyViewer(visibility: boolean) {
    this.visibleSideSynergyViewer = visibility;
  }
  @Mutation
  public setVisibleChampionOrigin(visibility: boolean) {
    this.visibleChampionOrigin = visibility;
  }
  @Mutation
  public setVisibleChampionClass(visibility: boolean) {
    this.visibleChampionClass = visibility;
  }
  @Mutation
  public setVisibleChampionCost(visibility: boolean) {
    this.visibleChampionCost = visibility;
  }
  @Mutation
  public setShowDrawer(isShow: boolean) {
    this.showDrawer = isShow;
  }

  // #endregion

  // #region ACTION
  @Action({ rawError: true })
  public toggleDrawer() {
    this.setShowDrawer(!this.showDrawer);
  }

  @Action({ rawError: true })
  public saveSetting() {
    const setting = {
      visibleSynergyViewer: this.visibleSideSynergyViewer,
      visibleClass: this.visibleChampionClass,
      visibleOrigin: this.visibleChampionOrigin,
      visibleCost: this.visibleChampionCost
    };
    const json = JSON.stringify(setting);
    localStorage.setItem("visibility", json);
  }

  @Action({ rawError: true })
  public loadSetting() {
    const visibility = localStorage.getItem("visibility");
    if (!visibility) return;

    const setting: {
      visibleSynergyViewer: boolean;
      visibleClass: boolean;
      visibleOrigin: boolean;
      visibleCost: boolean;
    } = JSON.parse(visibility);

    this.setVisibleSideSynergyViewer(setting.visibleSynergyViewer);
    this.setVisibleChampionOrigin(setting.visibleOrigin);
    this.setVisibleChampionClass(setting.visibleClass);
    this.setVisibleChampionCost(setting.visibleCost);
  }

  // #endregion
}
export const setting = getModule(SettingModule);
