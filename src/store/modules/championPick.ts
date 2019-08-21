import championList from "@/assets/json/champions.json";
import originList from "@/assets/json/origins.json";
import classList from "@/assets/json/classes.json";
import { Champion, ActiveSynergy } from "@/models/champion";
import store from "@/store/store";
import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule
} from "vuex-module-decorators";
import { OriginCount, ClassCount } from "@/models/type";
type championId = keyof typeof championList;
type originId = keyof typeof originList;
type classId = keyof typeof classList;
@Module({ dynamic: true, store, name: "championPick", namespaced: true })
class ChampionPickModule extends VuexModule {
  // #region STATE

  readonly originList = originList;
  readonly classList = classList;

  championPicked: Champion[] = [];
  activeOriginSynergy: ActiveSynergy[] = [];
  activeClassSynergy: ActiveSynergy[] = [];

  maxCountPickChampion: number = 10;

  // #endregion

  // #region MUTATION
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
  public SET_ACTIVE_ORIGIN_SYNERGY(synergyList: ActiveSynergy[]) {
    this.activeOriginSynergy = synergyList;
  }
  @Mutation
  public SET_ACTIVE_CLASS_SYNERGY(synergyList: ActiveSynergy[]) {
    this.activeClassSynergy = synergyList;
  }

  // #endregion

  // #region ACTION
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

    const activeSynergy: ActiveSynergy[] = [];
    for (const originItem of originCount) {
      const originSynergy = this.originList[originItem.origin as originId];

      const activeSynergyBonus = originSynergy.effect.reduce<
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
        type: originSynergy.name,
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

    const activeSynergy: ActiveSynergy[] = [];
    for (const classItem of ClassCount) {
      const classSynergy = this.classList[classItem.class as classId];

      const activeSynergyBonus = classSynergy.effect.reduce<
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
        type: classSynergy.name,
        count: classItem.count,
        synergy: activeSynergyBonus.bonus
      });
    }
    this.SET_ACTIVE_CLASS_SYNERGY(activeSynergy);
  }

  @Action({ rawError: true })
  public resetPickChampion() {
    this.SET_CHAMPION_PICKED([]);
  }

  // #endregion
}
export const championPick = getModule(ChampionPickModule);
