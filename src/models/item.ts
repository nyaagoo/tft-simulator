export type BasicItem = {
  number: number;
  id: string;
  name: string;
  description: string;
  img: string;
};

export type BuildItem = {
  id: string;
  name: string;
  description: string;
  img: string;
  recipe: string[];
};

export type BuildFromBasicItem = {
  basicItem: BasicItem;
  buildItem: BuildItem[];
};
