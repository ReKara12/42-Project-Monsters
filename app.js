"use strict";

const STORAGE_KEYS = {
  profile: "project-monsters-profile",
  players: "project-monsters-players",
  runs: "project-monsters-runs",
  audio: "project-monsters-audio"
};

const COALITIONS = [
  { name: "Slytherin", color: "#00c853" },
  { name: "Gryffindor", color: "#ff1f1f" },
  { name: "Ravenclaw", color: "#1198e8" },
  { name: "Hufflepuff", color: "#d99a00" }
];

const STARTING_WALLET = 80;

const SHOP_ITEMS = [
  { id: "tr-rozet", name: "42 Türkiye Rozeti", price: 30, type: "Hatıra", color: "#d6d0c4" },
  { id: "tr-popsocket", name: "42 Türkiye Popsocket", price: 30, type: "Aksesuar", color: "#f0f0ec" },
  { id: "coalition-change", name: "Anlaşmalı Koalisyon Değiştirme", price: 50, type: "Kart", color: "#34c8c9" },
  { id: "tr-keychain", name: "42 Türkiye Anahtarlığı", price: 50, type: "Aksesuar", color: "#24282c" },
  { id: "istanbul-lanyard", name: "42 İstanbul Kart Askısı", price: 60, type: "Kampüs", color: "#f4f4f0" },
  { id: "tr-cap", name: "42 Türkiye Şapkası", price: 70, type: "Giyim", color: "#151719" },
  { id: "tr-notebook", name: "42 Türkiye Defteri", price: 70, type: "Kampüs", color: "#2b5d9a" },
  { id: "random-coalition", name: "Rastgele Koalisyon Değiştirme", price: 75, type: "Kart", color: "#34c8c9" },
  { id: "tr-mug", name: "42 Türkiye Kupası", price: 80, type: "Hatıra", color: "#f4f4f0" },
  { id: "new-intra-photo", name: "Yeni Intra Profil Fotoğrafı", price: 100, type: "Profil", color: "#8f5be8" },
  { id: "evaluation-point", name: "Değerlendirme Puanı", price: 100, type: "Bonus", color: "#ff5e57" },
  { id: "tr-tote", name: "42 Türkiye Bez Çantası", price: 100, type: "Giyim", color: "#e8dcc9" },
  { id: "sticker-pack", name: "Sticker Paketi", price: 120, type: "Hatıra", color: "#b98cff" },
  { id: "istanbul-shirt", name: "42 Türkiye Özel Tasarım Tişört - İstanbul", price: 142, type: "Giyim", color: "#101112" },
  { id: "storage-1gb", name: "Ek Depolama Alanı I | 1 GB", price: 175, type: "Intra", color: "#2fca67" },
  { id: "storage-2gb-a", name: "Ek Depolama Alanı II | 2 GB", price: 300, type: "Intra", color: "#2fca67" },
  { id: "storage-2gb-b", name: "Ek Depolama Alanı III | 2 GB", price: 300, type: "Intra", color: "#2fca67" },
  { id: "istanbul-hoodie", name: "42 Türkiye Özel Tasarım Hoodie - İstanbul", price: 342, type: "Giyim", color: "#111315" },
  { id: "tr-towel", name: "42 Türkiye Havlusu", price: 42000, type: "Efsane", color: "#45c7ff" }
];

const BATTLE_LOOT_ITEMS = [
  { id: "norminette-bypass", name: "Norminette Bypass", type: "Battle Loot", color: "#ffbd4a" },
  { id: "valgrind-potion", name: "Valgrind Potion", type: "Battle Loot", color: "#78d66f" },
  { id: "pointer-shield", name: "Pointer Shield", type: "Battle Loot", color: "#45c7ff" },
  { id: "malloc-elixir", name: "Malloc Elixir", type: "Battle Loot", color: "#b98cff" }
];

const ACHIEVEMENT_BUFFS = [
  { name: "Bonus Hunter 1", category: "Project", active: true, damage: 2, description: "+2 saldırı hasarı" },
  { name: "Code Explorer 1", category: "Project", active: true, hp: 3, description: "+3 HP" },
  { name: "Code Explorer 2", category: "Project", active: true, power: 1, description: "+1 power" },
  { name: "Happy 42nd Day!", category: "Social", active: true, walletFlat: 5, description: "Her galibiyette +5 ₳" },
  { name: "I have no idea what I'm doing", category: "Defense", active: true, hp: 5, description: "+5 HP" },
  { name: "I'm reliable !", category: "Defense", active: true, hp: 10, description: "+10 HP" },
  { name: "Rigorous Basterd 1", category: "Project", active: true, walletMultiplier: 0.1, description: "Galibiyet ₳ ödülü +10%" },
  { name: "Visit Kocaeli", category: "Campus", active: true, hp: 5, description: "+5 HP" },
  { name: "Welcome, Learner !", category: "Piscine", active: true, hp: 5, description: "+5 HP" },
  { name: "Advanced Slayer 1", category: "Project", power: 1, description: "+1 power" },
  { name: "All for One 1", category: "Group", hp: 8, description: "+8 HP" },
  { name: "Ambassador", category: "Social", walletMultiplier: 0.08, description: "Galibiyet ₳ ödülü +8%" },
  { name: "Awake", category: "Project", damage: 1, hp: 5, description: "+1 hasar, +5 HP" },
  { name: "Bill Gates 1", category: "Evaluation", walletFlat: 4, description: "Her galibiyette +4 ₳" },
  { name: "Bonus Hunter 2", category: "Project", damage: 3, description: "+3 saldırı hasarı" },
  { name: "Business Angel", category: "Partnership", walletMultiplier: 0.1, description: "Galibiyet ₳ ödülü +10%" },
  { name: "Code Explorer 3", category: "Project", power: 2, description: "+2 power" },
  { name: "CodinGame Challenger: Fall", category: "Challenge", power: 1, description: "+1 power" },
  { name: "CodinGame Challenger: Spring", category: "Challenge", power: 1, description: "+1 power" },
  { name: "CodinGame Challenger: Summer", category: "Challenge", power: 1, description: "+1 power" },
  { name: "CodinGame Challenger: Winter", category: "Challenge", power: 1, description: "+1 power" },
  { name: "Coming back from the future", category: "R&D", hp: 6, description: "+6 HP" },
  { name: "COMMs Slayer 1", category: "Comms", damage: 1, description: "+1 saldırı hasarı" },
  { name: "Competition Winner", category: "Competition", power: 2, description: "+2 power" },
  { name: "Do you know KIMCHI?", category: "Campus", hp: 5, description: "+5 HP" },
  { name: "Dusk Bat 1", category: "Time", damage: 1, description: "+1 saldırı hasarı" },
  { name: "Exemplary Citizen 1", category: "Discipline", hp: 8, description: "+8 HP" },
  { name: "Film buff 1", category: "Pedagogy", hp: 4, description: "+4 HP" },
  { name: "FTL: Faster Than Light", category: "Challenge", power: 1, description: "+1 power" },
  { name: "Glorious Future 1", category: "Coalition", walletFlat: 6, description: "Her galibiyette +6 ₳" },
  { name: "Hello, Welcome !", category: "Campus", hp: 5, description: "+5 HP" },
  { name: "I am the answer", category: "Milestone", damage: 2, walletMultiplier: 0.05, description: "+2 hasar, ₳ +5%" },
  { name: "I didn't get into Berghain", category: "Campus", hp: 5, description: "+5 HP" },
  { name: "I don't know!", category: "Piscine", hp: 5, description: "+5 HP" },
  { name: "I found the answer", category: "Milestone", damage: 2, walletMultiplier: 0.05, description: "+2 hasar, ₳ +5%" },
  { name: "I got hit by a bike", category: "Campus", hp: 5, description: "+5 HP" },
  { name: "Is this an onion? 1", category: "Wallet", walletFlat: 5, description: "Her galibiyette +5 ₳" },
  { name: "I Survived the Beta", category: "R&D", hp: 8, description: "+8 HP" },
  { name: "It's a rich man's world 1", category: "Wallet", walletMultiplier: 0.12, description: "Galibiyet ₳ ödülü +12%" },
  { name: "Je voudrais un bretzel", category: "Campus", hp: 5, description: "+5 HP" },
  { name: "Je voudrais un croissant", category: "Campus", hp: 5, description: "+5 HP" },
  { name: "Je voudrais une fondue", category: "Campus", hp: 5, description: "+5 HP" },
  { name: "Je voudrais une praluline", category: "Campus", hp: 5, description: "+5 HP" },
  { name: "Je voudrais une socca", category: "Campus", hp: 5, description: "+5 HP" },
  { name: "Legendary Board Game Player", category: "Competition", power: 1, description: "+1 power" },
  { name: "Legendary Table Football Player", category: "Competition", power: 1, description: "+1 power" },
  { name: "Legendary Table Tennis Player", category: "Competition", power: 1, description: "+1 power" },
  { name: "Low Level Master", category: "Project", damage: 2, description: "+2 saldırı hasarı" },
  { name: "Master of the basics", category: "Project", damage: 2, hp: 8, description: "+2 hasar, +8 HP" },
  { name: "Midday Parrot 1", category: "Time", power: 1, description: "+1 power" },
  { name: "Missionary", category: "Social", walletFlat: 4, description: "Her galibiyette +4 ₳" },
  { name: "Morning Rooster 1", category: "Time", hp: 5, description: "+5 HP" },
  { name: "Navigator of Explorers", category: "Piscine", hp: 8, description: "+8 HP" },
  { name: "Nett hier!", category: "Campus", hp: 5, description: "+5 HP" },
  { name: "Night Owl 1", category: "Time", damage: 1, description: "+1 saldırı hasarı" },
  { name: "Outstander 1", category: "Evaluation", walletFlat: 5, description: "Her galibiyette +5 ₳" },
  { name: "Perfectionist 1", category: "Project", damage: 2, description: "+2 saldırı hasarı" },
  { name: "Rigorous Basterd 2", category: "Project", walletMultiplier: 0.15, description: "Galibiyet ₳ ödülü +15%" },
  { name: "Seal of Approval 1", category: "Coalition", walletFlat: 6, description: "Her galibiyette +6 ₳" },
  { name: "Shopaholic 1", category: "Wallet", walletMultiplier: 0.08, description: "Galibiyet ₳ ödülü +8%" },
  { name: "Social Butterfly 1", category: "Evaluation", hp: 10, description: "+10 HP" },
  { name: "Student Representative", category: "Social", hp: 10, description: "+10 HP" },
  { name: "That schnitzel was really good! 1", category: "Campus", hp: 5, description: "+5 HP" },
  { name: "The Boss 1", category: "Internship", power: 1, walletMultiplier: 0.05, description: "+1 power, ₳ +5%" },
  { name: "The City of Cats", category: "Campus", hp: 8, description: "+8 HP" },
  { name: "Typo Hunter", category: "Challenge", damage: 1, description: "+1 saldırı hasarı" },
  { name: "Une frite une fois ? Non peut-être !", category: "Campus", hp: 5, description: "+5 HP" },
  { name: "Watch all the things !", category: "Pedagogy", hp: 6, description: "+6 HP" },
  { name: "Welcome to 42Amman!", category: "Campus", hp: 5, description: "+5 HP" },
  { name: "Welcome to 42Irbid!", category: "Campus", hp: 5, description: "+5 HP" }
];

const TRAINER_ASSETS = {
  Slytherin: "assets/trainers/slytherin.png",
  Gryffindor: "assets/trainers/gryffindor.png",
  Ravenclaw: "assets/trainers/ravenclaw.png",
  Hufflepuff: "assets/trainers/hufflepuff.png"
};

const FALLBACK_MONSTER_SPRITES = {
  codexgolem: "42_Collaborative_resume.png",
  vectorvark: "The_Answer_Protocol.png",
  neonpong: "Pac-Man.png",
  pipexus: "The_Answer_Protocol.png",
  signalsaur: "Call_Me_Maybe.png",
  longwalker: "A-Maze-ing.png",
  wirerender: "NetPractice.png",
  fractalus: "fract-ol.png",
  shellshocker: "agent_smith.png",
  philonosopher: "Born2beroot.png",
  raytracer: "miniRT.png",
  raycaster: "cub3D.png",
  polymorphon: "C++_Modules_00-04.png",
  webcraft: "webserv.png",
  irchon: "ft_irc.png",
  templatord: "Python_Module_00-10.png"
};
const COALITION_ALIASES = {
  "The Alliance": "Ravenclaw",
  "The Assembly": "Hufflepuff",
  "The Federation": "Slytherin",
  "The Order": "Gryffindor"
};

// =====================================================================
// BattleEngine — tactical move resolution (heal, buff, debuff, stun, DoT…)
// =====================================================================
const BattleEngine = (() => {
  const DEFAULT_ACCURACY = 100;
  const LIFESTEAL_RATIO = 0.5;
  const RECOIL_RATIO = 0.25;
  const STAT_LABELS = { hp: "HP", power: "Güç", defense: "Defans", accuracy: "İsabet", speed: "Hız" };
  const MOVE_TAGS = { damage: "⚔", heal: "♥", buff: "▲", debuff: "▼", stun: "⚡", dot: "☣", lifesteal: "◈", recoil: "↩" };

  function normalizeMove(raw) {
    if (!raw || typeof raw !== "object") return null;
    const legacyName = String(raw.attack || "").trim();
    const name = String(raw.name || legacyName || "").trim();
    if (!name) return null;
    if (legacyName && !raw.name && !raw.type) {
      let basePower = Number(raw.damage);
      if (!Number.isFinite(basePower) || basePower <= 0) basePower = 18;
      return {
        name: legacyName,
        type: "damage",
        basePower,
        accuracy: DEFAULT_ACCURACY,
        target: "enemy",
        description: ""
      };
    }
    const type = String(raw.type || "damage").trim();
    let basePower = raw.basePower ?? raw.damage;
    if (basePower != null) {
      basePower = Number(basePower);
      if (!Number.isFinite(basePower)) basePower = undefined;
    }
    const move = {
      name,
      type,
      accuracy: Number.isFinite(Number(raw.accuracy)) ? Math.max(0, Math.min(100, Number(raw.accuracy))) : DEFAULT_ACCURACY,
      target: raw.target === "self" ? "self" : "enemy",
      description: String(raw.description || "").trim()
    };
    if (basePower != null) move.basePower = Math.max(0, Math.round(basePower));
    if (raw.buffSelf) move.buffSelf = true;
    if (raw.effect && typeof raw.effect === "object") {
      move.effect = {
        stat: raw.effect.stat,
        modifier: Number(raw.effect.modifier),
        duration: Number.isFinite(Number(raw.effect.duration)) ? Math.max(1, Math.round(Number(raw.effect.duration))) : 3,
        chance: Number.isFinite(Number(raw.effect.chance)) ? Math.max(0, Math.min(1, Number(raw.effect.chance))) : 1
      };
    }
    return move;
  }

  function initFighterCombatState(fighter) {
    if (!fighter) return fighter;
    fighter.defense = Number.isFinite(Number(fighter.defense)) ? Number(fighter.defense) : 10;
    fighter.speed = Number.isFinite(Number(fighter.speed)) ? Number(fighter.speed) : 4;
    fighter.accuracy = Number.isFinite(Number(fighter.accuracy)) ? Number(fighter.accuracy) : DEFAULT_ACCURACY;
    fighter.statusEffects = fighter.statusEffects || [];
    fighter.dots = fighter.dots || [];
    fighter.stunned = Math.max(0, Math.round(Number(fighter.stunned) || 0));
    return fighter;
  }

  function cloneMoves(moves) {
    return (moves || []).map((move) => {
      const copy = { ...move };
      if (move.effect) copy.effect = { ...move.effect };
      return copy;
    });
  }

  function getEffectiveStat(fighter, stat) {
    let base;
    switch (stat) {
      case "power":
        base = Number(fighter.power) || 1;
        break;
      case "defense":
        base = Number(fighter.defense) || 10;
        break;
      case "accuracy":
        base = Number(fighter.accuracy) || DEFAULT_ACCURACY;
        break;
      case "speed":
        base = Number(fighter.speed) || 4;
        break;
      default:
        return 0;
    }
    let mult = 1;
    for (const eff of fighter.statusEffects || []) {
      if (eff.stat === stat && Number.isFinite(eff.modifier)) mult *= eff.modifier;
    }
    if (stat === "accuracy") return Math.min(100, Math.max(5, Math.round(base * mult)));
    return Math.max(1, Math.round(base * mult));
  }

  function rollAccuracy(attacker, defender, move) {
    const moveAcc = Math.min(100, Math.max(0, Number(move.accuracy ?? DEFAULT_ACCURACY)));
    const atkAcc = getEffectiveStat(attacker, "accuracy");
    const defAcc = getEffectiveStat(defender, "accuracy");
    const hitRate = moveAcc * (atkAcc / DEFAULT_ACCURACY) * (DEFAULT_ACCURACY / Math.max(defAcc, 1));
    const finalRate = Math.min(100, Math.max(5, hitRate));
    return Math.random() * 100 < finalRate;
  }

  function procChance(effect) {
    if (!effect) return true;
    const chance = effect.chance;
    if (chance == null || chance >= 1) return true;
    return Math.random() < chance;
  }

  function calcDamage(attacker, defender, move) {
    const basePower = Math.max(1, Number(move.basePower) || 18);
    const atkPower = getEffectiveStat(attacker, "power") + Math.max(0, Number(attacker.damageBonus) || 0);
    const def = Math.max(1, getEffectiveStat(defender, "defense"));
    return Math.max(1, Math.round((basePower * atkPower) / def));
  }

  function applyStatus(fighter, effect) {
    if (!effect?.stat || !Number.isFinite(effect.modifier)) return false;
    fighter.statusEffects.push({
      stat: effect.stat,
      modifier: effect.modifier,
      duration: Math.max(1, Number(effect.duration) || 3)
    });
    return true;
  }

  function applyDot(fighter, effect) {
    const perTurn = Math.max(1, Math.round(Number(effect?.modifier) || 8));
    const remaining = Math.max(1, Math.round(Number(effect?.duration) || 3));
    fighter.dots.push({ perTurn, remaining });
  }

  function describeStatEffect(stat, modifier) {
    const label = STAT_LABELS[stat] || stat;
    const pct = Math.round(Math.abs(modifier - 1) * 100);
    return label + (modifier >= 1 ? " %" + pct + " arttı" : " %" + pct + " düştü");
  }

  function resolveEffectTarget(attacker, defender, move) {
    if (move.buffSelf || move.target === "self") return attacker;
    return defender;
  }

  function processDotPhase(fighter, displayName) {
    const logs = [];
    let total = 0;
    const nextDots = [];
    for (const dot of fighter.dots || []) {
      if (dot.remaining > 0) {
        total += dot.perTurn;
        dot.remaining -= 1;
        if (dot.remaining > 0) nextDots.push(dot);
      }
    }
    fighter.dots = nextDots;
    if (total > 0) {
      fighter.hp = Math.max(0, fighter.hp - total);
      logs.push(displayName + " DoT hasarı aldı: " + total + "!");
    }
    return logs;
  }

  function tickFighterEndTurn(fighter) {
    fighter.statusEffects = (fighter.statusEffects || [])
      .map((eff) => ({ ...eff, duration: eff.duration - 1 }))
      .filter((eff) => eff.duration > 0);
  }

  function tryConsumeStun(fighter, displayName) {
    if ((fighter.stunned || 0) > 0) {
      fighter.stunned -= 1;
      return displayName + " sersemledi ve hamlesini yapamadı!";
    }
    return null;
  }

  function executeMove(attacker, defender, move) {
    const logs = [];
    const aName = stripLevelSuffix(attacker.name);
    const dName = stripLevelSuffix(defender.name);
    const moveName = move.name || move.attack || "Hamle";
    const type = move.type || "damage";

    if (!rollAccuracy(attacker, defender, move)) {
      logs.push(aName + " " + moveName + " kullandı... Isabet etmedi!");
      return { logs, hit: false, damage: 0, healed: 0 };
    }

    let damage = 0;
    let healed = 0;

    if (type === "heal") {
      const amount = Math.max(1, Math.round(Number(move.basePower) || 20));
      const before = attacker.hp;
      attacker.hp = Math.min(attacker.maxHp, attacker.hp + amount);
      healed = attacker.hp - before;
      logs.push(aName + " " + moveName + " kullandı! " + aName + " " + healed + " HP iyileşti!");
      return { logs, hit: true, damage: 0, healed };
    }

    if (type === "buff" || type === "debuff") {
      const target = resolveEffectTarget(attacker, defender, move);
      const tName = target === attacker ? aName : dName;
      if (procChance(move.effect) && applyStatus(target, move.effect)) {
        logs.push(aName + " " + moveName + " kullandı! " + tName + " — " + describeStatEffect(move.effect.stat, move.effect.modifier) + " (" + (move.effect.duration || 3) + " tur).");
      } else {
        logs.push(aName + " " + moveName + " kullandı... Efekt tutmadı!");
      }
      return { logs, hit: true, damage: 0, healed: 0 };
    }

    if (type === "stun") {
      if (procChance(move.effect)) {
        const turns = Math.max(1, Number(move.effect?.duration) || 1);
        defender.stunned = Math.max(defender.stunned || 0, turns);
        logs.push(aName + " " + moveName + " kullandı! " + dName + " sersemledi!");
      } else {
        logs.push(aName + " " + moveName + " kullandı... Sersemletme başarısız!");
      }
      return { logs, hit: true, damage: 0, healed: 0 };
    }

    if (type === "dot") {
      if (procChance(move.effect)) {
        applyDot(defender, move.effect);
        const per = move.effect?.modifier || 8;
        const dur = move.effect?.duration || 3;
        logs.push(aName + " " + moveName + " kullandı! " + dName + " virüslendi (" + per + " hasar/tur, " + dur + " tur).");
      } else {
        logs.push(aName + " " + moveName + " kullandı... DoT uygulanamadı!");
      }
      return { logs, hit: true, damage: 0, healed: 0 };
    }

    const dmgTarget = move.target === "self" ? attacker : defender;
    const dmgName = dmgTarget === attacker ? aName : dName;
    damage = calcDamage(attacker, defender, move);
    dmgTarget.hp = Math.max(0, dmgTarget.hp - damage);
    logs.push(aName + " " + moveName + " kullandı! " + dmgName + " " + damage + " hasar aldı!");

    if (type === "lifesteal" && damage > 0) {
      const steal = Math.round(damage * LIFESTEAL_RATIO);
      const before = attacker.hp;
      attacker.hp = Math.min(attacker.maxHp, attacker.hp + steal);
      healed = attacker.hp - before;
      logs.push(aName + " " + steal + " HP çaldı!");
    }

    if (type === "recoil" && damage > 0) {
      const recoil = Math.max(1, Math.round(damage * RECOIL_RATIO));
      attacker.hp = Math.max(0, attacker.hp - recoil);
      logs.push(aName + " " + recoil + " geri tepme hasarı aldı!");
    }

    if (move.effect?.stat && procChance(move.effect)) {
      const statTarget = move.buffSelf ? attacker : defender;
      const statName = statTarget === attacker ? aName : dName;
      if (applyStatus(statTarget, move.effect)) {
        logs.push(statName + " — " + describeStatEffect(move.effect.stat, move.effect.modifier) + " (" + (move.effect.duration || 3) + " tur).");
      }
    }

    return { logs, hit: true, damage, healed };
  }

  function formatMoveLabel(move) {
    const n = move.name || move.attack || "?";
    const tag = MOVE_TAGS[move.type] || "⚔";
    const bp = move.basePower ?? move.damage;
    return bp != null ? n + " " + tag + bp : n + " " + tag;
  }

  function appendBattleLog(battle, lines) {
    const text = Array.isArray(lines) ? lines.filter(Boolean).join(" ") : String(lines || "");
    battle.log = text;
    if (typeof appendBattleUiLog === "function") appendBattleUiLog(text);
  }

  return {
    DEFAULT_ACCURACY,
    normalizeMove,
    cloneMoves,
    initFighterCombatState,
    getEffectiveStat,
    executeMove,
    processDotPhase,
    tickFighterEndTurn,
    tryConsumeStun,
    formatMoveLabel,
    appendBattleLog
  };
})();

function appendBattleUiLog(message) {
  if (!message) return;
  const battle = app.battle;
  if (battle) battle.log = message;
}

const MONSTERS = buildMonsterCatalog(Array.isArray(window.MONSTER_DATA) ? window.MONSTER_DATA : []);
const TRAINER_IMAGES = preloadTrainerImages();
const BATTLE_BACKGROUND_IMAGE = preloadBattleBackground();
const MONSTER_SPRITES = Object.create(null);
const MONSTER_SPRITE_FAILED = new Set();
const MONSTER_SPRITE_LOADING = new Map();
let ENEMY_MANIFEST_BY_ID = Object.create(null);
const MENU_WHITE_WIPE_MS = 2000;
const VILLAGE_ENEMY_AI_MS = 760;
const VILLAGE_ENEMY_CHASE_RADIUS = 5;
const SEG_FAULT_DAMAGE = 10;
const SEG_FAULT_REPEAT_MS = 2000;
const VILLAGE_WARNING_MS = 950;

const els = {
  appShell: document.querySelector("#app"),
  statusLine: document.querySelector("#statusLine"),
  profileChip: document.querySelector("#profileChip"),
  logoutButton: document.querySelector("#logoutButton"),
  inventoryButton: document.querySelector("#inventoryButton"),
  inventoryModal: document.querySelector("#inventoryModal"),
  closeInventoryButton: document.querySelector("#closeInventoryButton"),
  walletBalance: document.querySelector("#walletBalance"),
  inventoryGrid: document.querySelector("#inventoryGrid"),
  achievementBuffGrid: document.querySelector("#achievementBuffGrid"),
  shopGrid: document.querySelector("#shopGrid"),
  inventoryStatus: document.querySelector("#inventoryStatus"),
  soundButton: document.querySelector("#soundButton"),
  loginScreen: document.querySelector("#loginScreen"),
  leaderboardScreen: document.querySelector("#leaderboardScreen"),
  settingsScreen: document.querySelector("#settingsScreen"),
  marketScreen: document.querySelector("#marketScreen"),
  frontScreen: document.querySelector("#frontScreen"),
  gameScreen: document.querySelector("#gameScreen"),
  resultScreen: document.querySelector("#resultScreen"),
  login42Button: document.querySelector("#login42Button"),
  localProfileForm: document.querySelector("#localProfileForm"),
  intraInput: document.querySelector("#intraInput"),
  coalitionInput: document.querySelector("#coalitionInput"),
  menuLeaderboard: document.querySelector("#menuLeaderboard"),
  frontLeaderboard: document.querySelector("#frontLeaderboard"),
  resultLeaderboard: document.querySelector("#resultLeaderboard"),
  eventFeed: document.querySelector("#eventFeed"),
  frontGrid: document.querySelector("#frontGrid"),
  frontKicker: document.querySelector("#frontKicker"),
  frontTitle: document.querySelector("#frontTitle"),
  frontHint: document.querySelector("#frontHint"),
  encounterPreview: document.querySelector("#encounterPreview"),
  refreshBoardButton: document.querySelector("#refreshBoardButton"),
  canvas: document.querySelector("#gameCanvas"),
  battleSettingsButton: document.querySelector("#battleSettingsButton"),
  hudFront: document.querySelector("#hudFront"),
  hudHp: document.querySelector("#hudHp"),
  hudEnemyName: document.querySelector("#hudEnemyName"),
  hudEnemyHp: document.querySelector("#hudEnemyHp"),
  hudScore: document.querySelector("#hudScore"),
  abortRunButton: document.querySelector("#abortRunButton"),
  battlePanel: document.querySelector("#battlePanel"),
  attackName: document.querySelector("#attackName"),
  movePrompt: document.querySelector("#movePrompt"),
  moveButtons: document.querySelector("#moveButtons"),
  resultTitle: document.querySelector("#resultTitle"),
  resultScore: document.querySelector("#resultScore"),
  resultKills: document.querySelector("#resultKills"),
  resultTime: document.querySelector("#resultTime"),
  resultCoalition: document.querySelector("#resultCoalition"),
  playAgainButton: document.querySelector("#playAgainButton"),
  mapButton: document.querySelector("#mapButton"),
  gameScreen: document.querySelector("#gameScreen"),
  enterVillageButton: document.querySelector("#enterVillageButton"),
  exitVillageButton: document.querySelector("#exitVillageButton"),
  villageScreen: document.querySelector("#villageScreen"),
  villageCanvas: document.querySelector("#villageCanvas"),
  villageName: document.querySelector("#villageName"),
  villageSubtitle: document.querySelector("#villageSubtitle"),
  newRunButton: document.querySelector("#newRunButton"),
  marketMenuButton: document.querySelector("#marketMenuButton"),
  leaderboardMenuButton: document.querySelector("#leaderboardMenuButton"),
  settingsMenuButton: document.querySelector("#settingsMenuButton"),
  logoutMenuButton: document.querySelector("#logoutMenuButton"),
  settingsSoundButton: document.querySelector("#settingsSoundButton"),
  marketWalletBalance: document.querySelector("#marketWalletBalance"),
  marketStatus: document.querySelector("#marketStatus"),
  marketShopGrid: document.querySelector("#marketShopGrid"),
  menuWhiteWipe: document.querySelector("#menuWhiteWipe")
};

const ctx = els.canvas.getContext("2d");
const villageCtx = els.villageCanvas?.getContext?.("2d") || null;
const config = window.FRONT_CONFIG || {};
const backend = createBackend(config);

const app = {
  profile: readJson(STORAGE_KEYS.profile, null),
  runs: [],
  activeMonster: null,
  lastResult: null,
  pendingProfile: null,
  pendingEnemy: null,
  battle: null,
  overworld: {
    mode: "idle",
    mapId: 0,
    playerX: 0,
    playerY: 0,
    steps: 0,
    stepsSinceEncounter: 0,
    encounterCooldown: 3,
    villageAiTimerId: null,
    activeTrapKey: null,
    lastTrapDamageAt: 0,
    villageWarning: null
  },
  audio: {
    enabled: readJson(STORAGE_KEYS.audio, true) !== false,
    unlocked: false,
    ctx: null,
    master: null,
    musicTimerId: null,
    musicMode: "idle",
    musicStep: 0
  },
  authCallbackBusy: false
};

init();

function buildMonsterCatalog(raw) {
  const list = Array.isArray(raw) ? raw : [];
  const out = [];
  for (const m of list) {
    if (!m || typeof m !== "object") continue;
    const id = String(m.id || "").trim();
    const name = String(m.name || "").trim();
    if (!id || !name) continue;
    const hp = Number(m.hp);
    if (!Number.isFinite(hp) || hp <= 0) continue;
    const movesRaw = Array.isArray(m.moves) ? m.moves : Array.isArray(m.questions) ? m.questions : [];
    const moves = [];
    for (const q of movesRaw) {
      const move = BattleEngine.normalizeMove(q);
      if (move) moves.push(move);
    }
    if (!moves.length) continue;
    const powerVal = Number(m.power);
    const defenseVal = Number(m.defense);
    const speedVal = Number(m.speed);
    const milestoneVal = Number(m.milestone);
    out.push({
      id,
      name,
      project: String(m.project || "").trim() || "42",
      role: String(m.role || "").trim() || "Battler",
      color: typeof m.color === "string" && m.color.startsWith("#") ? m.color : "#45c7ff",
      hp: Math.round(hp),
      power: Number.isFinite(powerVal) ? Math.max(0, Math.round(powerVal)) : 2,
      defense: Number.isFinite(defenseVal) ? Math.max(1, Math.round(defenseVal)) : 10,
      speed: Number.isFinite(speedVal) ? Math.max(1, Math.round(speedVal)) : 4,
      milestone: Number.isFinite(milestoneVal) ? Math.max(0, Math.round(milestoneVal)) : 0,
      track: String(m.track || "current").trim() || "current",
      slugs: Array.isArray(m.slugs) ? m.slugs.map((slug) => String(slug).trim()).filter(Boolean) : [],
      spriteFile: String(m.sprite || m.spriteFile || m.spritePath || "").trim(),
      moves
    });
  }
  return out;
}

function preloadBattleBackground() {
  const img = new Image();
  img.addEventListener("load", () => drawBattle());
  img.src = "assets/background.png";
  return img;
}

function drawCoverImage(targetCtx, img, x, y, w, h) {
  const sourceRatio = img.naturalWidth / img.naturalHeight;
  const targetRatio = w / h;
  let sx = 0;
  let sy = 0;
  let sw = img.naturalWidth;
  let sh = img.naturalHeight;
  if (sourceRatio > targetRatio) {
    sw = img.naturalHeight * targetRatio;
    sx = (img.naturalWidth - sw) / 2;
  } else {
    sh = img.naturalWidth / targetRatio;
    sy = (img.naturalHeight - sh) / 2;
  }
  targetCtx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
}
function preloadTrainerImages() {
  const images = {};
  for (const [coalition, src] of Object.entries(TRAINER_ASSETS)) {
    const img = new Image();
    img.addEventListener("load", () => {
      drawBattle();
      drawVillage();
    });
    img.src = src;
    images[coalition] = img;
  }
  return images;
}

function normalizeSpriteKey(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\+/g, "plus")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function projectToSpriteBasename(project) {
  return String(project || "")
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[/\\]+/g, "_");
}

function indexEnemyManifestFiles(files) {
  const byKey = new Map();
  for (const entry of files) {
    const file = String(entry || "").trim().replace(/^\.?\//, "");
    if (!file) continue;
    const base = file.replace(/^.*\//, "").replace(/\.(png|webp|jpe?g)$/i, "");
    byKey.set(normalizeSpriteKey(base), file.includes("/") ? file : `assets/enemies/${file}`);
  }
  const resolved = Object.create(null);
  for (const monster of MONSTERS) {
    if (monster.spriteFile) {
      resolved[monster.id] = monster.spriteFile.includes("/")
        ? monster.spriteFile
        : `assets/enemies/${monster.spriteFile}`;
      continue;
    }
    const keys = [
      normalizeSpriteKey(monster.project),
      normalizeSpriteKey(projectToSpriteBasename(monster.project)),
      normalizeSpriteKey(monster.id),
      normalizeSpriteKey(String(monster.id || "").replace(/-/g, "_"))
    ];
    for (const key of keys) {
      if (key && byKey.has(key)) {
        resolved[monster.id] = byKey.get(key);
        break;
      }
    }
  }
  return resolved;
}

async function loadEnemySpriteManifest() {
  try {
    const response = await fetch("assets/enemies/manifest.json", { cache: "no-store" });
    if (!response.ok) return;
    const text = await response.text();
    const data = JSON.parse(text);
    const files = Array.isArray(data) ? data : Array.isArray(data?.files) ? data.files : [];
    ENEMY_MANIFEST_BY_ID = indexEnemyManifestFiles(files);
  } catch (err) {
    console.warn("[sprites] manifest load skipped", err);
  }
}

function resolveSpritePathsForMonster(monster) {
  if (!monster) return [];
  const exactPaths = [];
  if (ENEMY_MANIFEST_BY_ID[monster.id]) {
    exactPaths.push(ENEMY_MANIFEST_BY_ID[monster.id]);
  }
  if (monster.spriteFile) {
    exactPaths.push(
      monster.spriteFile.includes("/") ? monster.spriteFile : `assets/enemies/${monster.spriteFile}`
    );
  }
  const fallbackSprite = FALLBACK_MONSTER_SPRITES[monster.id];
  if (fallbackSprite) exactPaths.push(`assets/enemies/${fallbackSprite}`);
  if (exactPaths.length) {
    return [...new Set(exactPaths)].filter((path) => !MONSTER_SPRITE_FAILED.has(path));
  }

  const projectBase = projectToSpriteBasename(monster.project);
  const idSnake = String(monster.id || "").replace(/-/g, "_");
  const speculativePaths = [];
  if (projectBase) {
    speculativePaths.push(`assets/enemies/${projectBase.toLowerCase()}.png`);
    speculativePaths.push(`assets/enemies/${projectBase}.png`);
  }
  if (idSnake && idSnake !== projectBase) speculativePaths.push(`assets/enemies/${idSnake}.png`);
  return [...new Set(speculativePaths)].filter((path) => !MONSTER_SPRITE_FAILED.has(path));
}

function requestMonsterSprite(monsterId) {
  const cached = MONSTER_SPRITES[monsterId];
  if (cached && cached.complete && cached.naturalWidth > 0) return;
  if (MONSTER_SPRITE_LOADING.has(monsterId)) return;

  const monster = MONSTERS.find((item) => item.id === monsterId);
  const paths = resolveSpritePathsForMonster(monster);
  if (!paths.length) return;

  const img = new Image();
  img.decoding = "async";
  let pathIndex = 0;

  const tryNext = () => {
    while (pathIndex < paths.length && MONSTER_SPRITE_FAILED.has(paths[pathIndex])) {
      pathIndex += 1;
    }
    if (pathIndex >= paths.length) {
      MONSTER_SPRITE_LOADING.delete(monsterId);
      return;
    }
    img.src = paths[pathIndex];
    pathIndex += 1;
  };

  img.addEventListener("load", () => {
    MONSTER_SPRITES[monsterId] = img;
    MONSTER_SPRITE_LOADING.delete(monsterId);
    drawBattle();
    drawVillage();
  });
  img.addEventListener("error", () => {
    const failedPath = paths[pathIndex - 1];
    if (failedPath) MONSTER_SPRITE_FAILED.add(failedPath);
    tryNext();
  });

  MONSTER_SPRITE_LOADING.set(monsterId, img);
  tryNext();
}

function getMonsterSpriteImage(monsterId) {
  const img = MONSTER_SPRITES[monsterId];
  if (img && img.complete && img.naturalWidth > 0) return img;
  requestMonsterSprite(monsterId);
  return null;
}

function drawMonsterSprite(targetCtx, monsterId, centerX, baselineY, width, height) {
  const img = getMonsterSpriteImage(monsterId);
  if (!img) return false;
  const drawW = width;
  const drawH = height;
  targetCtx.drawImage(img, centerX - drawW / 2, baselineY - drawH, drawW, drawH);
  return true;
}

function getEncounterMonsterId(encounter) {
  if (encounter?.monsterId) return encounter.monsterId;
  const milestone = getProfileMilestone();
  let pool = MONSTERS.filter((m) => Number(m.milestone) === milestone);
  for (let fallbackMilestone = milestone - 1; !pool.length && fallbackMilestone >= 0; fallbackMilestone -= 1) {
    pool = MONSTERS.filter((m) => Number(m.milestone) === fallbackMilestone);
  }
  const list = pool.length ? pool : MONSTERS;
  const hash = ((encounter.x + 1) * 73856093) ^ ((encounter.y + 1) * 19349663);
  const pick = list[Math.abs(hash) % list.length] || list[0];
  if (encounter && pick) encounter.monsterId = pick.id;
  return pick?.id || "libcub";
}

function enrichMapEncounters(map) {
  if (!map || !Array.isArray(map.encounters)) return;
  for (const encounter of map.encounters) {
    getEncounterMonsterId(encounter);
  }
}

function updateMainMenuButtons() {
  const loggedIn = Boolean(app.profile);
  document.querySelectorAll(".main-menu-auth-only").forEach((item) => {
    item.classList.toggle("hidden", !loggedIn);
  });
  if (els.login42Button) els.login42Button.classList.toggle("hidden", loggedIn);
}

function playMenuWhiteWipe(onDone) {
  const wipe = els.menuWhiteWipe;
  if (!wipe) {
    onDone();
    return;
  }
  wipe.classList.remove("hidden");
  wipe.classList.add("is-active");
  window.setTimeout(() => {
    wipe.classList.remove("is-active");
    wipe.classList.add("hidden");
    onDone();
  }, MENU_WHITE_WIPE_MS);
}

function beginNewRun() {
  playSound("ui");
  playMenuWhiteWipe(() => {
    app.pendingEnemy = null;
    app.battle = null;
    app.overworld.currentMap = null;
    app.overworld.encounterCooldown = 3;
    app.overworld.stepsSinceEncounter = 0;
    if (!app.profile) {
      showLogin();
      els.statusLine.textContent = "Önce 42 ile giriş yap";
      return;
    }
    showVillage();
  });
}

function showLeaderboardPage() {
  playSound("ui");
  showScreen("leaderboard");
  renderLeaderboards();
  els.statusLine.textContent = "Coalition leaderboard";
}

function showSettingsPage() {
  playSound("ui");
  showScreen("settings");
  renderSoundButton();
  els.statusLine.textContent = "Settings";
}

function showMarketPage(message = "") {
  if (!app.profile) {
    playSound("ui");
    showLogin();
    els.statusLine.textContent = "Market için önce 42 ile giriş yap";
    return;
  }
  playSound("ui");
  showScreen("market");
  renderMarket(message);
  els.statusLine.textContent = "Market";
}

function notifyProfileLoaded(profile) {
  const adapters = window.FRONT_ADAPTERS;
  const hook = adapters && typeof adapters.onProfileLoaded === "function" ? adapters.onProfileLoaded : null;
  if (!hook) return;
  try {
    hook(profile);
  } catch (err) {
    console.error(err);
  }
}

function maybeMapRunForRemote(run) {
  const adapters = window.FRONT_ADAPTERS;
  const map = adapters && typeof adapters.mapRunBeforeRemoteSave === "function" ? adapters.mapRunBeforeRemoteSave : null;
  if (!map) return run;
  try {
    const next = map({ ...run });
    return next && typeof next === "object" ? next : run;
  } catch (err) {
    console.error(err);
    return run;
  }
}

function refreshStoredProfileMilestone() {
  if (!app.profile) return;
  const derived = deriveMilestoneFromProfile(app.profile);
  if (app.profile.currentMilestone === derived) return;
  app.profile.currentMilestone = derived;
  writeJson(STORAGE_KEYS.profile, app.profile);
}

function init() {
  bindEvents();
  refreshStoredProfileMilestone();
  updateMainMenuButtons();
  renderSoundButton();
  void loadEnemySpriteManifest();
  renderMonsterCards();
  resizeCanvas();
  if (shouldResetLocalSession()) {
    clearAppSession();
    showLogin();
    els.statusLine.textContent = "Local login reset. Connect 42 again.";
    return;
  }
  ctx.imageSmoothingEnabled = false;
  window.addEventListener("resize", () => {
    resizeCanvas();
    drawBattle();
    drawVillage();
  });
  if (hasAuthCodeInUrl()) {
    refreshData().catch(console.error);
    void start42Auth();
    return;
  }
  if (app.profile) {
    showLogin();
    refreshData().catch(console.error);
    return;
  }
  refreshData()
    .then(() => {
      showLogin();
    })
    .catch((err) => {
      console.error(err);
      showLogin();
    });
}

function hasAuthCodeInUrl() {
  return new URLSearchParams(location.search).has("code");
}

function shouldResetLocalSession() {
  return new URLSearchParams(location.search).has("reset");
}

function clearAuthCallbackUrl() {
  if (location.search || location.hash) {
    history.replaceState({}, document.title, location.pathname);
  }
}

function renderSoundButton() {
  const label = app.audio.enabled ? "Ses: Açık" : "Ses: Kapalı";
  for (const button of [els.soundButton, els.settingsSoundButton]) {
    if (!button) continue;
    button.textContent = label;
    button.classList.toggle("is-off", !app.audio.enabled);
  }
}

function toggleAudio() {
  if (app.audio.enabled) {
    app.audio.enabled = false;
    writeJson(STORAGE_KEYS.audio, false);
    stopMusic();
    renderSoundButton();
    return;
  }
  app.audio.enabled = true;
  writeJson(STORAGE_KEYS.audio, true);
  renderSoundButton();
  ensureAudio();
  playSound("ui");
  setMusicMode(app.audio.musicMode || "village");
}

function unlockAudioFromGesture(event) {
  if (!app.audio.enabled) return;
  if (event?.target?.closest?.("#soundButton")) return;
  ensureAudio();
  if (app.audio.musicMode !== "idle") startMusicLoop(app.audio.musicMode);
}

function ensureAudio() {
  if (!app.audio.enabled) return null;
  const AudioCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtor) return null;
  if (!app.audio.ctx) {
    const audioCtx = new AudioCtor();
    const master = audioCtx.createGain();
    master.gain.value = 0.32;
    master.connect(audioCtx.destination);
    app.audio.ctx = audioCtx;
    app.audio.master = master;
  }
  if (app.audio.ctx.state === "suspended") {
    app.audio.ctx.resume().catch(() => {});
  }
  app.audio.unlocked = true;
  return app.audio.ctx;
}

function playSound(name) {
  if (!app.audio.enabled) return;
  if (name === "ui") {
    playTone(520, 0.05, { volume: 0.06 });
    playTone(760, 0.06, { volume: 0.045, when: 0.05 });
    return;
  }
  if (name === "encounter") {
    playTone(880, 0.09, { volume: 0.12 });
    playTone(660, 0.09, { volume: 0.1, when: 0.1 });
    playTone(990, 0.14, { volume: 0.12, when: 0.2 });
    return;
  }
  if (name === "battleStart") {
    playTone(196, 0.08, { volume: 0.08 });
    playTone(247, 0.08, { volume: 0.08, when: 0.08 });
    playTone(294, 0.1, { volume: 0.08, when: 0.16 });
    return;
  }
  if (name === "attack") {
    playTone(420, 0.07, { type: "sawtooth", volume: 0.08 });
    playTone(260, 0.1, { type: "square", volume: 0.06, when: 0.04 });
    playNoise(0.08, { volume: 0.05 });
    return;
  }
  if (name === "hit") {
    playTone(160, 0.12, { type: "triangle", volume: 0.09 });
    playNoise(0.1, { volume: 0.045 });
    return;
  }
  if (name === "win") {
    [523, 659, 784, 1046].forEach((freq, index) => {
      playTone(freq, 0.11, { volume: 0.09, when: index * 0.1 });
    });
    return;
  }
  if (name === "loss") {
    [330, 277, 220, 165].forEach((freq, index) => {
      playTone(freq, 0.14, { type: "triangle", volume: 0.08, when: index * 0.13 });
    });
  }
}

function setMusicMode(mode) {
  app.audio.musicMode = mode || "idle";
  if (!app.audio.enabled || app.audio.musicMode === "idle") {
    stopMusic();
    return;
  }
  if (!app.audio.unlocked) return;
  startMusicLoop(app.audio.musicMode);
}

function startMusicLoop(mode) {
  if (!app.audio.enabled || !app.audio.unlocked || mode === "idle") return;
  if (app.audio.musicTimerId && app.audio.currentMusicMode === mode) return;
  stopMusic();
  app.audio.currentMusicMode = mode;
  app.audio.musicStep = 0;
  const interval = mode === "battle" ? 240 : 520;
  const tick = () => playMusicStep(mode);
  tick();
  app.audio.musicTimerId = window.setInterval(tick, interval);
}

function stopMusic() {
  if (app.audio.musicTimerId) {
    window.clearInterval(app.audio.musicTimerId);
    app.audio.musicTimerId = null;
  }
  app.audio.currentMusicMode = "idle";
}

function playMusicStep(mode) {
  if (!app.audio.enabled) return;
  const villageNotes = [196, 247, 294, 247, 220, 247, 330, 247];
  const battleNotes = [130, 146, 174, 196, 174, 146, 130, 196];
  const notes = mode === "battle" ? battleNotes : villageNotes;
  const index = app.audio.musicStep % notes.length;
  const freq = notes[index];
  const volume = mode === "battle" ? 0.035 : 0.025;
  playTone(freq, mode === "battle" ? 0.11 : 0.18, {
    type: mode === "battle" ? "square" : "triangle",
    volume
  });
  if (mode === "battle" && index % 2 === 0) {
    playTone(freq / 2, 0.08, { type: "square", volume: 0.018 });
  }
  app.audio.musicStep += 1;
}

function playTone(freq, duration, options = {}) {
  const audioCtx = ensureAudio();
  if (!audioCtx || !app.audio.master) return;
  const start = audioCtx.currentTime + (options.when || 0);
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = options.type || "square";
  osc.frequency.setValueAtTime(freq, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, options.volume || 0.06), start + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(gain);
  gain.connect(app.audio.master);
  osc.start(start);
  osc.stop(start + duration + 0.03);
}

function playNoise(duration, options = {}) {
  const audioCtx = ensureAudio();
  if (!audioCtx || !app.audio.master) return;
  const sampleCount = Math.max(1, Math.floor(audioCtx.sampleRate * duration));
  const buffer = audioCtx.createBuffer(1, sampleCount, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < sampleCount; i += 1) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / sampleCount);
  }
  const source = audioCtx.createBufferSource();
  const gain = audioCtx.createGain();
  source.buffer = buffer;
  gain.gain.value = options.volume || 0.04;
  source.connect(gain);
  gain.connect(app.audio.master);
  source.start(audioCtx.currentTime + (options.when || 0));
}

function sanitizeRuns(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.filter((item) => item && typeof item === "object");
}

function bindEvents() {
  document.addEventListener("pointerdown", unlockAudioFromGesture, { capture: true });
  document.addEventListener("keydown", unlockAudioFromGesture, { capture: true });

  if (els.soundButton) {
    els.soundButton.addEventListener("click", () => {
      toggleAudio();
    });
  }

  if (els.newRunButton) els.newRunButton.addEventListener("click", beginNewRun);
  if (els.marketMenuButton) els.marketMenuButton.addEventListener("click", () => showMarketPage());
  if (els.leaderboardMenuButton) els.leaderboardMenuButton.addEventListener("click", showLeaderboardPage);
  if (els.settingsMenuButton) els.settingsMenuButton.addEventListener("click", showSettingsPage);
  if (els.logoutMenuButton) els.logoutMenuButton.addEventListener("click", hardLogout);
  if (els.settingsSoundButton) els.settingsSoundButton.addEventListener("click", toggleAudio);
  document.querySelectorAll("[data-menu-back]").forEach((button) => {
    button.addEventListener("click", () => {
      playSound("ui");
      showLogin();
    });
  });
  if (els.localProfileForm) {
    els.localProfileForm.addEventListener("submit", (event) => {
      event.preventDefault();
      startLocalProfile();
    });
  }

  if (els.logoutButton) {
    els.logoutButton.addEventListener("click", () => {
      hardLogout();
    });
  }

  if (els.inventoryButton) {
    els.inventoryButton.addEventListener("click", () => {
      playSound("ui");
      showInventory();
    });
  }

  if (els.closeInventoryButton) {
    els.closeInventoryButton.addEventListener("click", hideInventory);
  }

  if (els.inventoryModal) {
    els.inventoryModal.addEventListener("click", (event) => {
      if (event.target === els.inventoryModal) hideInventory();
    });
  }

  if (els.shopGrid) {
    els.shopGrid.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-shop-item]");
      if (!button) return;
      buyShopItem(button.dataset.shopItem);
    });
  }

  if (els.marketShopGrid) {
    els.marketShopGrid.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-shop-item]");
      if (!button) return;
      buyShopItem(button.dataset.shopItem);
    });
  }

  // login42Button — HTML'deki yesil 42 login butonu
  const login42Btn = document.querySelector("#login42Button");
  if (login42Btn) {
    login42Btn.addEventListener("click", () => {
      if (config.authClientId && config.authRedirectUri) begin42OAuthRedirect();
      else start42Auth();
    });
  }

  if (els.refreshBoardButton) els.refreshBoardButton.addEventListener("click", () => refreshData());
  if (els.abortRunButton) {
    els.abortRunButton.addEventListener("click", () => {
      playSound("ui");
      finishBattle("aborted");
    });
  }
  if (els.mapButton) els.mapButton.addEventListener("click", showVillage);
  if (els.playAgainButton) {
    els.playAgainButton.addEventListener("click", () => {
      showVillage();
    });
  }

  if (els.enterVillageButton) els.enterVillageButton.addEventListener("click", showVillage);
  if (els.exitVillageButton) els.exitVillageButton.addEventListener("click", showVillage);
  window.addEventListener("keydown", handleVillageKeydown);

  if (els.battleSettingsButton) {
    els.battleSettingsButton.addEventListener("click", () => {
      playSound("ui");
      toggleAudio();
      els.battleSettingsButton.textContent = app.audio.enabled ? "Settings" : "Muted";
    });
  }

  if (els.moveButtons) {
    els.moveButtons.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button || button.disabled) return;
      if (button.dataset.battleCommand) { handleBattleCommand(button.dataset.battleCommand); return; }
      if (button.dataset.battleBack != null) { renderBattleControls("actions"); return; }
      if (button.dataset.moveIndex != null) { useMove(Number(button.dataset.moveIndex)); return; }
      if (button.dataset.bagItem) { useBattleItem(button.dataset.bagItem); return; }
      if (button.dataset.projectId) switchBattleProject(button.dataset.projectId);
    });
  }
}

function authLog(step, detail) {
  if (detail !== undefined) console.log(`[AUTH] ${step}`, detail);
  else console.log(`[AUTH] ${step}`);
}

function normalizeRedirectUri(value) {
  const raw = String(value || config.authRedirectUri || "http://localhost:3000/").trim();
  return raw.endsWith("/") ? raw : `${raw}/`;
}

function storeAuthState(state) {
  const value = String(state || "").trim();
  if (!value) return;
  try {
    sessionStorage.setItem("auth_state", value);
    localStorage.setItem("auth_state", value);
  } catch (err) {
    console.warn("[AUTH] state store failed", err);
  }
}

function readAuthState() {
  try {
    return sessionStorage.getItem("auth_state") || localStorage.getItem("auth_state");
  } catch {
    return null;
  }
}

function clearAuthStateStorage() {
  try {
    sessionStorage.removeItem("auth_state");
    localStorage.removeItem("auth_state");
  } catch {
    // ignore
  }
}

function begin42OAuthRedirect() {
  clearOAuthExchangeSession();
  clearAuthCallbackUrl();
  const state = crypto.randomUUID();
  storeAuthState(state);
  const params = new URLSearchParams({
    client_id: config.authClientId,
    redirect_uri: normalizeRedirectUri(config.authRedirectUri),
    response_type: "code",
    state,
    prompt: "login",
    max_age: "0"
  });
  location.href = `${config.authAuthorizeUrl}?${params.toString()}`;
}

function isOAuthTokenFailure(status, parsed, rawText) {
  const detail = String(parsed?.data?.detail || parsed?.data?.error || rawText || "").toLowerCase();
  return (
    status === 401 ||
    detail.includes("token 401") ||
    detail.includes("invalid_grant") ||
    detail.includes("invalid_client") ||
    detail.includes("unauthorized")
  );
}

function clearOAuthExchangeSession() {
  try {
    sessionStorage.removeItem("oauth_code_used");
  } catch {
    // ignore
  }
}

function authFailureMessage(status, parsed, rawText) {
  const detailLower = String(parsed?.data?.detail || parsed?.data?.error || rawText || "").toLowerCase();
  if (detailLower.includes("invalid_client")) {
    return "42 client hatası: env CLIENT_ID / CLIENT_SECRET 42 portal ile eşleşmiyor.";
  }
  if (isOAuthTokenFailure(status, parsed, rawText)) {
    return "42 kodu geçersiz veya süresi doldu (tek kullanımlık). Log in ile yeniden dene.";
  }
  const detailRaw = parsed?.data?.detail || parsed?.data?.error;
  if (detailRaw) return truncateAuthStatus(String(detailRaw));
  return truncateAuthStatus(`HTTP ${status}: ${rawText}`);
}

function truncateAuthStatus(text, maxLen = 220) {
  const raw = String(text || "").replace(/\s+/g, " ").trim();
  if (!raw) return "42 auth proxy failed";
  return raw.length > maxLen ? `${raw.slice(0, maxLen)}…` : raw;
}

function parseAuthProxyPayload(text) {
  try {
    return { ok: true, data: JSON.parse(text) };
  } catch (err) {
    return { ok: false, error: err, raw: text };
  }
}

function normalize42AuthProfile(rawData) {
  const profile = rawData?.player || rawData;
  if (!profile || typeof profile !== "object") return null;
  const login = profile.login || profile.intra || profile.intraName || "";
  if (!login) return null;
  const next = {
    id: profile.id || profile.userId || login,
    intra: login,
    displayName: profile.displayName || profile.intraName || login,
    coalition: normalizeCoalitionName(profile.coalition || "Ravenclaw"),
    avatarUrl: profile.avatarUrl || profile.avatar || "",
    authSource: "42"
  };
  if ("passedProjects" in profile) next.passedProjects = profile.passedProjects;
  if ("passedProjectSlugs" in profile) next.passedProjectSlugs = profile.passedProjectSlugs;
  if ("passedProjectsSlugs" in profile) next.passedProjectsSlugs = profile.passedProjectsSlugs;
  if ("passedProjectsList" in profile) next.passedProjectsList = profile.passedProjectsList;
  if ("cursusLevel" in profile) next.cursusLevel = profile.cursusLevel;
  if ("curriculumTrack" in profile) next.curriculumTrack = profile.curriculumTrack;
  if ("rank" in profile) next.rank = profile.rank;
  if ("daysUntilBlackhole" in profile) next.daysUntilBlackhole = profile.daysUntilBlackhole;
  if ("achievements" in profile) next.achievements = normalizeAchievements(profile.achievements);
  if (
    "coalitionColor" in profile &&
    typeof profile.coalitionColor === "string" &&
    /^#[0-9a-fA-F]{6}$/.test(profile.coalitionColor.trim())
  ) {
    next.coalitionColor = profile.coalitionColor.trim();
  }
  return next;
}

function authProxyUnreachableMessage(proxyBase) {
  return `Auth proxy kapalı (${proxyBase}). Yeni terminal: node server/auth-proxy.mjs — veya start-dev.bat / run_game.bat`;
}

function isAuthProxyUnreachableError(err) {
  if (!err) return false;
  const msg = String(err.message || err).toLowerCase();
  return err instanceof TypeError || msg.includes("failed to fetch") || msg.includes("network");
}

async function exchangeAuthCodeViaProxy(code) {
  const proxyBase = String(config.authProxyUrl || "").replace(/\/$/, "");
  if (!proxyBase) return { ok: false, statusLine: "authProxyUrl tanımlı değil (config.js)", clearCode: false };

  const redirectUri = normalizeRedirectUri(config.authRedirectUri);
  const codeParam = encodeURIComponent(code);
  const redirectParam = encodeURIComponent(redirectUri);

  authLog("proxy-get");
  try {
    const getUrl = `${proxyBase}?code=${codeParam}&redirect_uri=${redirectParam}`;
    const getResponse = await fetch(getUrl);
    const getText = await getResponse.text();
    authLog("proxy-response", { method: "GET", status: getResponse.status, body: getText.slice(0, 240) });
    const getParsed = parseAuthProxyPayload(getText);
    if (getResponse.ok && getParsed.ok) {
      const profile = normalize42AuthProfile(getParsed.data);
      if (profile) return { ok: true, profile };
      return { ok: false, statusLine: "42 auth profile missing", clearCode: true };
    }
    if (isOAuthTokenFailure(getResponse.status, getParsed, getText)) {
      return { ok: false, statusLine: authFailureMessage(getResponse.status, getParsed, getText), clearCode: true };
    }
    if (!getParsed.ok) {
      return {
        ok: false,
        statusLine: truncateAuthStatus(`GET ${getResponse.status}: ${getText}`),
        clearCode: false
      };
    }
  } catch (err) {
    console.warn("[AUTH] proxy-get error", err);
    if (isAuthProxyUnreachableError(err)) {
      return { ok: false, statusLine: authProxyUnreachableMessage(proxyBase), clearCode: false };
    }
  }

  authLog("proxy-post-fallback");
  try {
    const postResponse = await fetch(proxyBase, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, redirect_uri: redirectUri })
    });
    const postText = await postResponse.text();
    authLog("proxy-response", { method: "POST", status: postResponse.status, body: postText.slice(0, 240) });
    const postParsed = parseAuthProxyPayload(postText);
    if (postResponse.ok && postParsed.ok) {
      const profile = normalize42AuthProfile(postParsed.data);
      if (profile) return { ok: true, profile };
      return { ok: false, statusLine: "42 auth profile missing", clearCode: true };
    }
    if (isOAuthTokenFailure(postResponse.status, postParsed, postText)) {
      return { ok: false, statusLine: authFailureMessage(postResponse.status, postParsed, postText), clearCode: true };
    }
    if (!postParsed.ok) {
      return {
        ok: false,
        statusLine: truncateAuthStatus(`POST ${postResponse.status}: ${postText}`),
        clearCode: false
      };
    }
    const detail = postParsed.data?.detail || postParsed.data?.error || postText;
    return { ok: false, statusLine: truncateAuthStatus(`POST ${postResponse.status}: ${detail}`), clearCode: false };
  } catch (err) {
    console.error("[AUTH] proxy-post-fallback error", err);
    if (isAuthProxyUnreachableError(err)) {
      return { ok: false, statusLine: authProxyUnreachableMessage(proxyBase), clearCode: false };
    }
    return { ok: false, statusLine: "Auth network error — proxy POST failed", clearCode: false };
  }

  return { ok: false, statusLine: "42 auth failed", clearCode: false };
}

async function handleAuthCallback(code) {
  if (app.authCallbackBusy) {
    authLog("callback-skipped", "busy");
    return;
  }
  const usedKey = "oauth_code_used";
  try {
    if (sessionStorage.getItem(usedKey) === code) {
      authLog("callback-skipped", "code already exchanged");
      clearAuthCallbackUrl();
      showLogin();
      return;
    }
  } catch {
    // ignore
  }

  app.authCallbackBusy = true;
  authLog("callback-start", { codePresent: Boolean(code) });
  const qs = new URLSearchParams(location.search);
  const returnedState = qs.get("state");
  const storedState = readAuthState();
  authLog("state-check", { returnedState, storedState });
  const mismatch =
    returnedState !== storedState && (returnedState != null || storedState != null);
  if (mismatch) {
    console.warn("[AUTH] state mismatch (jam mode — continuing)", { returnedState, storedState });
    els.statusLine.textContent = "Auth state uyarısı (jam) — giriş deneniyor…";
  }
  clearAuthStateStorage();

  let result;
  try {
    result = await exchangeAuthCodeViaProxy(code);
  } finally {
    app.authCallbackBusy = false;
  }

  if (!result.ok || !result.profile) {
    authLog("failed", result.statusLine);
    if (result.clearCode) clearAuthCallbackUrl();
    els.statusLine.textContent = result.statusLine || "42 auth failed — Log in ile tekrar dene";
    showLogin();
    return;
  }

  try {
    sessionStorage.setItem(usedKey, code);
  } catch {
    // ignore
  }

  authLog("profile-set", { intra: result.profile.intra });
  app.pendingProfile = null;
  let nextProfile = result.profile;
  try {
    const savedProfile = await backend.loadPlayerProfile(result.profile.id || result.profile.intra);
    nextProfile = mergeProfileProgress(result.profile, savedProfile);
  } catch (err) {
    console.warn("[AUTH] player profile load skipped", err);
  }
  setProfile(nextProfile);
  clearAuthCallbackUrl();
  showLogin();
  const welcomeName = result.profile.displayName || result.profile.intra || "42 user";
  els.statusLine.textContent = `Hoşgeldin, ${welcomeName}! New Run ile başla.`;
}

async function start42Auth() {
  try {
    const qs = new URLSearchParams(location.search);
    const code = qs.get("code");
    if (code) {
      if (!config.authProxyUrl) {
        authLog("failed", "no authProxyUrl");
        els.statusLine.textContent = "42 callback: authProxyUrl eksik (config.js)";
        showLogin();
        return;
      }
      await handleAuthCallback(code);
      return;
    }

    if (config.authClientId && config.authRedirectUri) {
      begin42OAuthRedirect();
      return;
    }

    clearAuthStateStorage();
    startLocalProfile();
  } catch (err) {
    console.error("[AUTH] failed", err);
    authLog("failed");
    clearAuthStateStorage();
    els.statusLine.textContent = "Auth network error — use Local Jam Profile";
    showLogin();
  }
}

function handleVillageKeydown(event) {
  if (!els.villageScreen || els.villageScreen.classList.contains("hidden")) return;
  const key = event.key.toLowerCase();
  const dirs = {
    arrowup: [0, -1],
    w: [0, -1],
    arrowdown: [0, 1],
    s: [0, 1],
    arrowleft: [-1, 0],
    a: [-1, 0],
    arrowright: [1, 0],
    d: [1, 0]
  };
  const dir = dirs[key];
  if (!dir) return;
  event.preventDefault();
  moveVillagePlayer(dir[0], dir[1]);
}

function normalizeVillageCollision(map) {
  if (!map || map.__villageObjectsNormalized || !Array.isArray(map.collision) || !Array.isArray(map.objects)) return;
  for (const obj of map.objects) {
    if (!obj) continue;
    if (obj.type === "table") {
      const x0 = Math.floor(Number(obj.x) || 0);
      const y0 = Math.floor(Number(obj.y) || 0);
      const visualW = Math.max(1, Math.ceil(Number(obj.w) || 1));
      const visualH = Math.max(1, Math.ceil(Number(obj.h) || 1));
      // Tablelar tamamen dekor: default collision 0x0 (her yönden yaklaşılabilir).
      // Eğer maps.js obje data'sında collisionW/H explicit set edilmişse o değer kullanılır.
      const collisionW = Math.max(0, Math.ceil(Number(obj.collisionW) || 0));
      const collisionH = Math.max(0, Math.ceil(Number(obj.collisionH) || 0));

      for (let y = y0; y < y0 + visualH; y += 1) {
        if (y <= 0 || y >= map.rows || !map.collision[y]) continue;
        for (let x = x0; x < x0 + visualW; x += 1) {
          if (x < 0 || x >= map.cols) continue;
          map.collision[y][x] = 0;
        }
      }

      for (let y = y0; y < y0 + collisionH; y += 1) {
        if (y <= 0 || y >= map.rows || !map.collision[y]) continue;
        for (let x = x0; x < x0 + collisionW; x += 1) {
          if (x < 0 || x >= map.cols) continue;
          map.collision[y][x] = 1;
        }
      }
    }

    if (obj.type === "trap") {
      obj.w = Math.max(2, Number(obj.w) || 1);
      obj.h = Math.max(2, Number(obj.h) || 1);
      obj.damageW = Math.max(2, Number(obj.damageW) || obj.w);
      obj.damageH = Math.max(2, Number(obj.damageH) || obj.h);
      obj.collision = false;
    }
  }
  map.__villageObjectsNormalized = true;
}

function isVillageScreenActive() {
  return Boolean(els.villageScreen && !els.villageScreen.classList.contains("hidden"));
}

function startVillageAiLoop() {
  if (app.overworld.villageAiTimerId) return;
  app.overworld.villageAiTimerId = window.setInterval(tickVillageAi, VILLAGE_ENEMY_AI_MS);
}

function stopVillageAiLoop() {
  if (!app.overworld.villageAiTimerId) return;
  window.clearInterval(app.overworld.villageAiTimerId);
  app.overworld.villageAiTimerId = null;
}

function tickVillageAi() {
  if (!isVillageScreenActive()) return;
  const map = getCurrentVillageMap();
  if (!map) return;
  normalizeVillageCollision(map);
  const encounterStarted = moveVillageEnemies(map);
  if (encounterStarted) return;
  applySegFaultDamage(map, false);
  drawVillage();
}

function getTileDistance(aX, aY, bX, bY) {
  return Math.max(Math.abs(aX - bX), Math.abs(aY - bY));
}

function shuffleDirections(dirs) {
  const copy = dirs.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getEnemyMoveCandidates(enemy) {
  const dx = app.overworld.playerX - enemy.x;
  const dy = app.overworld.playerY - enemy.y;
  const distance = getTileDistance(enemy.x, enemy.y, app.overworld.playerX, app.overworld.playerY);
  const cardinal = [[0, -1], [0, 1], [-1, 0], [1, 0]];
  if (distance > VILLAGE_ENEMY_CHASE_RADIUS) {
    if (Math.random() < 0.22) return [[0, 0], ...shuffleDirections(cardinal)];
    return shuffleDirections(cardinal);
  }

  const primary = [];
  if (Math.abs(dx) >= Math.abs(dy) && dx !== 0) primary.push([Math.sign(dx), 0]);
  if (dy !== 0) primary.push([0, Math.sign(dy)]);
  if (Math.abs(dx) < Math.abs(dy) && dx !== 0) primary.push([Math.sign(dx), 0]);
  const fallback = shuffleDirections(cardinal).filter(([x, y]) => !primary.some(([px, py]) => px === x && py === y));
  return [...primary, ...fallback];
}

function isVillageTileBlockedForEnemy(map, x, y, movingEnemy) {
  if (x < 0 || x >= map.cols || y < 0 || y >= map.rows) return true;
  const collisionMap = map.collision || map.tiles;
  if (collisionMap?.[y]?.[x] !== 0) return true;
  return Boolean(map.encounters?.some((enemy) => enemy !== movingEnemy && enemy.active && enemy.x === x && enemy.y === y));
}

function moveVillageEnemies(map) {
  if (!Array.isArray(map.encounters)) return false;
  for (const enemy of map.encounters) {
    if (!enemy.active) continue;
    getEncounterMonsterId(enemy);
    const candidates = getEnemyMoveCandidates(enemy);
    for (const [dx, dy] of candidates) {
      if (dx === 0 && dy === 0) break;
      const nextX = enemy.x + dx;
      const nextY = enemy.y + dy;
      if (isVillageTileBlockedForEnemy(map, nextX, nextY, enemy)) continue;
      enemy.x = nextX;
      enemy.y = nextY;
      if (nextX === app.overworld.playerX && nextY === app.overworld.playerY) {
        triggerEncounterForVillageEnemy(enemy);
        return true;
      }
      break;
    }
  }
  return false;
}

function findActiveEncounterAt(map, x, y) {
  return map.encounters?.find((enemy) => enemy.active && enemy.x === x && enemy.y === y) || null;
}

function getTrapAtTile(map, x, y) {
  if (!Array.isArray(map?.objects)) return null;
  return map.objects.find((obj) => {
    if (!obj || obj.type !== "trap") return false;
    const w = Math.max(1, Math.ceil(Number(obj.damageW || obj.w) || 1));
    const h = Math.max(1, Math.ceil(Number(obj.damageH || obj.h) || 1));
    return x >= obj.x && x < obj.x + w && y >= obj.y && y < obj.y + h;
  }) || null;
}

function getTrapKey(trap) {
  return `${trap.x}:${trap.y}`;
}

function getOverworldLeadMonster() {
  if (!app.profile) return null;
  const owned = getOwnedMonstersForProfile(app.profile);
  if (!owned.length) return null;
  const active = owned.find((monster) => monster.id === app.activeMonster?.id);
  if (active) {
    const activeMaxHp = computeMonsterMaxHp(active, app.profile);
    const activeStat = ensureProjectStat(active, activeMaxHp);
    if (Number(activeStat.hp) > 0) return active;
  }
  const alive = owned.find((monster) => {
    const maxHp = computeMonsterMaxHp(monster, app.profile);
    const stat = ensureProjectStat(monster, maxHp);
    return Number(stat.hp) > 0;
  });
  return alive || owned[0];
}

function showVillageWarning(text) {
  app.overworld.villageWarning = { text, until: performance.now() + VILLAGE_WARNING_MS };
  drawVillage();
  window.setTimeout(() => drawVillage(), VILLAGE_WARNING_MS + 40);
}

function applySegFaultDamage(map, immediate) {
  const trap = getTrapAtTile(map, app.overworld.playerX, app.overworld.playerY);
  if (!trap) {
    app.overworld.activeTrapKey = null;
    app.overworld.lastTrapDamageAt = 0;
    return false;
  }

  const key = getTrapKey(trap);
  const now = performance.now();
  if (app.overworld.activeTrapKey !== key) {
    app.overworld.activeTrapKey = key;
    app.overworld.lastTrapDamageAt = 0;
  }
  if (app.overworld.lastTrapDamageAt && now - app.overworld.lastTrapDamageAt < SEG_FAULT_REPEAT_MS) return false;
  if (!immediate && app.overworld.lastTrapDamageAt === 0) return false;

  const monster = getOverworldLeadMonster();
  if (!monster) return false;
  const maxHp = computeMonsterMaxHp(monster, app.profile);
  const stat = ensureProjectStat(monster, maxHp);
  const before = Math.max(0, Number(stat.hp) || 0);
  const after = Math.max(0, before - SEG_FAULT_DAMAGE);
  stat.hp = after;
  app.overworld.lastTrapDamageAt = now;
  persistProfileEconomy();
  renderProfile();
  playSound("hit");
  const name = getMonsterDisplayName(monster);
  const warning = `SEG FAULT: ${name} -${SEG_FAULT_DAMAGE} HP (${after}/${maxHp})`;
  els.statusLine.textContent = warning;
  showVillageWarning(warning);
  if (!hasAnyUsableProjectMonster()) {
    window.setTimeout(() => handlePartyWipe("Tüm proje canavarların bayıldı. Hiçbir ödül almadan main menüye döndün."), 520);
  }
  return true;
}

function moveVillagePlayer(dx, dy) {
  const map = getCurrentVillageMap();
  if (!map) return;
  normalizeVillageCollision(map);

  const nextX = app.overworld.playerX + dx;
  const nextY = app.overworld.playerY + dy;

  if (nextX < 0 || nextX >= map.cols || nextY < 0 || nextY >= map.rows) return;

  const collisionMap = map.collision || map.tiles;
  if (collisionMap && collisionMap[nextY] && collisionMap[nextY][nextX] !== 0) return;

  const enemy = findActiveEncounterAt(map, nextX, nextY);
  if (enemy) {
    triggerEncounterForVillageEnemy(enemy);
    return;
  }

  app.overworld.playerX = nextX;
  app.overworld.playerY = nextY;
  app.overworld.steps += 1;
  applySegFaultDamage(map, true);
  drawVillage();
}

function scaleEnemyForMilestone(enemyTemplate) {
  const milestone = getProfileMilestone();
  const scaling = 1 + milestone * 0.10;
  return {
    ...enemyTemplate,
    hp: Math.floor(enemyTemplate.hp * scaling),
    power: enemyTemplate.power + Math.floor(milestone / 2)
  };
}

function flashVillageEncounter() {
  if (!villageCtx || !els.villageCanvas) return;
  villageCtx.fillStyle = "rgba(255, 68, 68, 0.7)";
  villageCtx.fillRect(0, 0, els.villageCanvas.width, els.villageCanvas.height);
  villageCtx.fillStyle = "#ffffff";
  villageCtx.font = "bold 32px Inter, sans-serif";
  villageCtx.textAlign = "center";
  villageCtx.fillText("DUSMANLA KARSILASTIN!", els.villageCanvas.width / 2, els.villageCanvas.height / 2);
}

function triggerVillageEncounter(enemyTemplate) {
  if (!enemyTemplate) return;
  stopVillageAiLoop();
  const enemy = scaleEnemyForMilestone(enemyTemplate);
  app.overworld.encounterCooldown = 4;
  app.overworld.stepsSinceEncounter = 0;
  flashVillageEncounter();
  window.setTimeout(() => showEncounterChoice(enemy), 800);
}

function triggerEncounterForVillageEnemy(encounter) {
  if (!encounter || !encounter.active) return;
  const monsterId = getEncounterMonsterId(encounter);
  const enemyTemplate = MONSTERS.find((monster) => monster.id === monsterId) || MONSTERS[0];
  encounter.active = false;
  drawVillage();
  triggerVillageEncounter(enemyTemplate);
}

function triggerRandomEncounter() {
  const milestone = getProfileMilestone();
  const candidates = MONSTERS.filter((monster) => Number(monster.milestone) <= milestone);
  const enemyTemplate = candidates.length ? candidates[Math.floor(Math.random() * candidates.length)] : MONSTERS[0];
  triggerVillageEncounter(enemyTemplate);
}

function clearAppSession() {
  removeStorage(STORAGE_KEYS.profile);
  clearAuthStateStorage();
  clearOAuthExchangeSession();
  app.profile = null;
  app.battle = null;
  app.activeMonster = null;
  app.lastResult = null;
  app.pendingProfile = null;
  app.pendingEnemy = null;
  clearAuthCallbackUrl();
}

function hardLogout() {
  removeStorage(STORAGE_KEYS.profile);
  clearAuthStateStorage();
  clearOAuthExchangeSession();
  app.profile = null;
  app.battle = null;
  app.activeMonster = null;
  app.lastResult = null;
  app.pendingProfile = null;
  app.pendingEnemy = null;
  location.replace(`${location.origin}${location.pathname}?reset=1`);
}

function startLocalProfile() {
  const intra = (els.intraInput?.value || "").trim() || "seguler";
  const coalition = els.coalitionInput?.value || "Ravenclaw";
  playSound("ui");
  setProfile({
    id: `local-${normalizeId(intra)}`,
    intra,
    displayName: intra,
    coalition: normalizeCoalitionName(coalition),
    avatarUrl: "",
    authSource: "local"
  });
  els.statusLine.textContent = "Local profile active";
  showVillage();
}

function setProfile(profile) {
  if (!profile || typeof profile !== "object") return;
  const stored = readJson(STORAGE_KEYS.profile, null);
  const sameStoredUser = stored && String(stored.id || stored.intra || "") === String(profile.id || profile.intra || "");
  const savedBase = sameStoredUser ? stored : {};
  const wallet = Number(profile.wallet ?? savedBase.wallet);
  const next = {
    id: profile.id,
    intra: profile.intra,
    displayName: profile.displayName,
    coalition: normalizeCoalitionName(profile.coalition || savedBase.coalition),
    avatarUrl: profile.avatarUrl || savedBase.avatarUrl || "",
    wallet: Number.isFinite(wallet) ? Math.max(0, Math.round(wallet)) : STARTING_WALLET,
    inventory: normalizeInventory(profile.inventory || savedBase.inventory),
    monsterLevels: profile.monsterLevels && typeof profile.monsterLevels === "object" ? { ...profile.monsterLevels } : savedBase.monsterLevels && typeof savedBase.monsterLevels === "object" ? { ...savedBase.monsterLevels } : {},
    projectStats: normalizeProjectStats(profile.projectStats || savedBase.projectStats)
  };
  if ("passedProjects" in profile) next.passedProjects = profile.passedProjects;
  else if ("passedProjects" in savedBase) next.passedProjects = savedBase.passedProjects;
  if ("passedProjectSlugs" in profile) next.passedProjectSlugs = normalizeSlugList(profile.passedProjectSlugs);
  else if ("passedProjectSlugs" in savedBase) next.passedProjectSlugs = normalizeSlugList(savedBase.passedProjectSlugs);
  if ("passedProjectsSlugs" in profile) next.passedProjectsSlugs = normalizeSlugList(profile.passedProjectsSlugs);
  if ("passedProjectsList" in profile) next.passedProjectsList = normalizeSlugList(profile.passedProjectsList);
  if ("curriculumTrack" in profile) next.curriculumTrack = profile.curriculumTrack;
  else if ("curriculumTrack" in savedBase) next.curriculumTrack = savedBase.curriculumTrack;
  if ("rank" in profile) next.rank = profile.rank;
  if ("daysUntilBlackhole" in profile) next.daysUntilBlackhole = profile.daysUntilBlackhole;
  if ("achievements" in profile) next.achievements = normalizeAchievements(profile.achievements);
  else if ("achievements" in savedBase) next.achievements = normalizeAchievements(savedBase.achievements);
  if ("coalitionColor" in profile) next.coalitionColor = profile.coalitionColor;
  else if ("coalitionColor" in savedBase) next.coalitionColor = savedBase.coalitionColor;
  if ("authSource" in profile) next.authSource = profile.authSource;
  if ("cursusLevel" in profile) next.cursusLevel = profile.cursusLevel;
  else if ("cursusLevel" in savedBase) next.cursusLevel = savedBase.cursusLevel;
  next.currentMilestone = deriveMilestoneFromProfile(next);
  app.profile = next;
  normalizeProfileEconomy();
  writeJson(STORAGE_KEYS.profile, app.profile);
  void backend.savePlayerProfile(app.profile);
  renderProfile();
  updateMainMenuButtons();
  notifyProfileLoaded(app.profile);
}

function mergeProfileProgress(apiProfile, savedProfile) {
  if (!savedProfile || typeof savedProfile !== "object") return apiProfile;
  const merged = {
    ...savedProfile,
    ...apiProfile,
    wallet: savedProfile.wallet ?? apiProfile.wallet,
    inventory: savedProfile.inventory || apiProfile.inventory,
    monsterLevels: savedProfile.monsterLevels || apiProfile.monsterLevels,
    projectStats: savedProfile.projectStats || apiProfile.projectStats,
    achievements: apiProfile.achievements || savedProfile.achievements,
    passedProjectSlugs: normalizeSlugList(
      apiProfile.passedProjectSlugs ||
        apiProfile.passedProjectsSlugs ||
        apiProfile.passedProjectsList ||
        savedProfile.passedProjectSlugs ||
        savedProfile.passedProjectsSlugs ||
        savedProfile.passedProjectsList ||
        []
    )
  };
  merged.currentMilestone = deriveMilestoneFromProfile(merged);
  return merged;
}

function normalizeSlugList(items) {
  if (!Array.isArray(items)) return [];
  return [...new Set(items.map((item) => normalizeId(item)).filter(Boolean))];
}

function normalizeProjectStats(raw) {
  const out = {};
  if (!raw || typeof raw !== "object") return out;
  for (const [id, stat] of Object.entries(raw)) {
    if (!stat || typeof stat !== "object") continue;
    const hp = Number(stat.hp);
    const maxHp = Number(stat.maxHp);
    const xp = Number(stat.xp);
    out[id] = { hp: Number.isFinite(hp) ? Math.max(0, Math.round(hp)) : undefined, maxHp: Number.isFinite(maxHp) ? Math.max(1, Math.round(maxHp)) : undefined, xp: Number.isFinite(xp) ? Math.max(0, Math.round(xp)) : 0, wins: Math.max(0, Math.round(Number(stat.wins) || 0)), losses: Math.max(0, Math.round(Number(stat.losses) || 0)), uses: Math.max(0, Math.round(Number(stat.uses) || 0)), unlockedAt: Number(stat.unlockedAt) || Date.now(), lastUsedAt: Number(stat.lastUsedAt) || 0 };
  }
  return out;
}

function syncValidatedProjectStats(profile = app.profile) {
  if (!profile) return;
  if (!profile.projectStats || typeof profile.projectStats !== "object") profile.projectStats = {};
  for (const monster of getOwnedMonstersForProfile(profile)) {
    const maxHp = computeMonsterMaxHp(monster, profile);
    const current = profile.projectStats[monster.id] || {};
    const hp = Number(current.hp);
    profile.projectStats[monster.id] = { hp: Number.isFinite(hp) ? Math.max(0, Math.min(Math.round(hp), maxHp)) : maxHp, maxHp, xp: Math.max(0, Math.round(Number(current.xp ?? profile.monsterLevels?.[monster.id]) || 0)), wins: Math.max(0, Math.round(Number(current.wins) || 0)), losses: Math.max(0, Math.round(Number(current.losses) || 0)), uses: Math.max(0, Math.round(Number(current.uses) || 0)), unlockedAt: Number(current.unlockedAt) || Date.now(), lastUsedAt: Number(current.lastUsedAt) || 0 };
  }
}

function getOwnedMonstersForProfile(profile = app.profile) {
  const track = String(profile?.curriculumTrack || profile?.track || "current").trim() === "legacy" ? "legacy" : "current";
  const sameTrack = MONSTERS.filter((monster) => monster.track === track);
  const rawSlugs = profile?.passedProjectSlugs || profile?.passedProjectsSlugs || profile?.passedProjectsList || [];
  const passedSlugs = normalizeSlugList(rawSlugs);
  let owned = [];
  if (passedSlugs.length) {
    owned = sameTrack.filter((monster) => isMonsterProjectValidated(monster, passedSlugs));
  } else {
    const milestone = getDerivedMilestoneForProfile(profile);
    const passedCount = Number(profile?.passedProjects);
    if (Number.isFinite(passedCount) && passedCount > 0) owned = sameTrack.filter((monster) => monster.milestone <= milestone);
  }
  if (!owned.length) owned = sameTrack.filter((monster) => monster.id === "libcub").slice(0, 1);
  if (!owned.length && sameTrack.length) owned = [sameTrack[0]];
  return owned;
}

function computeMonsterMaxHp(monster, profile = app.profile) {
  const levels = profile?.monsterLevels && typeof profile.monsterLevels === "object" ? profile.monsterLevels : {};
  const statXp = profile?.projectStats?.[monster.id]?.xp;
  const xp = Number.isFinite(Number(statXp)) ? Number(statXp) : Number(levels[monster.id]) || 0;
  const level = Math.floor(Math.max(0, xp) / 100);
  const achievementTotals = getAchievementBuffSummary(profile).totals;
  return Math.max(1, Math.round(monster.hp + level * 10 + (Number(achievementTotals.hp) || 0)));
}

function getProjectHpState(monster, profile = app.profile) {
  const maxHp = computeMonsterMaxHp(monster, profile);
  const stat = ensureProjectStat(monster, maxHp);
  const hp = Math.max(0, Math.min(maxHp, Math.round(Number(stat.hp) || 0)));
  return { hp, maxHp, fainted: hp <= 0 };
}

function getUsableProjectMonsters(profile = app.profile) {
  return getOwnedMonstersForProfile(profile).filter((monster) => !getProjectHpState(monster, profile).fainted);
}

function hasAnyUsableProjectMonster(profile = app.profile) {
  return getUsableProjectMonsters(profile).length > 0;
}

function handlePartyWipe(message) {
  app.battle = null;
  app.pendingEnemy = null;
  app.activeMonster = null;
  app.lastResult = null;
  persistProfileEconomy();
  setMusicMode("idle");
  playSound("loss");
  showLogin();
  els.statusLine.textContent = message || "Tüm proje canavarların bayıldı. Main menüye döndün.";
}

function showLogin() {
  showScreen("login");
  updateMainMenuButtons();
  renderProfile();
  renderLeaderboards();
  els.statusLine.textContent = "Coalition battle console";
}

function showMonsterLab() {
  if (!app.profile) {
    showLogin();
    return;
  }
  app.battle = null;
  showScreen("front");
  renderFrontHeader();
  renderMonsterCards();
  renderProfile();
  renderLeaderboards();
  renderEvents();
  els.statusLine.textContent = app.pendingEnemy
    ? `Rakip bulundu: ${getMonsterDisplayName(app.pendingEnemy)}`
    : "Canavar laboratuvarı";
}

function showEncounterChoice(enemy) {
  app.pendingEnemy = enemy;
  app.overworld.encounterCooldown = 4;
  app.overworld.stepsSinceEncounter = 0;
  playSound("encounter");
  setMusicMode("idle");
  showMonsterLab();
}

function renderFrontHeader() {
  const enemy = app.pendingEnemy;
  if (els.enterVillageButton) els.enterVillageButton.classList.add("hidden");
  if (enemy) {
    const enemyName = getMonsterDisplayName(enemy);
    if (els.frontKicker) els.frontKicker.textContent = "Karşılaşma";
    if (els.frontTitle) els.frontTitle.textContent = "Canavarını seç";
    if (els.frontHint) {
      els.frontHint.textContent = `${enemyName} karşına çıktı. Canı olan bir proje seç; baygın projeler savaşa giremez.`;
    }
    if (els.encounterPreview) {
      els.encounterPreview.classList.remove("hidden");
      els.encounterPreview.style.setProperty("--front-color", enemy.color);
      els.encounterPreview.innerHTML = `
        <div class="encounter-copy">
          <span class="panel-kicker">Rakip</span>
          <h3>${escapeHtml(enemyName)}</h3>
          <p>${escapeHtml(enemy.role)}</p>
        </div>
        <div class="threat" aria-label="Enemy power ${enemy.power}">
          ${Array.from({ length: 5 }, (_, index) => `<i class="${index < enemy.power ? "active" : ""}"></i>`).join("")}
        </div>
      `;
    }
    return;
  }
  if (els.frontKicker) els.frontKicker.textContent = "Canavar laboratuvarı";
  if (els.frontTitle) els.frontTitle.textContent = "Proje canavarların";
  if (els.frontHint) els.frontHint.textContent = "Karşılaşmalar köy haritasında başlar.";
  if (els.encounterPreview) {
    els.encounterPreview.classList.add("hidden");
    els.encounterPreview.innerHTML = "";
  }
}

function showResult(result) {
  showScreen("result");
  els.resultTitle.textContent =
    result.outcome === "win"
      ? `${result.monsterName} kazandı`
      : result.outcome === "loss"
        ? `${result.monsterName} yenildi`
        : "Karşılaşmadan çıkıldı";
  els.resultScore.textContent = result.score.toString();
  if (els.resultKills) els.resultKills.textContent = result.hits.toString();
  els.resultTime.textContent = getOutcomeLabel(result.outcome);
  if (els.resultCoalition) {
    els.resultCoalition.textContent =
      result.outcome === "win"
        ? `${result.coalition} için +${result.score} puan yazıldı.`
        : result.outcome === "loss"
          ? "Bu savaşta ödül kazanılmadı."
          : "Kaçışta ödül kazanılmadı.";
  }

  if (result.outcome === "win") {
    const buffText = result.activeBuffs ? ` | Buff: ${result.activeBuffs}` : "";
    els.statusLine.textContent = `Kazandın! +${result.xpGained} XP | +${result.walletEarned || 0} ₳ | Eşya: ${result.loot}${buffText}`;
  } else {
    els.statusLine.textContent = result.outcome === "aborted" ? "Karşılaşmadan çıkıldı" : `${result.coalition} +${result.score}`;
  }

  renderLeaderboards();
}

function showInventory(message = "") {
  if (!app.profile || !els.inventoryModal) return;
  normalizeProfileEconomy();
  renderInventory(message);
  els.inventoryModal.classList.remove("hidden");
}

function hideInventory() {
  if (!els.inventoryModal) return;
  els.inventoryModal.classList.add("hidden");
}

function renderInventory(message = "") {
  if (!app.profile) return;
  normalizeProfileEconomy();
  if (els.walletBalance) els.walletBalance.textContent = `${app.profile.wallet || 0} ₳`;
  if (els.inventoryStatus) {
    els.inventoryStatus.textContent =
      message || "Savaş kazan, ₳ topla, 42 itemlarını çantana ekle.";
  }
  renderOwnedInventory();
  renderAchievementBuffs();
  renderShop();
}

function renderMarket(message = "") {
  if (!app.profile) return;
  normalizeProfileEconomy();
  if (els.marketWalletBalance) els.marketWalletBalance.textContent = `${app.profile.wallet || 0} ₳`;
  if (els.marketStatus) {
    els.marketStatus.textContent = message || "₳ ile eşya al.";
  }
  renderShop();
}

function renderOwnedInventory() {
  if (!els.inventoryGrid) return;
  const counts = getInventoryCounts();
  const entries = Object.entries(counts);
  if (!entries.length) {
    els.inventoryGrid.innerHTML = `<div class="empty-card">Çanta boş. Birkaç savaş kazanıp mağazadan item al.</div>`;
    return;
  }
  els.inventoryGrid.innerHTML = entries.map(([id, count]) => {
    const item = getShopItem(id) || { name: id, type: "Battle Loot", color: "#8fa3ad", price: 0 };
    return `
      <article class="inventory-item" style="--item-color:${escapeHtml(item.color || "#45c7ff")}">
        <div class="item-icon">${escapeHtml(getItemInitial(item.name))}</div>
        <div>
          <h4>${escapeHtml(item.name)}</h4>
          <p>${escapeHtml(item.type || "Item")}</p>
        </div>
        <strong>x${count}</strong>
      </article>
    `;
  }).join("");
}

function renderShop() {
  if (!els.shopGrid && !els.marketShopGrid) return;
  const wallet = Number(app.profile?.wallet) || 0;
  const counts = getInventoryCounts();
  const html = SHOP_ITEMS.map((item) => {
    const owned = counts[item.id] || 0;
    const affordable = wallet >= item.price;
    return `
      <article class="shop-item" style="--item-color:${escapeHtml(item.color)}">
        <div class="shop-art">
          <span>${escapeHtml(getItemInitial(item.name))}</span>
        </div>
        <div class="shop-body">
          <h4>${escapeHtml(item.name)}</h4>
          <p>${escapeHtml(item.type)}${owned ? ` · çantada x${owned}` : ""}</p>
          <button type="button" data-shop-item="${escapeHtml(item.id)}" ${affordable ? "" : "disabled"}>
            ${item.price} ₳
          </button>
        </div>
      </article>
    `;
  }).join("");
  if (els.shopGrid) els.shopGrid.innerHTML = html;
  if (els.marketShopGrid) els.marketShopGrid.innerHTML = html;
}

function renderAchievementBuffs() {
  if (!els.achievementBuffGrid) return;
  const summary = getAchievementBuffSummary();
  const totalsText = formatAchievementBuffTotals(summary.totals);
  const cards = summary.buffs.map((buff) => {
    const status = buff.unlocked ? "AKTIF" : "KILITLI";
    return `
      <article class="achievement-buff ${buff.unlocked ? "active" : "locked"}" style="--buff-color:${escapeHtml(getAchievementBuffColor(buff.category))}">
        <div class="buff-row">
          <strong>${escapeHtml(buff.name)}</strong>
          <span>${status}</span>
        </div>
        <p>${escapeHtml(buff.description || "Buff kaydı")}</p>
        <small>${escapeHtml(buff.category || "Rozet")}</small>
      </article>
    `;
  }).join("");
  els.achievementBuffGrid.innerHTML = `
    <div class="buff-summary">
      <strong>${summary.active.length}/${summary.buffs.length} aktif rozet</strong>
      <span>${escapeHtml(totalsText)}</span>
    </div>
    ${cards}
  `;
}

function buyShopItem(itemId) {
  if (!app.profile) return;
  normalizeProfileEconomy();
  const item = getShopItem(itemId);
  if (!item) return;
  if (app.profile.wallet < item.price) {
    playSound("loss");
    const message = `${item.name} için ${item.price - app.profile.wallet} ₳ daha lazım.`;
    renderInventory(message);
    renderMarket(message);
    return;
  }
  app.profile.wallet -= item.price;
  app.profile.inventory.push(item.id);
  persistProfileEconomy();
  playSound("win");
  const message = `${item.name} çantaya eklendi. -${item.price} ₳`;
  renderInventory(message);
  renderMarket(message);
}

function normalizeProfileEconomy() {
  if (!app.profile) return;
  const wallet = Number(app.profile.wallet);
  app.profile.wallet = Number.isFinite(wallet) ? Math.max(0, Math.round(wallet)) : STARTING_WALLET;
  app.profile.inventory = normalizeInventory(app.profile.inventory);
  if (!app.profile.monsterLevels || typeof app.profile.monsterLevels !== "object") app.profile.monsterLevels = {};
  app.profile.projectStats = normalizeProjectStats(app.profile.projectStats);
  if ("achievements" in app.profile) app.profile.achievements = normalizeAchievements(app.profile.achievements);
  syncValidatedProjectStats(app.profile);
}

function persistProfileEconomy() {
  if (!app.profile) return;
  normalizeProfileEconomy();
  writeJson(STORAGE_KEYS.profile, app.profile);
  void backend.savePlayerProfile(app.profile);
  renderProfile();
}

function getInventoryCounts() {
  const counts = {};
  for (const id of normalizeInventory(app.profile?.inventory)) {
    counts[id] = (counts[id] || 0) + 1;
  }
  return counts;
}

function normalizeInventory(items) {
  if (!Array.isArray(items)) return [];
  return items
    .map((item) => {
      if (typeof item === "string") return item.trim();
      if (item && typeof item === "object") return String(item.id || item.name || "").trim();
      return "";
    })
    .filter(Boolean);
}

function normalizeAchievements(items) {
  if (!Array.isArray(items)) return [];
  return items
    .map((item) => {
      if (typeof item === "string") return { name: item.trim() };
      if (!item || typeof item !== "object") return null;
      const source = item.achievement && typeof item.achievement === "object" ? item.achievement : item;
      const name = String(source.name || item.name || item.title || "").trim();
      if (!name) return null;
      const position = source.position || item.position || item.rank || "";
      const finalName =
        position && !/\d+$/.test(name) ? `${name} ${String(position).trim()}` : name;
      return {
        name: finalName.trim(),
        category: source.kind || item.kind || item.category || "",
        achievedAt: item.achieved_at || item.created_at || item.date || ""
      };
    })
    .filter(Boolean);
}

function normalizeAchievementName(name) {
  return String(name || "")
    .toLowerCase()
    .replace(/[’]/g, "'")
    .replace(/\s+/g, " ")
    .replace(/\s+!/g, "!")
    .trim();
}

function getAchievementBuffSummary(profile = app.profile) {
  const realAchievements = normalizeAchievements(profile?.achievements);
  const activeNames = new Set(realAchievements.map((item) => normalizeAchievementName(item.name)));
  const useCatalogFallback = activeNames.size === 0;
  const buffs = ACHIEVEMENT_BUFFS.map((buff) => {
    const key = normalizeAchievementName(buff.name);
    const unlocked =
      useCatalogFallback
        ? buff.active === true
        : activeNames.has(key);
    return { ...buff, unlocked };
  });
  const active = buffs.filter((buff) => buff.unlocked);
  const totals = active.reduce(
    (sum, buff) => ({
      hp: sum.hp + (Number(buff.hp) || 0),
      power: sum.power + (Number(buff.power) || 0),
      damage: sum.damage + (Number(buff.damage) || 0),
      walletFlat: sum.walletFlat + (Number(buff.walletFlat) || 0),
      walletMultiplier: sum.walletMultiplier + (Number(buff.walletMultiplier) || 0)
    }),
    { hp: 0, power: 0, damage: 0, walletFlat: 0, walletMultiplier: 0 }
  );
  return { buffs, active, totals };
}

function formatAchievementBuffTotals(totals) {
  const parts = [];
  if (totals.hp) parts.push(`+${totals.hp} HP`);
  if (totals.power) parts.push(`+${totals.power} power`);
  if (totals.damage) parts.push(`+${totals.damage} hasar`);
  if (totals.walletFlat) parts.push(`+${totals.walletFlat} ₳`);
  if (totals.walletMultiplier) parts.push(`₳ +${Math.round(totals.walletMultiplier * 100)}%`);
  return parts.length ? parts.join(" / ") : "Aktif buff yok";
}

function getAchievementBuffColor(category) {
  const key = normalizeId(category || "");
  if (key.includes("project")) return "#45c7ff";
  if (key.includes("social") || key.includes("comms")) return "#ffbd4a";
  if (key.includes("campus") || key.includes("piscine")) return "#78d66f";
  if (key.includes("wallet") || key.includes("evaluation")) return "#d99a00";
  if (key.includes("challenge") || key.includes("competition")) return "#ff5e57";
  if (key.includes("defense") || key.includes("pedagogy")) return "#b98cff";
  return "#8fa3ad";
}

function getShopItem(id) {
  return SHOP_ITEMS.find((item) => item.id === id) || BATTLE_LOOT_ITEMS.find((item) => item.id === id) || null;
}

function getItemInitial(name) {
  const clean = String(name || "?").trim();
  const firstWord = clean.split(/\s+/).find(Boolean) || "?";
  return firstWord.slice(0, 2).toUpperCase();
}

function showVillage() {
  if (!app.profile) {
    showLogin();
    return;
  }
  normalizeProfileEconomy();
  if (!hasAnyUsableProjectMonster()) {
    handlePartyWipe("Tüm proje canavarların bayıldı. Hiçbir ödül almadan main menüye döndün.");
    return;
  }
  const milestone = getProfileMilestone();

  // Eğer aynı milestone için zaten bir harita oluşturulmuşsa onu kullan
  // (savaştan dönünce aynı harita devam etsin)
  const sameMap = app.overworld.mode === "village" && app.overworld.currentMap && app.overworld.currentMap.milestone === milestone;

  let map;
  if (sameMap) {
    map = app.overworld.currentMap;
  } else {
    map = (window.FRONT_MAPS && window.FRONT_MAPS.getVillage(milestone)) ||
      (window.VILLAGE_MAPS && window.VILLAGE_MAPS[0]);
    if (!map) {
      els.statusLine.textContent = "Köy haritası yok (Aşama A)";
      return;
    }
    app.overworld.currentMap = map;
    app.overworld.playerX = map.spawn?.x ?? 1;
    app.overworld.playerY = map.spawn?.y ?? 1;
  }

  normalizeVillageCollision(map);
  app.overworld.mode = "village";
  app.overworld.mapId = map.id;
  app.overworld.encounterCooldown = Math.max(0, app.overworld.encounterCooldown ?? 3);
  enrichMapEncounters(map);

  if (els.villageName) els.villageName.textContent = map.name;
  if (els.villageSubtitle) els.villageSubtitle.textContent = map.subtitle || "";
  showScreen("village");
  drawVillage();
  setMusicMode("village");
  els.statusLine.textContent = `Köy: ${map.name} — WASD ile gez, düşmanları bul`;
}

function drawVillage() {
  if (!villageCtx) return;
  const map = getCurrentVillageMap();
  if (!map) return;
  const canvas = els.villageCanvas;
  normalizeVillageCollision(map);
  const tileW = canvas.width / map.cols;
  const tileH = canvas.height / map.rows;
  villageCtx.imageSmoothingEnabled = false;
  villageCtx.clearRect(0, 0, canvas.width, canvas.height);

  // Layer 1a: y=0 — wall tile'ları (üst satırın zemini)
  if (map.wallLayer) {
    for (let c = 0; c < map.cols; c++) {
      drawTileImage(map.wallLayer[c], c * tileW, 0, tileW, tileH);
    }
  }

  // Layer 1b: y=1..rows-1 — zemin (varsayılan 10x10 hücre = 1 PNG)
  if (map.groundLayer) {
    const groundChunk = Math.max(1, Math.floor(Number(map.groundTileChunk) || 10));
    for (let r = 1; r < map.rows; r += groundChunk) {
      for (let c = 0; c < map.cols; c += groundChunk) {
        const originR = Math.floor(r / groundChunk) * groundChunk;
        const originC = Math.floor(c / groundChunk) * groundChunk;
        const src = map.groundLayer[originR]?.[originC] ?? map.groundLayer[r]?.[c];
        const chunkCols = Math.min(groundChunk, map.cols - c);
        const chunkRows = Math.min(groundChunk, map.rows - r);
        const drawW = chunkCols * tileW;
        const drawH = chunkRows * tileH;
        if (src) {
          drawTileImage(src, c * tileW, r * tileH, drawW, drawH);
        } else {
          villageCtx.fillStyle = (originR + originC) % 2 ? "#27343d" : "#202b33";
          villageCtx.fillRect(c * tileW, r * tileH, Math.ceil(drawW) + 1, Math.ceil(drawH) + 1);
        }
      }
    }
  } else {
    // Legacy fallback
    drawVillageBackdrop(canvas, map.palette || {});
    for (let r = 0; r < map.rows; r++) {
      for (let c = 0; c < map.cols; c++) {
        const tile = map.tiles?.[r]?.[c] ?? 0;
        if (tile === 1) {
          villageCtx.fillStyle = "#10161c";
          villageCtx.fillRect(c * tileW, r * tileH, Math.ceil(tileW) + 1, Math.ceil(tileH) + 1);
        }
      }
    }
  }


  // Layer 3: Draw objects (tables, chairs, folliage, lockers, pillars, traps, lights)
  // obj.w / obj.h: kaç tile genişliğinde/yüksekliğinde çizileceği (default 1x1)
  if (map.objects) {
    for (const obj of map.objects) {
      const drawW = tileW * (obj.w || 1);
      const drawH = tileH * (obj.h || 1);
      drawTileImage(obj.img, obj.x * tileW, obj.y * tileH, drawW, drawH);
    }
  }

  // Legacy props (eski API uyumluluğu)
  if (map.props && map.props.length) {
    drawVillageProps(map, tileW, tileH);
  }

  // Layer 4: Draw enemies
  drawVillageEnemies(map, tileW, tileH);

  // Layer 5: Draw player
  drawVillagePlayer(tileW, tileH);

  // Layer 6: Atmospheric overlay
  drawVillageOverlay(canvas, map.palette || {});
  drawVillageWarning(canvas);
}

/* Yardımcı: Tek bir tile PNG'sini cache'den çekip çiz */
function drawTileImage(src, x, y, w, h) {
  const img = (typeof TILE_IMAGE_CACHE !== "undefined") ? TILE_IMAGE_CACHE[src] : null;
  if (img && img.complete && img.naturalWidth > 0) {
    villageCtx.drawImage(img, x, y, Math.ceil(w) + 1, Math.ceil(h) + 1);
  } else {
    // Eğer resim yüklenmediyse boş bırak (şeffaf)
  }
}

function drawVillageEnemies(map, tileW, tileH) {
  if (!map.encounters) return;
  for (const enemy of map.encounters) {
    if (!enemy.active) continue;
    const px = enemy.x * tileW;
    const py = enemy.y * tileH;
    const cx = px + tileW / 2;
    const cy = py + tileH;
    const monsterId = getEncounterMonsterId(enemy);
    const spriteW = tileW * 1.15;
    const spriteH = tileH * 1.35;
    const drew = drawMonsterSprite(villageCtx, monsterId, cx, cy, spriteW, spriteH);
    if (drew) continue;
    const monster = MONSTERS.find((item) => item.id === monsterId);
    const fighter = {
      id: monsterId,
      color: monster?.color || "#ff5e57",
      name: monster?.name || monsterId
    };
    villageCtx.save();
    villageCtx.translate(cx, cy);
    villageCtx.scale(tileW / 190, tileH / 190);
    drawProceduralMonster(fighter);
    villageCtx.restore();
  }
}

function drawVillageBackdrop(canvas, palette) {
  const bg = villageCtx.createLinearGradient(0, 0, canvas.width, canvas.height);
  bg.addColorStop(0, palette.bgTop || "#111820");
  bg.addColorStop(1, palette.bgBottom || "#06080b");
  villageCtx.fillStyle = bg;
  villageCtx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawVillageBlockedTile(x, y, w, h, row, col, palette) {
  villageCtx.fillStyle = palette.blocker || "#173f4f";
  villageCtx.fillRect(x, y, Math.ceil(w) + 1, Math.ceil(h) + 1);
  villageCtx.fillStyle = "rgba(255, 255, 255, 0.08)";
  villageCtx.fillRect(x + 2, y + 2, w - 4, h * 0.28);
  villageCtx.fillStyle = "rgba(0, 0, 0, 0.24)";
  villageCtx.fillRect(x + 3, y + h * 0.64, w - 6, h * 0.22);
  if ((row + col) % 3 === 0) {
    villageCtx.strokeStyle = hexToRgba(palette.accent || "#45c7ff", 0.35);
    villageCtx.lineWidth = 2;
    villageCtx.beginPath();
    villageCtx.moveTo(x + w * 0.18, y + h * 0.5);
    villageCtx.lineTo(x + w * 0.82, y + h * 0.5);
    villageCtx.stroke();
  }
}

function drawVillageProps(map, tileW, tileH) {
  const props = Array.isArray(map.props) ? map.props : [];
  for (const prop of props) drawVillageProp(prop, tileW, tileH);
}

function drawVillageProp(prop, tileW, tileH) {
  const x = prop.x * tileW;
  const y = prop.y * tileH;
  const w = (prop.w || 1) * tileW;
  const h = (prop.h || 1) * tileH;
  if (prop.type === "desk") {
    villageCtx.fillStyle = "#eceff2";
    villageCtx.fillRect(x + 3, y + 5, w - 6, h - 12);
    villageCtx.fillStyle = "#b8bec4";
    villageCtx.fillRect(x + 3, y + h - 9, w - 6, 4);
    villageCtx.fillStyle = "#11161b";
    villageCtx.fillRect(x + 8, y + h - 8, 4, 7);
    villageCtx.fillRect(x + w - 12, y + h - 8, 4, 7);
    if (prop.broken) {
      villageCtx.strokeStyle = "#24292e";
      villageCtx.lineWidth = 2;
      villageCtx.beginPath();
      villageCtx.moveTo(x + w * 0.42, y + 6);
      villageCtx.lineTo(x + w * 0.55, y + h - 10);
      villageCtx.stroke();
    }
    return;
  }
  if (prop.type === "imac") {
    villageCtx.fillStyle = "#cfd5d9";
    villageCtx.fillRect(x + w * 0.22, y + h * 0.16, w * 0.56, h * 0.48);
    villageCtx.fillStyle = "#050709";
    villageCtx.fillRect(x + w * 0.28, y + h * 0.22, w * 0.44, h * 0.32);
    villageCtx.strokeStyle = "rgba(69, 199, 255, 0.65)";
    villageCtx.beginPath();
    villageCtx.moveTo(x + w * 0.32, y + h * 0.28);
    villageCtx.lineTo(x + w * 0.68, y + h * 0.5);
    villageCtx.stroke();
    villageCtx.fillStyle = "#9ba3a8";
    villageCtx.fillRect(x + w * 0.46, y + h * 0.64, w * 0.08, h * 0.18);
    return;
  }
  if (prop.type === "locker") {
    villageCtx.fillStyle = "#4a535b";
    villageCtx.fillRect(x + 3, y + 2, w - 6, h - 4);
    for (let i = 0; i < Math.max(1, prop.count || 2); i += 1) {
      const lx = x + 5 + (i * (w - 10)) / Math.max(1, prop.count || 2);
      const lw = (w - 12) / Math.max(1, prop.count || 2);
      villageCtx.strokeStyle = "#232a30";
      villageCtx.strokeRect(lx, y + 4, lw, h - 8);
      villageCtx.fillStyle = "#9ba3a8";
      villageCtx.fillRect(lx + lw * 0.25, y + 10, lw * 0.5, 2);
      villageCtx.fillRect(lx + lw * 0.25, y + 15, lw * 0.5, 2);
    }
    return;
  }
  if (prop.type === "chair") {
    villageCtx.fillStyle = "#090b0d";
    villageCtx.fillRect(x + w * 0.28, y + h * 0.18, w * 0.44, h * 0.42);
    villageCtx.fillRect(x + w * 0.18, y + h * 0.55, w * 0.64, h * 0.18);
    villageCtx.strokeStyle = "#252b31";
    villageCtx.beginPath();
    villageCtx.moveTo(x + w * 0.5, y + h * 0.72);
    villageCtx.lineTo(x + w * 0.2, y + h * 0.92);
    villageCtx.moveTo(x + w * 0.5, y + h * 0.72);
    villageCtx.lineTo(x + w * 0.8, y + h * 0.92);
    villageCtx.stroke();
    return;
  }
  if (prop.type === "pillar") {
    villageCtx.fillStyle = "#d9dedf";
    villageCtx.fillRect(x + 6, y + 2, w - 12, h - 4);
    villageCtx.fillStyle = "#8c9397";
    villageCtx.fillRect(x + 8, y + h - 12, w - 16, 5);
    villageCtx.strokeStyle = "#636c72";
    villageCtx.beginPath();
    villageCtx.moveTo(x + w * 0.55, y + 5);
    villageCtx.lineTo(x + w * 0.45, y + h - 8);
    villageCtx.stroke();
    return;
  }
  if (prop.type === "led") {
    villageCtx.fillStyle = "rgba(210, 246, 255, 0.72)";
    villageCtx.fillRect(x + 2, y + h * 0.35, w - 4, 4);
    villageCtx.fillStyle = "rgba(69, 199, 255, 0.12)";
    villageCtx.fillRect(x + 2, y + h * 0.35 + 4, w - 4, h * 0.5);
    return;
  }
  if (prop.type === "rubble") {
    villageCtx.fillStyle = "#8f8980";
    for (let i = 0; i < 7; i += 1) {
      const rx = x + villageNoise(prop.x * 19 + i) * w;
      const ry = y + villageNoise(prop.y * 23 + i) * h;
      const s = 3 + villageNoise(i * 7 + prop.x) * 6;
      villageCtx.fillRect(rx, ry, s, s);
    }
    return;
  }
  if (prop.type === "cable") {
    villageCtx.strokeStyle = prop.color || "#111";
    villageCtx.lineWidth = 3;
    villageCtx.beginPath();
    villageCtx.moveTo(x + 4, y + h * 0.4);
    villageCtx.bezierCurveTo(x + w * 0.35, y, x + w * 0.66, y + h, x + w - 4, y + h * 0.55);
    villageCtx.stroke();
  }
}

function drawVillagePlayer(tileW, tileH) {
  const px = app.overworld.playerX * tileW;
  const py = app.overworld.playerY * tileH;
  const cx = px + tileW / 2;
  const cy = py + tileH * 0.62;
  const coalition = getCoalition(app.profile?.coalition);
  const img = TRAINER_IMAGES[coalition.name];
  villageCtx.fillStyle = "rgba(0, 0, 0, 0.38)";
  villageCtx.fillRect(cx - tileW * 0.32, py + tileH * 0.76, tileW * 0.64, tileH * 0.16);
  if (img?.complete && img.naturalWidth) {
    const drawH = tileH * 1.48;
    const drawW = drawH * (img.naturalWidth / img.naturalHeight);
    villageCtx.drawImage(img, cx - drawW / 2, cy - drawH * 0.78, drawW, drawH);
  } else {
    villageCtx.fillStyle = coalition.color;
    villageCtx.fillRect(px + tileW * 0.22, py + tileH * 0.16, tileW * 0.56, tileH * 0.66);
    villageCtx.fillStyle = "#101216";
    villageCtx.fillRect(px + tileW * 0.34, py + tileH * 0.34, tileW * 0.1, tileH * 0.1);
    villageCtx.fillRect(px + tileW * 0.56, py + tileH * 0.34, tileW * 0.1, tileH * 0.1);
  }
  villageCtx.strokeStyle = hexToRgba(coalition.color, 0.9);
  villageCtx.lineWidth = 2;
  villageCtx.strokeRect(px + 4, py + 4, tileW - 8, tileH - 8);
}

function drawVillageOverlay(canvas, palette) {
  villageCtx.strokeStyle = hexToRgba(palette.accent || "#45c7ff", 0.45);
  villageCtx.lineWidth = 2;
  villageCtx.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);
  villageCtx.fillStyle = "rgba(255, 255, 255, 0.035)";
  for (let y = 0; y < canvas.height; y += 4) {
    villageCtx.fillRect(0, y, canvas.width, 1);
  }
}

function drawVillageWarning(canvas) {
  const warning = app.overworld.villageWarning;
  if (!warning) return;
  const now = performance.now();
  if (now >= warning.until) {
    app.overworld.villageWarning = null;
    return;
  }
  const left = Math.max(0, warning.until - now) / VILLAGE_WARNING_MS;
  villageCtx.fillStyle = `rgba(255, 30, 30, ${0.34 * left})`;
  villageCtx.fillRect(0, 0, canvas.width, canvas.height);
  villageCtx.fillStyle = `rgba(120, 0, 0, ${0.72 * left})`;
  villageCtx.fillRect(0, canvas.height * 0.42, canvas.width, canvas.height * 0.16);
  villageCtx.strokeStyle = `rgba(255, 255, 255, ${0.65 * left})`;
  villageCtx.lineWidth = 3;
  villageCtx.strokeRect(12, 12, canvas.width - 24, canvas.height - 24);
  villageCtx.fillStyle = "#ffffff";
  let fontSize = 22;
  do {
    villageCtx.font = `700 ${fontSize}px 'Press Start 2P', monospace`;
    fontSize -= 2;
  } while (villageCtx.measureText(warning.text).width > canvas.width * 0.86 && fontSize >= 12);
  villageCtx.textAlign = "center";
  villageCtx.textBaseline = "middle";
  villageCtx.fillText(warning.text, canvas.width / 2, canvas.height / 2);
}

function villageNoise(seed) {
  const x = Math.sin(seed * 999.1) * 10000;
  return x - Math.floor(x);
}

function getCurrentVillageMap() {
  // Öncelikle cache'lenmiş haritayı kullan (savaştan dönünce, hareket ederken aynı harita kalır)
  if (app.overworld.currentMap) return app.overworld.currentMap;
  if (window.FRONT_MAPS && typeof window.FRONT_MAPS.getVillage === "function") {
    return window.FRONT_MAPS.getVillage(getProfileMilestone());
  }
  return (window.VILLAGE_MAPS && window.VILLAGE_MAPS[app.overworld.mapId]) || null;
}




function showScreen(name) {
  els.loginScreen.classList.toggle("hidden", name !== "login");
  if (els.leaderboardScreen) els.leaderboardScreen.classList.toggle("hidden", name !== "leaderboard");
  if (els.settingsScreen) els.settingsScreen.classList.toggle("hidden", name !== "settings");
  if (els.marketScreen) els.marketScreen.classList.toggle("hidden", name !== "market");
  els.frontScreen.classList.toggle("hidden", name !== "front");
  els.gameScreen.classList.toggle("hidden", name !== "game");
  els.resultScreen.classList.toggle("hidden", name !== "result");
  if (els.villageScreen) els.villageScreen.classList.toggle("hidden", name !== "village");
  const menuMode = ["login", "leaderboard", "settings", "market"].includes(name);
  if (els.appShell) {
    els.appShell.classList.toggle("menu-mode", menuMode);
    els.appShell.classList.toggle("battle-mode", name === "game");
  }
  if (name === "village") startVillageAiLoop();
  else stopVillageAiLoop();
}

function renderProfile() {
  if (!app.profile) {
    els.profileChip.classList.add("hidden");
    els.logoutButton.classList.add("hidden");
    if (els.inventoryButton) els.inventoryButton.classList.add("hidden");
    return;
  }

  normalizeProfileEconomy();
  const coalition = getCoalition(app.profile.coalition);
  const initial = (app.profile.intra || "?").slice(0, 1).toUpperCase();
  const gameplayMilestone = getProfileMilestone();
  const cursusLevel = Number(app.profile?.cursusLevel);
  const milestone =
    Number.isFinite(gameplayMilestone)
      ? ` · M${escapeHtml(String(gameplayMilestone))}${
          Number.isFinite(cursusLevel) ? ` (42 lvl ${escapeHtml(cursusLevel.toFixed(2))})` : ""
        }`
      : "";
  const passed =
    Array.isArray(app.profile.passedProjects) && app.profile.passedProjects.length > 0
      ? ` · ${app.profile.passedProjects.length} passed`
      : "";
  const wallet = Number(app.profile.wallet) || 0;
  els.profileChip.innerHTML = `
    <div class="profile-avatar" style="color:${coalition.color};">${escapeHtml(initial)}</div>
    <div>
      <strong>${escapeHtml(app.profile.intra)}</strong>
      <div class="muted">${escapeHtml(app.profile.coalition)}${milestone}${passed} · ${wallet} ₳</div>
    </div>
  `;
  els.profileChip.classList.remove("hidden");
  els.logoutButton.classList.remove("hidden");
  if (els.inventoryButton) els.inventoryButton.classList.remove("hidden");
}

function renderMonsterCards() {
  els.frontGrid.innerHTML = "";
  if (!MONSTERS.length) {
    const empty = document.createElement("div");
    empty.className = "muted";
    empty.style.gridColumn = "1 / -1";
    empty.style.padding = "16px";
    empty.textContent = "No valid monsters in content.js (check MONSTER_DATA).";
    els.frontGrid.append(empty);
    return;
  }

  const pool = getMonsterPools();
  if (app.pendingEnemy) {
    renderMonsterSection("Proje Seç", pool.player, "HP'si 0 olanlar baygın ve seçilemez.", true);
    return;
  }

  renderMonsterSection("Your Monsters", pool.player, "Validated project pool", false);
  renderMonsterSection(
    pool.villageName,
    pool.enemy,
    "Enemy pool for your current village",
    false
  );
  if (pool.locked.length) {
    renderMonsterSection("Locked Ahead", pool.locked.slice(0, 6), "Future milestone preview", false, true);
  }
}

function renderMonsterSection(title, monsters, subtitle, playable, locked = false) {
  const section = document.createElement("section");
  section.className = "monster-section";
  section.innerHTML = `
    <div class="monster-section-head">
      <div>
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(subtitle)}</p>
      </div>
      <span>${monsters.length}</span>
    </div>
  `;
  const grid = document.createElement("div");
  grid.className = "monster-card-grid";
  if (!monsters.length) {
    const empty = document.createElement("div");
    empty.className = "empty-card";
    empty.textContent = playable ? "No validated monsters yet. Starter loaded." : "No enemies in this village yet.";
    grid.append(empty);
  } else {
    for (const monster of monsters) {
      grid.append(createMonsterCard(monster, playable && !locked, locked));
    }
  }
  section.append(grid);
  els.frontGrid.append(section);
}

function createMonsterCard(monster, playable, locked) {
  const displayName = getMonsterDisplayName(monster);
  const hpState = getProjectHpState(monster);
  const disabled = !playable || locked || hpState.fainted;
  const hpRatio = Math.max(0, Math.min(1, hpState.hp / hpState.maxHp));
  const button = document.createElement("button");
  button.className = `front-card${locked ? " locked" : ""}${!playable ? " preview" : ""}${hpState.fainted ? " fainted" : ""}`;
  button.type = "button";
  button.disabled = disabled;
  button.style.setProperty("--front-color", monster.color);
  button.style.setProperty("--hp-ratio", String(hpRatio));
  button.innerHTML = `
    <div>
      <div class="monster-badges">
        <span>M${escapeHtml(String(monster.milestone))}</span>
        <span>${hpState.fainted ? "Baygın" : `${hpState.hp}/${hpState.maxHp} HP`}</span>
        ${locked ? "<span>Locked</span>" : ""}
      </div>
      <h3>${escapeHtml(displayName)}</h3>
      <p>${escapeHtml(monster.name)}</p>
    </div>
    <div class="project-hp-meter" aria-label="HP ${hpState.hp} / ${hpState.maxHp}">
      <i></i>
    </div>
    <div class="threat" aria-label="Power ${monster.power}">
      ${Array.from({ length: 5 }, (_, index) => `<i class="${index < monster.power ? "active" : ""}"></i>`).join("")}
    </div>
  `;
  if (!disabled) button.addEventListener("click", () => startBattle(monster));
  return button;
}

function getMonsterPools() {
  const track = getProfileTrack();
  const milestone = getProfileMilestone();
  const sameTrack = MONSTERS.filter((monster) => monster.track === track);
  let player = sameTrack.filter((monster) => isMonsterOwned(monster, milestone));
  if (!player.length) player = sameTrack.filter((monster) => monster.id === "libcub").slice(0, 1);
  if (!player.length && sameTrack.length) player = [sameTrack[0]];
  let enemy = sameTrack.filter((monster) => monster.milestone === milestone);
  if (!enemy.length) {
    for (let prev = milestone - 1; prev >= 0 && !enemy.length; prev -= 1) {
      enemy = sameTrack.filter((monster) => monster.milestone === prev);
    }
  }
  if (!enemy.length) enemy = sameTrack.filter((monster) => !player.some((owned) => owned.id === monster.id)).slice(0, 3);
  const locked = sameTrack.filter((monster) => monster.milestone > milestone);
  const villageName =
    window.FRONT_MAPS && typeof window.FRONT_MAPS.getVillageName === "function"
      ? window.FRONT_MAPS.getVillageName(milestone)
      : `Milestone ${milestone} Village`;
  return { player, enemy, locked, milestone, track, villageName };
}

function isMonsterOwned(monster, milestone) {
  const passedSlugs = getPassedProjectSlugs();
  if (passedSlugs.length) return isMonsterProjectValidated(monster, passedSlugs);
  const passedCount = Number(app.profile?.passedProjects);
  if (Number.isFinite(passedCount) && passedCount > 0) return monster.milestone <= milestone;
  return monster.milestone === 0;
}

function getPassedProjectSlugs() {
  const raw =
    app.profile?.passedProjectSlugs ||
    app.profile?.passedProjectsSlugs ||
    app.profile?.passedProjectsList ||
    [];
  if (!Array.isArray(raw)) return [];
  return raw.map((slug) => normalizeId(slug)).filter(Boolean);
}

function extractValidatedProjectSlugs(profile) {
  return normalizeSlugList(
    profile?.passedProjectSlugs ||
      profile?.passedProjectsSlugs ||
      profile?.passedProjectsList ||
      []
  );
}

function monsterProjectKeys(monster) {
  const project = normalizeId(monster?.project || "");
  const id = normalizeId(monster?.id || "");
  return [project, project.replace(/-/g, "_"), id].filter(Boolean);
}

function isMonsterProjectValidated(monster, validatedSlugs) {
  if (!monster || !validatedSlugs.length) return false;
  const keys = monsterProjectKeys(monster);
  return validatedSlugs.some((slug) =>
    keys.some((key) => slug === key || slug.includes(key) || key.includes(slug))
  );
}

/**
 * Oyun milestone'ı: geçilen projelerden türetilir.
 * 42 cursus level (currentMilestone ham) genelde daha yüksek çıkar — köy/rakip için kullanılmaz.
 */
function deriveMilestoneFromProfile(profile) {
  if (!profile) return 0;

  const validatedSlugs = extractValidatedProjectSlugs(profile);
  let highestPassed = -1;

  if (validatedSlugs.length) {
    for (const monster of MONSTERS) {
      if (isMonsterProjectValidated(monster, validatedSlugs)) {
        highestPassed = Math.max(highestPassed, Number(monster.milestone) || 0);
      }
    }
  }

  if (highestPassed < 0) {
    const passedCount = Number(profile.passedProjects);
    if (Number.isFinite(passedCount) && passedCount > 0) {
      highestPassed = Math.max(0, Math.min(5, Math.floor(passedCount / 2) - 1));
    }
  }

  // En yüksek geçilen proje bandından sonraki tier (libft only → M1 köyü)
  if (highestPassed < 0) return 0;
  return Math.min(6, Math.max(0, highestPassed + 1));
}

function getDerivedMilestoneForProfile(profile) {
  return deriveMilestoneFromProfile(profile);
}

function getProfileMilestone() {
  return getDerivedMilestoneForProfile(app.profile);
}

function getProfileTrack() {
  const value = String(app.profile?.curriculumTrack || app.profile?.track || "current").trim();
  return value === "legacy" ? "legacy" : "current";
}

function getMonsterDisplayName(monster) {
  return String(monster?.project || monster?.name || "Proje").trim();
}

function getFighterSubtitle(fighter) {
  const codename = String(fighter?.codename || "").trim();
  if (codename && codename !== stripLevelSuffix(fighter?.name)) return codename;
  const role = String(fighter?.role || "").trim();
  if (role) return role;
  return String(fighter?.project || "").trim();
}

function stripLevelSuffix(value) {
  return String(value || "").replace(/\s+\(Lv\d+\)$/i, "");
}

function getOutcomeLabel(outcome) {
  if (outcome === "win") return "KAZANDI";
  if (outcome === "loss") return "YENİLDİ";
  if (outcome === "aborted") return "ÇIKILDI";
  return String(outcome || "-").toUpperCase();
}

function startBattle(monster) {
  if (!app.profile || !MONSTERS.length) return;
  normalizeProfileEconomy();
  const team = getOwnedMonstersForProfile(app.profile);
  const usableTeam = team.filter((item) => !getProjectHpState(item).fainted);
  if (!usableTeam.length) {
    handlePartyWipe("Tüm proje canavarların bayıldı. Hiçbir ödül almadan main menüye döndün.");
    return;
  }
  const chosen = team.find((item) => item.id === monster.id) || monster;
  if (getProjectHpState(chosen).fainted) {
    els.statusLine.textContent = `${getMonsterDisplayName(chosen)} baygın. Canı olan başka bir proje seç.`;
    renderMonsterCards();
    return;
  }
  const active = usableTeam.find((item) => item.id === chosen.id) || usableTeam[0];
  app.activeMonster = active;
  const enemy = app.pendingEnemy || pickEnemyMonster(active);
  app.pendingEnemy = null;
  const arena = createBattleArena(active, enemy);
  app.battle = { player: cloneFighter(active, true), enemy: cloneFighter(enemy, false), playerTeam: team.map((item) => item.id), activePlayerId: active.id, playerCoalition: app.profile.coalition, enemyCoalition: pickEnemyCoalition(app.profile.coalition), arena, menuMode: "actions", score: 0, hits: 0, log: "Karşılaşma başladı", outcome: "active", playerFlashUntil: 0, enemyFlashUntil: 0, turnTimerId: null };
  markProjectUsed(active.id);
  requestMonsterSprite(active.id);
  requestMonsterSprite(enemy.id);
  showScreen("game");
  resizeCanvas();
  setMusicMode("battle");
  playSound("battleStart");
  renderBattleControls("actions");
  updateBattleHud();
  drawBattle();
  els.statusLine.textContent = "Savaş: " + getMonsterDisplayName(active) + " vs " + getMonsterDisplayName(enemy);
}

function cloneFighter(monster, isPlayer) {
  let level = 0;
  if (isPlayer && app.profile && app.profile.monsterLevels) {
    const statXp = app.profile.projectStats?.[monster.id]?.xp;
    const xp = Number.isFinite(Number(statXp)) ? Number(statXp) : app.profile.monsterLevels[monster.id] || 0;
    level = Math.floor(xp / 100);
  }
  const displayName = getMonsterDisplayName(monster);
  const achievementTotals = isPlayer ? getAchievementBuffSummary().totals : { hp: 0, power: 0, damage: 0 };
  const powerBonus = Number(achievementTotals.power) || 0;
  const damageBonus = Number(achievementTotals.damage) || 0;
  const maxHp = isPlayer ? computeMonsterMaxHp(monster, app.profile) : monster.hp;
  let hp = maxHp;
  if (isPlayer) {
    const stat = ensureProjectStat(monster, maxHp);
    hp = Number.isFinite(Number(stat.hp)) ? Math.max(0, Math.min(Number(stat.hp), maxHp)) : maxHp;
  }
  const fighter = {
    id: monster.id,
    name: level > 0 ? displayName + " (Lv" + (level + 1) + ")" : displayName,
    codename: monster.name,
    project: monster.project,
    role: monster.role,
    color: monster.color,
    hp,
    maxHp,
    power: monster.power + level * 2 + powerBonus,
    defense: monster.defense ?? 10,
    speed: monster.speed ?? 4,
    accuracy: BattleEngine.DEFAULT_ACCURACY,
    damageBonus,
    milestone: monster.milestone,
    track: monster.track,
    moves: shuffle(BattleEngine.cloneMoves(monster.moves)),
    statusEffects: [],
    dots: [],
    stunned: 0
  };
  return BattleEngine.initFighterCombatState(fighter);
}

function ensureProjectStat(monster, maxHp = computeMonsterMaxHp(monster, app.profile)) {
  if (!app.profile) return { hp: maxHp, maxHp, xp: 0, wins: 0, losses: 0, uses: 0 };
  if (!app.profile.projectStats || typeof app.profile.projectStats !== "object") app.profile.projectStats = {};
  const current = app.profile.projectStats[monster.id] || {};
  const hp = Number(current.hp);
  app.profile.projectStats[monster.id] = { hp: Number.isFinite(hp) ? Math.max(0, Math.min(Math.round(hp), maxHp)) : maxHp, maxHp, xp: Math.max(0, Math.round(Number(current.xp ?? app.profile.monsterLevels?.[monster.id]) || 0)), wins: Math.max(0, Math.round(Number(current.wins) || 0)), losses: Math.max(0, Math.round(Number(current.losses) || 0)), uses: Math.max(0, Math.round(Number(current.uses) || 0)), unlockedAt: Number(current.unlockedAt) || Date.now(), lastUsedAt: Number(current.lastUsedAt) || 0 };
  return app.profile.projectStats[monster.id];
}

function markProjectUsed(monsterId) {
  if (!app.profile?.projectStats?.[monsterId]) return;
  app.profile.projectStats[monsterId].uses += 1;
  app.profile.projectStats[monsterId].lastUsedAt = Date.now();
  persistProfileEconomy();
}

function saveFighterProjectHp(fighter) {
  if (!app.profile || !fighter?.id) return;
  const monster = MONSTERS.find((item) => item.id === fighter.id);
  if (!monster) return;
  const stat = ensureProjectStat(monster, fighter.maxHp);
  stat.hp = Math.max(0, Math.min(Math.round(Number(fighter.hp) || 0), fighter.maxHp));
  stat.maxHp = fighter.maxHp;
  persistProfileEconomy();
}

function pickEnemyMonster(monster) {
  const pool = getMonsterPools();
  const candidates = pool.enemy.filter((item) => item.id !== monster.id);
  if (candidates.length) {
    return candidates[Math.floor(Math.random() * candidates.length)];
  }
  return monster;
}

function pickEnemyCoalition(playerCoalition) {
  const candidates = COALITIONS.filter((coalition) => coalition.name !== playerCoalition);
  if (!candidates.length) return COALITIONS[0].name;
  return candidates[Math.floor(Math.random() * candidates.length)].name;
}

function createBattleArena(monster, enemy) {
  const maps = window.FRONT_MAPS;
  if (!maps || typeof maps.createMilestoneArena !== "function") return null;
  const milestone = getBattleMilestone(monster, enemy);
  const track = app.profile?.curriculumTrack || monster.track || enemy.track || "current";
  const phase = app.profile?.rank || app.profile?.phase || "";
  const seed = `${app.profile?.id || "local"}:${monster.id}:${enemy.id}:${app.runs.length}`;
  return maps.createMilestoneArena({ milestone, track, phase, seed });
}

function getBattleMilestone(monster, enemy) {
  const profileMilestone = getProfileMilestone();
  if (Number.isFinite(profileMilestone)) return profileMilestone;
  const monsterMilestone = Number(monster?.milestone);
  if (Number.isFinite(monsterMilestone)) return monsterMilestone;
  const enemyMilestone = Number(enemy?.milestone);
  if (Number.isFinite(enemyMilestone)) return enemyMilestone;
  return 0;
}

function renderMoves() {
  renderBattleControls(app.battle?.menuMode || "actions");
}

function renderBattleControls(mode = "actions") {
  const battle = app.battle;
  if (!battle || !els.moveButtons) return;
  battle.menuMode = mode;
  const disabled = battle.processingTurn ? "disabled" : "";
  if (mode === "actions") {
    els.attackName.textContent = "Action";
    els.movePrompt.textContent = battle.player.name + " ne yapacak?";
    els.moveButtons.className = "move-buttons battle-command-grid";
    els.moveButtons.innerHTML = [
      '<button class="battle-command battle-fight" type="button" data-battle-command="fight" ' + disabled + '>Fight</button>',
      '<button class="battle-command battle-bag" type="button" data-battle-command="bag" ' + disabled + '>Bag</button>',
      '<button class="battle-command battle-project" type="button" data-battle-command="project" ' + disabled + '>Project</button>',
      '<button class="battle-command battle-run" type="button" data-battle-command="run" ' + disabled + '>Run</button>'
    ].join("");
    return;
  }
  if (mode === "fight") {
    els.attackName.textContent = "Fight";
    els.movePrompt.textContent = "Yetenek seç";
    els.moveButtons.className = "move-buttons battle-submenu-grid";
    els.moveButtons.innerHTML = battle.player.moves.map((move, index) => {
      const label = BattleEngine.formatMoveLabel(move);
      const hint = move.type && move.type !== "damage" ? move.type : "";
      return '<button class="battle-sub-button" type="button" data-move-index="' + index + '" ' + disabled + ' title="' + escapeHtml(move.description || "") + '">' + escapeHtml(label) + (hint ? '<span class="move-damage">' + escapeHtml(hint) + '</span>' : "") + "</button>";
    }).join("") + '<button class="battle-sub-button battle-back" type="button" data-battle-back>Geri</button>';
    return;
  }
  if (mode === "bag") {
    const counts = getInventoryCounts();
    const usable = Object.entries(counts).filter(([id]) => getBattleItemEffect(id));
    els.attackName.textContent = "Bag";
    els.movePrompt.textContent = usable.length ? "Item seç" : "Kullanılabilir item yok";
    els.moveButtons.className = "move-buttons battle-submenu-grid";
    els.moveButtons.innerHTML = usable.map(([id, count]) => {
      const item = getShopItem(id) || { name: id };
      const effect = getBattleItemEffect(id);
      return '<button class="battle-sub-button" type="button" data-bag-item="' + escapeHtml(id) + '" ' + disabled + '>' + escapeHtml(item.name) + '<span class="move-damage">x' + count + ' · ' + escapeHtml(effect.label) + '</span></button>';
    }).join("") + '<button class="battle-sub-button battle-back" type="button" data-battle-back>Geri</button>';
    return;
  }
  if (mode === "project") {
    const monsters = battle.playerTeam.map((id) => MONSTERS.find((item) => item.id === id)).filter(Boolean);
    els.attackName.textContent = "Project";
    els.movePrompt.textContent = "Projeni değiştir";
    els.moveButtons.className = "move-buttons battle-submenu-grid";
    els.moveButtons.innerHTML = monsters.map((monster) => {
      const maxHp = computeMonsterMaxHp(monster, app.profile);
      const stat = ensureProjectStat(monster, maxHp);
      const active = monster.id === battle.player.id;
      const dead = Number(stat.hp) <= 0;
      const disabledAttr = (active || dead || battle.processingTurn) ? "disabled" : "";
      return '<button class="battle-sub-button" type="button" data-project-id="' + escapeHtml(monster.id) + '" ' + disabledAttr + '>' + escapeHtml(getMonsterDisplayName(monster)) + '<span class="move-damage">' + Math.max(0, Math.round(Number(stat.hp) || 0)) + '/' + maxHp + ' HP' + (active ? ' · aktif' : '') + '</span></button>';
    }).join("") + '<button class="battle-sub-button battle-back" type="button" data-battle-back>Geri</button>';
  }
}

function handleBattleCommand(command) {
  const battle = app.battle;
  if (!battle || battle.outcome !== "active" || battle.processingTurn) return;
  playSound("ui");
  if (command === "fight") renderBattleControls("fight");
  else if (command === "bag") renderBattleControls("bag");
  else if (command === "project") renderBattleControls("project");
  else if (command === "run") void finishBattle("aborted");
}

function useMove(index) {
  const battle = app.battle;
  if (!battle || battle.outcome !== "active" || battle.processingTurn) return;
  const move = battle.player.moves[index];
  if (!move) return;
  battle.processingTurn = true;
  renderBattleControls(battle.menuMode || "fight");
  BattleEngine.initFighterCombatState(battle.player);
  BattleEngine.initFighterCombatState(battle.enemy);

  const playerName = stripLevelSuffix(battle.player.name);
  const logLines = BattleEngine.processDotPhase(battle.player, playerName);
  const stunMsg = BattleEngine.tryConsumeStun(battle.player, playerName);
  if (stunMsg) {
    logLines.push(stunMsg);
    BattleEngine.appendBattleLog(battle, logLines);
    BattleEngine.tickFighterEndTurn(battle.player);
    updateBattleHud();
    drawBattle();
    if (battle.player.hp <= 0) {
      battle.processingTurn = false;
      saveFighterProjectHp(battle.player);
      void finishBattle("loss");
      return;
    }
    queueEnemyTurn(battle);
    return;
  }

  const result = BattleEngine.executeMove(battle.player, battle.enemy, move);
  logLines.push(...result.logs);
  BattleEngine.appendBattleLog(battle, logLines);
  BattleEngine.tickFighterEndTurn(battle.player);

  if (result.damage > 0) {
    playSound("attack");
    battle.score += result.damage * 10;
    battle.hits += 1;
    battle.enemyFlashUntil = performance.now() + 280;
    pulseHudHp("enemy");
    triggerScreenShake("light");
  } else if (result.healed > 0) {
    playSound("win");
    pulseHudHp("player");
  } else {
    playSound(result.hit ? "ui" : "hit");
  }

  updateBattleHud();
  drawBattle();
  if (battle.enemyFlashUntil) runBattleFxLoop(battle, battle.enemyFlashUntil);

  if (battle.enemy.hp <= 0) {
    battle.processingTurn = false;
    saveFighterProjectHp(battle.player);
    void finishBattle("win");
    return;
  }
  if (battle.player.hp <= 0) {
    battle.processingTurn = false;
    saveFighterProjectHp(battle.player);
    void finishBattle("loss");
    return;
  }
  queueEnemyTurn(battle);
}

function queueEnemyTurn(battle) {
  if (!battle || battle.outcome !== "active") return;
  const turnTimer = window.setTimeout(() => {
    if (app.battle !== battle || battle.outcome !== "active") return;
    BattleEngine.initFighterCombatState(battle.player);
    BattleEngine.initFighterCombatState(battle.enemy);

    const enemyName = stripLevelSuffix(battle.enemy.name);
    const logLines = BattleEngine.processDotPhase(battle.enemy, enemyName);
    const stunMsg = BattleEngine.tryConsumeStun(battle.enemy, enemyName);
    if (stunMsg) {
      logLines.push(stunMsg);
      BattleEngine.appendBattleLog(battle, logLines);
      BattleEngine.tickFighterEndTurn(battle.enemy);
      updateBattleHud();
      drawBattle();
      battle.processingTurn = false;
      renderBattleControls("actions");
      return;
    }

    const enemyMoves = battle.enemy.moves;
    const enemyMove = enemyMoves.length > 0
      ? enemyMoves[Math.floor(Math.random() * enemyMoves.length)]
      : { name: "Counter", type: "damage", basePower: 18, accuracy: 100, target: "enemy" };
    const result = BattleEngine.executeMove(battle.enemy, battle.player, enemyMove);
    logLines.push(...result.logs);
    BattleEngine.appendBattleLog(battle, logLines);
    BattleEngine.tickFighterEndTurn(battle.enemy);
    saveFighterProjectHp(battle.player);

    if (result.damage > 0) {
      playSound("hit");
      battle.playerFlashUntil = performance.now() + 320;
      pulseHudHp("player");
      triggerScreenShake("heavy");
    } else if (result.healed > 0) {
      playSound("ui");
    } else {
      playSound(result.hit ? "ui" : "hit");
    }

    if (battle.player.hp <= 0) {
      updateBattleHud();
      drawBattle();
      runBattleFxLoop(battle, battle.playerFlashUntil);
      battle.processingTurn = false;
      void finishBattle("loss");
      return;
    }
    updateBattleHud();
    drawBattle();
    if (battle.playerFlashUntil) runBattleFxLoop(battle, battle.playerFlashUntil);
    battle.processingTurn = false;
    renderBattleControls("actions");
  }, 620);
  battle.turnTimerId = turnTimer;
}

function getBattleItemEffect(itemId) {
  const effects = { "valgrind-potion": { heal: 28, label: "+28 HP" }, "malloc-elixir": { heal: 42, label: "+42 HP" }, "pointer-shield": { heal: 18, label: "+18 HP" }, "norminette-bypass": { damage: 24, label: "24 hasar" } };
  return effects[itemId] || null;
}

function useBattleItem(itemId) {
  const battle = app.battle;
  if (!battle || battle.outcome !== "active" || battle.processingTurn || !app.profile) return;
  const effect = getBattleItemEffect(itemId);
  const index = app.profile.inventory.indexOf(itemId);
  if (!effect || index < 0) return;
  battle.processingTurn = true;
  app.profile.inventory.splice(index, 1);
  const item = getShopItem(itemId) || { name: itemId };
  if (effect.heal) { battle.player.hp = Math.min(battle.player.maxHp, battle.player.hp + effect.heal); battle.log = item.name + " kullanıldı: +" + effect.heal + " HP"; playSound("win"); }
  if (effect.damage) { battle.enemy.hp = Math.max(0, battle.enemy.hp - effect.damage); battle.score += effect.damage * 10; battle.log = item.name + " kullanıldı: " + effect.damage + " hasar"; battle.enemyFlashUntil = performance.now() + 260; playSound("attack"); }
  saveFighterProjectHp(battle.player);
  persistProfileEconomy();
  updateBattleHud(); drawBattle();
  if (battle.enemy.hp <= 0) { battle.processingTurn = false; void finishBattle("win"); return; }
  queueEnemyTurn(battle);
}

function switchBattleProject(monsterId) {
  const battle = app.battle;
  if (!battle || battle.outcome !== "active" || battle.processingTurn || monsterId === battle.player.id) return;
  const monster = MONSTERS.find((item) => item.id === monsterId);
  if (!monster || !battle.playerTeam.includes(monster.id)) return;
  const maxHp = computeMonsterMaxHp(monster, app.profile);
  const stat = ensureProjectStat(monster, maxHp);
  if (Number(stat.hp) <= 0) return;
  battle.processingTurn = true;
  saveFighterProjectHp(battle.player);
  battle.player = cloneFighter(monster, true);
  battle.activePlayerId = monster.id;
  markProjectUsed(monster.id);
  battle.log = getMonsterDisplayName(monster) + " projene geçtin";
  playSound("ui");
  updateBattleHud(); drawBattle();
  queueEnemyTurn(battle);
}

async function finishBattle(outcome) {
  const battle = app.battle;
  if (!battle || battle.outcome !== "active") return;

  if (battle.turnTimerId) {
    window.clearTimeout(battle.turnTimerId);
    battle.turnTimerId = null;
  }

  if (!app.profile) {
    app.battle = null;
    showLogin();
    return;
  }

  battle.outcome = outcome;
  saveFighterProjectHp(battle.player);
  const finalScore = calculateBattleScore(battle, outcome);
  const result = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    userId: app.profile.id,
    intra: app.profile.intra,
    coalition: app.profile.coalition,
    enemyCoalition: battle.enemyCoalition,
    monsterId: battle.player.id,
    monsterName: battle.player.name,
    enemyId: battle.enemy.id,
    enemyName: battle.enemy.name,
    village: battle.arena?.name || "",
    milestone: battle.arena?.milestone ?? null,
    outcome,
    score: finalScore,
    hits: battle.hits,
    createdAt: Date.now()
  };

  if (outcome === "win") {
    normalizeProfileEconomy();

    const stat = ensureProjectStat(MONSTERS.find((item) => item.id === battle.player.id) || battle.player, battle.player.maxHp);
    stat.wins += 1;
    stat.xp += 25;
    stat.hp = battle.player.hp;
    app.profile.monsterLevels[battle.player.id] = (app.profile.monsterLevels[battle.player.id] || 0) + 25;
    const achievementTotals = getAchievementBuffSummary().totals;
    const baseWallet = 18 + Math.min(30, battle.hits * 4) + Math.max(0, Number(battle.arena?.milestone) || 0) * 2;
    const walletEarned = Math.max(
      0,
      Math.round((baseWallet + achievementTotals.walletFlat) * (1 + achievementTotals.walletMultiplier))
    );
    app.profile.wallet += walletEarned;

    const lootItems = BATTLE_LOOT_ITEMS.map((item) => item.id);
    const dropped = lootItems[Math.floor(Math.random() * lootItems.length)];
    app.profile.inventory.push(dropped);
    const lootItem = getShopItem(dropped);

    result.loot = lootItem?.name || dropped;
    result.xpGained = 25;
    result.walletEarned = walletEarned;
    result.walletBase = baseWallet;
    result.activeBuffs = formatAchievementBuffTotals(achievementTotals);
    setProfile(app.profile); // Save changes!
  } else if (outcome === "loss") {
    const stat = app.profile.projectStats?.[battle.player.id];
    if (stat) { stat.losses += 1; stat.hp = 0; persistProfileEconomy(); }
    if (!hasAnyUsableProjectMonster()) {
      handlePartyWipe("Tüm proje canavarların bayıldı. Hiçbir ödül almadan main menüye döndün.");
      return;
    }
  } else {
    persistProfileEconomy();
  }

  app.lastResult = result;
  app.battle = null;
  try {
    await backend.saveRun(result);
  } catch (err) {
    console.error(err);
    els.statusLine.textContent = "Skor kaydedilemedi; sonuç yerelde gösteriliyor";
  }
  try {
    await refreshData();
  } catch (err) {
    console.error(err);
  }
  app.overworld.encounterCooldown = 4;
  setMusicMode("idle");
  playSound(outcome === "win" ? "win" : outcome === "loss" ? "loss" : "ui");
  showResult(result);
}

function calculateBattleScore(battle, outcome) {
  if (outcome === "aborted") return 0;
  const hpBonus = battle.player.hp > 0 ? Math.floor(battle.player.hp * 2) : 0;
  const winBonus = outcome === "win" ? 420 : 0;
  return Math.max(25, battle.score + hpBonus + winBonus);
}

function updateBattleHud() {
  const battle = app.battle;
  if (!battle) return;
  els.hudFront.textContent = battle.player.name;
  els.hudHp.textContent = battle.player.hp + "/" + battle.player.maxHp;
  els.hudEnemyName.textContent = battle.enemy.name;
  els.hudEnemyHp.textContent = battle.enemy.hp + "/" + battle.enemy.maxHp;
  els.hudScore.textContent = battle.score.toString();
  if (els.battleSettingsButton) els.battleSettingsButton.textContent = app.audio.enabled ? "Settings" : "Muted";
}

function drawPixelText(text, x, y, size = 22, align = "left") {
  ctx.font = size + "px \"Press Start 2P\", monospace";
  ctx.textAlign = align;
  ctx.textBaseline = "alphabetic";
  ctx.lineWidth = Math.max(3, Math.round(size * 0.16));
  ctx.strokeStyle = "rgba(0,0,0,0.82)";
  ctx.strokeText(text, x, y);
  ctx.fillStyle = "#f6fbff";
  ctx.fillText(text, x, y);
}

function drawBattleStatus(fighter, x, y, w, align = "left", hurtPulse = false) {
  drawPixelText(stripLevelSuffix(fighter.name) + " HP", x, y, 24, align);
  const barX = align === "right" ? x - w : x;
  const barY = y + 20;
  const ratio = Math.max(0, Math.min(1, fighter.hp / fighter.maxHp));
  ctx.fillStyle = "rgba(9,14,18,0.86)";
  ctx.fillRect(barX - 5, barY - 5, w + 10, 24);
  ctx.fillStyle = "#17242b";
  ctx.fillRect(barX, barY, w, 14);
  const hpGradient = ctx.createLinearGradient(barX, barY, barX + w, barY);
  hpGradient.addColorStop(0, "#51d9ff");
  hpGradient.addColorStop(1, "#38bdf8");
  ctx.fillStyle = hpGradient;
  ctx.fillRect(barX, barY, w * ratio, 14);
  if (hurtPulse) { ctx.fillStyle = "rgba(255,255,255,0.45)"; ctx.fillRect(barX, barY, w * ratio, 14); }
  ctx.strokeStyle = "rgba(255,255,255,0.42)";
  ctx.lineWidth = 2;
  ctx.strokeRect(barX, barY, w, 14);
}

function drawBattle() {
  const battle = app.battle;
  if (!battle) return;
  const width = els.canvas.width;
  const height = els.canvas.height;
  const now = performance.now();
  ctx.clearRect(0, 0, width, height);
  drawBattleBackground(width, height, battle.arena);
  drawTrainerSprite(battle.playerCoalition, width * 0.22, height * 0.60, height * 0.28, false);
  drawFighter(battle.player, width * 0.36, height * 0.64, false, false);
  drawFighter(battle.enemy, width * 0.75, height * 0.42, false, false);
  drawBattleStatus(battle.enemy, width * 0.66, height * 0.17, width * 0.30, "left", now < battle.enemyFlashUntil);
  drawBattleStatus(battle.player, width * 0.31, height * 0.43, width * 0.32, "left", now < battle.playerFlashUntil);
  drawBattleLog(battle.log, width, height);
  if (now < battle.playerFlashUntil) { ctx.fillStyle = "rgba(255, 94, 87, 0.18)"; ctx.fillRect(0, 0, width * 0.52, height); }
  if (now < battle.enemyFlashUntil) { ctx.fillStyle = "rgba(69, 199, 255, 0.16)"; ctx.fillRect(width * 0.48, 0, width * 0.52, height); }
}

function drawTrainerSprite(coalitionName, x, y, targetHeight, flipped) {
  const coalition = getCoalition(coalitionName);
  const img = TRAINER_IMAGES[coalition.name];
  ctx.save();
  ctx.fillStyle = hexToRgba(coalition.color, 0.2);
  ctx.beginPath();
  ctx.ellipse(x, y + targetHeight * 0.42, targetHeight * 0.34, targetHeight * 0.09, 0, 0, Math.PI * 2);
  ctx.fill();

  if (img && img.complete && img.naturalWidth > 0) {
    const ratio = img.naturalWidth / img.naturalHeight;
    const drawH = targetHeight;
    const drawW = drawH * ratio;
    ctx.globalAlpha = 0.92;
    ctx.imageSmoothingEnabled = false;
    if (flipped) {
      ctx.translate(x, y);
      ctx.scale(-1, 1);
      ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
    } else {
      ctx.drawImage(img, x - drawW / 2, y - drawH / 2, drawW, drawH);
    }
    ctx.restore();
    return;
  }

  drawTrainerFallback(coalition.color, x, y, targetHeight, flipped);
  ctx.restore();
}

function drawTrainerFallback(color, x, y, size, flipped) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(flipped ? -1 : 1, 1);
  ctx.fillStyle = color;
  ctx.fillRect(-size * 0.16, -size * 0.38, size * 0.32, size * 0.5);
  ctx.fillRect(-size * 0.09, -size * 0.56, size * 0.18, size * 0.18);
  ctx.fillStyle = "#f2f4f0";
  ctx.fillRect(size * 0.16, -size * 0.3, size * 0.08, size * 0.5);
  ctx.fillStyle = "#101112";
  ctx.fillRect(-size * 0.05, -size * 0.5, size * 0.1, size * 0.05);
  ctx.restore();
}

function drawBattleBackground(width, height, arena) {
  if (BATTLE_BACKGROUND_IMAGE && BATTLE_BACKGROUND_IMAGE.complete && BATTLE_BACKGROUND_IMAGE.naturalWidth > 0) {
    ctx.imageSmoothingEnabled = false;
    drawCoverImage(ctx, BATTLE_BACKGROUND_IMAGE, 0, 0, width, height);
    ctx.fillStyle = "rgba(0, 0, 0, 0.16)";
    ctx.fillRect(0, 0, width, height);
    return;
  }
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "#0a1b24"); gradient.addColorStop(0.48, "#1d3441"); gradient.addColorStop(1, "#172731");
  ctx.fillStyle = gradient; ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "rgba(0,0,0,0.32)"; ctx.fillRect(0, 0, width, height);
  const cx = width * 0.5; const horizon = height * 0.42;
  ctx.strokeStyle = "rgba(110,142,158,0.22)"; ctx.lineWidth = Math.max(2, width * 0.002);
  for (let i = 0; i < 8; i += 1) { const offset = (i - 3.5) * width * 0.09; ctx.beginPath(); ctx.moveTo(cx + offset * 0.18, horizon); ctx.lineTo(cx + offset, height * 0.78); ctx.stroke(); }
  ctx.fillStyle = "rgba(7,17,23,0.88)"; ctx.fillRect(0, 0, width, height * 0.16);
  ctx.fillStyle = "rgba(13,28,36,0.92)"; for (let i = 0; i < 5; i += 1) { const y = height * (0.06 + i * 0.07); ctx.fillRect(width * 0.18, y, width * 0.64, height * 0.018); }
  function light(x, y, w, h, alpha = 0.9) { ctx.fillStyle = "rgba(210,244,255,0.20)"; ctx.fillRect(x - w * 0.08, y - h * 0.4, w * 1.16, h * 1.8); ctx.fillStyle = "rgba(220,248,255," + alpha + ")"; ctx.fillRect(x, y, w, h); ctx.strokeStyle = "rgba(255,255,255,0.32)"; ctx.strokeRect(x, y, w, h); }
  light(width * 0.47, height * 0.08, width * 0.19, height * 0.035, 0.86); light(width * 0.36, height * 0.23, width * 0.18, height * 0.018, 0.52); light(width * 0.73, height * 0.29, width * 0.16, height * 0.016, 0.58);
  ctx.fillStyle = "rgba(35,54,63,0.9)"; for (const x of [width * 0.14, width * 0.36, width * 0.63, width * 0.86]) { ctx.fillRect(x, height * 0.20, width * 0.035, height * 0.54); ctx.fillStyle = "rgba(95,124,136,0.22)"; ctx.fillRect(x + width * 0.024, height * 0.22, width * 0.006, height * 0.48); ctx.fillStyle = "rgba(35,54,63,0.9)"; }
  function desk(x, y, scale = 1) { ctx.fillStyle = "rgba(180,195,195,0.55)"; ctx.fillRect(x, y, width * 0.13 * scale, height * 0.035 * scale); ctx.fillStyle = "rgba(9,15,18,0.7)"; ctx.fillRect(x + width * 0.012 * scale, y - height * 0.04 * scale, width * 0.05 * scale, height * 0.04 * scale); ctx.fillStyle = "rgba(68,218,230,0.52)"; ctx.fillRect(x + width * 0.018 * scale, y - height * 0.032 * scale, width * 0.038 * scale, height * 0.018 * scale); ctx.fillStyle = "rgba(14,20,24,0.78)"; ctx.fillRect(x + width * 0.02 * scale, y + height * 0.035 * scale, width * 0.008 * scale, height * 0.08 * scale); ctx.fillRect(x + width * 0.10 * scale, y + height * 0.035 * scale, width * 0.008 * scale, height * 0.08 * scale); }
  desk(width * 0.07, height * 0.58, 1.05); desk(width * 0.70, height * 0.55, 1.1); desk(width * 0.23, height * 0.47, 0.72); desk(width * 0.58, height * 0.44, 0.78);
  ctx.strokeStyle = "rgba(0,0,0,0.86)"; ctx.lineWidth = width * 0.012; ctx.beginPath(); ctx.moveTo(0, height * 0.74); ctx.bezierCurveTo(width * 0.18, height * 0.65, width * 0.36, height * 0.88, width * 0.5, height * 0.78); ctx.bezierCurveTo(width * 0.7, height * 0.62, width * 0.84, height * 0.76, width, height * 0.68); ctx.stroke();
  const vignette = ctx.createRadialGradient(width / 2, height * 0.5, height * 0.12, width / 2, height * 0.52, width * 0.72); vignette.addColorStop(0, "rgba(0,0,0,0)"); vignette.addColorStop(1, "rgba(0,0,0,0.62)"); ctx.fillStyle = vignette; ctx.fillRect(0, 0, width, height);
}

function drawArenaTiles(width, height, arena) {
  const palette = arena.palette || {};
  const cols = arena.cols || 28;
  const rows = arena.rows || 16;
  const tileW = width / cols;
  const tileH = height / rows;
  for (const tile of arena.tiles) {
    const x = Math.floor(tile.x * tileW);
    const y = Math.floor(tile.y * tileH);
    const w = Math.ceil(tileW) + 1;
    const h = Math.ceil(tileH) + 1;
    if (tile.variant === "wall") ctx.fillStyle = "#07090a";
    else if (tile.variant === "backwall") ctx.fillStyle = palette.wall || "#2b3338";
    else if (tile.variant === "baseboard") ctx.fillStyle = "#0d1114";
    else if (tile.variant === "crack") ctx.fillStyle = "#111316";
    else if (tile.variant === "dust") ctx.fillStyle = palette.decay || "#5f6a70";
    else if (tile.variant === "stripe") ctx.fillStyle = "#101820";
    else ctx.fillStyle = tile.variant === "a" ? palette.floorA || "#10171b" : palette.floorB || "#151f24";
    ctx.fillRect(x, y, w, h);

    if (tile.variant === "backwall") {
      ctx.fillStyle = "rgba(120, 84, 52, 0.38)";
      ctx.fillRect(x + w * 0.08, y, Math.max(2, w * 0.18), h);
      ctx.fillRect(x + w * 0.46, y, Math.max(2, w * 0.14), h);
      ctx.fillStyle = "rgba(255,255,255,0.08)";
      ctx.fillRect(x, y + h * 0.82, w, Math.max(2, h * 0.08));
    }

    if (tile.variant === "baseboard") {
      ctx.fillStyle = "rgba(255,255,255,0.12)";
      ctx.fillRect(x, y + h * 0.08, w, Math.max(2, h * 0.08));
      ctx.fillStyle = "rgba(0,0,0,0.45)";
      ctx.fillRect(x, y + h * 0.55, w, Math.max(3, h * 0.16));
    }

    if (tile.variant === "stripe") {
      ctx.fillStyle = "rgba(69,199,255,0.08)";
      ctx.fillRect(x + w * 0.42, y, Math.max(2, w * 0.08), h);
      ctx.fillRect(x + w * 0.72, y, Math.max(2, w * 0.06), h);
    }

    if (tile.variant === "crack") {
      ctx.strokeStyle = "rgba(242,244,240,0.18)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x + w * 0.18, y + h * 0.2);
      ctx.lineTo(x + w * 0.56, y + h * 0.52);
      ctx.lineTo(x + w * 0.42, y + h * 0.86);
      ctx.stroke();
    }

    if (tile.variant === "dust") {
      ctx.fillStyle = "rgba(242,244,240,0.1)";
      ctx.fillRect(x + w * 0.22, y + h * 0.28, Math.max(2, w * 0.12), Math.max(2, h * 0.1));
      ctx.fillRect(x + w * 0.62, y + h * 0.66, Math.max(2, w * 0.1), Math.max(2, h * 0.08));
    }
  }
}

function drawGrid(width, height, leftColor, rightColor) {
  ctx.lineWidth = 1;
  const step = 56;
  for (let x = 0; x <= width; x += step) {
    ctx.strokeStyle = x < width / 2 ? hexToRgba(leftColor, 0.05) : hexToRgba(rightColor, 0.05);
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y <= height; y += step) {
    ctx.strokeStyle = "rgba(255,255,255,0.035)";
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

function drawArenaDecor(width, height, arena) {
  if (!arena || !Array.isArray(arena.decor)) return;
  const palette = arena.palette || {};
  const tileW = width / (arena.cols || 28);
  const tileH = height / (arena.rows || 16);
  for (const item of arena.decor) {
    drawArenaProp(item, tileW, tileH, palette);
  }
}

function drawCampusDepth(width, height, arena) {
  const accent = arena?.palette?.accent || "#45c7ff";
  const top = ctx.createLinearGradient(0, 0, 0, height * 0.46);
  top.addColorStop(0, "rgba(0,0,0,0.55)");
  top.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = top;
  ctx.fillRect(0, 0, width, height * 0.46);

  ctx.fillStyle = hexToRgba(accent, 0.1);
  ctx.fillRect(width * 0.18, height * 0.48, width * 0.22, 8);
  ctx.fillRect(width * 0.6, height * 0.38, width * 0.22, 8);

  const vignette = ctx.createRadialGradient(width / 2, height * 0.58, height * 0.12, width / 2, height * 0.58, width * 0.72);
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(1, "rgba(0,0,0,0.5)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, width, height);
}

function drawArenaProp(item, tileW, tileH, palette) {
  const x = item.x * tileW;
  const y = item.y * tileH;
  const w = (item.w || 1) * tileW;
  const h = (item.h || 1) * tileH;

  if (item.type === "woodwall") {
    ctx.fillStyle = "#17110d";
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = "#7a4a2d";
    const slatW = Math.max(4, w / 12);
    for (let sx = x + slatW; sx < x + w - slatW; sx += slatW * 1.8) {
      ctx.fillRect(sx, y + h * 0.08, slatW, h * 0.78);
    }
    ctx.fillStyle = "#d8dbd5";
    ctx.fillRect(x - tileW * 0.08, y, Math.max(4, tileW * 0.14), h);
    ctx.fillRect(x + w - tileW * 0.06, y, Math.max(4, tileW * 0.14), h);
    if (item.broken) {
      ctx.strokeStyle = "rgba(16,17,18,0.85)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x + w * 0.62, y + h * 0.14);
      ctx.lineTo(x + w * 0.5, y + h * 0.52);
      ctx.lineTo(x + w * 0.74, y + h * 0.86);
      ctx.stroke();
      ctx.fillStyle = palette.decay || "#5f6a70";
      ctx.fillRect(x + w * 0.76, y + h * 0.78, w * 0.12, h * 0.1);
    }
    return;
  }

  if (item.type === "door") {
    ctx.fillStyle = "#1f2528";
    ctx.fillRect(x + w * 0.12, y + h * 0.08, w * 0.76, h * 0.86);
    ctx.strokeStyle = "#7d8b91";
    ctx.lineWidth = 3;
    ctx.strokeRect(x + w * 0.12, y + h * 0.08, w * 0.76, h * 0.86);
    ctx.fillStyle = hexToRgba(palette.accent || "#45c7ff", 0.65);
    ctx.fillRect(x + w * 0.6, y + h * 0.34, w * 0.08, h * 0.2);
    return;
  }

  if (item.type === "led") {
    ctx.fillStyle = "#101112";
    ctx.fillRect(x, y + h * 0.28, w, h * 0.24);
    ctx.fillStyle = item.broken ? "rgba(242,244,240,0.22)" : "rgba(242,244,240,0.72)";
    ctx.fillRect(x + w * 0.04, y + h * 0.36, w * 0.86, h * 0.08);
    ctx.strokeStyle = hexToRgba(palette.accent || "#45c7ff", item.broken ? 0.18 : 0.28);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + w * 0.18, y + h * 0.55);
    ctx.quadraticCurveTo(x + w * 0.42, y + h * 0.78, x + w * 0.7, y + h * 0.56);
    ctx.stroke();
    return;
  }

  if (item.type === "desk") {
    ctx.fillStyle = item.broken ? "#d5d8d3" : "#f2f4f0";
    ctx.fillRect(x + w * 0.08, y + h * 0.12, w * 0.84, h * 0.58);
    ctx.fillStyle = "rgba(16,17,18,0.12)";
    ctx.fillRect(x + w * 0.12, y + h * 0.18, w * 0.76, h * 0.08);
    ctx.fillStyle = "#6d7478";
    ctx.fillRect(x + w * 0.16, y + h * 0.68, w * 0.08, h * 0.24);
    ctx.fillRect(x + w * 0.76, y + h * 0.68, w * 0.08, h * 0.24);
    if (item.broken) {
      ctx.strokeStyle = "#101112";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x + w * 0.22, y + h * 0.2);
      ctx.lineTo(x + w * 0.68, y + h * 0.7);
      ctx.stroke();
    }
    return;
  }

  if (item.type === "terminal") {
    ctx.fillStyle = "#eef0ea";
    ctx.fillRect(x + w * 0.08, y + h * 0.18, w * 0.84, h * 0.54);
    ctx.fillStyle = "#dfe3e1";
    ctx.fillRect(x + w * 0.12, y + h * 0.56, w * 0.76, h * 0.16);
    ctx.fillStyle = "#9aa5aa";
    ctx.fillRect(x + w * 0.34, y - h * 0.08, w * 0.32, h * 0.38);
    ctx.fillStyle = "#080909";
    ctx.fillRect(x + w * 0.38, y - h * 0.02, w * 0.24, h * 0.24);
    if (item.broken) {
      ctx.strokeStyle = hexToRgba(palette.accent || "#45c7ff", 0.75);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x + w * 0.4, y + h * 0.18);
      ctx.lineTo(x + w * 0.58, y + h * 0.36);
      ctx.stroke();
    }
    return;
  }

  if (item.type === "imac") {
    ctx.fillStyle = "#9aa5aa";
    ctx.fillRect(x + w * 0.18, y + h * 0.05, w * 0.64, h * 0.54);
    ctx.fillStyle = "#060809";
    ctx.fillRect(x + w * 0.23, y + h * 0.1, w * 0.54, h * 0.36);
    ctx.fillStyle = "#dfe3e1";
    ctx.fillRect(x + w * 0.42, y + h * 0.6, w * 0.16, h * 0.12);
    ctx.fillRect(x + w * 0.3, y + h * 0.72, w * 0.4, h * 0.06);
    if (item.broken) {
      ctx.strokeStyle = "rgba(242,244,240,0.7)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x + w * 0.28, y + h * 0.12);
      ctx.lineTo(x + w * 0.68, y + h * 0.42);
      ctx.moveTo(x + w * 0.62, y + h * 0.1);
      ctx.lineTo(x + w * 0.36, y + h * 0.42);
      ctx.stroke();
    }
    return;
  }

  if (item.type === "locker") {
    ctx.fillStyle = "#4c565d";
    ctx.fillRect(x + w * 0.04, y + h * 0.04, w * 0.92, h * 0.9);
    ctx.fillStyle = "#2c3338";
    const doors = Math.max(2, Math.round((item.w || 1) * 2));
    for (let i = 0; i < doors; i += 1) {
      const doorX = x + w * 0.06 + (w * 0.88 / doors) * i;
      const doorW = w * 0.82 / doors;
      ctx.fillRect(doorX, y + h * 0.12, doorW, h * 0.74);
      ctx.fillStyle = "rgba(255,255,255,0.18)";
      ctx.fillRect(doorX + doorW * 0.2, y + h * 0.22, doorW * 0.5, h * 0.04);
      ctx.fillRect(doorX + doorW * 0.2, y + h * 0.3, doorW * 0.5, h * 0.04);
      ctx.fillStyle = "#2c3338";
    }
    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.lineWidth = 2;
    ctx.strokeRect(x + w * 0.04, y + h * 0.04, w * 0.92, h * 0.9);
    if (item.broken) {
      ctx.fillStyle = "#101112";
      ctx.fillRect(x + w * 0.64, y + h * 0.22, w * 0.18, h * 0.52);
      ctx.strokeStyle = hexToRgba(palette.accent || "#45c7ff", 0.4);
      ctx.beginPath();
      ctx.moveTo(x + w * 0.68, y + h * 0.22);
      ctx.lineTo(x + w * 0.78, y + h * 0.58);
      ctx.stroke();
    }
    return;
  }

  if (item.type === "pillar") {
    ctx.fillStyle = "#e4e7e2";
    ctx.fillRect(x + w * 0.18, y, w * 0.64, h);
    ctx.fillStyle = "rgba(16,17,18,0.22)";
    ctx.fillRect(x + w * 0.5, y + h * 0.18, w * 0.2, h * 0.2);
    ctx.fillRect(x + w * 0.28, y + h * 0.62, w * 0.24, h * 0.18);
    return;
  }

  if (item.type === "rubble") {
    ctx.fillStyle = palette.decay || "#5f6a70";
    ctx.fillRect(x + w * 0.2, y + h * 0.46, w * 0.22, h * 0.22);
    ctx.fillRect(x + w * 0.44, y + h * 0.28, w * 0.26, h * 0.32);
    ctx.fillRect(x + w * 0.66, y + h * 0.58, w * 0.18, h * 0.18);
    return;
  }

  if (item.type === "chair") {
    ctx.fillStyle = "#0e1114";
    ctx.fillRect(x + w * 0.28, y + h * 0.16, w * 0.44, h * 0.32);
    ctx.fillRect(x + w * 0.18, y + h * 0.46, w * 0.64, h * 0.18);
    ctx.strokeStyle = "#687178";
    ctx.lineWidth = 3;
    ctx.beginPath();
    if (item.broken) {
      ctx.moveTo(x + w * 0.28, y + h * 0.54);
      ctx.lineTo(x + w * 0.08, y + h * 0.82);
      ctx.moveTo(x + w * 0.66, y + h * 0.52);
      ctx.lineTo(x + w * 0.94, y + h * 0.72);
    } else {
      ctx.moveTo(x + w * 0.34, y + h * 0.62);
      ctx.lineTo(x + w * 0.24, y + h * 0.88);
      ctx.moveTo(x + w * 0.66, y + h * 0.62);
      ctx.lineTo(x + w * 0.76, y + h * 0.88);
    }
    ctx.stroke();
    return;
  }

  if (item.type === "papers") {
    ctx.fillStyle = "rgba(242,244,240,0.82)";
    ctx.fillRect(x + w * 0.18, y + h * 0.28, w * 0.24, h * 0.18);
    ctx.fillRect(x + w * 0.46, y + h * 0.54, w * 0.28, h * 0.16);
    return;
  }

  if (item.type === "cables") {
    ctx.strokeStyle = hexToRgba(palette.accent || "#45c7ff", 0.58);
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x + w * 0.12, y + h * 0.68);
    ctx.quadraticCurveTo(x + w * 0.52, y + h * 0.16, x + w * 0.86, y + h * 0.58);
    ctx.stroke();
  }
}

function drawArenaName(arena, width, height) {
  if (!arena?.name) return;
  const labelWidth = Math.min(320, width * 0.32);
  const x = (width - labelWidth) / 2;
  const y = height * 0.035;
  ctx.fillStyle = "rgba(0,0,0,0.42)";
  ctx.fillRect(x, y, labelWidth, 30);
  ctx.strokeStyle = hexToRgba(arena.palette?.accent || "#45c7ff", 0.6);
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, labelWidth, 30);
  ctx.fillStyle = "#f2f4f0";
  ctx.font = "700 16px Arial";
  ctx.textAlign = "center";
  ctx.fillText(arena.name, width / 2, y + 21);
}

function monsterVisualSeed(monsterId) {
  let hash = 0;
  const text = String(monsterId || "");
  for (let i = 0; i < text.length; i += 1) {
    hash = ((hash << 5) - hash + text.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function drawProceduralMonster(fighter) {
  const color = fighter?.color || "#45c7ff";
  const id = fighter?.id || "";
  const drawers = {
    libcub: drawLibcub,
    printfox: drawPrintfox,
    linewyrm: drawLinewyrm,
    stackdrake: drawStackdrake,
    fractalus: drawFractalMonster,
    golemroot: drawTankMonster,
    mazewalker: drawSerpentMonster,
    pymamba: drawMageMonster,
    shellshocker: drawShellMonster,
    philonosopher: drawTankMonster,
    raytracer: drawCrystalMonster,
    raycaster: drawSerpentMonster
  };
  const draw = drawers[id] || drawGenericMonster;
  draw(color, id);
}

function drawFighter(fighter, x, y, flipped, nameAbove = false) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(flipped ? -1 : 1, 1);
  ctx.fillStyle = hexToRgba(fighter.color, 0.18);
  ctx.beginPath();
  ctx.ellipse(0, 82, 110, 24, 0, 0, Math.PI * 2);
  ctx.fill();

  const spriteW = 190;
  const spriteH = 190;
  const drewSprite = drawMonsterSprite(ctx, fighter.id, 0, 92, spriteW, spriteH);
  if (!drewSprite) drawProceduralMonster(fighter);

  ctx.restore();
  ctx.fillStyle = "#f2f4f0";
  ctx.font = "700 28px Arial";
  ctx.textAlign = "center";
  if (nameAbove) {
    ctx.fillText(fighter.name, x, y - 96);
    ctx.fillStyle = "rgba(242,244,240,0.72)";
    ctx.font = "18px Arial";
    ctx.fillText(getFighterSubtitle(fighter), x, y - 72);
  } else {
    ctx.fillText(fighter.name, x, y + 142);
    ctx.fillStyle = "rgba(242,244,240,0.72)";
    ctx.font = "18px Arial";
    ctx.fillText(getFighterSubtitle(fighter), x, y + 170);
  }
}

function drawLibcub(color) {
  ctx.fillStyle = color;
  ctx.fillRect(-56, -48, 112, 88);
  ctx.fillRect(-40, -64, 24, 24);
  ctx.fillRect(16, -64, 24, 24);
  ctx.fillStyle = "#101112";
  ctx.fillRect(-24, -12, 16, 16);
  ctx.fillRect(12, -12, 16, 16);
  ctx.fillStyle = "#f2f4f0";
  ctx.fillRect(-32, 26, 64, 12);
  ctx.fillStyle = hexToRgba("#ffffff", 0.35);
  ctx.fillRect(-48, -40, 18, 18);
  ctx.fillRect(30, -40, 18, 18);
}

function drawPrintfox(color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(-80, 28);
  ctx.lineTo(-24, -44);
  ctx.lineTo(48, -30);
  ctx.lineTo(78, 8);
  ctx.lineTo(30, 54);
  ctx.lineTo(-44, 58);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#101112";
  ctx.fillRect(22, -12, 14, 14);
  ctx.fillStyle = "#f2f4f0";
  ctx.beginPath();
  ctx.moveTo(-98, 16);
  ctx.lineTo(-146, -12);
  ctx.lineTo(-106, 48);
  ctx.closePath();
  ctx.fill();
}

function drawLinewyrm(color) {
  ctx.fillStyle = color;
  const segments = [
    [-96, 36],
    [-62, 12],
    [-28, -8],
    [6, 12],
    [40, 26],
    [74, -8]
  ];
  for (const [x, y] of segments) ctx.fillRect(x, y, 42, 32);
  ctx.fillRect(78, -36, 54, 46);
  ctx.fillStyle = "#101112";
  ctx.fillRect(104, -20, 12, 12);
}

function drawStackdrake(color) {
  ctx.fillStyle = color;
  for (let i = 0; i < 5; i += 1) {
    ctx.fillRect(-70 + i * 28, 34 - i * 20, 54, 44);
  }
  ctx.beginPath();
  ctx.moveTo(58, -54);
  ctx.lineTo(112, -26);
  ctx.lineTo(82, 22);
  ctx.lineTo(34, 2);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#101112";
  ctx.fillRect(78, -22, 12, 12);
}

function drawFractalMonster(color) {
  ctx.fillStyle = color;
  function branch(x, y, len, angle, depth) {
    if (depth <= 0 || len < 8) return;
    const x2 = x + Math.cos(angle) * len;
    const y2 = y + Math.sin(angle) * len;
    ctx.lineWidth = Math.max(2, depth * 2);
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    branch(x2, y2, len * 0.72, angle - 0.55, depth - 1);
    branch(x2, y2, len * 0.72, angle + 0.55, depth - 1);
  }
  ctx.fillStyle = hexToRgba(color, 0.35);
  ctx.beginPath();
  ctx.ellipse(0, 36, 38, 28, 0, 0, Math.PI * 2);
  ctx.fill();
  branch(0, 36, 52, -Math.PI / 2, 4);
  ctx.fillStyle = "#101112";
  ctx.fillRect(-14, 18, 10, 10);
  ctx.fillRect(6, 18, 10, 10);
}

function drawTankMonster(color) {
  ctx.fillStyle = color;
  ctx.fillRect(-64, -20, 128, 72);
  ctx.fillRect(-48, -48, 32, 32);
  ctx.fillRect(16, -48, 32, 32);
  ctx.fillStyle = hexToRgba("#ffffff", 0.25);
  ctx.fillRect(-52, -12, 104, 10);
  ctx.fillStyle = "#101112";
  ctx.fillRect(-20, 4, 14, 14);
  ctx.fillRect(8, 4, 14, 14);
}

function drawSerpentMonster(color) {
  drawLinewyrm(color);
  ctx.fillStyle = hexToRgba(color, 0.5);
  ctx.fillRect(-110, 48, 220, 8);
}

function drawMageMonster(color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, -70);
  ctx.lineTo(44, 50);
  ctx.lineTo(-44, 50);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = hexToRgba("#ffffff", 0.35);
  ctx.beginPath();
  ctx.arc(0, -8, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#101112";
  ctx.fillRect(-10, -12, 8, 8);
  ctx.fillRect(4, -12, 8, 8);
}

function drawShellMonster(color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(0, 10, 58, 42, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = hexToRgba("#000000", 0.25);
  for (let i = 0; i < 5; i += 1) {
    ctx.beginPath();
    ctx.ellipse(-36 + i * 18, 6, 10, 16, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = "#101112";
  ctx.fillRect(-12, -8, 10, 10);
  ctx.fillRect(4, -8, 10, 10);
}

function drawCrystalMonster(color) {
  ctx.fillStyle = color;
  const pts = [[0, -64], [36, -8], [22, 48], [-22, 48], [-36, -8]];
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i += 1) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = hexToRgba("#ffffff", 0.35);
  ctx.beginPath();
  ctx.moveTo(0, -48);
  ctx.lineTo(12, -4);
  ctx.lineTo(0, 20);
  ctx.lineTo(-12, -4);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#101112";
  ctx.fillRect(-10, 8, 8, 8);
  ctx.fillRect(4, 8, 8, 8);
}

function drawGenericMonster(color, monsterId) {
  const seed = monsterVisualSeed(monsterId);
  const bodyW = 88 + (seed % 36);
  const bodyH = 72 + ((seed >> 3) % 28);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(0, 18, bodyW * 0.52, bodyH * 0.48, 0, 0, Math.PI * 2);
  ctx.fill();
  const hornCount = 3 + (seed % 3);
  for (let i = 0; i < hornCount; i += 1) {
    const t = (i / hornCount) * Math.PI + 0.2;
    ctx.beginPath();
    ctx.moveTo(Math.cos(t) * 34, -8 + Math.sin(t) * 12);
    ctx.lineTo(Math.cos(t) * 58, -42 + Math.sin(t) * 10);
    ctx.lineTo(Math.cos(t) * 46, -18 + Math.sin(t) * 14);
    ctx.closePath();
    ctx.fill();
  }
  ctx.fillStyle = "#101112";
  ctx.fillRect(-20, 6, 16, 16);
  ctx.fillRect(6, 6, 16, 16);
  ctx.fillStyle = hexToRgba("#ffffff", 0.28);
  ctx.fillRect(-28, -36, 56, 10);
}

function drawHpBar(fighter, x, y, width, color, hurtPulse) {
  const ratio = fighter.hp / fighter.maxHp;
  ctx.fillStyle = "rgba(0,0,0,0.52)";
  ctx.fillRect(x, y, width, 18);
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width * ratio, 18);
  if (hurtPulse) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
    ctx.fillRect(x, y, width * ratio, 18);
  }
  ctx.strokeStyle = hurtPulse ? "rgba(255, 94, 87, 0.9)" : "rgba(255,255,255,0.35)";
  ctx.lineWidth = hurtPulse ? 3 : 2;
  ctx.strokeRect(x, y, width, 18);
}

function drawBattleLog(text, width, height) {
  const maxWidth = width * 0.58; const x = width * 0.5; const y = height * 0.72;
  ctx.fillStyle = "rgba(0,0,0,0.58)"; ctx.fillRect(x - maxWidth / 2, y - 24, maxWidth, 46);
  ctx.strokeStyle = "rgba(255,255,255,0.22)"; ctx.lineWidth = 2; ctx.strokeRect(x - maxWidth / 2, y - 24, maxWidth, 46);
  drawPixelText(text, x, y + 6, 14, "center");
}

async function refreshData() {
  try {
    const runs = await backend.loadRuns();
    app.runs = sanitizeRuns(runs);
  } catch (err) {
    console.error(err);
    els.statusLine.textContent = "Leaderboard sync failed — local data kept if any";
    if (!Array.isArray(app.runs)) app.runs = [];
  }
  renderLeaderboards();
  renderEvents();
}

function renderLeaderboards() {
  const scores = computeScores(app.runs);
  const rows = COALITIONS
    .map((coalition) => ({
      ...coalition,
      score: scores[coalition.name] || 0
    }))
    .sort((a, b) => b.score - a.score);

  const html = rows.map((row, index) => `
    <div class="leader-row">
      <span class="coalition-dot" style="background:${row.color}"></span>
      <span>${index + 1}. ${escapeHtml(row.name)}</span>
      <strong>${row.score}</strong>
    </div>
  `).join("");

  for (const board of [els.menuLeaderboard, els.frontLeaderboard, els.resultLeaderboard]) {
    if (board) board.innerHTML = html;
  }
}

function renderEvents() {
  const recent = [...app.runs]
    .sort((a, b) => (Number(b.createdAt) || 0) - (Number(a.createdAt) || 0))
    .slice(0, 8);

  if (!els.eventFeed) return;
  els.eventFeed.innerHTML = recent.length ? recent.map((run) => `
    <div class="event-row">
      <span>${escapeHtml(run.intra ?? "")}: ${escapeHtml(run.monsterName ?? "")} vs ${escapeHtml(run.enemyName ?? "")}</span>
      <strong>+${Number(run.score) || 0}</strong>
    </div>
  `).join("") : `<div class="event-row"><span>Henüz savaş yok</span><strong>0</strong></div>`;
}

function createBackend(frontConfig) {
  const databaseUrl = (frontConfig.firebaseDatabaseUrl || "").replace(/\/$/, "");
  if (!databaseUrl) {
    return {
      async loadRuns() { return sanitizeRuns(readJson(STORAGE_KEYS.runs, [])); },
      async saveRun(run) {
        try { const payload = maybeMapRunForRemote(run); let runs = readJson(STORAGE_KEYS.runs, []); if (!Array.isArray(runs)) runs = []; runs.push(payload); writeJson(STORAGE_KEYS.runs, runs.slice(-200)); } catch (err) { console.error(err); }
      },
      async loadPlayerProfile(playerId) { const db = readJson(STORAGE_KEYS.players, {}); return db && typeof db === "object" ? db[safeDbKey(playerId)] || null : null; },
      async savePlayerProfile(profile) { if (!profile?.id) return; const db = readJson(STORAGE_KEYS.players, {}); const next = db && typeof db === "object" ? db : {}; next[safeDbKey(profile.id)] = sanitizeProfileForSave(profile); writeJson(STORAGE_KEYS.players, next); }
    };
  }
  function getBackendCtx() { try { return window.FRONT_ADAPTERS && typeof window.FRONT_ADAPTERS.getBackendContext === "function" ? window.FRONT_ADAPTERS.getBackendContext() : null; } catch (hookErr) { console.error(hookErr); return null; } }
  function buildHeaders(json = false) { const ctx = getBackendCtx(); const authHeader = ctx && typeof ctx.authHeader === "string" ? ctx.authHeader : ""; const headers = json ? { "Content-Type": "application/json" } : {}; if (authHeader) headers.Authorization = authHeader; return headers; }
  function buildUrl(path) { const ctx = getBackendCtx(); const prefix = ctx && typeof ctx.pathPrefix === "string" ? ctx.pathPrefix.replace(/\/?$/, "/") : ""; return (databaseUrl + "/" + prefix + path + ".json").replace(/([^:]\/)\/+/g, "$1"); }
  return {
    async loadRuns() {
      try { const response = await fetch(buildUrl("runs"), { headers: buildHeaders(false) }); if (!response.ok) return []; let data; try { data = await response.json(); } catch (parseErr) { console.error(parseErr); return []; } if (data == null) return []; const list = typeof data === "object" && !Array.isArray(data) ? Object.values(data) : Array.isArray(data) ? data : []; return sanitizeRuns(list); } catch (err) { console.error(err); return []; }
    },
    async saveRun(run) {
      try { const payload = maybeMapRunForRemote(run); const response = await fetch(buildUrl("runs"), { method: "POST", headers: buildHeaders(true), body: JSON.stringify(payload) }); if (!response.ok) console.warn("Firebase saveRun HTTP", response.status); } catch (err) { console.error(err); }
    },
    async loadPlayerProfile(playerId) {
      if (!playerId) return null;
      try { const response = await fetch(buildUrl("players/" + safeDbKey(playerId)), { headers: buildHeaders(false) }); if (!response.ok) return null; return await response.json(); } catch (err) { console.error(err); return null; }
    },
    async savePlayerProfile(profile) {
      if (!profile?.id) return;
      try { const response = await fetch(buildUrl("players/" + safeDbKey(profile.id)), { method: "PUT", headers: buildHeaders(true), body: JSON.stringify(sanitizeProfileForSave(profile)) }); if (!response.ok) console.warn("Firebase savePlayerProfile HTTP", response.status); } catch (err) { console.error(err); }
    }
  };
}

function safeDbKey(value) { return normalizeId(String(value || "player")).replace(/[.#$\[\]/]/g, "-") || "player"; }

function sanitizeProfileForSave(profile) {
  return {
    id: profile.id,
    intra: profile.intra,
    displayName: profile.displayName,
    coalition: profile.coalition,
    avatarUrl: profile.avatarUrl || "",
    wallet: Number(profile.wallet) || 0,
    inventory: normalizeInventory(profile.inventory),
    monsterLevels: profile.monsterLevels || {},
    projectStats: normalizeProjectStats(profile.projectStats),
    passedProjects: profile.passedProjects,
    passedProjectSlugs: normalizeSlugList(
      profile.passedProjectSlugs || profile.passedProjectsSlugs || profile.passedProjectsList || []
    ),
    cursusLevel: profile.cursusLevel ?? null,
    currentMilestone: deriveMilestoneFromProfile(profile),
    curriculumTrack: profile.curriculumTrack || profile.track || "current",
    rank: profile.rank || "",
    daysUntilBlackhole: profile.daysUntilBlackhole ?? null,
    achievements: normalizeAchievements(profile.achievements),
    authSource: profile.authSource || ""
  };
}

function computeScores(runs) {
  const scores = {};
  for (const coalition of COALITIONS) scores[coalition.name] = 0;
  const list = Array.isArray(runs) ? runs : [];
  for (const run of list) {
    if (!run || typeof run !== "object") continue;
    if (typeof run.coalition !== "string") continue;
    scores[run.coalition] = (scores[run.coalition] || 0) + Number(run.score || 0);
  }
  return scores;
}

function resizeCanvas() {
  const rect = els.canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.max(960, Math.floor(rect.width * dpr));
  const height = Math.max(540, Math.floor(rect.height * dpr));
  if (els.canvas.width !== width || els.canvas.height !== height) {
    els.canvas.width = width;
    els.canvas.height = height;
  }
  ctx.imageSmoothingEnabled = false;
}

function getCoalition(name) {
  const normalized = normalizeCoalitionName(name);
  return COALITIONS.find((coalition) => coalition.name === normalized) || COALITIONS[0];
}

function normalizeCoalitionName(name) {
  const raw = String(name || "").trim();
  return COALITION_ALIASES[raw] || raw || COALITIONS[0].name;
}

function readJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Local file and privacy settings can block storage. Keep the current in-memory state.
  }
}

function removeStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore local storage restrictions.
  }
}

function normalizeId(value) {
  return value.toLowerCase().replace(/[^a-z0-9_-]+/g, "-").replace(/^-|-$/g, "") || "player";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function hexToRgba(hex, alpha) {
  const clean = hex.replace("#", "");
  const value = parseInt(clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function triggerScreenShake(level) {
  const screen = els.gameScreen;
  if (!screen || screen.classList.contains("hidden")) return;
  screen.classList.remove("shake-light", "shake-heavy");
  void screen.offsetWidth;
  screen.classList.add(level === "heavy" ? "shake-heavy" : "shake-light");
  window.setTimeout(() => {
    screen.classList.remove("shake-light", "shake-heavy");
  }, 320);
}

function pulseHudHp(side) {
  const el = side === "player" ? els.hudHp : els.hudEnemyHp;
  if (!el) return;
  el.classList.remove("hud-pulse");
  void el.offsetWidth;
  el.classList.add("hud-pulse");
}

function runBattleFxLoop(battle, until) {
  if (!until || until <= performance.now()) return;
  function frame() {
    if (app.battle !== battle || battle.outcome !== "active") return;
    drawBattle();
    if (performance.now() < until) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
