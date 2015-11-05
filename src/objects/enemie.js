function Enemie(options) {
  enemie = game.add.group();
  enemie.options = options;
  enemie.alive = false;
  enemie.bp = [];
  enemie.preload = function () {

    game.load.atlasJSONHash(this.options.name, this.options.path + '.png', this.options.path + '.json');
    for (var i = 0; i < this.bp.length; i++) {
      this.bp[i].preload();
    }
  }
  enemie.load = function () {
    this.enableBody = true;
    this.physicsBodyType = Phaser.Physics.ARCADE;
    this.createMultiple(this.options.size, this.options.name);
    this.setAll('anchor.x', 0.5);
    this.setAll('anchor.y', 0.5);
    this.offset = {
      x: 0,
      y: 0
    }
    for (var i = 0; i < this.bp.length; i++) {
      this.bp[i].load();
    }
    this.callAll('body.setSize', 'body', this.children[0].body.width * enemie.options.hitBoxScale, this.children[0].body.height * enemie.options.hitBoxScale);
    return true;
    // enemie.setAll('outOfBoundsKill', true);
    // enemie.setAll('checkWorldBounds', true);
  }
  enemie.spawn = function () {
      this.enemie = this.getFirstExists(false);
      this.enemie.body.setSize(10, 8, 3, 0);
      this.enemie.reset(game.width, game.height / 2);
      this.enemie.body.velocity.x = -23;
    }
    // enemie.basicyCycle = function () {
    // enemie.sprite.animations.add('basic');
    // }
    // enemie.play = function () {
    // enemie.sprite.animations.play('basic', enemie.options.frameRate, true);
    // }
  enemie.setup = function () {
    this.load();
    // enemie.add()
    // enemie.basicyCycle();
    // enemie.play();
  }
  enemie.update = function () {
    game.physics.arcade.overlap(
      game.player.sprite,
      this,
      function (bullet, enemie) {
        game.player.sprite.kill()
      },
      null,
      this
    );
    for (var i = 0; i < game.player.bp.length; i++) {
      if(game.player.bp[i].options.isActiv){
        game.physics.arcade.overlap(
          game.player.bp[i],
          this,
          function (bullet, enemie) {
            enemie.kill();
          },
          null,
          this
        );
      }
    }
  }
  enemie.addAllWeapons = function () {
    this.bp.push(new BulletPool({
      name: "a",
      isActiv: true,
      size: 100,
      sprite: 'bullet',
      spritesheet: 'assets/tmp/bullet.png',
      spritesheetSize: {
        x: 32,
        y: 32
      },
      nextShot: 400,
      velocity: {
        x: -60,
        y: 0
      },
      startSprite: 8
    }));
  }
  enemie.addAllWeapons();
  return enemie;
}
