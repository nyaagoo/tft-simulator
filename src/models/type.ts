export type Synergy = {
  id: string;
  name: string;
  img: string;
  effect: {
    require: number;
    bonus: string;
  }[];
};

export type SynergyCount = {
  id: string;
  count: number;
};

export type ActiveSynergy = {
  id: string;
  count: number;
  type: string;
  isActive: boolean;
  bonus?: {
    tier: number;
    effect: string;
  };
  data: Synergy;
};
