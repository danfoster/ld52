export default class LoaderScene extends Phaser.Scene {
    public preload() {
        this.load.image("tiles", "assets/tiles/tilemap.png");
        this.load.spritesheet("player", "./assets/sprites/dog.png", {
            frameWidth: 16,
            frameHeight: 16,
        });
        this.load.bitmapFont(
            "font1",
            "assets/fonts/font1.png",
            "assets/fonts/font1.fnt"
        );
        this.load.bitmapFont(
            "font2",
            "assets/fonts/font2.png",
            "assets/fonts/font2.fnt"
        );

        this.load.bitmapFont(
            "font3",
            "assets/fonts/font3.png",
            "assets/fonts/font3.fnt"
        );
        this.load.bitmapFont(
            "font4",
            "assets/fonts/font4.png",
            "assets/fonts/font4.fnt"
        );
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
