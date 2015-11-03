function Enemie(options) {
  var that = this;
  that.options = options;
  that.load = function () {
    game.load.atlasJSONHash(that.options.name, that.options.path + '.png', that.options.path + '.json');
  }
  that.add = function () {
    that.sprite = game.add.sprite(that.options.position.x, that.options.position.y, that.options.name);
  }
  that.basicyCycle = function () {
    that.sprite.animations.add('basic');
  }
  that.play = function () {
    that.sprite.animations.play('basic', this.options.frameRate, true);
  }
  that.setup = function () {
    that.add();
    that.basicyCycle();
    that.play();
  }
  return that;
}