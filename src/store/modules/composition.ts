import { Composition } from "@/models/composition";
import {
  Mutation,
  MutationAction,
  Action,
  VuexModule,
  getModule,
  Module
} from "vuex-module-decorators";
import store from "@/store/store";
import sampleComps from "@/assets/json/championComp.json";

@Module({ dynamic: true, store, name: "comp", namespaced: true })
class CompositionModule extends VuexModule {
  // #region STATE
  compositionList: Composition[] = [];
  // #endregion

  // #region MUTATION
  @Mutation
  public SET_COMPOSITION_LIST(list: Composition[]) {
    this.compositionList = list;
  }

  @Mutation
  public ADD_COMPOSITION_LIST(composition: Composition) {
    this.compositionList = [...this.compositionList, composition];
  }

  // #endregion

  // #region ACTION
  @Action({ rawError: true })
  public LoadComposition() {
    const compositionStr = localStorage.getItem("compositionList");
    if (!compositionStr) return;
    const compositionList: Composition[] = JSON.parse(compositionStr);
    this.SET_COMPOSITION_LIST(compositionList);
    // eslint-disable-next-line no-console
    console.log(compositionList);
  }

  @Action({ rawError: true })
  public SaveComposition() {
    localStorage.setItem(
      "compositionList",
      JSON.stringify(this.compositionList)
    );
  }
  // #endregion

  // #region MUTATION ACTION
  // #endregion
}
export const composition = getModule(CompositionModule);
