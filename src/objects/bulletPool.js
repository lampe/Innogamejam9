function BulletPool(options) {
  bp = game.add.group();
  bp.options = options;
  bp.preload = function () {
    if (options.type === "JSON") {
      game.load.atlasJSONHash(this.options.name, this.options.spritesheet + '.png', this.options.spritesheet + '.json');
    }
    game.load.spritesheet(this.options.name, this.options.spritesheet, this.options.spritesheetSize.x, this.options.spritesheetSize.y);
  };
  bp.load = function () {
    this.enableBody = true;
    this.physicsBodyType = Phaser.Physics.ARCADE;
    this.createMultiple(this.options.size, this.options.name, this.options.startSprite);
    this.setAll('anchor.x', 0.5);
    this.setAll('anchor.y', 0.5);
    this.setAll('outOfBoundsKill', true);
    this.setAll('checkWorldBounds', true);
    this.nextShotAt = 0;
  }
  bp.fire = function () {
    if (this.nextShotAt > game.time.now) {
      return;
    }
    if (this.countDead() === 0) {
      return;
    }
    shot.play();
    this.nextShotAt = game.time.now + this.options.nextShot;
    var that = this;
    that.bullet = that.getFirstExists(false);
    that.bullet.body.setSize(10, 8, 3, 0);
    that.bullet.reset(that.options.parent.position.x + that.options.offset.x, that.options.parent.position.y + that.options.offset.y);
    that.bullet.body.velocity.x = that.options.velocity.x;
    that.bullet.body.velocity.y = that.options.velocity.y;
    // console.log();
    for (var i = 1; i < this.options.fireRate; i++) {
      setTimeout(function(){
        console.log("shooott!");
        that.bullet = that.getFirstExists(false);
        that.bullet.body.setSize(10, 8, 3, 0);
        that.bullet.reset(that.options.parent.position.x + that.options.offset.x, that.options.parent.position.y + that.options.offset.y);
        that.bullet.body.velocity.x = that.options.velocity.x;
        that.bullet.body.velocity.y = that.options.velocity.y;
      },100*i);
    }

  }
  bp.update = function () {}
  return bp;
}
