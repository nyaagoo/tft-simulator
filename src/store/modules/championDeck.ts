import championList from "@/assets/data/9.18/champions.json";
import originList from "@/assets/data/9.18/origins.json";
import classList from "@/assets/data/9.18/classes.json";
import {
  ChampionClass,
  ChampionOrigin,
  FavoriteOriginClass
} from "@/models/champion";
import store from "@/store/store";
import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule
} from "vuex-module-decorators";
type championId = keyof typeof championList;
type originId = keyof typeof originList;
type classId = keyof typeof classList;
@Module({ dynamic: true, store, name: "championList", namespaced: true })
class ChampionDeckModule extends VuexModule {
  readonly championList = championList;
  readonly originList = originList;
  readonly classList = classList;

  favoriteOriginList: string[] = [];
  favoriteClassList: string[] = [];
  deckOrigin: ChampionOrigin[] = [];
  deckClass: ChampionClass[] = [];
  deckFavorite: FavoriteOriginClass = { origin: [], class: [] };
  // #endregion

  // #region MUTATION

  @Mutation
  public setFavoriteOriginList(list: string[]) {
    // #region
    this.favoriteOriginList = list;
  }
  @Mutation
  public setFavoriteClassList(list: string[]) {
    this.favoriteClassList = list;
  }
  @Mutation // counter
  public setChampionDeckOrigin(championOrigin: ChampionOrigin[]) {
    this.deckOrigin = championOrigin;
  }
  @Mutation
  public setChampionDeckClass(championClass: ChampionClass[]) {
    this.deckClass = championClass;
  }

  @Mutation
  public setFavoriteOriginClass(favorite: FavoriteOriginClass) {
    this.deckFavorite = favorite;
  }

  // #endregion

  // #region ACTION
  @Action({ rawError: true })
  public separateChampionDeckOrigin() {
    const eachOrigin: ChampionOrigin[] = [];
    for (const originName of Object.keys(this.originList)) {
      for (const champion of Object.values(this.championList)) {
        if (champion.origin.includes(originName.toString())) {
          if (
            eachOrigin.some(
              x => x.origin === this.originList[originName as originId]
            )
          ) {
            eachOrigin
              .find(x => x.origin === this.originList[originName as originId])!
              .championList.push(champion);
          } else
            eachOrigin.push({
              origin: this.originList[originName as originId],
              championList: [champion]
            });
        }
      }
    }
    this.setChampionDeckOrigin(eachOrigin);
    this.sortChampionOriginCost();
  }

  @Action({ rawError: true })
  public separateChampionDeckClass() {
    const eachClass: ChampionClass[] = [];
    for (const className of Object.keys(this.classList)) {
      for (const champion of Object.values(this.championList)) {
        if (champion.class.includes(className.toString())) {
          if (
            eachClass.some(
              x => x.class === this.classList[className as classId]
            )
          ) {
            eachClass
              .find(x => x.class === this.classList[className as classId])!
              .championList.push(champion);
          } else
            eachClass.push({
              class: this.classList[className as classId],
              championList: [champion]
            });
        }
      }
    }
    this.setChampionDeckClass(eachClass);
    this.sortChampionClassCost();
  }

  @Action({ rawError: true })
  public sortChampionOriginCost() {
    const copyDeckOrigin = [...this.deckOrigin];
    copyDeckOrigin.forEach(x =>
      x.championList.sort((pre, cur) => {
        if (pre.cost > cur.cost) return 1;
        else if (pre.cost < cur.cost) return -1;
        return 0;
      })
    );
    this.setChampionDeckOrigin(copyDeckOrigin);
  }

  @Action({ rawError: true })
  public sortChampionClassCost() {
    const copyDeckClass = [...this.deckClass];
    copyDeckClass.forEach(x =>
      x.championList.sort((pre, cur) => {
        if (pre.cost > cur.cost) return 1;
        else if (pre.cost < cur.cost) return -1;
        return 0;
      })
    );
    this.setChampionDeckClass(copyDeckClass);
  }

  @Action({ rawError: true })
  public sortChampionOriginName() {
    const copyDeckOrigin = [...this.deckOrigin];
    copyDeckOrigin.forEach(x =>
      x.championList.sort((pre, cur) => {
        if (pre.name > cur.name) return 1;
        else if (pre.name < cur.name) return -1;
        return 0;
      })
    );
    this.setChampionDeckOrigin(copyDeckOrigin);
  }

  @Action({ rawError: true })
  public sortChampionClassName() {
    const copyDeckClass = [...this.deckClass];
    copyDeckClass.forEach(x =>
      x.championList.sort((pre, cur) => {
        if (pre.name > cur.name) return 1;
        else if (pre.name < cur.name) return -1;
        return 0;
      })
    );
    this.setChampionDeckClass(copyDeckClass);
  }

  // #endregion
}
export const championDeck = getModule(ChampionDeckModule);
