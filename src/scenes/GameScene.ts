import Player from "../Player";
import Inputs from "../Inputs";
import { tileSize } from "../consts";
import { Utils } from "../utils";

export default class GameScene extends Phaser.Scene {
    level: number[][];
    tilemap: number[][];
    readonly level_width = 100;
    readonly level_height = 100;
    private _inputs: Inputs;
    private layer: Phaser.Tilemaps.TilemapLayer;
    private player: Player;

    constructor() {
        super({
            key: "game",
            active: false,
            visible: false,
        });
    }

    public gen_level() {
        // Load a map from a 2D array of tile indices
        let level = [];
        for (let y = 0; y < this.level_height; y++) {
            level.push(Array(this.level_width).fill(1));
        }

        let x = Math.floor(this.level_width / 2);
        let y = Math.floor(this.level_height / 2);
        for (let cells = 0; cells < 10000; ) {
            if (level[y][x] != 0) {
                cells++;
            }
            level[x][y] = 0;

            switch (Math.floor(Math.random() * 4)) {
                case 0: {
                    y++;
                    break;
                }
                case 1: {
                    x++;
                    break;
                }
                case 2: {
                    y--;
                    break;
                }
                case 3: {
                    x--;
                    break;
                }
            }
            x = Math.max(1, Math.min(x, this.level_width - 2));
            y = Math.max(1, Math.min(y, this.level_height - 2));
        }

        this.level = level;
    }

    private get_surrounding_tiles(x: number, y: number): number {
        var dirs = [
            [0, -1],
            [1, -1],
            [1, 0],
            [1, 1],
            [0, 1],
            [-1, 1],
            [-1, 0],
            [-1, -1],
        ];
        var results = 0;
        for (let i = 0; i < dirs.length; i++) {
            let x2 = x + dirs[i][0];
            let y2 = y + dirs[i][1];
            if (
                x2 < 0 ||
                y2 < 0 ||
                y2 >= this.level_height ||
                x2 >= this.level_width
            ) {
                results |= 1 << i;
            } else {
                results |= this.level[y2][x2] << i;
            }
        }
        return results;
    }

    private gen_tilemap() {
        this.tilemap = [];
        for (let y = 0; y < this.level_height; y++) {
            this.tilemap.push(Array(this.level_width));
            for (let x = 0; x < this.level_height; x++) {
                var t;
                if (this.level[y][x] == 0) {
                    t = 22;
                } else {
                    let surrounding = this.get_surrounding_tiles(x, y);
                    switch (surrounding) {
                        case 16:
                        case 24:
                        case 56:
                        case 50:
                        case 48:
                        case 18:
                        case 144:
                            t = 0;
                            break;
                        case 20:
                        case 22:
                            t = 1;
                            break;
                        case 212:
                            t = 2;
                            break;
                        case 213:
                            t = 4;
                            break;
                        case 80:
                        case 88:
                            t = 3;
                            break;
                        case 92:
                        case 220:
                        case 94:
                            t = 5;
                            break;
                        case 116:
                        case 244:
                            t = 6;
                            break;
                        case 28:
                        case 60:
                        case 30:
                        case 189:
                        case 62:
                            t = 8;
                            break;
                        case 125:
                            t = 9;
                            break;

                        case 124:
                        case 126:
                        case 252:
                        case 254:
                            t = 10;
                            break;
                        case 112:
                        case 120:
                        case 240:
                        case 248:
                        case 122:
                        case 242:
                            t = 11;
                            break;
                        case 25:
                        case 19:
                        case 49:
                        case 17:
                        case 153:
                        case 155:
                        case 145:
                        case 57:
                        case 177:
                            t = 12;
                            break;
                        case 149:
                        case 21:
                            t = 13;
                            break;
                        case 85:
                            t = 14;
                            break;
                        case 81:
                            t = 15;
                            break;
                        case 29:
                        case 61:
                            t = 16;
                            break;
                        case 127:
                        case 98:
                            t = 17;
                            break;
                        case 253:
                            t = 18;
                            break;
                        case 121:
                        case 113:
                            t = 19;
                            break;
                        case 31:
                        case 63:
                        case 159:
                        case 191:
                            t = 20;
                            break;
                        case 119:
                            t = 21;
                            break;
                        case 245:
                            t = 23;
                            break;
                        case 3:
                        case 1:
                        case 9:
                        case 129:
                        case 33:
                        case 35:
                        case 131:
                        case 11:
                            t = 24;
                            break;
                        case 5:
                        case 13:
                            t = 25;
                            break;
                        case 23:
                        case 151:
                            t = 28;
                            break;
                        case 223:
                            t = 29;
                            break;
                        case 247:
                            t = 30;
                            break;
                        case 209:
                        case 211:
                            t = 31;
                            break;
                        case 95:
                            t = 32;
                            break;
                        case 255:
                            t = 33;
                            break;
                        case 221:
                            t = 24;
                            break;
                        case 241:
                        case 243:
                        case 249:
                        case 251:
                            t = 35;
                            break;
                        case 0:
                        case 2:
                        case 8:
                        case 128:
                        case 32:
                            t = 36;
                            break;
                        case 12:
                        case 6:
                        case 4:
                        case 14:
                        case 36:
                        case 46:
                        case 132:
                        case 38:
                            t = 37;
                            break;
                        case 68:
                        case 228:
                        case 76:
                        case 70:
                        case 78:
                        case 108:
                        case 204:
                        case 100:
                        case 196:
                        case 236:
                            t = 38;
                            break;
                        case 64:
                        case 96:
                        case 192:
                        case 224:
                        case 66:
                        case 72:
                        case 194:
                            t = 39;
                            break;
                        case 117:
                            t = 20;
                            break;
                        case 71:
                        case 79:
                        case 103:
                            t = 41;
                            break;
                        case 197:
                        case 229:
                            t = 42;
                            break;
                        case 7:
                        case 135:
                        case 167:
                        case 39:
                        case 15:
                        case 143:
                            t = 44;
                            break;
                        case 199:
                        case 231:
                        case 239:
                        case 207:
                            t = 45;
                            break;
                        case 215:
                            t = 46;
                            break;
                        case 195:
                        case 227:
                        case 223:
                        case 225:
                        case 201:
                        case 193:
                            t = 47;
                            break;
                        default:
                            t = 48;
                            break;
                    }
                }
                this.tilemap[y][x] = t;
            }
        }
    }

    public create() {
        this._inputs = new Inputs(this);

        this.gen_level();
        this.gen_tilemap();

        // When loading from an array, make sure to specify the tileWidth and tileHeight
        const map = this.make.tilemap({
            data: this.tilemap,
            tileWidth: 16,
            tileHeight: 16,
        });
        const tiles = map.addTilesetImage("tiles");
        this.layer = map.createLayer(0, tiles, 10, 10);
        // this.layer.setCollisionBetween(1, 100);

        let x = Math.floor(this.level_width / 2);
        let y = Math.floor(this.level_height / 2);

        this.cameras.main.setBounds(
            0,
            0,
            this.level_width * tileSize,
            this.level_height * tileSize
        );
        this.cameras.main.deadzone = new Phaser.Geom.Rectangle(
            100,
            100,
            220,
            140
        );
        this.physics.world.setBounds(
            0,
            0,
            this.level_width * tileSize,
            this.level_height * tileSize
        );
        this.cameras.main.setZoom(2);
        this.player = new Player(this, x, y);

        for (let y = 0; y < this.level_height; y++) {
            for (let x = 0; x < this.level_height; x++) {
                if (this.level[y][x] != 0) {
                    this.add.bitmapText(
                        x * tileSize + 12,
                        y * tileSize + 12,
                        "font5",
                        this.get_surrounding_tiles(x, y).toString(),
                        -8
                    );
                }
            }
        }
    }

    public update(time: number, delta: number): void {
        this.physics.collide(this.player, this.layer);
    }

    public get inputs() {
        return this._inputs;
    }
}
