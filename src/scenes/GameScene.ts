import Player from "../Player";
import Inputs from "../Inputs";
import { tileSize } from "../consts";

export default class GameScene extends Phaser.Scene {
    level: any[];
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

    public create() {
        this._inputs = new Inputs(this);

        this.gen_level();

        // When loading from an array, make sure to specify the tileWidth and tileHeight
        const map = this.make.tilemap({
            data: this.level,
            tileWidth: 16,
            tileHeight: 16,
        });
        const tiles = map.addTilesetImage("tiles");
        this.layer = map.createLayer(0, tiles, 0, 0);
        this.layer.setCollisionBetween(1, 10);

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
