import "phaser";
import LoaderScene from "./scenes/LoaderScene";
import GameScene from "./scenes/GameScene";
import HudScene from "./scenes/HudScene";

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 640,
    height: 400,
    zoom: 2,
    input: {
        keyboard: true,
        gamepad: true,
    },
    pixelArt: true,
    fps: {
        forceSetTimeOut: true,
        // panicMax: 0,
        // smoothStep: false,
        target: 30,
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
    scene: [LoaderScene, GameScene, HudScene],
};

window.addEventListener("load", () => {
    new Phaser.Game(config);
});
