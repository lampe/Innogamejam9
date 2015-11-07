var game = new Phaser.Game(160, 144, Phaser.CANVAS, 'gamejam8', {
  init: init,
  preload: preload,
  create: create,
  update: update,
  render: render
});
game.phase = "cs1";
game.bgScroll = false;
var d1 = {
  text: ["Hey Opa!", 'Wo gehst du hin ?'],
  cb: function () {
    game.pDA.alpha = 1;
    game.kDA.alpha = 0;
    content = d2.text;
    contentCb = d2.cb;
    nextLine();
  }
}
var d2 = {
  text: ["..."],
  cb: function () {
    game.pDA.alpha = 0;
    game.kDA.alpha = 1;
    content = d3.text;
    contentCb = d3.cb;
    nextLine();
  }
}
var d3 = {
  text: ["OPA!!!", 'Wo gehst du hin ?'],
  cb: function () {
    game.pDA.alpha = 1;
    game.kDA.alpha = 0;
    content = d4.text;
    contentCb = d4.cb;
    nextLine();
  }
};
var d4 = {
  text: ["..."],
  cb: function () {
    game.kDA.position.x = game.kDA.position.x + 100;
    game.pDA.alpha = 1;
    game.kDA.alpha = 1;
    game.kDA.tweenLeft = game.add.tween(game.kDA).to({
      x: 85
    }, 1000, Phaser.Easing.Sinusoidal.Out, true, 0, 0, false);
    game.kDA.tweenLeft.onComplete.add(function () {
      content = d5.text;
      contentCb = d5.cb;
      nextLine();
    })
  }
}
var d5 = {
  text: ['OPPPAA! DENK DOCH AN', 'DIE KINDER!!!!!!!!!'],
  cb: function () {
    // game.pDA.alpha = 1;
    // game.kDA.alpha = 1;

    game.pDA.tweenLeft = game.add.tween(game.pDA).to({
      x: -100
    }, 1000, Phaser.Easing.Sinusoidal.Out, true, 0, 0, false);

    game.pDA.tweenLeft.onComplete.add(function () {
      game.bgScroll = true;
      b1Speed = 0.5 / 5;
      b2Speed = 1 / 5;
      b3Speed = 4 / 5;
      game.pDA.anchor.setTo(.5, 1);
      game.pDA.scale.x = -1
      game.pDA.anchor.setTo(0, 0);
      game.kDA.alpha = 0;
      game.pDA.tweenRight = game.add.tween(game.pDA).to({
        x: 80
      }, 4000, Phaser.Easing.Sinusoidal.Out, true, 0, 0, false);
      game.pDA.idleAnimation2.play();
      game.pDA.tweenRight.onComplete.add(function () {
        content = d6.text;
        contentCb = d6.cb;
        nextLine();
        game.add.tween(game.wDA).to({
          alpha: 1
        }, 1000, Phaser.Easing.Sinusoidal.Out, true, 0, 0, false);
      })
    });
    // startWolfFight();
  }
}

var d6 = {
  text: ['Hey Ich bins dein', 'AnimalSpirit!!'],
  cb: function () {
    content = d7.text;
    contentCb = d7.cb;
    nextLine();
  }
}
var d7 = {
  text: ['...'],
  cb: function () {
    content = d8.text;
    contentCb = d8.cb;
    nextLine();
  }
}
var d8 = {
  text: ['Du kannst mit', "dem ritual brechen!"],
  cb: function () {
    content = d9.text;
    contentCb = d9.cb;
    nextLine();
  }
}
var d9 = {
  text: ['...'],
  cb: function () {
    content = d10.text;
    contentCb = d10.cb;
    nextLine();
  }
}
var d10 = {
  text: ['GRR! denk doch an', "DIE KINDER!!!!!!"],
  cb: function () {
    // content = d9.text;
    // contentCb = d9.cb;
    // nextLine();
    game.pDA.alpha = 0;
    game.wDA.alpha = 0;
    game.kDA.alpha = 0;
    drawnObject.kill();
    text.kill();
    startWolfFight();

  }
}
var line = [];

var wordIndex = 0;
var lineIndex = 0;

var wordDelay = 150;
var lineDelay = 2000;
wolf = {};

function init() {
  // setup gameboy like rendering
  gb.setup();
  // create the player
  // create all enemies
  factory.init();
  wolf = new Wolf();
}

function preload() {
  game.load.atlasJSONHash("pda", '/assets/avatars/cs_hero/cs_hero.png', '/assets/avatars/cs_hero/cs_hero.json');
  game.load.atlasJSONHash("kda", '/assets/avatars/cs_tortillo/cs_tortillo.png', '/assets/avatars/cs_tortillo/cs_tortillo.json');
  game.load.atlasJSONHash("wda", '/assets/avatars/cs_wolf/cs_wolf.png', '/assets/avatars/cs_wolf/cs_wolf.json');

  game.load.audio('bgmusic1', ['assets/music/03-Castle.mp3']);
  game.load.audio('bgmusic2', ['assets/music/kiddracula.mp3']);
  game.load.audio('bgmusic3', ['assets/music/07-EvilGods.mp3']);

  game.load.audio('shot', ['assets/audio/Shot_Level_3.wav']);
  game.load.audio('wolfCry1', ['assets/audio/wolfCry/002.wav']);
  game.load.audio('wolfCry2', ['assets/audio/wolfCry/003.wav']);
  game.load.audio('wolfCry3', ['assets/audio/wolfCry/10.wav']);
  game.load.audio('hit', ['assets/audio/hit.wav']);
  game.load.audio('text', ['assets/audio/text.wav']);

  game.load.image('background1', 'assets/bg/bg1.png');
  game.load.image('background2', 'assets/bg/bg2.png');
  game.load.image('background3', 'assets/bg/fg.png');
  // this.load.tilemap('level1', 'assets/tmp/Test-Map.json', null, Phaser.Tilemap.TILED_JSON);
  // this.load.image('gameTiles', 'assets/tmp/KirbysDreamLand_EDIT.png');
  // load the player asset
  factory.preload.player();
  wolf.preload();
  game.stage.backgroundColor = gb.c1;
}
shot = bg1 = bg2 = textAudio = hit = undefined;

function create() {
  hit = game.add.audio('hit');
  bg1 = game.add.audio('bgmusic1');
  bg2 = game.add.audio('bgmusic2');
  bg1.volume = 0.2;
  bg2.volume = 0.2;
  bg3 = game.add.audio('bgmusic3');
  bg3.volume = 0.2;
  textAudio = game.add.audio('text');
  startFirstDialog();
  // startWolfFight();
}
var drawnObject;
startFirstDialog = function () {

  var width = game.width // example;
  var height = 30 // example;
  var bmd = game.add.bitmapData(width, height);

  bmd.ctx.beginPath();
  bmd.ctx.rect(0, 0, width, height);
  bmd.ctx.fillStyle = 'rgb(154, 185, 50)';
  bmd.ctx.fill();
  drawnObject = game.add.sprite(game.world.centerX, game.height - 15, bmd);
  drawnObject.anchor.setTo(0.5, 0.5);


  game.background1a = this.game.add.sprite(0, 0, 'background1');
  game.background1b = this.game.add.sprite(320, 0, 'background1');

  game.background2a = this.game.add.sprite(0, 0, 'background2');
  game.background2b = this.game.add.sprite(640, 0, 'background2');
  game.background2a.sendToBack();
  game.background2b.sendToBack();
  game.background1a.sendToBack();
  game.background1b.sendToBack();
  game.background3a = this.game.add.sprite(0, 0, 'background3');
  game.background3b = this.game.add.sprite(1280, 0, 'background3');
  game.kDA = game.add.sprite(game.width - 75, 50, 'kda');
  game.wDA = game.add.sprite(game.width - 75, 5, 'wda');
  game.pDA = game.add.sprite(0, 5, 'pda');
  game.pDA.alpha = 0;
  game.wDA.alpha = 0;

  game.pDA.idleAnimation = game.pDA.animations.add('idle', ["cs_h_1.png", "cs_h_1.png", "cs_h_1.png", "cs_h_1.png", "cs_h_1.png", "cs_h_1.png", "cs_h_1.png", "cs_h_1.png", "cs_h_1.png", "cs_h_2.png"]);
  game.kDA.idleAnimation = game.kDA.animations.add('idle', ["cs_t_1.png", "cs_t_2.png", "cs_t_1.png", "cs_t_2.png", "cs_t_1.png", "cs_t_2.png", "cs_t_1.png", "cs_t_2.png", "cs_t_2.png", "cs_t_2.png", "cs_t_2.png", "cs_t_3.png"]);
  game.wDA.idleAnimation = game.wDA.animations.add('idle');
  game.pDA.idleAnimation2 = game.pDA.animations.add('idle', ["cs_h_1.png", "cs_h_1.png", "cs_h_1.png", "cs_h_1.png", "cs_h_1.png", "cs_h_1.png", "cs_h_1.png", "cs_h_1.png", "cs_h_1.png", "cs_h_1.png", "cs_h_1.png", "cs_h_1.png", "cs_h_1.png", "cs_h_1.png", "cs_h_1.png", "cs_h_1.png", "cs_h_1.png", "cs_h_1.png", "cs_h_1.png", "cs_h_1.png", "cs_h_1.png", "cs_h_1.png", "cs_h_1.png", "cs_h_1.png", "cs_h_1.png", "cs_h_2.png"]);

  text = game.add.text(4, game.height * 0.8, '', {
    font: "8px pokemon",
    fill: "black"
  });
  content = d1.text;
  contentCb = d1.cb;
  nextLine();
  game.pDA.idleAnimation.play();
  game.wDA.idleAnimation.play();
  game.kDA.idleAnimation.play();
  game.pDA.idleAnimation.loop = true
  game.pDA.idleAnimation2.loop = true
  game.wDA.idleAnimation.loop = true
  game.kDA.idleAnimation.loop = true
  game.pDA.idleAnimation.delay = 100
  game.pDA.idleAnimation2.delay = 100
  game.wDA.idleAnimation.delay = 250
  game.kDA.idleAnimation.delay = 100
  drawnObject.bringToTop();
  text.bringToTop();
  bg1.play();
}
startWolfFight = function () {
  bg1.stop();
  bg2.play();
  b1Speed = 0.5;
  b2Speed = 1;
  b3Speed = 4;
  // music = game.add.audio('bgmusic1');
  shot = game.add.audio('shot');
  // music.volume = 0.2;
  shot.volume = 0.02;


  // music.play();
  factory.create.player();
  wolf.setup();
  game.background3a.bringToTop();
  game.background3b.bringToTop();
  game.phase = "wolfFight";
}
b1Speed = 0.5;
b2Speed = 1;
b3Speed = 4;
moveBackground = function (background, speed, width) {
  if (background.x < -width) {
    background.x = width;
    background.x -= speed;
  } else {}
  background.x -= speed;
}

function update() {
  if (game.bgScroll) {
    moveBackground(game.background1a, b1Speed, 320);
    moveBackground(game.background1b, b1Speed, 320);
    moveBackground(game.background2a, b2Speed, 640);
    moveBackground(game.background2b, b2Speed, 640);
    moveBackground(game.background3a, b3Speed, 1280);
    moveBackground(game.background3b, b3Speed, 1280);
  }
  // game.physics.arcade.collide(game.player.sprite, game.enemie.sprite, function () {}, null, this);
}

function render() {
  // game.debug.body(wolf.wolfTail)
  // game.debug.body(game.enemie.sprite);
  // game.debug.body(game.enemie2.sprite);
  gb.draw();
}

function nextLine() {

  if (lineIndex === content.length) {
    wordIndex = 0;
    lineIndex = 0;
    text.text = '';
    contentCb()
    return;
  }

  //  Split the current line on spaces, so one word per array element
  line = content[lineIndex].split(' ');

  //  Reset the word index to zero (the first word in the line)
  wordIndex = 0;

  //  Call the 'nextWord' function once for each word in the line (line.length)
  game.time.events.repeat(wordDelay, line.length, nextWord, this);

  //  Advance to the next line
  lineIndex++;

}

function nextWord() {

  //  Add the next word onto the text string, followed by a space
  text.text = text.text.concat(line[wordIndex] + " ");
  textAudio.play();
  //  Advance the word index to the next word in the line
  wordIndex++;

  //  Last word?
  if (wordIndex === line.length) {
    //  Add a carriage return
    text.text = text.text.concat("\n");
    //  Get the next line after the lineDelay amount of ms has elapsed
    game.time.events.add(lineDelay, nextLine, this);
  }

}
