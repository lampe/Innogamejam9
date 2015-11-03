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
  game.player = new Player({
    speed: 150,
    name: "player1",
    path: 'assets/tmp/testpngbw',
    position: {
      x: 32,
      y: 32
    },
    frameRate: 10,
  });
}

function preload() {
  // load the player asset
  game.player.load();
  game.stage.backgroundColor = gb.c1;
}

function create() {
  // add the player, add the basic animation and play it
  game.player.setup();
}

function update() {
  // console.log(game.player.cursors.left.isDown);
  game.player.sprite.body.velocity.x = 0;
  game.player.sprite.body.velocity.y = 0;
  if (game.player.cursors.left.isDown) {
    game.player.sprite.body.velocity.x = - game.player.options.speed;
  } else if (game.player.cursors.right.isDown) {
    game.player.sprite.body.velocity.x = game.player.options.speed;
  }
  if (game.player.cursors.up.isDown) {
    game.player.sprite.body.velocity.y = -game.player.options.speed;
  } else if (game.player.cursors.down.isDown) {
    game.player.sprite.body.velocity.y = game.player.options.speed;
  }
}

function render() {

  // draw the gameboy like img
  gb.draw();
}
