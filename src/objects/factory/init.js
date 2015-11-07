factory.init = function () {
  factory.init.player();
  // factory.init.enemies();
}

factory.init.player = function () {
  game.player = new Player({
    speed: 70,
    name: "player1",
    path: 'assets/hero/hero',
    position: {
      x: 32,
      y: 70
    },
    frameRate: 10,
  });
}
