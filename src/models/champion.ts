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

export type Class =
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

// TODO: 画面デザインまで固まったらこのデータはjsonから取ってくる。jsonはDBから取ってくるか埋め込むかは検討
export const originSynergy: {
  [K in Origin]: { require: number; bonus: string }[]
} = {
  /* eslint-disable prettier/prettier */
  Demon: [
    {require: 2, bonus: "デーモンの攻撃は相手の30％の確率で相手のマナを無くし、同量のTrueダメージを与える"},
    {require: 4, bonus: "デーモンの攻撃は相手の50％の確率で相手のマナを無くし、同量のTrueダメージを与える"},
    {require: 6, bonus: "デーモンの攻撃は相手の70％の確率で相手のマナを無くし、同量のTrueダメージを与える"}
  ],
  Dragon: [
    {require: 2, bonus: "ドラゴンは魔法ダメージを受けない"}
  ],
  Exile: [
    {require: 1, bonus: "近くに他のチャンピオンがいない場合、最大ヘルスの割合に応じたシールドを得る"}
  ],
  Gracial: [
    {require: 1, bonus: "グレイシャルの攻撃は25％の確率で2秒間のスタンを与える"},
    {require: 4, bonus: "グレイシャルの攻撃は35％の確率で2秒間のスタンを与える"},
    {require: 6, bonus: "グレイシャルの攻撃は45％の確率で2秒間のスタンを与える"}
  ],
  Robot: [
    {require: 1, bonus: "ロボットはマナが最大の状態で戦闘開始する"}
  ],
  Imperial: [
    {require: 2, bonus: "ランダムなインペリアル1体はダブルダメージを与える"},
    {require: 4, bonus: "すべてのインペリアルはダブルダメージを与える"}
  ],
  Noble: [
    {require: 3, bonus: "ランダムな味方1体はARが100上昇し攻撃毎に35HPを回復する"},
    {require: 6, bonus: "すべての味方はARが100上昇し攻撃毎に35HPを回復する"}
  ],
  Ninja: [
    {require: 1, bonus: "ニンジャの攻撃力が40%上昇する"},
    {require: 4, bonus: "全てのニンジャの攻撃力が60%上昇する"}
  ],
  Pirate: [
    {require: 3, bonus:"他のプレイヤーと戦闘後、最大4の追加ゴールドを得る"}
  ],
  Phantom: [
    {require: 3, bonus: "戦闘開始時にランダムな敵を呪い、HPを100に設定する"}
  ],
  Wild: [
    {require: 3, bonus: "ワイルドは攻撃毎にフューリースタックを得て攻撃速度が上昇する"},
    {require: 6, bonus: "すべての味方は攻撃毎にフューリースタックを得て攻撃速度が上昇する"}
  ],
  Void: [
    {require: 3, bonus: "基本攻撃が敵のARの50%を無視するようになる"}
  ],
  Yordle: [
    {require: 3, bonus: "味方ヨードルは20％の確率で攻撃を回避する"},
    {require: 6, bonus: "味方ヨードルは50％の確率で攻撃を回避する"}
  ]
    /* eslint-enable prettier/prettier */
};

// TODO: 画面デザインまで固まったらこのデータはjsonから取ってくる。jsonはDBから取ってくるか埋め込むかは検討
export const classSynergy: {
  [K in Class]: { require: number; bonus: string }[]
} = {
  /* eslint-disable prettier/prettier */
  Assassin: [
    {require: 3, bonus: "アサシンは戦闘開始時に最も遠い敵に飛びつき+150％のクリティカルダメージを与える"},
    {require: 6, bonus: "アサシンは戦闘開始時に最も遠い敵に飛びつき+350％のクリティカルダメージを与える"}
  ],
  Blademaster: [
    {require: 2, bonus: "ブレードマスターは攻撃毎に35％の確率で追加攻撃を行う"},
    {require: 4, bonus: "ブレードマスターは攻撃毎に35％の確率で2回追加攻撃を行う"}
  ],
  Brawler: [
    {require: 2, bonus: "ブロウラーは+300HPを得る"},
    {require: 4, bonus: "ブロウラーは+700HPを得る"}
  ],
  Elementalist: [
    {require: 1, bonus: "戦闘の開始時に小エレメンタルを召喚する"},
    {require: 2, bonus: "戦闘の開始時に大エレメンタルを召喚する"}
  ],
  Guardian: [
    {require: 2, bonus: "戦闘開始時に全てのガーディアンと隣接する味方ユニットのARが30上昇する"}
  ],
  Gunslinger: [
    {require: 2, bonus: "ガンスリンガーは攻撃後にランダムな敵に対して追加攻撃を行う場合がある"},
    {require: 4, bonus: "ガンスリンガーは攻撃後に全ての射程内の敵に対して追加攻撃を行う場合がある"}
  ],
  Knight: [
    {require: 2, bonus: "ナイトは通常攻撃による20ダメージをブロックする"},
    {require: 4, bonus: "ナイトは通常攻撃による40ダメージをブロックする"},
    {require: 6, bonus: "ナイトは通常攻撃による80ダメージをブロックする"}
  ],
  Ranger: [
    {require: 3, bonus:"レンジャーは攻撃時にASを2倍にする可能性がある"}
  ],
  Shapeshifter: [
    {require: 3, bonus:"シェイプシフターは変身時に最大ヘルスが上昇する"}
  ],
  Sorcerer: [
    {require: 3, bonus:"味方が与えるAPダメージが上昇する"}
  ]
  /* eslint-enable prettier/prettier */
};

export const costColor: Map<number, string> = new Map([
  [1, "#bababa"],
  [2, "#94b6da"],
  [3, "#394eb4"],
  [4, "#b931ac"],
  [5, "#da8d3a"]
]);
