import * as Phaser from 'phaser';
export default class Demo extends Phaser.Scene {
 platforms: Phaser.Physics.Arcade.StaticGroup;
 player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
 cursors: Phaser.Types.Input.Keyboard.CursorKeys;
 stars: Phaser.Physics.Arcade.Group;
 score = 0;
 scoreText: Phaser.GameObjects.Text;
 actualFpsText: Phaser.GameObjects.Text;
 bombs: Phaser.Physics.Arcade.Group;
 gameOver: boolean;

 constructor() {
  super('demo');
 }

 preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('ground', 'assets/platform.png');
  this.load.image('star', 'assets/star.png');
  this.load.image('bomb', 'assets/bomb.png');
  this.load.spritesheet('dude',
   './assets/dude.png',
   { frameWidth: 32, frameHeight: 48 }
  );
 }

 create() {
  const that = this;
  this.add.image(400, 300, 'sky');

  this.platforms = this.physics.add.staticGroup();

  this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

  this.platforms.create(600, 400, 'ground');
  this.platforms.create(50, 250, 'ground');
  this.platforms.create(750, 220, 'ground');

  //player
  this.player = this.physics.add.sprite(100, 450, 'dude');

  this.player.setBounce(0.2);
  this.player.setCollideWorldBounds(true);

  this.anims.create({
   key: 'left',
   frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
   frameRate: 10,
   repeat: -1
  });

  this.anims.create({
   key: 'turn',
   frames: [{ key: 'dude', frame: 4 }],
   frameRate: 20
  });

  this.anims.create({
   key: 'right',
   frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
   frameRate: 10,
   repeat: -1
  });
  this.physics.add.collider(this.player, this.platforms);

  this.cursors = this.input.keyboard.createCursorKeys();

  this.stars = this.physics.add.group({
   key: 'star',
   repeat: 11,
   setXY: { x: 12, y: 0, stepX: 70 }
  });

  this.stars.children.iterate(function (child: Phaser.Physics.Arcade.Sprite) {
   child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
   return true;
  });

  this.physics.add.collider(this.stars, this.platforms);

  function collectStar(player, star: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) {
   star.disableBody(true, true);

   that.score += 10;
   that.scoreText.setText('Score: ' + that.score);

   if (that.stars.countActive(true) === 0) {
    that.stars.children.iterate(function (child: Phaser.Physics.Arcade.Sprite) {

     child.enableBody(true, child.x, 0, true, true);
     return true;
    });

    var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

    var bomb = this.bombs.create(x, 16, 'bomb');
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

   }
  }
  this.physics.add.overlap(this.player, this.stars, collectStar, null, this);

  this.scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '24px', fill: '#FF0000' } as Phaser.Types.GameObjects.Text.TextStyle);

  this.bombs = this.physics.add.group();
  this.physics.add.collider(this.bombs, this.platforms);

  function hitBomb(player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody, bomb) {
   that.physics.pause();

   player.setTint(0xff0000);

   player.anims.play('turn');

   that.gameOver = true;
  }

  this.physics.add.collider(this.player, this.bombs, hitBomb, null, this);

  this.actualFpsText = this.add.text(10, 10, 'Fps: 0', { fontSize: '20px', fill: '#000', color: 'red' } as Phaser.Types.GameObjects.Text.TextStyle).setDisplayOrigin(0, -24)
 }

 update() {
  if (this.cursors.left.isDown) {
   this.player.setVelocityX(-160);

   this.player.anims.play('left', true);
  }
  else if (this.cursors.right.isDown) {
   this.player.setVelocityX(160);

   this.player.anims.play('right', true);
  }
  else {
   this.player.setVelocityX(0);

   this.player.anims.play('turn');
  }

  if (this.cursors.up.isDown && this.player.body.touching.down) {
   this.player.setVelocityY(-330);
  }
  const loop = this.sys.game.loop;
  this.actualFpsText.setText('Fps: ' + loop.actualFps);
 }
}

const config = {
 type: Phaser.AUTO,
 width: 800,
 height: 600,
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
