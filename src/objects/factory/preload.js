factory.preload = {};

factory.preload.player = function () {
  game.player.preload();
}

factory.preload.enemies = function () {
  for (var i = 0; i < factory.enemies.length; i++) {
    factory.enemies[i].preload();
  }
}
