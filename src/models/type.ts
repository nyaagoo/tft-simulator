export type ClassID =
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

export type OriginID =
  | "Demon"
  | "Dragon"
  | "Exile"
  | "Glacial"
  | "Robot"
  | "Imperial"
  | "Noble"
  | "Ninja"
  | "Pirate"
  | "Phantom"
  | "Wild"
  | "Void"
  | "Yordle";

export type ClassOriginData = {
  id: string;
  name: string;
  img: string;
  synergy: {
    require: number;
    bonus: string;
  }[];
};

export type OriginCount = {
  count: number;
  origin: string;
};

export type ClassCount = {
  count: number;
  class: string;
};
