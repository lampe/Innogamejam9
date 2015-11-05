function BulletPool(options) {
  bp = game.add.group();
  bp.options = options;
  bp.preload = function () {
    game.load.spritesheet(this.options.sprite, this.options.spritesheet, this.options.spritesheetSize.x, this.options.spritesheetSize.y);
  };
  bp.load = function () {
    this.enableBody = true;
    this.physicsBodyType = Phaser.Physics.ARCADE;
    this.createMultiple(this.options.size, this.options.sprite, this.options.startSprite);
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
    this.nextShotAt = game.time.now + this.options.nextShot;
    this.bullet = this.getFirstExists(false);
    this.bullet.body.setSize(10, 8, 3, 0);
    this.bullet.reset(game.player.sprite.x + 8, game.player.sprite.y);
    this.bullet.body.velocity.x = this.options.velocity.x;
    this.bullet.body.velocity.y = this.options.velocity.y;
  }
  bp.update = function () {}
  return bp;
}
