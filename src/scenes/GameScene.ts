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
    private debug: boolean;
    private debug_container: Phaser.GameObjects.Container;

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
        var mapping = {
            0: 36,
            1: 24,
            2: 36,
            3: 24,
            4: 37,
            5: 25,
            6: 37,
            7: 44,
            8: 36,
            9: 24,
            10: 48, // TODO
            11: 24,
            12: 37,
            13: 25,
            14: 37,
            15: 44,
            16: 0,
            17: 12,
            18: 0,
            19: 12,
            20: 1,
            21: 13,
            22: 1,
            23: 28,
            24: 0,
            25: 12,
            26: 0,
            27: 12,
            28: 8,
            29: 16,
            30: 8,
            31: 20,
            32: 36,
            33: 24,
            34: 36,
            35: 24,
            36: 37,
            37: 25,
            38: 37,
            39: 44,
            40: 36,
            41: 24,
            42: 48, // TODO
            43: 48, // TODO
            44: 37,
            45: 25,
            46: 37,
            47: 44,
            48: 0,
            49: 12,
            50: 0,
            51: 12,
            52: 1,
            53: 13,
            54: 1,
            55: 28,
            56: 0,
            57: 12,
            58: 0,
            59: 12,
            60: 8,
            61: 16,
            62: 8,
            63: 20,
            64: 39,
            65: 27,
            66: 39,
            67: 27,
            68: 38,
            69: 26,
            70: 38,
            71: 41,
            72: 39,
            73: 27,
            74: 39,
            75: 48, // TODO
            76: 38,
            77: 26,
            78: 38,
            79: 41,
            80: 3,
            81: 15,
            82: 3,
            83: 15,
            84: 2,
            85: 14,
            86: 2,
            87: 7,
            88: 3,
            89: 15,
            90: 3,
            91: 15,
            92: 5,
            93: 43,
            94: 5,
            95: 32,
            96: 39,
            97: 27,
            98: 39,
            99: 27,
            100: 38,
            101: 26,
            102: 38,
            103: 41,
            104: 39,
            105: 48, // TODO
            106: 39,
            107: 48, // TODO
            108: 38,
            109: 48, // TODO
            110: 38,
            111: 41,
            112: 11,
            113: 19,
            114: 11,
            115: 19,
            116: 6,
            117: 40,
            118: 6,
            119: 21,
            120: 11,
            121: 19,
            122: 11,
            123: 19,
            124: 10,
            125: 9,
            126: 10,
            127: 17,
            128: 36,
            129: 24,
            130: 36,
            131: 24,
            132: 37,
            133: 25,
            134: 37,
            135: 44,
            136: 36,
            137: 24,
            138: 48, // TODO
            139: 24,
            140: 37,
            141: 25,
            142: 37,
            143: 44,
            144: 0,
            145: 12,
            146: 0,
            147: 12,
            148: 1,
            149: 13,
            150: 1,
            151: 28,
            152: 0,
            153: 12,
            154: 48, // TODO
            155: 12,
            156: 8,
            157: 16,
            158: 8,
            159: 20,
            160: 36,
            161: 24,
            162: 48, // TODO
            163: 24,
            164: 48, // TODO
            165: 25,
            166: 48, // TODO
            167: 44,
            168: 48, // TODO
            169: 48, // TODO
            170: 48, // TODO
            171: 48, // TODO
            172: 48, // TODO
            173: 48, // TODO
            174: 48, // TODO
            175: 48, // TODO
            176: 0,
            177: 12,
            178: 48, // TODO
            179: 12,
            180: 48, // TODO
            181: 13,
            182: 48, // TODO
            183: 28,
            184: 0,
            185: 12,
            186: 48, // TODO
            187: 48, // TODO
            188: 48, // TODO
            189: 16,
            190: 8,
            191: 20,
            192: 39,
            193: 47,
            194: 39,
            195: 47,
            196: 38,
            197: 42,
            198: 38,
            199: 45,
            200: 39,
            201: 47,
            202: 48, // TODO
            203: 47,
            204: 38,
            205: 42,
            206: 38,
            207: 45,
            208: 3,
            209: 31,
            210: 3,
            211: 31,
            212: 2,
            213: 4,
            214: 2,
            215: 46,
            216: 3,
            217: 31,
            218: 48, // TODO
            219: 31,
            220: 5,
            221: 34,
            222: 5,
            223: 29,
            224: 39,
            225: 47,
            226: 39,
            227: 47,
            228: 38,
            229: 42,
            230: 38,
            231: 45,
            232: 39,
            233: 47,
            234: 48, // TODO
            235: 47,
            236: 38,
            237: 42,
            238: 38,
            239: 45,
            240: 11,
            241: 35,
            242: 11,
            243: 35,
            244: 6,
            245: 23,
            246: 6,
            247: 30,
            248: 11,
            249: 35,
            250: 11,
            251: 35,
            252: 10,
            253: 18,
            254: 10,
            255: 33,
        };
        this.tilemap = [];
        for (let y = 0; y < this.level_height; y++) {
            this.tilemap.push(Array(this.level_width));
            for (let x = 0; x < this.level_height; x++) {
                var t;
                if (this.level[y][x] == 0) {
                    this.tilemap[y][x] = 22;
                } else {
                    let surrounding = this.get_surrounding_tiles(x, y);
                    this.tilemap[y][x] = mapping[surrounding];
                }
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
        this.layer.setCollisionBetween(0, 21);
        this.layer.setCollisionBetween(23, 50);

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

        this.debug_container = this.add.container(0, 0);
        for (let y = 0; y < this.level_height; y++) {
            for (let x = 0; x < this.level_height; x++) {
                if (this.level[y][x] != 0) {
                    let t = this.add.bitmapText(
                        x * tileSize + 12,
                        y * tileSize + 12,
                        "font5",
                        this.get_surrounding_tiles(x, y).toString(),
                        -8
                    );
                    this.debug_container.add(t);
                }
            }
        }
        this.debug_container.visible = false;
        var debugkey = this.input.keyboard.addKey("i");
        debugkey.on("down", this.toggle_debug, this);
    }

    public toggle_debug(event) {
        this.debug = !this.debug;
        this.debug_container.visible = this.debug;
    }

    public update(time: number, delta: number): void {
        this.physics.collide(this.player, this.layer);
    }

    public get inputs() {
        return this._inputs;
    }
}
