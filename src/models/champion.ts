export interface Champion {
  name: string;
  image: string;
  origin: string | Origin;
  class: string | Class;
  cost: number;
  hp: number;
  dps: number;
  attackSpeed: number;
  damage: number;
  range: number;
  armor: number;
  magicRegist: number;
}

export type ChampionOrigin = { origin: Origin; championList: Champion[] };

export type ChampionClass = { class: Class; championList: Champion[] };

export type Origin =
  | "Assassin"
  | "Blademaster"
  | "Brawler"
  | "Elementalist"
  | "Guardian"
  | "Gunslinger"
  | "Knight"
  | "Ranger"
  | "Shapeshifter"
  | "Sorcerer";

export type Class =
  | "Demon"
  | "Dragon"
  | "Exile"
  | "Gracial"
  | "Robot"
  | "Imperial"
  | "Noble"
  | "Ninja"
  | "Pirate"
  | "Phantom"
  | "Wild"
  | "Void"
  | "Yordle";
