export default class LoaderScene extends Phaser.Scene {
    public preload() {
        this.load.image("tiles", "assets/tiles/tilemap.png");
        this.load.spritesheet("player", "./assets/sprites/dog.png", {
            frameWidth: 16,
            frameHeight: 16,
        });
        this.load.bitmapFont(
            "font5",
            "assets/fonts/font5_0.png",
            "assets/fonts/font5.fnt"
        );
    }

    public create() {
        this.scene.start("game").start("hud");
    }
}
