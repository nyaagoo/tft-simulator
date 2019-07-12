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
