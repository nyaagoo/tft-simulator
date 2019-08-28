import championList from "@/assets/json/champions.json";
import originList from "@/assets/json/origins.json";
import classList from "@/assets/json/classes.json";
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
  public SET_FAVORITE_ORIGIN_LIST(list: string[]) {
    // #region
    this.favoriteOriginList = list;
  }
  @Mutation
  public SET_FAVORITE_CLASS_LIST(list: string[]) {
    this.favoriteClassList = list;
  }
  @Mutation // counter
  public SET_CHAMPION_DECK_ORIGIN(championOrigin: ChampionOrigin[]) {
    this.deckOrigin = championOrigin;
  }
  @Mutation
  public SET_CHAMPION_DECK_CLASS(championClass: ChampionClass[]) {
    this.deckClass = championClass;
  }

  @Mutation
  public SET_FAVORITE_ORIGIN_CLASS(favorite: FavoriteOriginClass) {
    this.deckFavorite = favorite;
  }

  // #endregion

  // #region ACTION
  @Action({ rawError: true })
  public SeparateChampionDeckOrigin() {
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
    this.SET_CHAMPION_DECK_ORIGIN(eachOrigin);
    this.sortChampionOriginCost();
  }

  @Action({ rawError: true })
  public SeparateChampionDeckClass() {
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
    this.SET_CHAMPION_DECK_CLASS(eachClass);
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
    this.SET_CHAMPION_DECK_ORIGIN(copyDeckOrigin);
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
    this.SET_CHAMPION_DECK_CLASS(copyDeckClass);
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
    this.SET_CHAMPION_DECK_ORIGIN(copyDeckOrigin);
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
    this.SET_CHAMPION_DECK_CLASS(copyDeckClass);
  }

  // #endregion
}
export const championDeck = getModule(ChampionDeckModule);
