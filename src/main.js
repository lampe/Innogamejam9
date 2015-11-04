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
      y: 70
    },
    frameRate: 10,
  });

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

  game.stage.backgroundColor = gb.c1;
}

function create() {
  // add the player, add the basic animation and play it
  game.player.setup();
  game.enemie.setup();
  game.enemie2.setup();

}

function update() {
  game.physics.arcade.collide(game.player.sprite, game.enemie.sprite, function(){
    console.log("asdasdasds");
  }, null, this);

  // update the player is he is alive
  if (game.player.sprite.alive) {
    // game.player.update();
  }

}

function render() {
  game.debug.body(game.player.sprite);
  game.debug.body(game.enemie.sprite);
  game.debug.body(game.enemie2.sprite);
  // draw the gameboy like img
  gb.draw();
}
