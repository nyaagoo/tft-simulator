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
  name: BasicItemName;
  description: string;
  img: string;
};

export type BuildItem = {
  name: string;
  description: string;
  img: string;
  recipe: BasicItemName[];
};

export const buildItemList: BuildItem[] = [
  {
    name: "インフィニティ エッジ",
    description: "+200%のクリティカルダメージ",
    recipe: ["BFソード", "BFソード"],
    img: "https://dummyimage.com/32x32"
  },
  {
    name: "天帝の剣",
    description: "毎秒5%の確率でクリティカル攻撃を行う",
    recipe: ["BFソード", "リカーブボウ"],
    img: "https://dummyimage.com/32x32"
  },
  {
    name: "ガーディアンエンジェル",
    description: "300HPで復活する",
    recipe: ["BFソード", "チェインベスト"],
    img: "https://dummyimage.com/32x32"
  },
  {
    name: "ジークヘラルド",
    description: "隣接する味方の攻撃速度が上昇",
    recipe: ["BFソード", "ジャイアントベルト"],
    img: "https://dummyimage.com/32x32"
  },
  {
    name: "ヘクステックガンブレード",
    description: "25%のライフスティール、スペルヴァンプ",
    recipe: ["BFソード", "ムダニデカイロッド"],
    img: "https://dummyimage.com/32x32"
  },
  {
    name: "ブラッドサースター",
    description: "",
    recipe: ["BFソード", "ネガトロンクローク"],
    img: "https://dummyimage.com/32x32"
  },
  {
    name: "ショウジンの矛",
    description: "スキル使用後、攻撃毎に最大マナの20%を得る",
    recipe: ["BFソード", "女神の涙"],
    img: "https://dummyimage.com/32x32"
  },
  {
    name: "妖夢の霊剣",
    description: "ユニットにアサシンを付与",
    recipe: ["BFソード", "ヘラ"],
    img: "https://dummyimage.com/32x32"
  },
  {
    name: "ラピッドファイアキャノン",
    description: "攻撃射程が2倍 命中率100%",
    recipe: ["リカーブボウ", "リカーブボウ"],
    img: "https://dummyimage.com/32x32"
  },
  {
    name: "グインソーレイジブレード",
    description: "攻撃速度が命中ごとに5%ずつ無限に上昇",
    recipe: ["リカーブボウ", "ムダニデカイロッド"],
    img: "https://dummyimage.com/32x32"
  },
  {
    name: "スタティック シヴ",
    description: "攻撃3回毎に100の魔法ダメージ",
    recipe: ["リカーブボウ", "女神の涙"],
    img: "https://dummyimage.com/32x32"
  },
  {
    name: "ファントムダンサー",
    description: "クリティカル攻撃を完全回避",
    recipe: ["リカーブボウ", "チェインベスト"],
    img: "https://dummyimage.com/32x32"
  },
  {
    name: "マーキュリアル・シミター",
    description: "攻撃命中時、対象の★1つを消すチャンスがある",
    recipe: ["リカーブボウ", "ネガトロンクローク"],
    img: "https://dummyimage.com/32x32"
  },
  {
    name: "タイタンハイドラ",
    description: "最大HPの10%のスプラッシュダメージを追加",
    recipe: ["リカーブボウ", "ジャイアントベルト"],
    img: "https://dummyimage.com/32x32"
  },
  {
    name: "ルイドキングブレード",
    description: "ユニットにブレードマスターを付与",
    recipe: ["リカーブボウ", "ヘラ"],
    img: "https://dummyimage.com/32x32"
  },
  {
    name: "ラバドン・デスキャップ",
    description: "AP+50%",
    recipe: ["ムダニデカイロッド", "ムダニデカイロッド"],
    img: "https://dummyimage.com/32x32"
  },
  {
    name: "ルーデンエコー",
    description: "スキル命中時100のスプラッシュダメージを追加",
    recipe: ["ムダニデカイロッド", "女神の涙"],
    img: "https://dummyimage.com/32x32"
  },
  {
    name: "ソラリのロケット",
    description: "戦闘開始時、周囲のユニットに200のHPを追加",
    recipe: ["ムダニデカイロッド", "チェインベスト"],
    img: "https://dummyimage.com/32x32"
  },
  {
    name: "アイオニックスパーク",
    description: "装備ユニットがスキル攻撃すると敵が100ダメージを受ける",
    recipe: ["ムダニデカイロッド", "ネガトロンクローク"],
    img: "https://dummyimage.com/32x32"
  },
  {
    name: "モレロノミコン",
    description: "",
    recipe: ["ムダニデカイロッド", "ジャイアントベルト"],
    img: "https://dummyimage.com/32x32"
  },
  {
    name: "ユーミ",
    description: "ユニットにソーサラーを付与",
    recipe: ["ムダニデカイロッド", "ヘラ"],
    img: "https://dummyimage.com/32x32"
  },
  {
    name: "セラフエンブレイズ",
    description: "スキル攻撃のたびに⑳マナを回復",
    recipe: ["女神の涙", "女神の涙"],
    img: "https://dummyimage.com/32x32"
  },
  {
    name: "フローズンハート",
    description: "周囲の敵の攻撃速度を20%低下",
    recipe: ["女神の涙", "チェインベスト"],
    img: "https://dummyimage.com/32x32"
  },
  {
    name: "ハッシュ",
    description: "高確率で攻撃の度に敵にサイレンスを付与",
    recipe: ["女神の涙", "ネガトロンクローク"],
    img: "https://dummyimage.com/32x32"
  },
  {
    name: "リデンプション",
    description: "装備したユニットの死亡時、周囲の味方すべての1000HP回復",
    recipe: ["女神の涙", "ジャイアントベルト"],
    img: "https://dummyimage.com/32x32"
  },
  {
    name: "ダーキン",
    description: "ユニットにデーモン付与",
    recipe: ["女神の涙", "ヘラ"],
    img: "https://dummyimage.com/32x32"
  },
  {
    name: "ソーンメイル",
    description: "攻撃毎に25%の反射ダメージ",
    recipe: ["チェインベスト", "チェインベスト"],
    img: "https://dummyimage.com/32x32"
  },
  {
    name: "ソードブレイカー",
    description: "攻撃時、敵の装備を解除するチャンスがあります",
    recipe: ["チェインベスト", "ネガトロンクローク"],
    img: "https://dummyimage.com/32x32"
  },
  {
    name: "赤バフ",
    description: "攻撃毎に対象最大HPの2.5%のダメージ 回復阻害",
    recipe: ["チェインベスト", "ジャイアントベルト"],
    img: "https://dummyimage.com/32x32"
  },
  {
    name: "騎士の誓い",
    description: "ユニットにナイト付与",
    recipe: ["チェインベスト", "ヘラ"],
    img: "https://dummyimage.com/32x32"
  },
  {
    name: "ワーモグアーマー",
    description: "毎秒最大HPの5%を回復",
    recipe: ["ジャイアントベルト", "ジャイアントベルト"],
    img: "https://dummyimage.com/32x32"
  },
  {
    name: "ゼファー",
    description: "戦闘開始時5秒間敵を風の力で動けなくさせる",
    recipe: ["ジャイアントベルト", "ネガトロンクローク"],
    img: "https://dummyimage.com/32x32"
  },
  {
    name: "フローズンマレット",
    description: "ユニットにグレイシャルを付与",
    recipe: ["ジャイアントベルト", "ヘラ"],
    img: "https://dummyimage.com/32x32"
  },
  {
    name: "ドラゴンクロー",
    description: "魔法ダメージへの耐性が33%増加",
    recipe: ["ネガトロンクローク", "ネガトロンクローク"],
    img: "https://dummyimage.com/32x32"
  },
  {
    name: "ルナーンハリケーン",
    description: "攻撃時2体を50%のダメージで追加攻撃",
    recipe: ["ネガトロンクローク", "ヘラ"],
    img: "https://dummyimage.com/32x32"
  },
  {
    name: "自然の力",
    description: "ユニット召喚数を+1",
    recipe: ["ヘラ", "ヘラ"],
    img: "https://dummyimage.com/32x32"
  }
];
