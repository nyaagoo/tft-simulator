export type Synergy = {
  id: string;
  name: string;
  img: string;
  effect: {
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
