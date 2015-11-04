var game = new Phaser.Game(160, 144, Phaser.CANVAS, 'gamejam8', {
  init: init,
  preload: preload,
  create: create,
  update: update,
  render: render
});

function init() {
  game.load.spritesheet('bullet', 'assets/tmp/bullet.png', 32, 32);

  // setup gameboy like rendering
  gb.setup();
  game.player = new Player({
    speed: 150,
    name: "player1",
    path: 'assets/tmp/testpngbw',
    position: {
      x: 32,
      y: 70
    },
    frameRate: 10,
  });
  game.player.bp = new BulletPool();
  bp2 = new BulletPool();

  game.enemie = new Enemie({
    speed: 150,
    name: "player1",
    path: 'assets/tmp/testpngbw',
    position: {
      x: 100,
      y: 50
    },
    hitBoxScale: 0.5,
    frameRate: 10,
  });
  game.enemie2 = new Enemie({
    speed: 150,
    name: "player1",
    path: 'assets/tmp/testpngbw',
    position: {
      x: 100,
      y: 100
    },
    hitBoxScale: 0.9,
    frameRate: 10,
  });
}

function preload() {
  // load the player asset
  game.player.load();
  game.enemie.load();
  game.enemie2.load();
  game.player.bp.preload();
  game.stage.backgroundColor = gb.c1;
}

function create() {
  // add the player, add the basic animation and play it
  game.player.setup();
  game.enemie.setup();
  game.enemie2.setup();
  game.player.bp.load();
  bp2.load()
}

function update() {
  game.physics.arcade.collide(game.player.sprite, game.enemie.sprite, function () {}, null, this);
}

function render() {
  game.debug.body(game.player.sprite);
  game.debug.body(game.enemie.sprite);
  game.debug.body(game.enemie2.sprite);
  if (game.player.bp.bullet && game.player.bp.bullet.alive) {
    game.debug.body(game.player.bp.bullet);
  }
  // draw the gameboy like img
  gb.draw();
}
