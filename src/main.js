var game = new Phaser.Game(160, 144, Phaser.CANVAS, 'gamejam8', {
  init: init,
  preload: preload,
  create: create,
  update: update,
  render: render
});

function init() {
  // setup gameboy like rendering
  gb.setup();
  // create the player
  // create all enemies
  factory.init();
}

function preload() {
  // load the player asset
  factory.preload.player();
  factory.preload.enemies();
  game.stage.backgroundColor = gb.c1;
}

function create() {
  factory.create.player();
  factory.create.enemies();
  // game.enemie.setup();
  // game.enemie2.setup();
  factory.enemies[0].spawn();
}

function update() {
  // game.physics.arcade.collide(game.player.sprite, game.enemie.sprite, function () {}, null, this);
}

function render() {
  // game.debug.body(game.player.sprite);
  // game.debug.body(game.enemie.sprite);
  // game.debug.body(game.enemie2.sprite);
  // if (game.player.bp.bullet && game.player.bp.bullet.alive) {
  //   game.debug.body(game.player.bp.bullet);
  // }
  // draw the gameboy like img
  gb.draw();
}
