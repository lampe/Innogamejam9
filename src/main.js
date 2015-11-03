var game = new Phaser.Game(160, 144, Phaser.CANVAS, 'gamejam8', {
  init: init,
  preload: preload,
  create: create,
  update: update,
  render: render
});
b
function init() {
  // setup gameboy like rendering
  gb.setup();
}


function preload() {
  game.stage.backgroundColor = gb.c1;
}

function create() {
}

function update() {

}

function render() {

  // draw the gameboy like img
  gb.draw();
}
