/**
 * Dungeon Generator (Roguelike Oda Sistemi)
 * 42 Project Monsters
 * 
 * Bu algoritma "Binding of Isaac" tarzinda, birbirine bagli rastgele odalar uretir.
 */

class Room {
    constructor(x, y, type = "normal") {
        this.x = x;
        this.y = y;
        this.type = type; // "start", "normal", "boss", "treasure", vb.
        this.doors = { top: false, right: false, bottom: false, left: false };
        this.enemies = [];
        this.powerups = [];
        this.isCleared = false;
    }
}

class DungeonGenerator {
    constructor(maxRooms) {
        this.maxRooms = maxRooms;
        this.gridSize = 10; // Zindan matrisinin boyutu (kac oda sigabilir)
        this.rooms = [];
        this.grid = Array.from({ length: this.gridSize }, () => Array(this.gridSize).fill(null));
    }

    generate() {
        // 1. Baslangic odasini merkeze koy
        const startX = Math.floor(this.gridSize / 2);
        const startY = Math.floor(this.gridSize / 2);
        const startRoom = new Room(startX, startY, "start");
        
        this.grid[startY][startX] = startRoom;
        this.rooms.push(startRoom);

        let roomsCreated = 1;

        // 2. Rastgele odalari uret (Random Walk)
        while (roomsCreated < this.maxRooms) {
            // Var olan odalardan rastgele birini sec
            const baseRoom = this.rooms[Math.floor(Math.random() * this.rooms.length)];
            
            // Rastgele bir yon sec (0: Ust, 1: Sag, 2: Alt, 3: Sol)
            const dir = Math.floor(Math.random() * 4);
            let newX = baseRoom.x;
            let newY = baseRoom.y;

            if (dir === 0) newY -= 1;
            else if (dir === 1) newX += 1;
            else if (dir === 2) newY += 1;
            else if (dir === 3) newX -= 1;

            // Eger yeni koordinat grid icindeyse ve boss degilse
            if (newX > 0 && newX < this.gridSize - 1 && newY > 0 && newY < this.gridSize - 1) {
                if (this.grid[newY][newX] === null) {
                    // Yeni odayi olustur
                    const newRoom = new Room(newX, newY, "normal");
                    this.grid[newY][newX] = newRoom;
                    this.rooms.push(newRoom);
                    
                    // Kapilari bagla
                    this.connectDoors(baseRoom, newRoom, dir);
                    roomsCreated++;
                } else {
                    // Eger oda zaten varsa, sadece kapi baglantisini kur (daha sarmasik bir harita icin)
                    // %30 ihtimalle extra kapi ac
                    if (Math.random() > 0.7) {
                        this.connectDoors(baseRoom, this.grid[newY][newX], dir);
                    }
                }
            }
        }

        // 3. Ozel Odalari Sec (Boss ve Treasure)
        this.assignSpecialRooms();

        // 4. Odalara icerik ekle (Dusmanlar ve Tuzzaklar)
        this.populateRooms();

        return this.rooms;
    }

    connectDoors(room1, room2, direction) {
        if (direction === 0) { room1.doors.top = true; room2.doors.bottom = true; }
        if (direction === 1) { room1.doors.right = true; room2.doors.left = true; }
        if (direction === 2) { room1.doors.bottom = true; room2.doors.top = true; }
        if (direction === 3) { room1.doors.left = true; room2.doors.right = true; }
    }

    assignSpecialRooms() {
        // En uc (start odasina en uzak) odayi Boss Odasi yap
        const startRoom = this.rooms[0];
        let maxDist = 0;
        let bossRoomIndex = 1;

        for (let i = 1; i < this.rooms.length; i++) {
            const dist = Math.abs(this.rooms[i].x - startRoom.x) + Math.abs(this.rooms[i].y - startRoom.y);
            // Tek kapisi olan (Dead-end) odalar boss icin idealdir
            let doorCount = Object.values(this.rooms[i].doors).filter(Boolean).length;
            
            if (dist > maxDist && doorCount === 1) {
                maxDist = dist;
                bossRoomIndex = i;
            }
        }
        
        this.rooms[bossRoomIndex].type = "boss";

        // Baska bir dead-end odayi Hazine (Treasure) yap
        for (let i = 1; i < this.rooms.length; i++) {
            if (i !== bossRoomIndex) {
                let doorCount = Object.values(this.rooms[i].doors).filter(Boolean).length;
                if (doorCount === 1 && Math.random() > 0.5) {
                    this.rooms[i].type = "treasure";
                    break; // Sadece 1 treasure odasi
                }
            }
        }
    }

    populateRooms() {
        this.rooms.forEach(room => {
            if (room.type === "normal") {
                // Rastgele dusman ekle (Ornek)
                if (Math.random() > 0.3) {
                    room.enemies.push("Bug"); 
                }
                if (Math.random() > 0.7) {
                    room.enemies.push("MemoryLeak");
                }
            } else if (room.type === "treasure") {
                room.powerups.push("Coffee");
            } else if (room.type === "boss") {
                room.enemies.push("Moulinette");
            }
        });
    }
}

// NodeJS ortaminda (test icin) calisiyorsa module.exports
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DungeonGenerator;
}
