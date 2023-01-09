export default class HudScene extends Phaser.Scene {
    fps: Phaser.GameObjects.BitmapText;
    constructor() {
        super({
            key: "hud",
            active: false,
            visible: false,
        });
    }

    public create() {
        this.fps = this.add.bitmapText(1, 1, "font5", "FPS: 9000");
        this.fps.setTint(0xffffff, 0xffffff, 0xffffff, 0xffffff);
        let b = this.add.rectangle(0, 0, 100, 32, 0x000000, 0.5);
        b.setOrigin(0, 0);
        let debug = this.add.container(540, 0, [b, this.fps]);
    }

    public update(time: number, delta: number): void {
        this.fps.text = "FPS: " + Math.floor(this.game.loop.actualFps);
    }
}
