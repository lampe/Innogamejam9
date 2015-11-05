factory.init = function () {
  factory.init.player();
  factory.init.enemies();
}

factory.init.player = function () {
  game.player = new Player({
    speed: 150,
    name: "player1",
    path: 'assets/tmp/testpngbw',
    position: {
      x: 32,
      y: 70
    },
    frameRate: 10,
  });
}
factory.enemiesList = {
  enemie: function (options) {
    return new Enemie({
      speed: options.speed,
      name: "enemie",
      path: 'assets/tmp/testpngbw2',
      position: {
        x: options.x,
        y: options.y
      },
      hitBoxScale: 0.5,
      frameRate: 10,
      size: 10,
      startSprite:1
    });
  },
  enemie2: function (options) {
    return new Enemie({
      speed: options.speed,
      name: "enemie2",
      path: 'assets/tmp/testpngbw2',
      position: {
        x: options.x,
        y: options.y
      },
      hitBoxScale: 0.9,
      frameRate: 10,
      size:10,
      startSprite:1
    })
  }
};

factory.init.enemies = function () {
  for (var key in factory.enemiesList) {
    if (factory.enemiesList.hasOwnProperty(key)) {
      factory.enemies.push(
        factory.enemiesList[key]({
          speed: 150,
          x: 100,
          y: 100
        })
      );
    }
  }
};
