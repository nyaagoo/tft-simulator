import { ChampionLevelStatus } from "./../../models/champion";
import championList from "@/assets/data/9.18/champions.json";
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
  // #region State
  readonly championList = championList;
  readonly championTableRaw: ChampionDetail[] = Object.values(championList);
  readonly levelRatio = [1, 1.8, 1.8 * 2.0]; // FIXME: ここ配列なのは意図が違う
  championTable: ChampionLevelStatus[] = [];
  selectOriginList: string[] = [];
  selectClassList: string[] = [];
  selectLevel: number = 1;
  searchWord: string = "";
  // #endregion

  // #region MUTATION

  @Mutation
  public setChampionTable(data: ChampionLevelStatus[]) {
    this.championTable = data;
  }
  @Mutation
  public setSelectLevel(level: number) {
    this.selectLevel = level;
  }
  @Mutation
  public setSearchWord(word: string) {
    this.searchWord = word;
  }
  @Mutation
  public setSelectOriginList(originList: string[]) {
    this.selectOriginList = originList;
  }
  @Mutation
  public setSelectClassList(classList: string[]) {
    this.selectClassList = classList;
  }
  // #endregion

  // #region ACTION
  @Action({ rawError: true })
  public selectChampionLevel(level: number) {
    const index = level - 1;
    const championTable = this.championTableRaw.map(
      (x): ChampionLevelStatus => ({
        ...x,
        hp: Math.round(x.hp * this.levelRatio[index]),
        dps: Math.round(x.damage * this.levelRatio[index] * x.attackSpeed),
        damage: Math.round(x.damage * this.levelRatio[index])
      })
    );
    this.setSelectLevel(level);
    this.setChampionTable(championTable);
  }

  @Action({ rawError: true })
  public toggleSelectOrigin(originId: string) {
    if (!this.selectOriginList.includes(originId))
      this.setSelectOriginList([...this.selectOriginList, originId]);
    else
      this.setSelectOriginList(
        this.selectOriginList.filter(x => x !== originId)
      );
  }

  @Action({ rawError: true })
  public toggleSelectClass(classId: string) {
    if (!this.selectClassList.includes(classId))
      this.setSelectClassList([...this.selectClassList, classId]);
    else
      this.setSelectClassList(this.selectClassList.filter(x => x !== classId));
  }

  @Action({ rawError: true })
  public sortChampion(classId: string) {
    if (!this.selectClassList.includes(classId))
      this.setSelectClassList([...this.selectClassList, classId]);
    else
      this.setSelectClassList(this.selectClassList.filter(x => x !== classId));
  }

  // #endregion
}
export const championTable = getModule(ChampionTableModule);
