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

    private get_surrounding_tiles(x: number, y: number): number[] {
        var dirs = [
            [0, -1],
            [1, 0],
            [0, 1],
            [-1, 0],
        ];
        var results = [];
        for (var dir of dirs) {
            let x2 = x + dir[0];
            let y2 = y + dir[1];
            if (
                x2 < 0 ||
                y2 < 0 ||
                y2 >= this.level_height ||
                x2 >= this.level_width
            ) {
                results.push(1);
            } else {
                results.push(this.level[y2][x2]);
            }
        }
        return results;
    }

    private get_surrounding_diags(x: number, y: number): number[] {
        var dirs = [
            [-1, -1],
            [1, -1],
            [1, 1],
            [-1, 1],
        ];
        var results = [];
        for (var dir of dirs) {
            let x2 = x + dir[0];
            let y2 = y + dir[1];
            if (
                x2 < 0 ||
                y2 < 0 ||
                y2 >= this.level_height ||
                x2 >= this.level_width
            ) {
                results.push(1);
            } else {
                results.push(this.level[y2][x2]);
            }
        }
        return results;
    }

    private gen_tilemap() {
        this.tilemap = [];
        for (let y = 0; y < this.level_height; y++) {
            this.tilemap.push(Array(this.level_width));
            for (let x = 0; x < this.level_height; x++) {
                if (this.level[y][x] == 0) {
                    this.tilemap[y][x] = 0;
                } else {
                    let surrounding = this.get_surrounding_tiles(x, y);
                    if (Utils.array_equals(surrounding, [1, 1, 0, 1])) {
                        let surrounding = this.get_surrounding_diags(x, y);
                        if (
                            Utils.array_equals(
                                surrounding.slice(0, 3),
                                [0, 1, 1]
                            )
                        ) {
                            this.tilemap[y][x] = 30;
                        } else if (
                            Utils.array_equals(
                                surrounding.slice(0, 3),
                                [1, 0, 1]
                            )
                        ) {
                            this.tilemap[y][x] = 31;
                        } else if (
                            Utils.array_equals(
                                surrounding.slice(0, 3),
                                [0, 0, 1]
                            )
                        ) {
                            this.tilemap[y][x] = 32;
                        } else {
                            this.tilemap[y][x] = 1;
                        }
                    } else if (Utils.array_equals(surrounding, [0, 0, 0, 0])) {
                        this.tilemap[y][x] = 8;
                    } else if (Utils.array_equals(surrounding, [0, 1, 0, 1])) {
                        this.tilemap[y][x] = 5;
                    } else if (Utils.array_equals(surrounding, [0, 1, 0, 0])) {
                        this.tilemap[y][x] = 6;
                    } else if (Utils.array_equals(surrounding, [0, 0, 0, 1])) {
                        this.tilemap[y][x] = 7;
                    } else if (Utils.array_equals(surrounding, [0, 0, 1, 0])) {
                        this.tilemap[y][x] = 23;
                    } else if (Utils.array_equals(surrounding, [1, 1, 0, 0])) {
                        this.tilemap[y][x] = 2;
                    } else if (Utils.array_equals(surrounding, [1, 0, 0, 1])) {
                        this.tilemap[y][x] = 3;
                    } else if (Utils.array_equals(surrounding, [1, 0, 0, 0])) {
                        this.tilemap[y][x] = 4;
                    } else if (Utils.array_equals(surrounding, [1, 0, 1, 0])) {
                        this.tilemap[y][x] = 12;
                    } else if (Utils.array_equals(surrounding, [1, 1, 1, 0])) {
                        let surrounding = this.get_surrounding_diags(x, y);
                        if (surrounding[2] == 0) {
                            this.tilemap[y][x] = 17;
                        } else {
                            this.tilemap[y][x] = 13;
                        }
                    } else if (Utils.array_equals(surrounding, [1, 0, 1, 1])) {
                        let surrounding = this.get_surrounding_diags(x, y);
                        if (Utils.array_equals(surrounding, [1, 1, 1, 1])) {
                            this.tilemap[y][x] = 11;
                        } else if (surrounding[3] == 0) {
                            this.tilemap[y][x] = 19;
                        } else {
                            this.tilemap[y][x] = 14;
                        }
                    } else if (Utils.array_equals(surrounding, [0, 1, 1, 0])) {
                        let surrounding = this.get_surrounding_diags(x, y);
                        if (surrounding[2] == 0) {
                            this.tilemap[y][x] = 40;
                        } else {
                            this.tilemap[y][x] = 20;
                        }
                    } else if (Utils.array_equals(surrounding, [0, 0, 1, 1])) {
                        this.tilemap[y][x] = 21;
                    } else if (Utils.array_equals(surrounding, [0, 1, 1, 1])) {
                        this.tilemap[y][x] = 22;
                    } else if (Utils.array_equals(surrounding, [1, 1, 1, 1])) {
                        let surrounding = this.get_surrounding_diags(x, y);
                        if (Utils.array_equals(surrounding, [1, 1, 1, 1])) {
                            this.tilemap[y][x] = 11;
                        } else if (
                            Utils.array_equals(surrounding, [1, 1, 0, 1])
                        ) {
                            this.tilemap[y][x] = 16;
                        } else if (
                            Utils.array_equals(surrounding, [1, 1, 1, 0])
                        ) {
                            this.tilemap[y][x] = 15;
                        } else if (
                            Utils.array_equals(surrounding, [1, 1, 0, 0])
                        ) {
                            this.tilemap[y][x] = 18;
                        } else if (
                            Utils.array_equals(surrounding.slice(0, 2), [0, 1])
                        ) {
                            this.tilemap[y][x] = 24;
                        } else if (
                            Utils.array_equals(surrounding.slice(0, 2), [1, 0])
                        ) {
                            this.tilemap[y][x] = 25;
                        } else if (
                            Utils.array_equals(surrounding.slice(0, 2), [0, 0])
                        ) {
                            this.tilemap[y][x] = 26;
                        } else {
                            this.tilemap[y][x] = 10;
                        }
                    } else {
                        this.tilemap[y][x] = 10;
                    }
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
        this.layer.setCollisionBetween(1, 100);

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
    }

    public update(time: number, delta: number): void {
        this.physics.collide(this.player, this.layer);
    }

    public get inputs() {
        return this._inputs;
    }
}
