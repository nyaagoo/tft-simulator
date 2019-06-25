export type BasicItemName =
  | "BFソード"
  | "リカーブボウ"
  | "ムダニデカイロッド"
  | "女神の涙"
  | "チェインベスト"
  | "ジャイアントベルト"
  | "ネガトロンクローク"
  | "ヘラ";

export type BasicItem = {
  id: number;
  name: string;
  description: string;
  img: string;
};

export type BuildItem = {
  id: number;
  name: string;
  description: string;
  img: string;
  recipe: number[];
};

export type BuildFromBasicItem = {
  basicItem: BasicItem,
  buildItem: BuildItem[]
}