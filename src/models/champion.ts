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

export type ChampionOrigin = { origin: string; championList: Champion[] };

export type ChampionClass = { class: string; championList: Champion[] };

export type FavoriteOriginClass = {
  origin: ChampionOrigin[];
  class: ChampionClass[];
};

export type OriginCount = {
  count: number;
  origin: string;
};

export type ClassCount = {
  count: number;
  class: string;
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
