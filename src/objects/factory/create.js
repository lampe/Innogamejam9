factory.create = {};
factory.create.player = function () {
  game.player.create();
}
factory.create.enemies = function () {
  for (var i = 0; i < factory.enemies.length; i++) {
    factory.enemies[i].setup();
  }
}
