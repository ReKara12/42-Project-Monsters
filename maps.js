window.FRONT_MAPS = (() => {
  const PISCINE_VILLAGE = {
    id: "piscine",
    name: "Piscine Gate",
    base: "#07121a",
    floorA: "#0d1b23",
    floorB: "#122630",
    wall: "#263945",
    accent: "#00c9d8",
    decay: "#607782"
  };

  const VILLAGES = [
    {
      id: "m0",
      name: "Milestone 0 Village",
      base: "#081014",
      floorA: "#10171b",
      floorB: "#151f24",
      wall: "#2b3338",
      accent: "#11c5d8",
      decay: "#5f6a70"
    },
    {
      id: "m1",
      name: "Milestone 1 Village",
      base: "#0b1112",
      floorA: "#141919",
      floorB: "#1d2422",
      wall: "#333b38",
      accent: "#4bd17c",
      decay: "#6f755d"
    },
    {
      id: "m2",
      name: "Milestone 2 Village",
      base: "#100e13",
      floorA: "#191620",
      floorB: "#231c29",
      wall: "#3a3342",
      accent: "#b98cff",
      decay: "#766b82"
    },
    {
      id: "m3",
      name: "Milestone 3 Village",
      base: "#130f0a",
      floorA: "#1e1710",
      floorB: "#2a2117",
      wall: "#443627",
      accent: "#ffbd4a",
      decay: "#7a6548"
    },
    {
      id: "m4",
      name: "Milestone 4 Village",
      base: "#0b1017",
      floorA: "#121925",
      floorB: "#1a2433",
      wall: "#2b3a4d",
      accent: "#45c7ff",
      decay: "#607487"
    },
    {
      id: "m5",
      name: "Milestone 5 Village",
      base: "#120d0f",
      floorA: "#1e1418",
      floorB: "#2b1d21",
      wall: "#4a3037",
      accent: "#ff5e57",
      decay: "#806166"
    },
    {
      id: "m6",
      name: "Milestone 6 Village",
      base: "#0f1013",
      floorA: "#171a20",
      floorB: "#222631",
      wall: "#363d4b",
      accent: "#f2f4f0",
      decay: "#777f8e"
    }
  ];

  const PROP_TYPES = ["desk", "terminal", "chair", "rubble", "papers", "cables", "imac"];

  function createMilestoneArena(context = {}) {
    const village = selectVillage(context);
    const milestone = village.id === "piscine" ? "piscine" : clampMilestone(context.milestone);
    const seed = hashString(`${village.id}:${context.track || "current"}:${context.seed || "42"}`);
    const rand = mulberry32(seed);
    const cols = 32;
    const rows = 18;
    const tiles = [];
    const decor = [];

    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        const edge = x === 0 || y === 0 || x === cols - 1 || y === rows - 1;
        const backWall = y > 0 && y < 4;
        const baseboard = y === 4;
        const cracked = rand() > 0.88;
        const dusty = rand() > 0.78;
        const striped = x % 6 === 0 || x % 6 === 1;
        tiles.push({
          x,
          y,
          edge,
          variant: edge
            ? "wall"
            : backWall
              ? "backwall"
              : baseboard
                ? "baseboard"
                : cracked
                  ? "crack"
                  : dusty
                    ? "dust"
                    : striped
                      ? "stripe"
                      : (x + y + milestone) % 2 ? "a" : "b"
        });
      }
    }

    addFixedCampusShell(decor, cols, rows);
    const propCount = 14 + Math.min(10, Number(milestone) * 2 || 2);
    let guard = 0;
    while (decor.length < propCount + 18 && guard < 160) {
      guard += 1;
      const type = PROP_TYPES[Math.floor(rand() * PROP_TYPES.length)];
      const w = type === "desk" ? 3 : type === "terminal" ? 2 : 1;
      const h = type === "desk" || type === "terminal" ? 1 : 1;
      const x = 2 + Math.floor(rand() * (cols - 4 - w));
      const y = 5 + Math.floor(rand() * (rows - 7 - h));
      if (isInFightLane(x, y, w, h)) continue;
      decor.push({ type, x, y, w, h, broken: rand() > 0.58 });
    }

    return {
      id: village.id,
      name: village.name,
      milestone,
      track: context.track || "current",
      cols,
      rows,
      palette: village,
      tiles,
      decor
    };
  }

  function getVillageName(milestone) {
    const village = selectVillage({ milestone });
    return village.name;
  }

  function selectVillage(context = {}) {
    const raw = String(context.milestone ?? "").trim().toLowerCase();
    const phase = String(context.phase || context.rank || "").trim().toLowerCase();
    if (raw === "piscine" || phase === "piscine" || phase === "pisciner") return PISCINE_VILLAGE;
    return VILLAGES[clampMilestone(context.milestone)] || VILLAGES[0];
  }

  function addFixedCampusShell(decor, cols, rows) {
    decor.push({ type: "woodwall", x: 2, y: 1, w: 6, h: 2 });
    decor.push({ type: "woodwall", x: 9, y: 1, w: 6, h: 2, broken: true });
    decor.push({ type: "woodwall", x: 17, y: 1, w: 6, h: 2 });
    decor.push({ type: "woodwall", x: 24, y: 1, w: 5, h: 2, broken: true });
    decor.push({ type: "led", x: 6, y: 3, w: 8, h: 1, broken: true });
    decor.push({ type: "led", x: 18, y: 3, w: 8, h: 1 });
    decor.push({ type: "locker", x: 1, y: 5, w: 4, h: 2 });
    decor.push({ type: "locker", x: cols - 5, y: 5, w: 4, h: 2, broken: true });
    decor.push({ type: "door", x: cols - 3, y: 1, w: 2, h: 3 });
    decor.push({ type: "pillar", x: 7, y: rows - 4, w: 1, h: 3, broken: true });
    decor.push({ type: "pillar", x: cols - 8, y: rows - 4, w: 1, h: 3 });
    decor.push({ type: "desk", x: 4, y: 6, w: 4, h: 1, broken: true });
    decor.push({ type: "desk", x: cols - 9, y: 12, w: 4, h: 1 });
    decor.push({ type: "terminal", x: 14, y: 5, w: 3, h: 1, broken: true });
    decor.push({ type: "imac", x: 3, y: rows - 3, w: 1, h: 1, broken: true });
    decor.push({ type: "imac", x: cols - 4, y: rows - 3, w: 1, h: 1 });
    decor.push({ type: "chair", x: 8, y: 5, w: 1, h: 1, broken: true });
    decor.push({ type: "chair", x: cols - 10, y: 13, w: 1, h: 1 });
    decor.push({ type: "cables", x: 15, y: 4, w: 3, h: 1 });
    decor.push({ type: "rubble", x: 1, y: rows - 2, w: 2, h: 1 });
    decor.push({ type: "rubble", x: cols - 4, y: rows - 2, w: 2, h: 1 });
  }

  function isInFightLane(x, y, w, h) {
    const zones = [
      { x: 5, y: 9, w: 10, h: 7 },
      { x: 20, y: 5, w: 9, h: 7 },
      { x: 11, y: 7, w: 10, h: 5 }
    ];
    return zones.some((zone) =>
      x < zone.x + zone.w &&
      x + w > zone.x &&
      y < zone.y + zone.h &&
      y + h > zone.y
    );
  }

  function clampMilestone(value) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return 0;
    return Math.max(0, Math.min(VILLAGES.length - 1, Math.round(numeric)));
  }

  function hashString(input) {
    let hash = 2166136261;
    for (let i = 0; i < input.length; i += 1) {
      hash ^= input.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function mulberry32(seed) {
    return function random() {
      let t = seed += 0x6d2b79f5;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  return {
    createMilestoneArena,
    getVillageName
  };
})();

window.VILLAGE_MAPS = {
  0: {
    id: 0,
    milestone: 0,
    name: "Milestone 0 Village",
    subtitle: "M0 Köyü — libft cephesi",
    tileSize: 32,
    cols: 20,
    rows: 14,
    palette: {
      bgTop: "#101820",
      bgBottom: "#05070a",
      floor: "#283640",
      floorAlt: "#202b33",
      wall: "#11171d",
      blocker: "#194758",
      water: "#194758",
      zone: "#2a5736",
      grass: "#2a5736",
      accent: "#45c7ff"
    },
    tiles: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 1],
      [1, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 1],
      [1, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 1],
      [1, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 1],
      [1, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 1],
      [1, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    spawn: { x: 3, y: 7 },
    encounters: [],
    props: [
      { type: "led", x: 2.2, y: 1.05, w: 4.8, h: 0.45 },
      { type: "led", x: 12.9, y: 1.05, w: 4.8, h: 0.45 },
      { type: "locker", x: 1.1, y: 2.1, w: 1.7, h: 2.6, count: 2 },
      { type: "locker", x: 17.2, y: 2.1, w: 1.7, h: 2.6, count: 2 },
      { type: "pillar", x: 6.0, y: 2.0, w: 1.0, h: 2.1 },
      { type: "pillar", x: 13.0, y: 2.0, w: 1.0, h: 2.1 },
      { type: "desk", x: 7.0, y: 6.0, w: 3.0, h: 1.0 },
      { type: "desk", x: 10.0, y: 6.0, w: 3.0, h: 1.0, broken: true },
      { type: "imac", x: 8.1, y: 6.0, w: 1.0, h: 1.0 },
      { type: "imac", x: 11.1, y: 6.0, w: 1.0, h: 1.0 },
      { type: "chair", x: 7.4, y: 7.2, w: 1.0, h: 1.0 },
      { type: "chair", x: 11.6, y: 7.2, w: 1.0, h: 1.0 },
      { type: "desk", x: 2.0, y: 10.0, w: 2.5, h: 1.0 },
      { type: "desk", x: 15.5, y: 10.0, w: 2.5, h: 1.0 },
      { type: "rubble", x: 4.7, y: 3.5, w: 1.2, h: 1.0 },
      { type: "rubble", x: 14.0, y: 9.1, w: 1.5, h: 1.0 },
      { type: "rubble", x: 9.0, y: 11.3, w: 1.5, h: 0.8 },
      { type: "cable", x: 5.2, y: 8.1, w: 2.3, h: 1.0, color: "#0d0f11" },
      { type: "cable", x: 12.5, y: 4.8, w: 2.5, h: 1.0, color: "#15262e" }
    ]
  }
};

window.FRONT_MAPS.getVillageName = function getOverworldVillageName(milestone) {
  const m = window.VILLAGE_MAPS && window.VILLAGE_MAPS[milestone];
  return m ? m.name : `Milestone ${milestone} Village`;
};

/*
 * ============================================================
 *  TILE ASSET REGISTRY — tiles/ klasöründeki PNG dosyaları
 * ============================================================
 */
/** Zemin PNG’si haritada kaç hücre kaplar (1x1 yerine 10x10). */
const GROUND_TILE_CHUNK = 2;

const TILE_ASSETS = {
  ground: {
    main: [
      "tiles/ground/ground main.png",
      // "tiles/ground/ground main 3.png",
      // "tiles/ground/ground main 4.png"
    ],
    alt: [
      "tiles/ground/ground mainneww.png ",
      // "tiles/ground/ground 1.png",
      // "tiles/ground/ground 2.png",
      // "tiles/ground/ground 3.png",
      // "tiles/ground/ground 4.png",
      // "tiles/ground/ground 5.png",
      // "tiles/ground/ground 6.png",
      // "tiles/ground/grounf 7.png",
      // "tiles/ground/tile_0022.png",
      // "tiles/ground/tile_0023.png",
      // "tiles/ground/tile_0024.png",
      // "tiles/ground/tile_0025.png",
      // "tiles/ground/tile_0031.png",
      // "tiles/ground/tile_0032.png",
      // "tiles/ground/tile_0034.png",
      // "tiles/ground/tile_0035.png",
      // "tiles/ground/tile_0041.png",
      // "tiles/ground/tile_0042.png",
      // "tiles/ground/tile_0043.png"
    ]
  },
  wall: [
    "tiles/wall/tile_0029.png",
    "tiles/wall/tile_0030.png",
    "tiles/wall/tile_0039.png"
  ],
  tables: [
    "tiles/tables/table b.png",
    "tiles/tables/table c.png",
    "tiles/tables/table d.png",
    "tiles/tables/table e.png",
    "tiles/tables/tile_0064.png"
  ],
  chairs: [
    "tiles/chairs/tile_0072.png",
    "tiles/chairs/tile_0074.png",
    "tiles/chairs/tile_0075.png",
    "tiles/chairs/tile_0081.png",
    "tiles/chairs/tile_0082.png",
    "tiles/chairs/tile_0083.png",
    "tiles/chairs/tile_0084.png"
  ],
  folliage: [
    "tiles/folliage/tile_0040.png",
    "tiles/folliage/tile_0065.png",
    "tiles/folliage/tile_0078.png",
    "tiles/folliage/tile_0079.png",
    "tiles/folliage/tile_0080.png",
    "tiles/folliage/tile_0086.png",
    "tiles/folliage/tile_0087.png",
    "tiles/folliage/tile_0088.png",
    "tiles/folliage/tile_0089.png",
    "tiles/folliage/tile_0090.png",
    "tiles/folliage/tile_0097.png",
    "tiles/folliage/tile_0098.png"
  ],
  lockers: [
    "tiles/lockers/locker.png",
    "tiles/lockers/tile_0070.png",
    //   "tiles/lockers/tile_0058.png",
    //   "tiles/lockers/tile_0059.png",
    //   "tiles/lockers/tile_0060.png",
    //   "tiles/lockers/tile_0067.png",
    //   "tiles/lockers/tile_0068.png",
    //   "tiles/lockers/tile_0069.png",
    //   "tiles/lockers/tile_0070.png"
  ],
  pillars: [
    "tiles/pillars/tile_0046.png",
    "tiles/pillars/tile_0047.png",
    "tiles/pillars/tile_0048.png",
    "tiles/pillars/tile_0049.png",
    "tiles/pillars/tile_0050.png",
    "tiles/pillars/tile_0056.png",
    "tiles/pillars/tile_0057.png",
    "tiles/pillars/tile_0066.png",
    "tiles/pillars/tile_0076.png",
    "tiles/pillars/tile_0077.png",
    "tiles/pillars/tile_0085.png"
  ],
  traps: [
    "tiles/traps/seg trap.png"
  ],
  lights: [
    "tiles/lights/light 1.png",
    "tiles/lights/light 2.png",
    "tiles/lights/light 3.png",
    "tiles/lights/light 4.png",
    "tiles/lights/light 5.png",
    "tiles/lights/light 6.png",
    "tiles/lights/tile_0091.png",
    "tiles/lights/tile_0092.png",
    "tiles/lights/tile_0093.png",
    "tiles/lights/tile_0094.png",
    "tiles/lights/tile_0095.png"
  ]
};

/* Preload all tile images into a cache */
const TILE_IMAGE_CACHE = {};
let _tileLoadTotal = 0;
let _tileLoadDone = 0;

function preloadTileImages() {
  function loadList(paths) {
    for (const src of paths) {
      if (TILE_IMAGE_CACHE[src]) continue;
      const img = new Image();
      _tileLoadTotal++;
      img.onload = () => {
        _tileLoadDone++;
        // Yeterli tile yüklenince haritayı yeniden çiz
        if (_tileLoadDone >= Math.min(8, _tileLoadTotal)) {
          if (typeof drawVillage === "function") {
            drawVillage();
          }
        }
      };
      img.onerror = () => { _tileLoadDone++; };
      img.src = src;
      TILE_IMAGE_CACHE[src] = img;
    }
  }
  loadList(TILE_ASSETS.ground.main);
  loadList(TILE_ASSETS.ground.alt);
  loadList(TILE_ASSETS.wall);
  loadList(TILE_ASSETS.tables);
  loadList(TILE_ASSETS.chairs);
  loadList(TILE_ASSETS.folliage);
  loadList(TILE_ASSETS.lockers);
  loadList(TILE_ASSETS.pillars);
  loadList(TILE_ASSETS.traps);
  loadList(TILE_ASSETS.lights);
}
preloadTileImages();

/* Seeded random (deterministic per run) */
function mapRandSeed(seed) {
  let s = seed;
  return function rand() {
    s = (s * 1664525 + 1013904223) & 0xFFFFFFFF;
    return (s >>> 0) / 4294967296;
  };
}

function pickRandom(arr, rand) {
  return arr[Math.floor(rand() * arr.length)];
}

/*
 * ============================================================
 *  MAP GENERATOR — getVillage (Kampüs Layout v2)
 * ============================================================
 *  Referans görsel: 42 kampüs bilgisayar lab haritası
 *  - Üst sıra: Tam locker sırası (collision)
 *  - Yatay masa sıraları + altına sandalye sıraları
 *  - Aralarında geniş koridor (2-3 tile)
 *  - Alt sıra: Tam masa sırası
 *  - Zemin: %85 main koyu tile, %15 alt tile
 *  - Ortada seyrek folliage ve trap
 */
window.FRONT_MAPS.getVillage = function getOverworldVillage(milestone) {
  const numeric = Number(milestone);
  const safeMilestone = Number.isFinite(numeric) ? Math.max(0, Math.round(numeric)) : 0;

  // Büyük map — referans görsele yakın oran
  const cols = 20;
  const rows = 20;

  // Her run'da farklı ama deterministik seed
  const seed = Date.now() ^ (safeMilestone * 9973);
  const rand = mapRandSeed(seed);

  /* -------------------------------------------------------
   *  Layer 1: Ground — 10x10 blok başına bir tile (%85 main, %15 alt)
   * ----------------------------------------------------- */
  const groundLayer = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      const isChunkOrigin = r % GROUND_TILE_CHUNK === 0 && c % GROUND_TILE_CHUNK === 0;
      row.push(
        isChunkOrigin
          ? (rand() < 0.85
            ? pickRandom(TILE_ASSETS.ground.main, rand)
            : pickRandom(TILE_ASSETS.ground.alt, rand))
          : null
      );
    }
    groundLayer.push(row);
  }

  /* -------------------------------------------------------
   *  Layer 2: Collision map (0=yürünebilir, 1=engel)
   * ----------------------------------------------------- */
  const collision = Array.from({ length: rows }, () => Array(cols).fill(0));

  // y=0 satırı her zaman tamamen collision (wall duvarı)
  for (let c = 0; c < cols; c++) collision[0][c] = 1;

  /* -------------------------------------------------------
   *  Layer 3: Wall Tiles (y=0 — tam duvar sırası)
   *  Her sütuna wall tile koy. Wall = üst satırın zemini.
   *  Tıpkı ground tile gibi her hücrede olacak.
   * ----------------------------------------------------- */
  const wallLayer = [];
  for (let c = 0; c < cols; c++) {
    wallLayer.push(pickRandom(TILE_ASSETS.wall, rand));
  }

  /* -------------------------------------------------------
   *  Layer 4: Objects — Yapısal yerleşim
   * ----------------------------------------------------- */
  const objects = [];

  // Yardımcı: collision kontrolü ile obje ekle
  function placeObj(type, x, y, hasCollision, imgPool) {
    if (x < 0 || x >= cols || y < 0 || y >= rows) return false;
    if (hasCollision && collision[y][x] !== 0) return false;
    objects.push({ type, x, y, collision: hasCollision, img: pickRandom(imgPool, rand) });
    if (hasCollision) collision[y][x] = 1;
    return true;
  }

  // --- Lockerlar: y=0, wall üstüne (eşya olarak) ---
  // Zemin+masa ilişkisi gibi: Wall altta, Locker üstte, aynı tile.
  // Collision zaten wall'dan geliyor (collision[0][c]=1).
  const lockerCols = new Set();
  for (let lx = 0; lx <= 3; lx++) lockerCols.add(lx);
  for (let lx = cols - 4; lx < cols; lx++) lockerCols.add(lx);
  const extraLockers = 1 + Math.floor(rand() * 3);
  for (let i = 0; i < extraLockers; i++) {
    lockerCols.add(4 + Math.floor(rand() * (cols - 8)));
  }
  for (const lc of lockerCols) {
    if (lc < 0 || lc >= cols) continue;
    objects.push({ type: "locker", x: lc, y: 0, collision: false, img: pickRandom(TILE_ASSETS.lockers, rand) });
  }

  // --- MASA SATIRLARI ---
  // Her masa 2 tile genişliğinde (w:2).
  // %60 ihtimalle bir sonraki masa hemen yanyana doğar (bitik cluster).
  // %40 ihtimalle 1 tile boşluk bırakılır.
  const deskRows = [2, 6, 11, 16]; // Masa satırı y koordinatları

  for (const dy of deskRows) {
    if (dy >= rows - 1) continue;
    let c = 1;
    while (c < cols - 2) {
      // %20 ihtimalle bu pozisyonu tamamen atla
      if (rand() < 0.20) {
        c += 2;
        continue;
      }
      // 2x2 görsel, collision sadece üst satır (w=2, h=1)
      if (
        c + 1 < cols - 1 && dy + 1 < rows &&
        collision[dy][c] === 0 && collision[dy][c + 1] === 0
      ) {
        const tableImg = pickRandom(TILE_ASSETS.tables, rand);
        objects.push({
          type: "table",
          x: c,
          y: dy,
          w: 2.0,
          h: 2.0,
          collision: true,
          collisionW: 2,
          collisionH: 1,
          img: tableImg
        });
        // Sadece üst 2 tile collision (alt satır serbest)
        collision[dy][c] = 1;
        collision[dy][c + 1] = 1;
        // Sandalye — masanın hemen altında, görsel var ama table collision alt satıra taşmıyor.
        if (dy + 1 < rows) {
          placeObj("chair", c, dy + 1, false, TILE_ASSETS.chairs);
          placeObj("chair", c + 1, dy + 1, false, TILE_ASSETS.chairs);
        }
      }
      // Bir sonraki masa: %60 hemen yanyana (c+=2), %40 boşluklu (c+=3)
      c += (rand() < 0.60) ? 2 : 3;
    }
  }

  // --- ORTADAKI KORIDORLARA SEYREK OBJELER ---
  // Koridor bölgeleri: y=4-5, y=8-10, y=13-15
  // Rastgele sandalye, folliage, pillar

  // Pillar — 2-4 adet, koridorlara
  const corridorRows = [4, 5, 8, 9, 10, 13, 14, 15];
  const pillarCount = 2 + Math.floor(rand() * 3);
  for (let i = 0; i < pillarCount; i++) {
    const py = corridorRows[Math.floor(rand() * corridorRows.length)];
    const px = 2 + Math.floor(rand() * (cols - 4));
    placeObj("pillar", px, py, true, TILE_ASSETS.pillars);
  }

  // Yalnız sandalyeler — koridorlar içinde, 3-5 adet
  const lonelyChairCount = 3 + Math.floor(rand() * 3);
  for (let i = 0; i < lonelyChairCount; i++) {
    const cy = corridorRows[Math.floor(rand() * corridorRows.length)];
    const cx = 1 + Math.floor(rand() * (cols - 2));
    placeObj("chair", cx, cy, true, TILE_ASSETS.chairs);
  }

  // Folliage — koridorlarda dekoratif, 3-6 adet, collision YOK
  const folliageCount = 3 + Math.floor(rand() * 4);
  for (let i = 0; i < folliageCount; i++) {
    const fy = corridorRows[Math.floor(rand() * corridorRows.length)];
    const fx = 1 + Math.floor(rand() * (cols - 2));
    objects.push({ type: "folliage", x: fx, y: fy, collision: false, img: pickRandom(TILE_ASSETS.folliage, rand) });
  }

  // Trap — 1-2 adet, koridorlarda gizli
  const trapCount = 1 + Math.floor(rand() * 2);
  for (let i = 0; i < trapCount; i++) {
    const ty = corridorRows[Math.floor(rand() * corridorRows.length)];
    const tx = 2 + Math.floor(rand() * (cols - 4));
    objects.push({ type: "trap", x: tx, y: ty, collision: false, img: pickRandom(TILE_ASSETS.traps, rand) });
  }

  // Lights — duvar sırasında (y=0), zaten wallLayer'da var ama ekstra dekor
  const lightCount = 2 + Math.floor(rand() * 3);
  for (let i = 0; i < lightCount; i++) {
    const lx2 = 1 + Math.floor(rand() * (cols - 2));
    objects.push({ type: "light", x: lx2, y: 0, collision: false, img: pickRandom(TILE_ASSETS.lights, rand) });
  }

  /* -------------------------------------------------------
   *  Spawn: İlk büyük koridorda (y=4-5), ortaya yakın
   * ----------------------------------------------------- */
  let spawn = { x: Math.floor(cols / 2), y: 4 };
  // Eğer spawn noktası dolu ise yakın boş yer bul
  for (let attempt = 0; attempt < 20 && collision[spawn.y]?.[spawn.x] !== 0; attempt++) {
    spawn = { x: Math.max(1, Math.min(cols - 2, spawn.x + (attempt % 2 === 0 ? 1 : -1))), y: spawn.y };
  }

  /* -------------------------------------------------------
   *  Enemy Encounters — koridorlarda, spawn'dan uzakta
   * ----------------------------------------------------- */
  const encounters = [];
  const enemyCount = 3 + Math.floor(rand() * 3) + safeMilestone;
  const allCorridorRows = [4, 5, 8, 9, 10, 13, 14, 15, 18, 19];
  for (let i = 0; i < enemyCount; i++) {
    const ey = allCorridorRows[Math.floor(rand() * allCorridorRows.length)];
    const ex = 1 + Math.floor(rand() * (cols - 2));
    if (
      ey < rows &&
      collision[ey]?.[ex] === 0 &&
      (Math.abs(ex - spawn.x) > 3 || Math.abs(ey - spawn.y) > 3)
    ) {
      encounters.push({ x: ex, y: ey, active: true });
    }
  }

  return {
    id: `${safeMilestone}-${seed}`,
    milestone: safeMilestone,
    name: `Milestone ${safeMilestone} — 42 Lab`,
    subtitle: `Derinlik ${safeMilestone} · ${encounters.length} düşman aktif`,
    cols,
    rows,
    groundTileChunk: GROUND_TILE_CHUNK,
    groundLayer,
    wallLayer,
    collision,
    objects,
    spawn,
    encounters,
    get tiles() { return this.collision; }
  };
};
