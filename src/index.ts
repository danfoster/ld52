import "phaser";
import LoaderScene from "./scenes/LoaderScene";
import GameScene from "./scenes/GameScene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 320,
  height: 200,
  zoom:4,
  input: {
    keyboard: true,
    gamepad: true,
  },
  render: {
    pixelArt: true,
    antialias: false,
    antialiasGL: false,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: {
        y: 0,
      },
    },
  },
  scene: [LoaderScene, GameScene],
};

window.addEventListener("load", () => {
  new Phaser.Game(config);
});
