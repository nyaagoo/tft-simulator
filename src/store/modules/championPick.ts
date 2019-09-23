import championList from "@/assets/data/9.16/champions.json";
import originList from "@/assets/data/9.16/origins.json";
import classList from "@/assets/data/9.16/classes.json";
import { Champion } from "@/models/champion";
import { ActiveSynergy } from "@/models/type";
import store from "@/store/store";
import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule
} from "vuex-module-decorators";
import { SynergyCount } from "@/models/type";
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
    if (existList) this.RemoveChampionPicked(champion);
    else this.AddChampionPicked(champion);
  }

  @Action({ rawError: true })
  public async AddChampionPicked(champion: Champion) {
    if (this.championPicked.length >= this.maxCountPickChampion) return;
    this.SET_CHAMPION_PICKED([...this.championPicked, champion]);
    this.SET_ACTIVE_ORIGIN_SYNERGY(await this.CalculateOriginSynergy());
    this.SET_ACTIVE_CLASS_SYNERGY(await this.CalculateClassSynergy());
  }

  @Action({ rawError: true })
  public async RemoveChampionPicked(champion: Champion) {
    this.SET_CHAMPION_PICKED(
      this.championPicked.filter(c => c.id !== champion.id)
    );
    this.SET_ACTIVE_ORIGIN_SYNERGY(await this.CalculateOriginSynergy());
    this.SET_ACTIVE_CLASS_SYNERGY(await this.CalculateClassSynergy());
  }

  @Action({ rawError: true })
  public async CalculateChampionPicked() {
    this.SET_ACTIVE_ORIGIN_SYNERGY(await this.CalculateOriginSynergy());
    this.SET_ACTIVE_CLASS_SYNERGY(await this.CalculateClassSynergy());
  }

  @Action({ rawError: true })
  public async CalculateOriginSynergy(): Promise<ActiveSynergy[]> {
    const originCount = await this.CountChampionOrigin();
    const activeSynergy: ActiveSynergy[] = [];
    for (const originItem of originCount) {
      const originSynergy = this.originList[originItem.id as originId];
      const activeSynergyBonus = originSynergy.effect.reduce<
        | {
            tier: number;
            require: number;
            bonus: string;
          }
        | undefined
      >((pre, cur) => {
        if (cur.require > originItem.count) return pre;
        if (pre === undefined) return cur;
        return pre.require < cur.require ? cur : pre;
      }, undefined);

      if (activeSynergyBonus)
        activeSynergy.push({
          id: originSynergy.id,
          count: originItem.count,
          type: "origin",
          isActive: true,
          bonus: {
            tier: activeSynergyBonus.tier,
            effect: activeSynergyBonus.bonus
          },
          data: originSynergy
        });
      else
        activeSynergy.push({
          id: originSynergy.id,
          count: originItem.count,
          type: "origin",
          isActive: false,
          data: originSynergy
        });
    }
    return activeSynergy;
  }

  @Action({ rawError: true })
  public async CalculateClassSynergy(): Promise<ActiveSynergy[]> {
    const synergyCount = await this.CountChampionClass();

    const activeSynergy: ActiveSynergy[] = [];
    for (const classItem of synergyCount) {
      const classSynergy = this.classList[classItem.id as classId];

      const activeSynergyBonus = classSynergy.effect.reduce<
        | {
            tier: number;
            require: number;
            bonus: string;
          }
        | undefined
      >((pre, cur) => {
        if (cur.require > classItem.count) return pre;
        if (pre === undefined) return cur;
        return pre.require < cur.require ? cur : pre;
      }, undefined);

      if (activeSynergyBonus)
        activeSynergy.push({
          id: classSynergy.id,
          count: classItem.count,
          type: "class",
          isActive: true,
          bonus: {
            tier: activeSynergyBonus.tier,
            effect: activeSynergyBonus.bonus
          },
          data: classSynergy
        });
      else
        activeSynergy.push({
          id: classSynergy.id,
          count: classItem.count,
          type: "class",
          isActive: false,
          data: classSynergy
        });
    }
    return activeSynergy;
  }

  @Action({ rawError: true })
  private CountChampionOrigin(): SynergyCount[] {
    const synergyCount: SynergyCount[] = this.championPicked.reduce<
      SynergyCount[]
    >((acc, current) => {
      current.origin.forEach(origin => {
        const element = acc.find(p => p.id === origin);
        if (element) element.count++;
        else
          acc.push({
            count: 1,
            id: origin
          });
      });
      return acc;
    }, []);
    return synergyCount;
  }

  @Action({ rawError: true })
  private CountChampionClass(): SynergyCount[] {
    const classCount: SynergyCount[] = this.championPicked.reduce<
      SynergyCount[]
    >((acc, current) => {
      current.class.forEach(classItem => {
        const element = acc.find(p => p.id === classItem);
        if (element) element.count++;
        else
          acc.push({
            count: 1,
            id: classItem
          });
      });
      return acc;
    }, []);
    return classCount;
  }

  @Action({ rawError: true })
  public resetPickChampion() {
    this.SET_CHAMPION_PICKED([]);
  }

  // #endregion
}
export const championPick = getModule(ChampionPickModule);
