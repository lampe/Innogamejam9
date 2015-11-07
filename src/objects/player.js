function Player(options) {
  var that = this;
  that.options = options;
  that.cursors = game.input.keyboard.createCursorKeys();
  that.alive = false;
  that.life = 2;
  that.bp = [];
  that.gotHitTween = false;
  that.preload = function () {
    game.load.atlasJSONHash(that.options.name, that.options.path + '.png', that.options.path + '.json');
    for (var i = 0; i < that.bp.length; i++) {
      that.bp[i].preload();
    }
  }
  that.add = function () {
    that.sprite = game.add.sprite(that.options.position.x, that.options.position.y, that.options.name);
    for (var i = 0; i < that.bp.length; i++) {
      that.bp[i].load();
      that.bp[i].options.parent = that.sprite;
    }
    that.sprite.update = that.update;
    that.alive = true;
    that.sprite.anchor.setTo(0.5, 0.5);
    game.physics.enable(that.sprite, Phaser.Physics.ARCADE);
    that.sprite.body.collideWorldBounds = true;

  }
  that.basicyCycle = function () {
    game.player.sprite.fireAnimation = that.sprite.animations.add('fire', ['h_fire_0.png', 'h_fire_1.png', 'h_fire_2.png']);
    that.sprite.animations.add("idle", ['h_idle_0.png', 'h_idle_1.png']);
    that.sprite.animations.add('down', ["h_down_0.png"]);
    that.sprite.animations.add('up', ["h_up_0.png"]);
    that.sprite.animations.add('left', ["h_left_0.png"]);
    that.sprite.animations.add('right', ["h_right_0.png"]);

    that.sprite.events.onAnimationComplete.add(function () {
      that.sprite.animations.play('idle', 3, true);
    });

  }
  that.play = function () {
    that.sprite.animations.play('idle', 3, true);
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

      if (!game.player.sprite.fireAnimation.isPlaying) {
        that.sprite.animations.play('idle', 3, true);
      }
      if (game.player.cursors.left.isDown) {
        if (!game.player.sprite.fireAnimation.isPlaying) {
          that.sprite.animations.play('left', 3, true);
        } else {
          that.sprite.animations.play('idle', 3, true);
        }
        game.player.sprite.body.velocity.x = -game.player.options.speed;
      } else if (game.player.cursors.right.isDown) {
        if (!game.player.sprite.fireAnimation.isPlaying) {
          that.sprite.animations.play('right', 3, true);
        }
        game.player.sprite.body.velocity.x = game.player.options.speed;
      }
      if (game.player.cursors.up.isDown) {
        if (!game.player.sprite.fireAnimation.isPlaying) {
          that.sprite.animations.play('up', 3, true);
        } else {
          that.sprite.animations.play('idle', 3, true);
        }
        game.player.sprite.body.velocity.y = -game.player.options.speed;
      } else if (game.player.cursors.down.isDown) {
        if (!game.player.sprite.fireAnimation.isPlaying) {
          that.sprite.animations.play('down', 3, true);
        } else {
          that.sprite.animations.play('idle', 3, true);
        }
        game.player.sprite.body.velocity.y = game.player.options.speed;
      }

      if (game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
        that.sprite.animations.play('fire', 10, false);
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
    game.add.image(0, 0, 'bg');


    var style = {
      font: "bold 12px Arial",
      fill: "#fff",
      boundsAlignH: "center",
      boundsAlignV: "middle"
    };
    //  The Text is positioned at 0, 100
    text = game.add.text(0, 0, "Game over", style);
    // text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

    //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
    // text.setTextBounds(0, 100, 800, 100);
  }
  that.gotHit = function () {
    if (game.player.gotHitTween.isRunning) {
      return false;
    }
    if (game.player.life === 0) {
      game.player.kill()
    } else {
      game.player.life -= 1;
      game.player.gotHitTween = game.add.tween(game.player.sprite).to({
        alpha: 0
      }, 100, Phaser.Easing.Sinusoidal.Out, true, 0, 2, true);
    }
  };
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
    console.log(that);
    this.bp.push(new BulletPool({
      type: "JSON",
      name: "a",
      fireRate: 1,
      isActiv: true,
      size: 100,
      sprite: 'a',
      spritesheet: 'assets/hero/shot',
      spritesheetSize: {
        x: 32,
        y: 32
      },
      offset: {
        x: 0,
        y: 0
      },
      nextShot: 400,
      velocity: {
        x: 100,
        y: 0
      },
      startSprite: 8
    }));
    this.bp.push(new BulletPool({
      name: "b",
      size: 100,
      fireRate: 3,
      isActiv: false,
      sprite: 'bullet',
      spritesheet: 'assets/tmp/bullet.png',
      spritesheetSize: {
        x: 32,
        y: 32
      },
      nextShot: 300,
      velocity: {
        x: 100,
        y: 0
      },
      startSprite: 8
    }));
    this.bp.push(new BulletPool({
      name: "c",
      size: 100,
      isActiv: false,
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
      isActiv: false,
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
      isActiv: false,
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
