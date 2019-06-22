import championList from "@/assets/champions.json";
import {
  ChampionClass,
  ChampionOrigin,
  Class,
  Origin,
  Champion
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
  // TODO:この名前冗長では？
  championDeckOrigin: ChampionOrigin[] = [];
  championDeckClass: ChampionClass[] = [];
  championPicked: Champion[] = [];
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

  @Mutation
  public SET_CHAMPION_PICKED(championList: Champion[]) {
    this.championPicked = championList;
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

  @Action({ rawError: true })
  public ToggleChampionPicked(champion: Champion) {
    const temporary = [...this.championPicked];
    const existList = this.championPicked.some(c => c.id === champion.id);
    if (existList) {
      this.SET_CHAMPION_PICKED(temporary.filter(c => c.id !== champion.id));
    } else {
      temporary.push(champion);
      this.SET_CHAMPION_PICKED(temporary);
    }
  }
  // #endregion
}
export const champion = getModule(ChampionModule);
