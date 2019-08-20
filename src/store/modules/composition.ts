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
  counter: number = 0;
  sampleComp: Composition[] = sampleComps;

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

  // #region MUTATION ACTION
  @MutationAction({ mutate: ["counter"] })
  async resetCounter() {
    return {
      counter: 0
    };
  }
  // #endregion
}
export const composition = getModule(CompositionModule);
