import * as Phaser from 'phaser';
export default class Demo extends Phaser.Scene {
 tilesprite: Phaser.GameObjects.TileSprite;
 overlay: Phaser.GameObjects.Sprite;
 bg: Phaser.GameObjects.Image

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
  // this.bg = this.add.image(0, 0, 'bg').setOrigin(0, 0).setScale(3.2, 2.3);
  this.bg = this.add.image(this.game.config.width as number / 2, this.cameras.main.height as number / 2, 'bg');
  let scaleX = this.game.config.width as number / this.bg.width;
  let scaleY = this.game.config.height as number / this.bg.height;
  let scale = Math.max(scaleX, scaleY);
  console.log(scale);
  this.bg.setScale(scale).setScrollFactor(0);
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
 }


 update() {
  this.tilesprite.tilePositionX += 1;
  this.tilesprite.tilePositionY += 1;
 }
}

const config = {
 type: Phaser.AUTO,
 // width: '100%',
 // height: '100%',
 // scale: {
 //  mode: Phaser.Scale.FIT,
 //  autoCenter: Phaser.Scale.CENTER_BOTH
 // },
 physics: {
  default: 'arcade',
  arcade: {
   gravity: { y: 300 },
   debug: false
  },
 },
 scene: Demo
};

const game = new Phaser.Game(config);