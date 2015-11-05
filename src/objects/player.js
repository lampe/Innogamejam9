function Player(options) {
  var that = this;
  that.options = options;
  that.cursors = game.input.keyboard.createCursorKeys();
  that.alive = false;
  that.bp = [];
  that.preload = function () {
    game.load.atlasJSONHash(that.options.name, that.options.path + '.png', that.options.path + '.json');
    for (var i = 0; i < this.bp.length; i++) {
      this.bp[i].preload();
    }
  }
  that.add = function () {
    that.sprite = game.add.sprite(that.options.position.x, that.options.position.y, that.options.name);
    that.sprite.update = that.update;
    that.alive = true;
    that.sprite.anchor.setTo(0.5, 0.5);
    game.physics.enable(that.sprite, Phaser.Physics.ARCADE);
    that.sprite.body.collideWorldBounds = true;
    for (var i = 0; i < this.bp.length; i++) {
      this.bp[i].load();
    }
  }
  that.basicyCycle = function () {
    that.sprite.animations.add('basic');
  }
  that.play = function () {
    that.sprite.animations.play('basic', this.options.frameRate, true);
  }
  that.create = function () {
    that.add();
    that.basicyCycle();
    that.play();
  }
  that.update = function () {
    if (game.player.sprite.alive) {
      for (var i = 0; i < game.player.bp.length; i++) {
        // game.physics.arcade.overlap(
        //   game.player.bp[i],
        //   game.enemie.sprite,
        //   function (bullet, enemie) {
        //     bullet.kill();
        //     enemie.kill();
        //   },
        //   null,
        //   this
        // );
      }

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
        for (var i = 0; i < game.player.bp.length; i++) {
          if (game.player.bp[i].options.isActiv) {
            game.player.bp[i].fire();
          }
        }
      }
    }
  }
  that.kill = function () {
    that.sprite.kill();
    that.alive = false;
  }
  that.weaponOn = function (name) {
    for (var i = 0; i < game.player.bp.length; i++) {
      if (game.player.bp[i].options.name === name) {
        game.player.bp[i].options.isActiv = true
      }
    }
  }
  that.weaponOff = function (name) {
    for (var i = 0; i < game.player.bp.length; i++) {
      console.log(game.player.bp[i].options.name === name);
      if (game.player.bp[i].options.name === name) {
        game.player.bp[i].options.isActiv = false
      }
    }
  }
  that.addAllWeapons = function () {
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
        x: 60,
        y: 0
      },
      startSprite: 8
    }));
    this.bp.push(new BulletPool({
      name: "b",
      size: 100,
      isActiv: true,
      sprite: 'bullet',
      spritesheet: 'assets/tmp/bullet.png',
      spritesheetSize: {
        x: 32,
        y: 32
      },
      nextShot: 400,
      velocity: {
        x: 60,
        y: 60
      },
      startSprite: 8
    }));
    this.bp.push(new BulletPool({
      name: "c",
      size: 100,
      isActiv: true,
      sprite: 'bullet',
      spritesheet: 'assets/tmp/bullet.png',
      spritesheetSize: {
        x: 32,
        y: 32
      },
      nextShot: 400,
      velocity: {
        x: 60,
        y: -60
      },
      startSprite: 8
    }));
    this.bp.push(new BulletPool({
      name: "d",
      size: 100,
      isActiv: true,
      sprite: 'bullet',
      spritesheet: 'assets/tmp/bullet.png',
      spritesheetSize: {
        x: 32,
        y: 32
      },
      nextShot: 400,
      velocity: {
        x: 60,
        y: -30
      },
      startSprite: 8
    }));
    this.bp.push(new BulletPool({
      name: "e",
      size: 100,
      isActiv: true,
      sprite: 'bullet',
      spritesheet: 'assets/tmp/bullet.png',
      spritesheetSize: {
        x: 32,
        y: 32
      },
      nextShot: 400,
      velocity: {
        x: 60,
        y: 30
      },
      startSprite: 8
    }));
  }
  that.addAllWeapons();
  return that;
}
