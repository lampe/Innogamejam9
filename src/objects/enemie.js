function Enemie(options) {
  enemie = game.add.group();
  enemie.options = options;
  enemie.alive = false;
  enemie.bp = [];
  enemie.options.life = options.life || 100
  enemie.preload = function () {
    console.log(this.options.type);
    if (this.options.type === "JSON") {
      game.load.atlasJSONHash(this.options.name, this.options.path + '.png', this.options.path + '.json');
    }
    if (this.options.type === "sprite") {
      game.load.image(this.options.name, this.options.path + '.png');
    }
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
    return true;
    // enemie.setAll('outOfBoundsKill', true);
    // enemie.setAll('checkWorldBounds', true);
  }
  enemie.spawn = function (options) {
      options = options || {};
      options.velocity = options.velocity || {
        x: -23,
        y: 0
      };
      options.x = options.x || game.width;
      options.y = options.y || game.height / 2;
      this.enemie = this.getFirstExists(false);
      this.enemie.body.setSize(this.enemie.body.width * this.options.hitBoxScale, this.enemie.body.height * this.options.hitBoxScale);
      this.enemie.reset(options.x || game.width, options.y || game.height / 2);
      this.enemie.body.velocity.x = options.velocity.x;
      this.enemie.body.velocity.y = options.velocity.y;

      return this.enemie;
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
        game.player.kill()
      },
      null,
      this
    );
    for (var i = 0; i < game.player.bp.length; i++) {
      if (game.player.bp[i].options.isActiv) {
        game.physics.arcade.overlap(
          game.player.bp[i],
          this,
          function (bullet, enemie) {
            bullet.kill();
            // if (enemie.key === "wolfPawL" || enemie.key === "wolfHead" || enemie.key === "wolfBooty") {
            if (enemie.key === "wolfPawL") {

              console.log(wolfLife);
              if (wolfLife <= 0) {
                  // wolfBooty.kill();
                  // wolfHead.kill();
                  wolfPawL.deadTween = game.add.tween(wolfPawL).to({y:"200"},3000, Phaser.Easing.Sinusoidal.Out, true,0).start()
                  wolfPawL.deadTween.onComplete.add(function(){
                      wolfPawL.kill();
                  }, this);


              }else{
                if(wolfHead.hitTween.isRunning === true){
                  return false;
                }
                wolfLife -= 10;
                wolfBooty.hitTween = game.add.tween(wolfBooty).to({alpha:0},50, Phaser.Easing.Sinusoidal.Out, true,50, 2, true).start()
                wolfPawL.hitTween = game.add.tween(wolfPawL).to({alpha:0},50, Phaser.Easing.Sinusoidal.Out, true,50, 2, true).start()
                wolfHead.hitTween = game.add.tween(wolfHead).to({alpha:0},50, Phaser.Easing.Sinusoidal.Out, true,50, 2, true).start()
              }
            }

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
