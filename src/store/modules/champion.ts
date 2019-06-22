import championList from "@/assets/champions.json";
import {
  ChampionClass,
  ChampionOrigin,
  Class,
  Origin,
  Champion,
  originSynergy,
  OriginCount,
  Synergy,
  ClassCount,
  classSynergy
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
  activeOriginSynergy: Synergy[] = [];
  activeClassSynergy: Synergy[] = [];

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

  @Mutation
  public SET_ACTIVE_ORIGIN_SYNERGY(synergyList: Synergy[]) {
    this.activeOriginSynergy = synergyList;
  }
  @Mutation
  public SET_ACTIVE_CLASS_SYNERGY(synergyList: Synergy[]) {
    this.activeClassSynergy = synergyList;
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
    const existList = this.championPicked.some(c => c.id === champion.id);
    if (existList) {
      this.RemoveChampionPicked(champion);
    } else {
      this.AddChampionPicked(champion);
    }
  }
  @Action({ rawError: true })
  public AddChampionPicked(champion: Champion) {
    if (this.championPicked.length >= 10) return;
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
      const currentOriginList = current.origin.split("\n");
      currentOriginList.forEach(origin => {
        const element = acc.find(p => p.origin === origin);
        if (element) element.count++;
        else
          acc.push({
            count: 1,
            origin: origin as Origin
          });
      });
      return acc;
    }, []);

    const activeSynergy: Synergy[] = [];
    for (const originItem of originCount) {
      const validSynergyList = originSynergy[originItem.origin].filter(
        x => x.require <= originItem.count
      );
      if (validSynergyList.length === 0) continue;
      const highestActiveSynergy = validSynergyList.reduce((pre, cur) =>
        pre.require > cur.require ? pre : cur
      );
      activeSynergy.push({
        type: originItem.origin,
        count: originItem.count,
        synergy: highestActiveSynergy.bonus
      });
    }
    this.SET_ACTIVE_ORIGIN_SYNERGY(activeSynergy);
  }

  @Action({ rawError: true })
  public CalculateAndSetClassSynergy() {
    const classCount: ClassCount[] = this.championPicked.reduce<ClassCount[]>(
      (acc, current) => {
        const currentClassList = current.class.split("\n");
        currentClassList.forEach(currentClass => {
          const element = acc.find(p => p.class === currentClass);
          if (element) element.count++;
          else {
            acc.push({
              count: 1,
              class: currentClass as Class
            });
          }
        });
        return acc;
      },
      []
    );

    const activeSynergy: Synergy[] = [];
    for (const classItem of classCount) {
      const validSynergyList = classSynergy[classItem.class].filter(
        x => x.require <= classItem.count
      );
      if (validSynergyList.length === 0) continue;
      const highestActiveSynergy = validSynergyList.reduce((pre, cur) =>
        pre.require > cur.require ? pre : cur
      );
      activeSynergy.push({
        type: classItem.class,
        count: classItem.count,
        synergy: highestActiveSynergy.bonus
      });
    }
    this.SET_ACTIVE_CLASS_SYNERGY(activeSynergy);
  }

  // #endregion
}
export const champion = getModule(ChampionModule);
