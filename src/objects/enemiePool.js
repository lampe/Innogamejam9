function EnemiePool(options) {
  ep = game.add.group();
  ep.options = options;
  ep.preload = function () {
    game.load.spritesheet('bullet', 'assets/tmp/bullet.png', 32, 32);
  };
  ep.load = function () {
    this.enableBody = true;
    this.physicsBodyType = Phaser.Physics.ARCADE;
    // ep.createMultiple(ep.options.size, ep.options.sprite);
    this.createMultiple(100, 'bullet', 8);
    this.setAll('anchor.x', 0.5);
    this.setAll('anchor.y', 0.5);
    this.setAll('outOfBoundsKill', true);
    this.setAll('checkWorldBounds', true);
    // this.forEach(function (enemy) {
    //   enemy.animations.add('fly', [0, 1, 2], 20, true);
    // });
    this.nextShotAt = 0;
    this.enemyDelay = this.options.enemyDelay || 1000;
  }
  ep.fire = function () {
    if (this.nextShotAt > game.time.now) {
      return;
    }
    if (this.countDead() === 0) {
      return;
    }
    this.nextShotAt = game.time.now + this.options.nextShot;
    this.bullet = this.getFirstExists(false);
    this.bullet.body.setSize(10, 8, 3, 0);
    this.bullet.reset(game.player.sprite.x, game.player.sprite.y);
    this.bullet.body.velocity.x = 100;
  }
  ep.update = function () {}
  return ep;
}
