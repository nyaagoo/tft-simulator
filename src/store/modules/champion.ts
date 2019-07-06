import championList from "@/assets/json/champions.json";
import originList from "@/assets/json/origins.json";
import classList from "@/assets/json/classes.json";
import {
  Champion,
  ChampionClass,
  ChampionOrigin,
  Synergy,
  FavoriteOriginClass,
  ChampionData
} from "@/models/champion";
import store from "@/store/store";
import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule
} from "vuex-module-decorators";
import {
  ClassID,
  ClassOriginData,
  OriginID,
  OriginCount,
  ClassCount
} from "@/models/type";

@Module({ dynamic: true, store, name: "champion", namespaced: true })
class ChampionModule extends VuexModule {
  // #region STATE
  readonly championList: ChampionData[] = championList.map(x => ({
    ...x,
    origin: x.origin.map(o => o as OriginID),
    class: x.class.map(o => o as ClassID)
  }));
  readonly originList: { [K in OriginID]: ClassOriginData } = originList;
  readonly classList: { [K in ClassID]: ClassOriginData } = classList;

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
    const eachOrigin = this.championList.reduce<ChampionOrigin[]>(
      (acc, current) => {
        current.origin.forEach(currentOrigin => {
          const element = acc.find(p => p.origin.id === currentOrigin);
          if (element) element.championList.push(current);
          else
            acc.push({
              origin: this.originList[currentOrigin],
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
        current.class.forEach(currentClass => {
          const element = acc.find(p => p.class.id === currentClass);
          if (element) element.championList.push(current);
          else
            acc.push({
              class: this.classList[currentClass],
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
      const originSynegy = this.originList[originItem.origin as OriginID];

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
      const classSynegy = this.classList[classItem.class as ClassID];

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
