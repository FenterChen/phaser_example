import * as Phaser from 'phaser';
export default class Demo extends Phaser.Scene {
 tilesprite: Phaser.GameObjects.TileSprite;
 overlay: Phaser.GameObjects.Sprite;
 bg: Phaser.GameObjects.Image;;

 constructor() {
  super('demo');
 }

 preload() {
  this.load.image('bg', 'assets/displacement_BG.jpg');
  this.load.image('overlay', 'assets/overlay.png');
  this.load.image('pic', 'assets/displacement_BG.jpg');
  this.load.image('distort', 'texture/noisesmall.png');
 }

 create() {
  // const that = this;
  this.bg = this.add.image(0, 0, 'bg').setOrigin(0, 0).setScale(3.2, 2.3);
  this.tilesprite = this.add.tileSprite(0, 0, 1920, 1080, 'overlay').setOrigin(0, 0);
  const fx = this.tilesprite.postFX.addDisplacement('distort', -0.01, -0.01);
  this.tweens.add({
   targets: fx,
   x: 0.01,
   y: 0.01,
   yoyo: true,
   loop: -1,
   duration: 2000,
   ease: 'sine.inout'
  });
  // this.tilesprite.setOrigin(0, 0)
 }


 update() {
  this.tilesprite.tilePositionX += 1;
  this.tilesprite.tilePositionY += 1;
 }
}

const config = {
 type: Phaser.AUTO,
 width: window.innerWidth,
 height: window.innerHeight,
 physics: {
  default: 'arcade',
  arcade: {
   gravity: { y: 300 },
   debug: false
  },
 },
 scene: Demo
};
console.log(config)

const game = new Phaser.Game(config);