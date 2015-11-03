var gb = {
  scale: 3,
  canvas: null,
  context: null,
  width: 0,
  height: 0,
  c1:'rgb(154, 185, 50)',
  c2:'rgb(138, 169, 47)',
  c3:'rgb(49, 98, 54)',
  c4:'rgb(19, 58, 25)'
}

gb.setup = function () {
  PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST;
  //  Hide the un-scaled game canvas
  game.canvas.style['display'] = 'none';
  //  Create our scaled canvas. It will be the size of the game * whatever scale value you've set
  gb.canvas = Phaser.Canvas.create(this, game.width * gb.scale, game.height * gb.scale);
  //  Store a reference to the Canvas Context
  gb.context = gb.canvas.getContext('2d');
  //  Add the scaled canvas to the DOM
  Phaser.Canvas.addToDOM(gb.canvas);
  //  Disable smoothing on the scaled canvas
  Phaser.Canvas.setSmoothingEnabled(gb.context, false);
  //  Cache the width/height to avoid looking it up every render
  gb.width = gb.canvas.width;
  gb.height = gb.canvas.height;
}

gb.draw = function () {
  gb.context.drawImage(game.canvas, 0, 0, game.width, game.height, 0, 0, gb.width, gb.height);
}
