import championList from "@/assets/champions.json";
import {
  ChampionClass,
  ChampionOrigin,
  Class,
  Origin
} from "@/models/champion";
import store from "@/store/store";
import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule
} from "vuex-module-decorators";

@Module({ dynamic: true, store, name: "champion", namespaced: true })
class ChampionModule extends VuexModule {
  // #region STATE
  counter: number = 0;
  readonly championList = championList;
  championDeckOrigin: ChampionOrigin[] = [];
  championDeckClass: ChampionClass[] = [];
  // #endregion

  // #region MUTATION
  @Mutation // counter
  public SET_CHAMPION_DECK_ORIGIN(championOrigin: ChampionOrigin[]) {
    this.championDeckOrigin = championOrigin;
  }

  @Mutation
  public SET_CHAMPION_DECK_CLASS(championClass: ChampionClass[]) {
    this.championDeckClass = championClass;
  }
  // #endregion

  // #region ACTION
  @Action({ rawError: true })
  public SeparateChampionDeckOrigin() {
    const eachOrigin = this.championList.reduce<ChampionOrigin[]>(
      (acc, current) => {
        const currentOriginList = current.origin.split("\n");
        currentOriginList.forEach(currentOrigin => {
          const element = acc.find(p => p.origin === currentOrigin);
          if (element) element.championList.push(current);
          else
            acc.push({
              origin: currentOrigin as Origin,
              championList: [current]
            });
        });
        return acc;
      },
      []
    );
    this.SET_CHAMPION_DECK_ORIGIN(eachOrigin);
  }

  @Action({ rawError: true })
  public SeparateChampionDeckClass() {
    const eachClass = this.championList.reduce<ChampionClass[]>(
      (acc, current) => {
        const currentClassList = current.class.split("\n");
        currentClassList.forEach(currentClass => {
          const element = acc.find(p => p.class === currentClass);
          if (element) element.championList.push(current);
          else
            acc.push({
              class: currentClass as Class,
              championList: [current]
            });
        });
        return acc;
      },
      []
    );
    this.SET_CHAMPION_DECK_CLASS(eachClass);
  }
  // #endregion
}
export const champion = getModule(ChampionModule);
