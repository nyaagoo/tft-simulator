import { OriginCount, ClassCount } from "@/models/type";
export interface Composition {
  id: number;
  name: string;
  comment: string;
  synergy: {
    origin: OriginCount[];
    class: ClassCount[];
  };
  patch: Patch;
  championList: ChampionList[];
}

export type ChampionList = {
  id: string;
  item: string[];
  location: number;
};

export type Patch = {
  create: string;
  valid: string;
};
