import championList from "@/assets/json/champions.json";
import originList from "@/assets/json/origins.json";
import classList from "@/assets/json/classes.json";
import {
  Champion,
  ChampionClass,
  ChampionOrigin,
  Synergy,
  FavoriteOriginClass,
  ChampionDetail
} from "@/models/champion";
import store from "@/store/store";
import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule
} from "vuex-module-decorators";
import { ClassOriginData, OriginCount, ClassCount } from "@/models/type";

type championId = keyof typeof championList;
type originId = keyof typeof originList;
type classId = keyof typeof classList;
@Module({ dynamic: true, store, name: "champion", namespaced: true })
class ChampionModule extends VuexModule {
  readonly championList = championList;
  readonly originList = originList;
  readonly classList = classList;

  favoriteOriginList: string[] = [];
  favoriteClassList: string[] = [];
  deckOrigin: ChampionOrigin[] = [];
  deckClass: ChampionClass[] = [];
  deckFavorite: FavoriteOriginClass = { origin: [], class: [] };
  championPicked: Champion[] = [];
  activeOriginSynergy: Synergy[] = [];
  activeClassSynergy: Synergy[] = [];
  maxCountPickChampion: number = 10;

  // #endregion

  // #region MUTATION

  @Mutation
  public SET_FAVORITE_ORIGIN_LIST(list: string[]) {
    // #regio
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
  public SET_CHAMPION_PICKED(championList: Champion[]) {
    this.championPicked = championList;
  }
  @Mutation
  public SET_CHAMPION_PICKED_LENGTH(length: number) {
    this.championPicked.splice(length);
  }
  @Mutation
  public SET_MAX_COUNT_PICK_CHAMPION(count: number) {
    this.maxCountPickChampion = count;
  }
  @Mutation
  public SET_ACTIVE_ORIGIN_SYNERGY(synergyList: Synergy[]) {
    this.activeOriginSynergy = synergyList;
  }
  @Mutation
  public SET_ACTIVE_CLASS_SYNERGY(synergyList: Synergy[]) {
    this.activeClassSynergy = synergyList;
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
  public ToggleChampionPicked(champion: Champion) {
    const existList = this.championPicked.some(c => c.id === champion.id);
    if (existList) {
      this.RemoveChampionPicked(champion);
    } else {
      this.AddChampionPicked(champion);
    }
  }
  @Action({ rawError: true })
  public AddChampionPicked(champion: Champion) {
    if (this.championPicked.length >= this.maxCountPickChampion) return;
    const temporary = [...this.championPicked];
    temporary.push(champion);
    this.SET_CHAMPION_PICKED(temporary);
    this.CalculateAndSetOriginSynergy();
    this.CalculateAndSetClassSynergy();
  }

  @Action({ rawError: true })
  public RemoveChampionPicked(champion: Champion) {
    const temporary = [...this.championPicked];
    this.SET_CHAMPION_PICKED(temporary.filter(c => c.id !== champion.id));
    this.CalculateAndSetOriginSynergy();
    this.CalculateAndSetClassSynergy();
  }

  @Action({ rawError: true })
  public CalculateAndSetOriginSynergy() {
    const originCount: OriginCount[] = this.championPicked.reduce<
      OriginCount[]
    >((acc, current) => {
      current.origin.forEach(origin => {
        const element = acc.find(p => p.origin === origin);
        if (element) element.count++;
        else
          acc.push({
            count: 1,
            origin: origin
          });
      });
      return acc;
    }, []);

    const activeSynergy: Synergy[] = [];
    for (const originItem of originCount) {
      const originSynegy = this.originList[originItem.origin as originId];

      const activeSynergyBonus = originSynegy.synergy.reduce<
        | {
            require: number;
            bonus: string;
          }
        | undefined
      >((pre, cur) => {
        if (cur.require > originItem.count) return pre;
        if (pre === undefined) return cur;
        return pre.require < cur.require ? cur : pre;
      }, undefined);

      if (activeSynergyBonus === undefined) continue;
      activeSynergy.push({
        type: originSynegy.name,
        count: originItem.count,
        synergy: activeSynergyBonus.bonus
      });
    }
    this.SET_ACTIVE_ORIGIN_SYNERGY(activeSynergy);
  }

  @Action({ rawError: true })
  public CalculateAndSetClassSynergy() {
    const aa = Object.values(this.championList).find(x => x.name === "日本");
    const ClassCount: ClassCount[] = this.championPicked.reduce<ClassCount[]>(
      (acc, current) => {
        current.class.forEach(classItem => {
          const element = acc.find(p => p.class === classItem);
          if (element) element.count++;
          else
            acc.push({
              count: 1,
              class: classItem
            });
        });
        return acc;
      },
      []
    );

    const activeSynergy: Synergy[] = [];
    for (const classItem of ClassCount) {
      const classSynegy = this.classList[classItem.class as classId];

      const activeSynergyBonus = classSynegy.synergy.reduce<
        | {
            require: number;
            bonus: string;
          }
        | undefined
      >((pre, cur) => {
        if (cur.require > classItem.count) return pre;
        if (pre === undefined) return cur;
        return pre.require < cur.require ? cur : pre;
      }, undefined);

      if (activeSynergyBonus === undefined) continue;
      activeSynergy.push({
        type: classSynegy.name,
        count: classItem.count,
        synergy: activeSynergyBonus.bonus
      });
    }
    this.SET_ACTIVE_CLASS_SYNERGY(activeSynergy);
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

  @Action({ rawError: true })
  public resetPickChampion() {
    this.SET_CHAMPION_PICKED([]);
  }

  // #endregion
}
export const champion = getModule(ChampionModule);
