import { ChampionLevelStatus } from "./../../models/champion";
import championList from "@/assets/data/9.17/champions.json";
import { ChampionDetail } from "@/models/champion";
import store from "@/store/store";
import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule
} from "vuex-module-decorators";

@Module({ dynamic: true, store, name: "championTable", namespaced: true })
class ChampionTableModule extends VuexModule {
  readonly championList = championList;
  readonly championTableRaw: ChampionDetail[] = Object.values(championList);
  championTable: ChampionLevelStatus[] = [];
  selectOriginList: string[] = [];
  selectClassList: string[] = [];

  selectLevel: number = 1;
  searchWord: string = "";
  // #endregion

  // #region MUTATION

  @Mutation
  public SET_CHAMPION_TABLE(data: ChampionLevelStatus[]) {
    this.championTable = data;
  }
  @Mutation
  public SET_SELECT_LEVEL(level: number) {
    this.selectLevel = level;
  }
  @Mutation
  public SET_SEARCH_WORD(word: string) {
    this.searchWord = word;
  }
  @Mutation
  public SET_SELECT_OROIGIN_LIST(originList: string[]) {
    this.selectOriginList = originList;
  }
  @Mutation
  public SET_SELECT_CLASS_LIST(classList: string[]) {
    this.selectClassList = classList;
  }
  // #endregion

  // #region ACTION
  @Action({ rawError: true })
  public SelectChampionLevel(level: number) {
    const index = level - 1;
    const data = this.championTableRaw.map(
      (x): ChampionLevelStatus => ({
        ...x,
        hp: x.hp[index],
        dps: x.dps[index],
        damage: x.damage[index]
      })
    );
    this.SET_SELECT_LEVEL(level);
    this.SET_CHAMPION_TABLE(data);
  }

  @Action({ rawError: true })
  public toggleSelectOrigin(originId: string) {
    if (!this.selectOriginList.includes(originId))
      this.SET_SELECT_OROIGIN_LIST([...this.selectOriginList, originId]);
    else
      this.SET_SELECT_OROIGIN_LIST(
        this.selectOriginList.filter(x => x !== originId)
      );
  }

  @Action({ rawError: true })
  public toggleSelectClass(classId: string) {
    if (!this.selectClassList.includes(classId))
      this.SET_SELECT_CLASS_LIST([...this.selectClassList, classId]);
    else
      this.SET_SELECT_CLASS_LIST(
        this.selectClassList.filter(x => x !== classId)
      );
  }

  @Action({ rawError: true })
  public sortChampion(classId: string) {
    if (!this.selectClassList.includes(classId))
      this.SET_SELECT_CLASS_LIST([...this.selectClassList, classId]);
    else
      this.SET_SELECT_CLASS_LIST(
        this.selectClassList.filter(x => x !== classId)
      );
  }

  // #endregion
}
export const championTable = getModule(ChampionTableModule);
