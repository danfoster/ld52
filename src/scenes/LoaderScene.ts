export default class LoaderScene extends Phaser.Scene {
  public preload() {
    this.load.image("tiles", "assets/tiles/tilemap.png");
    this.load.spritesheet("player", "./assets/sprites/dog.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
  }

  public create() {
    this.scene.start("game");
  }
}
