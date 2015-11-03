var pixel = {
  scale: 3,
  canvas: null,
  context: null,
  width: 0,
  height: 0
}
var game = new Phaser.Game(160, 144, Phaser.CANVAS, 'phaser-example', {
  init: init,
  preload: preload,
  create: create,
  update: update,
  render: render
});

function init() {
  PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST;
  //  Hide the un-scaled game canvas
  game.canvas.style['display'] = 'none';
  //  Create our scaled canvas. It will be the size of the game * whatever scale value you've set
  pixel.canvas = Phaser.Canvas.create(this, game.width * pixel.scale, game.height * pixel.scale);
  //  Store a reference to the Canvas Context
  pixel.context = pixel.canvas.getContext('2d');

  //  Add the scaled canvas to the DOM
  Phaser.Canvas.addToDOM(pixel.canvas);

  //  Disable smoothing on the scaled canvas
  Phaser.Canvas.setSmoothingEnabled(pixel.context, false);

  //  Cache the width/height to avoid looking it up every render
  pixel.width = pixel.canvas.width;
  pixel.height = pixel.canvas.height;

}
// var p2

function preload() {
  // game.stage.backgroundColor = '#fff';
  // game.load.image('mushroom', 'Mario1.bmp');
  // game.load.atlasJSONHash('cityscene', 'testpngbw.png', 'testpngbw.json');
  //   game.load.audio('cry', ['006.wav']);
  //   game.load.audio('theme', ['101-opening.mp3']);

}


// var text;
// var test;
// var capguy;
// var cry;
// var theme;
function create() {
  // p2 = new Phaser.Point(game.world.width / 2, game.world.height / 2);
  //
  // capguy = game.add.sprite(game.world.width / 2, game.world.height / 2, 'cityscene');
  // capguy.animations.add('walk');
  // capguy.animations.play('walk', 8, true);
  // capguy.anchor.setTo(0.5, 0.5);
  //
  // var style = {
  //   font: "bold 22px pokemon",
  //   fill: "rgb(119, 119, 119)",
  //   boundsAlignH: "center",
  //   boundsAlignV: "middle"
  // };
  // text = game.add.text(0, 0, " DoGeMon ", style);
  // text.anchor.setTo(0.5, 0.5);
  // text.position.y = game.world.height/2 - (text.height);
  // text.position.x = game.world.width/2;
  //
  //  cry = game.add.audio('cry');
  //  theme = game.add.audio('theme');
  //
  //  cry.play();
  //  theme.play();
  //  cry.onStop.add(function(){
  //
  //  },this);
  // var mummy = game.add.sprite(100, 100, 'mummy');
  // var walk = mummy.animations.add('walk');

  //  And this starts the animation playing by using its key ("walk")
  //  30 is the frame rate (30fps)
  //  true means it will loop when it finishes
  // mummy.animations.play('walk', 30, true);
  // test = game.add.sprite(200, 200, 'mushroom');
  // test.anchor.setTo(0.5, 0.5);
  // test.position.y = game.world.height/2 - (test.height);
  // test.position.x = game.world.width/2;

}

function update() {}

var i = 0
var pos = undefined;

function render() {

  // capguy.rotation += 0.01;

  // test.rotation += 0.01;
  // text.position.x = game.world.width - (20 * sm);
  // text.position.y = game.world.height - (77 * sm);
  // text.setTextBounds(0, 10, game.world.width, game.world.height / 2);
  // if (pos === undefined) {
  //   pos = {
  //     x: game.world.width / 2 - (text.width / 2) + 10,
  //     y: game.world.height / 2
  //   };
  // } else {
  //   if (pos.x >= (game.world.width / 2 + (text.width / 2) - 10)) {
  //     pos = {
  //       x: game.world.width / 2 - (text.width / 2) + 10,
  //       y: game.world.height / 2
  //     };
  //   } else {
  //     if (i % 5 === 0) {
  //       pos.x += sm;
  //     }
  //   }

  // game.context.fillStyle = 'rgb(145, 158, 126)';
  // game.context.fillRect(pos.x, pos.y, 10, 10);
  // game.context.fillStyle = '#607873';
  // game.context.fillRect(pos.x - 2.5, pos.y, 10, 10);
  // game.context.fillStyle = '#435954';
  // game.context.fillRect(pos.x - 5, pos.y, 10, 10);

  // }
  pixel.context.drawImage(game.canvas, 0, 0, game.width, game.height, 0, 0, pixel.width, pixel.height);
  i++;
}
