import { OriginID, ClassID } from "./type";

export interface Champion {
  id: number;
  name: string;
  image: string;
  origin: string[];
  class: string[];
  cost: number;
  hp: number;
  dps: number;
  attackSpeed: number;
  damage: number;
  range: number;
  armor: number;
  magicRegist: number;
}

export type ChampionOrigin = { origin: OriginID; championList: Champion[] };

export type ChampionClass = { class: ClassID; championList: Champion[] };

export type FavoriteOriginClass = {
  origin: ChampionOrigin[];
  class: ChampionClass[];
};

export type Synergy = {
  type: string;
  count: number;
  synergy: string;
};

export const costColor: Map<number, string> = new Map([
  [1, "#bababa"],
  [2, "#94b6da"],
  [3, "#394eb4"],
  [4, "#b931ac"],
  [5, "#da8d3a"]
]);

export type ChampionData = {
  id: number;
  name: string;
  ruby: string;
  image: string;
  // TODO: champion.jsonにスキルデータが入力されていないものがいるため、一時的にoptionalにしている
  skill?: {
    name: string;
    description: string;
    cost: number;
    img: string;
    leveltip: {
      label: string;
      effects: string[] | number[];
    }[];
  };
  origin: OriginID[];
  class: ClassID[];
  cost: number;
  hp: number;
  dps: number;
  attackSpeed: number;
  damage: number;
  range: number;
  armor: number;
  magicRegist: number;
};
