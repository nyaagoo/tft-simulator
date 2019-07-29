import basicItemList from "@/assets/json/basicItems.json";
import buildItemList from "@/assets/json/buildItems.json";

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

export type BasicItemIdList = keyof typeof basicItemList;
export type BuildItemIdList = keyof typeof buildItemList;
