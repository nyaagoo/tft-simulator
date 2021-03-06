import { Synergy } from "./type";

export type ChampionOrigin = {
  origin: Synergy;
  championList: Champion[];
};

export type ChampionClass = {
  class: Synergy;
  championList: Champion[];
};

export type FavoriteOriginClass = {
  origin: ChampionOrigin[];
  class: ChampionClass[];
};

export const costColor: Map<number, string> = new Map([
  [1, "#bababa"],
  [2, "#94b6da"],
  [3, "#394eb4"],
  [4, "#b931ac"],
  [5, "#da8d3a"]
]);

export type ChampionDetail = {
  id: string;
  name: string;
  image: string;
  skill: {
    name: string;
    description: string;
    cost: number;
    img: string;
    leveltip: {
      label: string;
      effects: string[] | number[];
    }[];
  };
  origin: string[];
  class: string[];
  cost: number;
  hp: number;
  attackSpeed: number;
  damage: number;
  range: number;
  armor: number;
  magicRegist: number;
};

export type ChampionLevelStatus = {
  id: string;
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
};

export type Champion = Omit<ChampionDetail, "ruby" | "skill">;
