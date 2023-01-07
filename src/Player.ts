import GameScene from "./scenes/GameScene";
import {tileSize} from "./consts";


export default class Player extends Phaser.Physics.Arcade.Sprite {
  public scene: GameScene;
  public body: Phaser.Physics.Arcade.Body;

  constructor(scene: GameScene, x: number, y: number) {
    const texture = "player";

    super(scene, x*tileSize+(tileSize/2), y*tileSize+(tileSize/2), texture);

    

    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);

    // this.body.setAllowDrag(true).setMaxVelocityX(160);

    this.scene.cameras.main.startFollow(this,true)

    this.setSize(tileSize).setCollideWorldBounds(true)
  }

  

  public preUpdate(time: number, delta: number) {
    const { left, right, down, up } = this.scene.inputs;
    
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    // Keyboard movement
    if (left)
    {
        //  Move to the left
        this.body.velocity.x += -150;
    }
    if (right)
    {
        //  Move to the right
        this.body.velocity.x += 150;
    }

    if (up)
    {
        //  Move to the left
        this.body.velocity.y += -150;
    }
    if (down)
    {
        //  Move to the right
        this.body.velocity.y += 150;
    }

    
    super.preUpdate(time, delta);
  }

  public setSize(height: number) {
    super.setSize(tileSize, height);

    this.body.setOffset(0, this.height - height);

    return this;
  }


}
