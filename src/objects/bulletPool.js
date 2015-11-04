function BulletPool(options) {
  bp = game.add.group();
  bp.options = options;
  bp.preload = function () {
    game.load.spritesheet('bullet', 'assets/tmp/bullet.png', 32, 32);
  };
  bp.load = function () {
    this.enableBody = true;
    this.physicsBodyType = Phaser.Physics.ARCADE;
    // bp.createMultiple(bp.options.size, bp.options.sprite);
    this.createMultiple(100, 'bullet', 8);
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
    this.nextShotAt = game.time.now + 2000;
    this.bullet = this.getFirstExists(false);
    this.bullet.body.setSize(10, 8, 3, 0);
    this.bullet.reset(game.player.sprite.x, game.player.sprite.y);
    this.bullet.body.velocity.x = 100;
  }
  bp.update = function () {}
  return bp;
}
