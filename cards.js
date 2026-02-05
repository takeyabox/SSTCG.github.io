export const CARDS = [
  {
    id: 1,
    name: "ダイナモローラー＋ex",
    type: "Metal",
    hp: 160,
    retreatCost: 4,
    weakness: "Fire",
    moves: [
      {
        cost: ["Metal", "Metal", "Colorless"],
        damage: 150,
        effect: "次のターン、このポケモンは技を使えない。",
        effectType: "cant_attack_next_turn"
      }
    ],
    isEx: true,
    stage: "Basic",
    evolutionFrom: null
  },
  {
    id: 2,
    name: "ノヴァブラスター＋ex",
    type: "Fire",
    hp: 130,
    retreatCost: 3,
    weakness: "Water",
    moves: [
      {
        cost: ["Fire", "Fire", "Fire"],
        damage: 100,
        effect: "相手のベンチポケモン1体にも20ダメージ。",
        effectType: "bench_damage",
        effectValue: 20
      }
    ],
    isEx: true,
    stage: "Basic",
    evolutionFrom: null
  },
  {
    id: 3,
    name: "ボールドマーカー＋ex",
    type: "Lightning",
    hp: 110,
    retreatCost: 1,
    weakness: "Fighting",
    moves: [
      {
        cost: ["Lightning", "Lightning"],
        damage: 0,
        effect: "なし",
        effectType: "none"
      }
    ],
    ability: {
      name: "ジャンプビーコン",
      effect: "自分の番に1回使える。自分のバトル場のポケモンにエネルギーがついているなら、ベンチポケモンと入れ替えることができる。"
    },
    isEx: true,
    stage: "Basic",
    evolutionFrom: null
  },
  {
    id: 4,
    name: "ヒッセン＋ex",
    type: "Water",
    hp: 130,
    retreatCost: 2,
    weakness: "Lightning",
    moves: [
      {
        cost: ["Water", "Water"],
        damage: 0,
        effect: "なし",
        effectType: "none"
      }
    ],
    isEx: true,
    stage: "Basic",
    evolutionFrom: null
  },
  {
    id: 5,
    name: ".52ガロン",
    type: "Psychic",
    hp: 60,
    retreatCost: 1,
    weakness: "Darkness",
    moves: [
      {
        cost: ["Psychic"],
        damage: 20,
        effect: "なし",
        effectType: "none"
      }
    ],
    isEx: false,
    stage: "Basic",
    evolutionFrom: null
  },
  {
    id: 6,
    name: ".52ガロン＋ex",
    type: "Psychic",
    hp: 150,
    retreatCost: 2,
    weakness: "Darkness",
    moves: [
      {
        cost: ["Psychic", "Psychic"],
        damage: 100,
        effect: "なし",
        effectType: "none"
      }
    ],
    ability: {
      name: "スプラッシュシールド",
      effect: "このポケモンが受けるダメージを-20する。"
    },
    isEx: true,
    stage: "Stage 1",
    evolutionFrom: ".52ガロン"
  },
  {
    id: 7,
    name: "シャープマーカー",
    type: "Lightning",
    hp: 60,
    retreatCost: 1,
    weakness: "Fighting",
    moves: [
      {
        cost: ["Lightning"],
        damage: 10,
        effect: "なし",
        effectType: "none"
      }
    ],
    isEx: false,
    stage: "Basic",
    evolutionFrom: null
  },
  {
    id: 8,
    name: "シャープマーカー＋ex",
    type: "Lightning",
    hp: 130,
    retreatCost: 1,
    weakness: "Fighting",
    moves: [
      {
        cost: ["Lightning", "Lightning"],
        damage: 50,
        effect: "相手のバトル場にいるポケモンが「ex」なら、60ダメージ追加。",
        effectType: "damage_plus_if_ex",
        effectValue: 60
      }
    ],
    isEx: true,
    stage: "Stage 1",
    evolutionFrom: "シャープマーカー"
  },
  {
    id: 9,
    name: "スプラシューター",
    type: "Fire",
    hp: 60,
    retreatCost: 1,
    weakness: "Water",
    moves: [
      {
        cost: ["Fire"],
        damage: 20,
        effect: "なし",
        effectType: "none"
      }
    ],
    isEx: false,
    stage: "Basic",
    evolutionFrom: null
  },
  {
    id: 10,
    name: "スプラシューター＋ex",
    type: "Fire",
    hp: 140,
    retreatCost: 2,
    weakness: "Water",
    moves: [
      {
        cost: ["Fire", "Fire"],
        damage: 60,
        effect: "コインを2回投げ、オモテの数×30ダメージ追加。",
        effectType: "coin_flip_damage",
        coinCount: 2,
        damagePerHead: 30
      }
    ],
    isEx: true,
    stage: "Stage 1",
    evolutionFrom: "スプラシューター"
  },
  {
    id: 11,
    name: "スプラローラー",
    type: "Fighting",
    hp: 60,
    retreatCost: 1,
    weakness: "Grass",
    moves: [
      {
        cost: ["Fighting", "Fighting"],
        damage: 40,
        effect: "なし",
        effectType: "none"
      }
    ],
    ability: {
      name: "潜伏",
      effect: "このポケモンは、ベンチにいるかぎり、技のダメージを受けない。"
    },
    isEx: false,
    stage: "Basic",
    evolutionFrom: null
  },
  {
    id: 12,
    name: "スプラローラー＋ex",
    type: "Fighting",
    hp: 150,
    retreatCost: 3,
    weakness: "Grass",
    moves: [
      {
        cost: ["Fighting", "Fighting", "Fighting"],
        damage: 110,
        effect: "なし",
        effectType: "none"
      }
    ],
    ability: {
      name: "潜伏",
      effect: "このポケモンのHPがまんたんの状態なら、このポケモンが相手から受ける技のダメージを-40する。"
    },
    isEx: true,
    stage: "Stage 1",
    evolutionFrom: "スプラローラー"
  },
  {
    id: 13,
    name: "バケットスロッシャー",
    type: "Water",
    hp: 70,
    retreatCost: 1,
    weakness: "Metal",
    moves: [
      {
        cost: ["Water"],
        damage: 20,
        effect: "なし",
        effectType: "none"
      }
    ],
    isEx: false,
    stage: "Basic",
    evolutionFrom: null
  },
  {
    id: 14,
    name: "バケットスロッシャー＋ex",
    type: "Water",
    hp: 140,
    retreatCost: 1,
    weakness: "Metal",
    moves: [
      {
        cost: ["Water", "Water"],
        damage: 0,
        effect: "相手のポケモンがランダムに3回選ばれ、選ばれたポケモン全員に、選ばれた回数×40ダメージ。",
        effectType: "random_sniping",
        times: 3,
        damagePerHit: 40
      }
    ],
    isEx: true,
    stage: "Stage 1",
    evolutionFrom: "バケットスロッシャー"
  },
  {
    id: 15,
    name: "スプラチャージャー－",
    type: "Water",
    hp: 40,
    retreatCost: 2,
    weakness: "Lightning",
    moves: [
      {
        cost: ["Water"],
        damage: 0,
        effect: "相手のポケモン1体に10ダメージ。",
        effectType: "snipe",
        damageValue: 10
      }
    ],
    isEx: false,
    stage: "Basic",
    evolutionFrom: null
  },
  {
    id: 16,
    name: "スプラチャージャー",
    type: "Water",
    hp: 90,
    retreatCost: 2,
    weakness: "Lightning",
    moves: [
      {
        cost: ["Water", "Water"],
        damage: 0,
        effect: "相手のポケモン1体に30ダメージ。",
        effectType: "snipe",
        damageValue: 30
      }
    ],
    isEx: false,
    stage: "Stage 1",
    evolutionFrom: "スプラチャージャー－"
  },
  {
    id: 17,
    name: "スプラチャージャー＋ex",
    type: "Water",
    hp: 160,
    retreatCost: 3,
    weakness: "Lightning",
    moves: [
      {
        cost: ["Water", "Water", "Colorless"],
        damage: 0,
        effect: "相手のポケモン1体に80ダメージ。",
        effectType: "snipe",
        damageValue: 80
      }
    ],
    isEx: true,
    stage: "Stage 2",
    evolutionFrom: "スプラチャージャー"
  },
  {
    id: 18,
    name: "スクリュースロッシャー－",
    type: "Metal",
    hp: 80,
    retreatCost: 2,
    weakness: "Fire",
    moves: [
      {
        cost: ["Metal"],
        damage: 30,
        effect: "なし",
        effectType: "none"
      }
    ],
    isEx: false,
    stage: "Basic",
    evolutionFrom: null
  },
  {
    id: 19,
    name: "スクリュースロッシャー",
    type: "Metal",
    hp: 100,
    retreatCost: 2,
    weakness: "Fire",
    moves: [
      {
        cost: ["Metal", "Metal"],
        damage: 60,
        effect: "なし",
        effectType: "none"
      }
    ],
    isEx: false,
    stage: "Stage 1",
    evolutionFrom: "スクリュースロッシャー－"
  },
  {
    id: 20,
    name: "スクリュースロッシャー＋ex",
    type: "Metal",
    hp: 170,
    retreatCost: 3,
    weakness: "Fire",
    moves: [
      {
        cost: ["Metal", "Metal"],
        damage: 40,
        effect: "自分のエネルギーゾーンから鋼エネルギーを2個出し、ベンチポケモンに好きなようにつける。",
        effectType: "energy_accel",
        energyCount: 2,
        energyType: "Metal"
      },
      {
        cost: ["Metal", "Metal", "Colorless", "Colorless"],
        damage: 100,
        effect: "なし",
        effectType: "none"
      }
    ],
    isEx: true,
    stage: "Stage 2",
    evolutionFrom: "スクリュースロッシャー"
  },
  {
    id: 21,
    name: ".96ガロン－",
    type: "Psychic",
    hp: 70,
    retreatCost: 3,
    weakness: "Darkness",
    moves: [
      {
        cost: ["Psychic", "Psychic"],
        damage: 40,
        effect: "なし",
        effectType: "none"
      }
    ],
    isEx: false,
    stage: "Basic",
    evolutionFrom: null
  },
  {
    id: 22,
    name: ".96ガロン",
    type: "Psychic",
    hp: 100,
    retreatCost: 3,
    weakness: "Darkness",
    moves: [
      {
        cost: ["Psychic", "Psychic"],
        damage: 50,
        effect: "",
        effectType: "none"
      }
    ],
    isEx: false,
    stage: "Stage 1",
    evolutionFrom: "96ガロン－"
  },
  {
    id: 23,
    name: ".96ガロン＋ex",
    type: "Psychic",
    hp: 160,
    retreatCost: 3,
    weakness: "Darkness",
    moves: [
      {
        cost: ["Psychic", "Psychic", "Psychic"],
        damage: 130,
        effect: "なし",
        effectType: "none"
      }
    ],
    isEx: true,
    stage: "Stage 2",
    evolutionFrom: "96ガロン"
  },
  {
    id: 24,
    name: "ハイドラント－",
    type: "Fire",
    hp: 80,
    retreatCost: 4,
    weakness: "Water",
    moves: [
      {
        cost: ["Fire", "Fire"],
        damage: 50,
        effect: "なし",
        effectType: "none"
      }
    ],
    isEx: false,
    stage: "Basic",
    evolutionFrom: null
  },
  {
    id: 25,
    name: "ハイドラント",
    type: "Fire",
    hp: 110,
    retreatCost: 4,
    weakness: "Water",
    moves: [
      {
        cost: ["Fire", "Fire", "Fire"],
        damage: 80,
        effect: "なし",
        effectType: "none"
      }
    ],
    isEx: false,
    stage: "Stage 1",
    evolutionFrom: "ハイドラント－"
  },
  {
    id: 26,
    name: "ハイドラント＋ex",
    type: "Fire",
    hp: 180,
    retreatCost: 4,
    weakness: "Water",
    moves: [
      {
        cost: ["Fire", "Fire", "Fire", "Fire"],
        damage: 170,
        effect: "このポケモンから炎エネルギーを2個トラッシュする。",
        effectType: "discard_energy",
        energyType: "Fire",
        discardCount: 2
      }
    ],
    isEx: true,
    stage: "Stage 2",
    evolutionFrom: "ハイドラント"
  },
  {
    id: 27,
    name: "プロモデラーMG＋",
    type: "Metal",
    hp: 70,
    retreatCost: 1,
    weakness: "Fire",
    moves: [
      {
        cost: ["Metal"],
        damage: 10,
        effect: "このポケモンにグッズがついているのならば30追加。",
        effectType: "conditional_damage",
        condition: "has_tool",
        bonusDamage: 30
      }
    ],
    isEx: false,
    stage: "Basic",
    evolutionFrom: null
  },
  {
    id: 28,
    name: "わかばシューター＋",
    type: "Colorless",
    hp: 60,
    retreatCost: 1,
    weakness: "Fighting",
    moves: [
      {
        cost: ["Colorless"],
        damage: 40,
        effect: "なし",
        effectType: "none"
      }
    ],
    isEx: false,
    stage: "Basic",
    evolutionFrom: null
  },
  {
    id: 29,
    name: "パブロ＋",
    type: "Lightning",
    hp: 50,
    retreatCost: 0,
    weakness: "Fighting",
    moves: [
      {
        cost: ["Lightning"],
        damage: 10,
        effect: "相手のベンチポケモン1匹にも20ダメージ。",
        effectType: "bench_damage",
        effectValue: 20
      }
    ],
    isEx: false,
    stage: "Basic",
    evolutionFrom: null
  },
  {
    id: 30,
    name: "L3リールガン＋",
    type: "Water",
    hp: 70,
    retreatCost: 3,
    weakness: "Lightning",
    moves: [
      {
        cost: ["Water"],
        damage: 20,
        effect: "ベンチの「リールガン」の数×20ダメージ",
        effectType: "name_count_damage",
        cardName: "リールガン",
        damagePerCard: 20
      }
    ],
    isEx: false,
    stage: "Basic",
    evolutionFrom: null,
    category: "リールガン"
  },
  {
    id: 31,
    name: "スプラスピナー＋",
    type: "Grass",
    hp: 90,
    retreatCost: 2,
    weakness: "Fire",
    moves: [
      {
        cost: ["Grass", "Grass"],
        damage: 70,
        effect: "このポケモンから草エネルギーを1個トラッシュ。",
        effectType: "discard_energy",
        energyType: "Grass",
        discardCount: 1
      }
    ],
    isEx: false,
    stage: "Basic",
    evolutionFrom: null
  },
  {
    id: 32,
    name: "カーボンローラー＋",
    type: "Darkness",
    hp: 70,
    retreatCost: 1,
    weakness: "Grass",
    moves: [
      {
        cost: ["Darkness"],
        damage: 20,
        effect: "コインを二回投げ表の数×20ダメージ",
        effectType: "coin_flip_damage",
        coinCount: 2,
        damagePerHead: 20
      }
    ],
    ability: {
      name: "潜伏",
      effect: "このブキは弱点による影響を受けない。"
    },
    isEx: false,
    stage: "Basic",
    evolutionFrom: null
  },
  {
    id: 33,
    name: "スクイックリンα",
    type: "Water",
    hp: 60,
    retreatCost: 1,
    weakness: "Lightning",
    moves: [
      {
        cost: ["Water"],
        damage: 10,
        effect: "なし",
        effectType: "none"
      }
    ],
    isEx: false,
    stage: "Basic",
    evolutionFrom: null
  },
  {
    id: 34,
    name: "スクイックリンα＋",
    type: "Water",
    hp: 90,
    retreatCost: 1,
    weakness: "Lightning",
    moves: [
      {
        cost: ["Water", "Colorless", "Colorless"],
        damage: 60,
        effect: "このポケモンのHPを30回復",
        effectType: "heal_self",
        healAmount: 30
      }
    ],
    isEx: false,
    stage: "Stage 1",
    evolutionFrom: "スクイックリンα"
  },
  {
    id: 35,
    name: "リッター3Kー",
    type: "Grass",
    hp: 60,
    retreatCost: 3,
    weakness: "Fire",
    moves: [
      {
        cost: ["Grass", "Colorless"],
        damage: 30,
        effect: "なし",
        effectType: "none"
      }
    ],
    isEx: false,
    stage: "Basic",
    evolutionFrom: null
  },
  {
    id: 36,
    name: "リッター3K",
    type: "Grass",
    hp: 110,
    retreatCost: 3,
    weakness: "Fire",
    moves: [
      {
        cost: ["Grass", "Grass", "Colorless"],
        damage: 50,
        effect: "なし",
        effectType: "none"
      }
    ],
    isEx: false,
    stage: "Stage 1",
    evolutionFrom: "リッター3K－"
  },
  {
    id: 37,
    name: "リッター3K＋ex",
    type: "Grass",
    hp: 170,
    retreatCost: 4,
    weakness: "Fire",
    moves: [
      {
        cost: ["Grass", "Grass", "Grass", "Colorless"],
        damage: 80,
        effect: "相手のベンチポケモン1匹にも80ダメージ。",
        effectType: "bench_damage",
        effectValue: 80
      }
    ],
    isEx: true,
    stage: "Stage 2",
    evolutionFrom: "リッター3K"
  },
  {
    id: 38,
    name: "H3リールガン",
    type: "Water",
    hp: 50,
    retreatCost: 3,
    weakness: "Lightning",
    moves: [
      {
        cost: ["Colorless"],
        damage: 20,
        effect: "なし",
        effectType: "none"
      }
    ],
    isEx: false,
    stage: "Basic",
    evolutionFrom: null,
    category: "リールガン"
  },
  {
    id: 39,
    name: "H3リールガン＋",
    type: "Water",
    hp: 90,
    retreatCost: 3,
    weakness: "Lightning",
    moves: [
      {
        cost: ["Water", "Water"],
        damage: 20,
        effect: "ベンチの「リールガン」の数×30ダメージ追加",
        effectType: "name_count_damage",
        cardName: "リールガン",
        damagePerCard: 30
      }
    ],
    isEx: false,
    stage: "Stage 1",
    evolutionFrom: "H3リールガン",
    category: "リールガン"
  },
  {
    id: 40,
    name: "ホクサイ",
    type: "Grass",
    hp: 60,
    retreatCost: 1,
    weakness: "Fire",
    moves: [
      {
        cost: ["Grass"],
        damage: 20,
        effect: "なし",
        effectType: "none"
      }
    ],
    isEx: false,
    stage: "Basic",
    evolutionFrom: null
  },
  {
    id: 41,
    name: "ホクサイ＋",
    type: "Grass",
    hp: 100,
    retreatCost: 2,
    weakness: "Fire",
    moves: [
      {
        cost: ["Grass"],
        damage: 50,
        effect: "なし",
        effectType: "none"
      }
    ],
    isEx: false,
    stage: "Stage 1",
    evolutionFrom: "ホクサイ"
  },
  {
    id: 42,
    name: "デュアルスイーパー",
    type: "Fighting",
    hp: 70,
    retreatCost: 1,
    weakness: "Psychic",
    moves: [
      {
        cost: ["Fighting"],
        damage: 20,
        effect: "なし",
        effectType: "none"
      }
    ],
    isEx: false,
    stage: "Basic",
    evolutionFrom: null
  },
  {
    id: 43,
    name: "デュアルスイーパー＋",
    type: "Fighting",
    hp: 110,
    retreatCost: 1,
    weakness: "Psychic",
    moves: [
      {
        cost: ["Fighting", "Fighting"],
        damage: 60,
        effect: "なし",
        effectType: "none"
      }
    ],
    isEx: false,
    stage: "Stage 1",
    evolutionFrom: "デュアルスイーパー"
  },
  {
    id: 44,
    name: "ラピッドブラスター",
    type: "Dragon",
    hp: 50,
    retreatCost: 1,
    weakness: null,
    moves: [
      {
        cost: ["Fire", "Lightning"],
        damage: 30,
        effect: "なし",
        effectType: "none"
      }
    ],
    isEx: false,
    stage: "Basic",
    evolutionFrom: null
  },
  {
    id: 45,
    name: "ラピッドブラスター＋",
    type: "Dragon",
    hp: 90,
    retreatCost: 2,
    weakness: null,
    moves: [
      {
        cost: ["Fire", "Lightning"],
        damage: 50,
        effect: "相手のベンチポケモン1匹にも20ダメージ。",
        effectType: "bench_damage",
        effectValue: 20
      }
    ],
    isEx: false,
    stage: "Stage 1",
    evolutionFrom: "ラピッドブラスター"
  },
  {
    id: 46,
    name: "N-ZAP85",
    type: "Darkness",
    hp: 60,
    retreatCost: 1,
    weakness: "Grass",
    moves: [
      {
        cost: ["Darkness"],
        damage: 20,
        effect: "なし",
        effectType: "none"
      }
    ],
    isEx: false,
    stage: "Basic",
    evolutionFrom: null
  },
  {
    id: 47,
    name: "N-ZAP85＋",
    type: "Darkness",
    hp: 100,
    retreatCost: 1,
    weakness: "Grass",
    moves: [
      {
        cost: ["Darkness", "Darkness"],
        damage: 60,
        effect: "なし",
        effectType: "none"
      }
    ],
    ability: {
      name: "スーパーセンサー",
      effect: "自分の番に1回使える。自分の山札を上から2枚見てもとにもどす。"
    },
    isEx: false,
    stage: "Stage 1",
    evolutionFrom: "N-ZAP85"
  },
  {
    id: 48,
    name: "ホットブラスター",
    type: "Fire",
    hp: 60,
    retreatCost: 2,
    weakness: "Water",
    moves: [
      {
        cost: ["Fire"],
        damage: 20,
        effect: "なし",
        effectType: "none"
      }
    ],
    isEx: false,
    stage: "Basic",
    evolutionFrom: null
  },
  {
    id: 49,
    name: "ホットブラスター＋",
    type: "Fire",
    hp: 110,
    retreatCost: 2,
    weakness: "Water",
    moves: [
      {
        cost: ["Fire", "Fire"],
        damage: 60,
        effect: "なし",
        effectType: "none"
      }
    ],
    isEx: false,
    stage: "Stage 1",
    evolutionFrom: "ホットブラスター"
  },
  {
    id: 50,
    name: "ロングブラスター",
    type: "Fire",
    hp: 70,
    retreatCost: 2,
    weakness: "Water",
    moves: [
      {
        cost: ["Fire"],
        damage: 20,
        effect: "なし",
        effectType: "none"
      }
    ],
    isEx: false,
    stage: "Basic",
    evolutionFrom: null
  },
  {
    id: 51,
    name: "ロングブラスター＋",
    type: "Fire",
    hp: 110,
    retreatCost: 3,
    weakness: "Water",
    moves: [
      {
        cost: ["Fire", "Fire", "Fire"],
        damage: 120,
        effect: "コインを1回投げ裏ならばこのワザは失敗",
        effectType: "coin_flip_fail",
        coinCount: 1
      }
    ],
    isEx: false,
    stage: "Stage 1",
    evolutionFrom: "ロングブラスター"
  },
  {
    id: 52,
    name: "14式竹筒銃・甲",
    type: "Grass",
    hp: 70,
    retreatCost: 1,
    weakness: "Fire",
    moves: [
      {
        cost: ["Grass"],
        damage: 50,
        effect: "なし",
        effectType: "none"
      }
    ],
    isEx: false,
    stage: "Basic",
    evolutionFrom: null
  },
  {
    id: 53,
    name: "14式竹筒銃・甲＋",
    type: "Grass",
    hp: 100,
    retreatCost: 2,
    weakness: "Fire",
    moves: [
      {
        cost: ["Grass"],
        damage: 80,
        effect: "このブキから草エネルギーを1個トラッシュする。",
        effectType: "discard_energy",
        energyType: "Grass",
        discardCount: 1
      }
    ],
    isEx: false,
    stage: "Stage 1",
    evolutionFrom: "14式竹筒銃・甲"
  },
  {
    id: 54,
    name: "バレルスピナー",
    type: "Psychic",
    hp: 60,
    retreatCost: 2,
    weakness: "Darkness",
    moves: [
      {
        cost: ["Psychic", "Psychic"],
        damage: 40,
        effect: "なし",
        effectType: "none"
      }
    ],
    isEx: false,
    stage: "Basic",
    evolutionFrom: null
  },
  {
    id: 55,
    name: "バレルスピナー＋",
    type: "Psychic",
    hp: 120,
    retreatCost: 2,
    weakness: "Darkness",
    moves: [
      {
        cost: ["Psychic", "Psychic"],
        damage: 20,
        effect: "このポケモンについている超エネルギーの数×20ダメージ。",
        effectType: "attached_energy_damage",
        energyType: "Psychic",
        damagePerEnergy: 20
      }
    ],
    isEx: false,
    stage: "Stage 1",
    evolutionFrom: "バレルスピナー"
  },
  {
    id: 57,
    name: "プライムシューターー",
    type: "Psychic",
    hp: 60,
    retreatCost: 1,
    weakness: "Darkness",
    moves: [
      {
        cost: ["Psychic"],
        damage: 20,
        effect: "なし",
        effectType: "none"
      }
    ],
    isEx: false,
    stage: "Basic",
    evolutionFrom: null
  },
  {
    id: 58,
    name: "プライムシューター",
    type: "Psychic",
    hp: 90,
    retreatCost: 1,
    weakness: "Darkness",
    moves: [
      {
        cost: ["Psychic"],
        damage: 50,
        effect: "なし",
        effectType: "none"
      }
    ],
    isEx: false,
    stage: "Stage 1",
    evolutionFrom: "プライムシューターー"
  },
  {
    id: 59,
    name: "プライムシューター＋",
    type: "Psychic",
    hp: 140,
    retreatCost: 2,
    weakness: "Darkness",
    moves: [
      {
        cost: ["Psychic", "Psychic"],
        damage: 100,
        effect: "なし",
        effectType: "none"
      }
    ],
    isEx: false,
    stage: "Stage 2",
    evolutionFrom: "プライムシューター"
  },
  {
    id: 60,
    name: "ジェットスイーパーー",
    type: "Darkness",
    hp: 60,
    retreatCost: 1,
    weakness: "Grass",
    moves: [
      {
        cost: ["Darkness"],
        damage: 20,
        effect: "なし",
        effectType: "none"
      }
    ],
    isEx: false,
    stage: "Basic",
    evolutionFrom: null
  },
  {
    id: 61,
    name: "ジェットスイーパー",
    type: "Darkness",
    hp: 80,
    retreatCost: 2,
    weakness: "Grass",
    moves: [
      {
        cost: ["Darkness", "Darkness"],
        damage: 60,
        effect: "なし",
        effectType: "none"
      }
    ],
    isEx: false,
    stage: "Stage 1",
    evolutionFrom: "ジェットスイーパーー"
  },
  {
    id: 62,
    name: "ジェットスイーパー＋",
    type: "Darkness",
    hp: 120,
    retreatCost: 2,
    weakness: "Grass",
    moves: [
      {
        cost: ["Darkness", "Darkness", "Darkness"],
        damage: 110,
        effect: "なし",
        effectType: "none"
      }
    ],
    isEx: false,
    stage: "Stage 2",
    evolutionFrom: "ジェットスイーパー"
  },
  {
    id: 63,
    name: "Rブラスターエリートー",
    type: "Dragon",
    hp: 60,
    retreatCost: 1,
    weakness: null,
    moves: [
      {
        cost: ["Colorless"],
        damage: 20,
        effect: "なし",
        effectType: "none"
      }
    ],
    isEx: false,
    stage: "Basic",
    evolutionFrom: null
  },
  {
    id: 64,
    name: "Rブラスターエリート",
    type: "Dragon",
    hp: 90,
    retreatCost: 2,
    weakness: null,
    moves: [
      {
        cost: ["Fire", "Lightning"],
        damage: 20,
        effect: "相手のベンチポケモン1匹にも50ダメージ。",
        effectType: "bench_damage",
        effectValue: 50
      }
    ],
    isEx: false,
    stage: "Stage 1",
    evolutionFrom: "Rブラスターエリートー"
  },
  {
    id: 65,
    name: "Rブラスターエリート＋",
    type: "Dragon",
    hp: 150,
    retreatCost: 2,
    weakness: null,
    moves: [
      {
        cost: ["Fire", "Lightning"],
        damage: 30,
        effect: "相手のベンチポケモン1匹にも90ダメージ。",
        effectType: "bench_damage",
        effectValue: 90
      }
    ],
    isEx: false,
    stage: "Stage 2",
    evolutionFrom: "ラピッドブラスターエリート"
  }
];
