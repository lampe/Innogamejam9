function Player(options) {
  var that = this;
  that.options = options;
  that.cursors = game.input.keyboard.createCursorKeys();
  that.alive = false;
  that.load = function () {
    game.load.atlasJSONHash(that.options.name, that.options.path + '.png', that.options.path + '.json');
  }
  that.add = function () {
    that.sprite = game.add.sprite(that.options.position.x, that.options.position.y, that.options.name);
    that.sprite.update = that.update;
    that.alive = true;
    that.sprite.anchor.setTo(0.5, 0.5);
    game.physics.enable(that.sprite, Phaser.Physics.ARCADE);
    that.sprite.body.collideWorldBounds = true;
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
  that.update = function () {
    if (game.player.sprite.alive) {
      game.physics.arcade.overlap(
        game.player.bp,
        game.enemie.sprite,
        function (bullet, enemie) {
          bullet.kill();
          enemie.kill();
        },
        null,
        this
      );

      game.player.sprite.body.velocity.x = 0;
      game.player.sprite.body.velocity.y = 0;
      if (game.player.cursors.left.isDown) {
        game.player.sprite.body.velocity.x = -game.player.options.speed;
      } else if (game.player.cursors.right.isDown) {
        game.player.sprite.body.velocity.x = game.player.options.speed;
      }
      if (game.player.cursors.up.isDown) {
        game.player.sprite.body.velocity.y = -game.player.options.speed;
      } else if (game.player.cursors.down.isDown) {
        game.player.sprite.body.velocity.y = game.player.options.speed;
      }
      if (game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
        game.player.bp.fire();
      }
    }
  }
  that.kill = function () {
    that.sprite.kill();
    that.alive = false;
  }
  return that;
}
