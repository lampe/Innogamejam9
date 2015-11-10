function Wolf(options) {
  wolf = game.add.group();
  wolf.bp = [];
  wolf.life = 50;
  wolf.phase = 1;
  wolf.preload = function () {
    game.load.image("wolfPawL", 'assets/boss/w_armL.png');
    game.load.atlasJSONHash("wolfHead", 'assets/boss/w_head.png', 'assets/boss/w_head.json');
    game.load.atlasJSONHash("wolfBooty", 'assets/boss/w_body.png', 'assets/boss/w_body.json');
    // game.load.atlasJSONHash("wolfPawL", 'assets/boss/wolf_pfote.png', 'assets/boss/wolf_pfote.json');
    game.load.atlasJSONHash("wolfTail", 'assets/boss/w_tail.png', 'assets/boss/w_tail.json');
    game.load.atlasJSONHash("wolfHead2", 'assets/boss/w_s3.png', 'assets/boss/w_s3.json')
    game.load.image("wolfHeart", "assets/boss/ui_health_boss.png");
    for (var i = 0; i < wolf.bp.length; i++) {
      wolf.bp[i].preload();
    }
  }
  wolf.load = function () {
    this.enableBody = true;
    this.physicsBodyType = Phaser.Physics.ARCADE;
    this.wolfPawL = game.add.sprite(game.width + 80, game.height * 0.4, 'wolfPawL');
    this.wolfBooty = game.add.sprite(game.width + 30, game.height * 0.6, 'wolfBooty');
    this.wolfHead = game.add.sprite(game.width + 55, game.height * 0.15, 'wolfHead');
    this.wolfTail = game.add.sprite(game.width + 50, game.height * 0.8, 'wolfTail');
    this.wolfTail.animations.add('fire');
    this.wolfBooty.idleAnimation = this.wolfBooty.animations.add('idle');
    this.wolfBooty.idleAnimation.delay = 5000;
    this.wolfHead.animations.add('idle', ['w_head_idle1.png', 'w_head_idle2.png']);
    this.wolfHead.animations.add('s2', ['w_head_s2_1.png', 'w_head_s2_1.png', 'w_head_s2_1.png', 'w_head_s2_1.png', 'w_head_s2_1.png', 'w_head_s2_1.png', 'w_head_s2_1.png', 'w_head_s2_1.png', 'w_head_s2_1.png', 'w_head_s2_1.png', 'w_head_s2_1.png', 'w_head_s2_2.png', 'w_head_s2_3.png']);
    this.wolfHead.animations.add('s2open', ['w_head_s2_3.png', 'w_head_s2_3.png', 'w_head_s2_3.png']);
    this.wolfPawL.tween = {};
    this.wolfBooty.tween = {};
    this.wolfHead.tween = {};
    this.wolfTail.tween = {};
    this.wolfBooty.tween.dead = {};
    this.wolfHead.angle = 70;
    this.add(this.wolfPawL);
    this.add(this.wolfBooty);
    this.add(this.wolfHead);
    this.add(this.wolfTail);

    wolf.cry1 = game.add.audio('wolfCry1');
    wolf.cry2 = game.add.audio('wolfCry2');
    wolf.cry3 = game.add.audio('wolfCry3');

    this.setAll('anchor.x', 0.5);
    this.setAll('anchor.y', 0.5);
    for (var i = 0; i < this.bp.length; i++) {
      this.bp[i].load();
      this.bp[i].options.parent = this.wolfHead;
    }
    heartY = 0;
    this.heart = [];
    life = this.life / 10;
    for (var i = 0; i < life; i++) {
      this.heart[i] = game.add.sprite(game.width - 12, heartY, "wolfHeart");
      heartY += 10;
    }
    return true;
  }
  wolf.intro = function () {
    this.introIsRunning = true;
    this.wolfTail.body.setSize(this.wolfTail.body.width * 0.8, this.wolfTail.body.height);
    this.wolfBooty.body.setSize(this.wolfBooty.body.width * 0.4, this.wolfBooty.body.height);
    this.wolfPawL.body.setSize(this.wolfPawL.body.width * 0.1, this.wolfPawL.body.height);
    this.wolfHead.body.setSize(this.wolfHead.body.width * 0.3, this.wolfHead.body.height);

    this.wolfBooty.tween.intro = game.add.tween(this.wolfBooty).to({
      x: game.width - 50,
      y: game.height * 0.64
    }, 1000, Phaser.Easing.Sinusoidal.InOut, true, 0)

    this.wolfHead.tween.intro = game.add.tween(this.wolfHead).to({
      x: game.width - 60,
      y: game.height * 0.23
    }, 1000, Phaser.Easing.Sinusoidal.InOut, true, 0);

    game.add.tween(this.wolfHead).to({
      angle: 0
    }, 500, Phaser.Easing.Sinusoidal.InOut, true, 600);
    setTimeout(function () {
      wolf.cry3.play();
    }, 250);
    this.wolfPawL.tween.intro = game.add.tween(this.wolfPawL).to({
      x: game.width - 90
    }, 1000, Phaser.Easing.Quadratic.InOut, true, 0).start();
    this.wolfTail.sendToBack();
    this.wolfTail.tween.intro = game.add.tween(this.wolfTail).to({
      x: game.width - 10
    }, 1000, Phaser.Easing.Quadratic.InOut, true, 0).start();

    this.wolfHead.tween.intro.onComplete.add(function () {
      this.idleAnimation();
      this.introIsRunning = false;
    }, this);
    return true;
  }
  wolf.idleAnimation = function () {
    this.wolfBooty.tween.Idle = game.add.tween(this.wolfBooty).to({
      y: "-7"
    }, 1000, Phaser.Easing.Sinusoidal.InOut, true, 0, Infinity, true);
    this.wolfBooty.animations.play('idle', 6, true);

    this.wolfHead.tween.Idle = game.add.tween(this.wolfHead).to({
      y: "-5"
    }, 1000, Phaser.Easing.Sinusoidal.InOut, true, 500, Infinity, true);
    this.wolfHead.animations.play('idle', 1, true);

    this.wolfTail.tween.Idle = game.add.tween(this.wolfTail).to({
      y: "-10"
    }, 1000, Phaser.Easing.Sinusoidal.InOut, true, 250, Infinity, true);

    this.wolfPawL.tween.Idle = game.add.tween(this.wolfPawL).to({
      x: "-100"
    }, 1000, Phaser.Easing.Quadratic.InOut, false, 2000).to({
      x: "100"
    }, 1000, Phaser.Easing.Quadratic.InOut, false, 0).repeatAll(Infinity).start();
  }
  wolf.setup = function () {
    this.load();
    this.intro();
  }
  wolf.update = function () {
    game.physics.arcade.overlap(
      game.player.sprite,
      wolf,
      function (player, wolf) {
        game.player.gotHit();
      },
      null,
      this
    );
    for (var i = 0; i < wolf.bp.length; i++) {
      if (game.player.bp[i].options.isActiv) {
        game.physics.arcade.overlap(
          wolf.bp[i],
          game.player.sprite,
          function (bullet, player) {
            game.player.gotHit();
          },
          null,
          this
        );
      }
    }
    for (var i = 0; i < game.player.bp.length; i++) {
      if (game.player.bp[i].options.isActiv) {
        game.physics.arcade.overlap(
          game.player.bp[i],
          wolf,
          function (bullet, wolfPart) {
            bullet.kill();
            if (wolf.introIsRunning === true) {
              return false;
            }
            if (wolfPart.key === "wolfPawL" && wolf.phase === 1) {
              if (wolf.life <= 0) {
                if (!!wolf.wolfPawL.tween.dead) {
                  if (!!wolf.wolfBooty.tween.dead.isRunning) {
                    return false;
                  }
                }
                // wolfBooty.kill();
                // wolfHead.kill();
                wolf.wolfPawL.tween.Idle.stop();
                hit.play();
                if (wolf.cry2.isPlaying === false) {
                  wolf.cry1.play();
                  game.player.bp[1].options.isActiv = true
                }
                wolf.wolfHead.angle = 70;
                game.add.tween(this.wolfHead).to({
                  angle: 0
                }, 500, Phaser.Easing.Sinusoidal.InOut, true, 600);
                var a = wolf.wolfHead.animations.play("s2open", 10);
                a.onComplete.add(function () {
                  wolf.wolfHead.animations.play("s2", 10, true)
                })
                wolf.wolfTail.animations.play('fire', 10, true);
                wolf.wolfTail.tween.intro.repeat(0);
                wolf.wolfTail.tween.attack = game.add.tween(this.wolfTail).to({
                  x: "-100",
                  y: "-80"
                }, 1000, Phaser.Easing.Quadratic.InOut, false, 2000).to({
                  x: "100",
                  y: "100"
                }, 1000, Phaser.Easing.Quadratic.InOut, false, 0).repeatAll(Infinity).start();
                wolf.wolfPawL.tween.dead = game.add.tween(wolf.wolfPawL).to({
                  y: "200"
                }, 3000, Phaser.Easing.Sinusoidal.Out, true, 0).start()
                wolf.life = 70;
                heartY = 0;
                wolf.heart = [];
                life = this.life / 10;
                for (var i = 0; i < life; i++) {
                  this.heart[i] = game.add.sprite(game.width - 12, heartY, "wolfHeart");
                  heartY += 10;
                }
                wolf.wolfPawL.tween.dead.onComplete.add(function () {
                  wolf.wolfPawL.kill();
                  wolf.phase = 2;
                }, this);
              } else {
                if (wolf.wolfHead.tween.hit && wolf.wolfHead.tween.hit.isRunning === true) {
                  return false;
                }
                life = (wolf.life / 10) - 1;
                wolf.heart[life].alpha = 0;
                wolf.life -= 10;
                hit.play();
                wolf.wolfBooty.tween.hit = game.add.tween(wolf.wolfBooty).to({
                  alpha: 0
                }, 50, Phaser.Easing.Sinusoidal.Out, true, 50, 2, true).start()
                wolf.wolfPawL.tween.hit = game.add.tween(wolf.wolfPawL).to({
                  alpha: 0
                }, 50, Phaser.Easing.Sinusoidal.Out, true, 50, 2, true).start()
                wolf.wolfHead.tween.hit = game.add.tween(wolf.wolfHead).to({
                  alpha: 0
                }, 50, Phaser.Easing.Sinusoidal.Out, true, 50, 2, true).start()
              }
            }

            if (wolfPart.key === "wolfBooty" && wolf.phase === 2) {
              if (wolf.life <= 0) {
                if (wolf.wolfBooty.tween.dead && wolf.wolfBooty.tween.dead.isRunning) {
                  return false;
                }
                wolf.wolfBooty.tween.Idle.stop();
                wolf.wolfTail.tween.attack.stop();
                wolf.wolfTail.body.setSize(0, 0);
                if (wolf.cry2.isPlaying === false) {
                  wolf.cry2.play();
                  game.player.bp[2].options.isActiv = true
                  hit.play();
                }
                wolf.wolfHead.tween.Idle.stop();
                wolf.wolfHead.angle = 45;
                game.add.tween(wolf.wolfHead).to({
                  angle: -15
                }, 1000, Phaser.Easing.Sinusoidal.Out, true, 0, 0, false).start();
                wolf.wolfHead.tween.hit = game.add.tween(wolf.wolfHead).to({
                  y: game.height * 0.8
                }, 1000, Phaser.Easing.Sinusoidal.Out, true, 0, 0, false).start();
                wolf.wolfHead.loadTexture('wolfHead2');
                wolf.wolfHead.animations.add('idle', ['w_s3_1.png', 'w_s3_2.png', 'w_s3_1.png']);
                wolf.wolfHead.animations.play('idle', 6, true)
                wolf.wolfTail.tween.dead = game.add.tween(wolf.wolfTail).to({
                  y: "+200"
                }, 3000, Phaser.Easing.Sinusoidal.Out, true, 0).start();

                wolf.wolfBooty.tween.dead = game.add.tween(wolf.wolfBooty).to({
                  y: "200"
                }, 3000, Phaser.Easing.Sinusoidal.Out, true, 0).start()
                game.add.tween(wolf.wolfHead).to({
                  x: "+20"
                }, 2000, Phaser.Easing.Sinusoidal.Out).start();
                wolf.wolfHead.tween.Idle = game.add.tween(wolf.wolfHead).to({
                  y: 90
                }, 2000, Phaser.Easing.Sinusoidal.Out, true, 50, Infinity, true).start()
                setTimeout(function () {
                  if (wolf.shotInterval === undefined) {
                    wolf.shotInterval = window.setInterval(function () {
                      wolf.fire();
                    }, 500)
                  }
                }, 1000)
                wolf.life = 90;
                wolf.phase = 3;
                heartY = 0;
                wolf.heart = [];
                life = this.life / 10;
                for (var i = 0; i < life; i++) {
                  this.heart[i] = game.add.sprite(game.width - 12, heartY, "wolfHeart");
                  heartY += 10;
                }
                wolf.wolfBooty.tween.dead.onComplete.add(function () {
                  wolf.wolfBooty.kill();
                  wolf.wolfTail.kill();

                  // wolf.wolfHead.tween.intro.delay(1000).start();

                })
              } else {
                if (wolf.wolfHead.tween.hit && wolf.wolfHead.tween.hit.isRunning === true) {
                  return false;
                }
                hit.play();
                life = (wolf.life / 10) - 1;
                wolf.heart[life].alpha = 0;
                wolf.life -= 10;
                wolf.wolfBooty.tween.hit = game.add.tween(wolf.wolfBooty).to({
                  alpha: 0
                }, 50, Phaser.Easing.Sinusoidal.Out, true, 50, 2, true).start()
                wolf.wolfHead.tween.hit = game.add.tween(wolf.wolfHead).to({
                  alpha: 0
                }, 50, Phaser.Easing.Sinusoidal.Out, true, 50, 2, true).start()
              }
            }

            if (wolfPart.key === 'wolfHead2' && wolf.phase === 3) {
              console.log(wolfPart.key);
              if (wolf.life <= 0) {
                wolf.wolfHead.tween.Idle.stop();
                wolf.cry1.play();
                hit.play();
                window.clearInterval(wolf.shotInterval);
                wolf.wolfHead.tween.rotation = game.add.tween(wolf.wolfHead).to({
                  rotation: 30
                }, 1000, Phaser.Easing.Sinusoidal.Out, true, 0, 0, false).start();
                wolf.wolfHead.tween.rotation.onComplete.add(function () {
                  game.fadeOut = game.add.tween(game.world).to({
                    alpha: 0
                  }, 1000, Phaser.Easing.Sinusoidal.Out,true, 1000).start()
                  game.fadeOut.onComplete.add(function () {
                    if (game.outroStarted === false) {
                      startOutro()
                      game.outroStarted = true;
                    }

                  })
                })
                wolf.wolfHead.tween.dead = game.add.tween(wolf.wolfHead).to({
                  x: "300",
                  y: "300"
                }, 5000, Phaser.Easing.Sinusoidal.Out, true, 0, 0, false).start();
              } else {
                if (wolf.wolfHead.tween.hit && wolf.wolfHead.tween.hit.isRunning === true) {
                  return false;
                }
                hit.play();
                life = (wolf.life / 10) - 1;
                wolf.heart[life].alpha = 0;
                wolf.life -= 10;
                wolf.wolfHead.tween.hit = game.add.tween(wolf.wolfHead).to({
                  alpha: 0
                }, 50, Phaser.Easing.Sinusoidal.Out, true, 50, 2, true).start()
              }
            }
          },
          null,
          this
        );
      }
    }
  }
  wolf.fire = function () {
    for (var i = 0; i < wolf.bp.length; i++) {
      if (wolf.bp[i].options.isActiv) {
        wolf.bp[i].fire();
      }
    }
  }
  wolf.addAllWeapons = function () {
    wolf.bp.push(new BulletPool({
      name: "a",
      type: "JSON",
      isActiv: true,
      size: 100,
      fireRate: 1,
      sprite: 'w3',
      spritesheet: 'assets/boss/shot_wolf',
      spritesheetSize: {
        x: 32,
        y: 32
      },
      offset: {
        x: -8,
        y: 0,
      },
      nextShot: 200,
      velocity: {
        x: -60,
        y: 0
      },
      startSprite: 8
    }));
  }
  wolf.addAllWeapons();
  return wolf;
}

// game.add.tween(wolfBooty).to({
//   y: "-10"
// }, 1000, Phaser.Easing.Sinusoidal.InOut, true, 0, Infinity, true);
// game.add.tween(wolfBooty).to({
//   y: "-10",
//   x: "10",
// }, 100, Phaser.Easing.Quadratic.InOut, true, 0, Infinity, true).repeat(2);
//
