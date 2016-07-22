(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

(function () {
  try {
    cachedSetTimeout = setTimeout;
  } catch (e) {
    cachedSetTimeout = function () {
      throw new Error('setTimeout is not defined');
    }
  }
  try {
    cachedClearTimeout = clearTimeout;
  } catch (e) {
    cachedClearTimeout = function () {
      throw new Error('clearTimeout is not defined');
    }
  }
} ())
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = cachedSetTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    cachedClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        cachedSetTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
//  Sprite dialog
//  public/js/src/config/dialog.js
//
//  Created by Walt Zimmerman on 7/21/16.
//

"use strict";

exports.__esModule = true;
var DIALOG = {
  Mog: "<h3>Let me tell you about Walt... KUPO!</h3><ul><li>Hard worker</li><li>New father</li><li>Fast learner</li><li>Dog lover</li><li>Gamer</li><li>Loves building awesome products</li></ul>",
  Emporer: "<h2>Have you heard about Walt's skills</h2><div style='width=100%'><table style='color: white;width: 16%;padding-left: 45%;padding-top: 5%;'><tr><td>JavaScript</td><td>|</td><td>X</td><td>X</td><td>X</td><td>X</td><td></td></tr><tr><td>Node.Js</td><td>|</td><td>X</td><td>X</td><td>X</td><td>X</td><td></td></tr><tr><td>HTML/CSS</td><td>|</td><td>X</td><td>X</td><td>X</td><td></td><td></td></tr><tr><td>AWS</td><td>|</td><td>X</td><td>X</td><td>X</td><td>X</td><td></td></tr><tr><td>MySql</td><td>|</td><td>X</td><td>X</td><td>X</td><td>X</td><td></td></tr><tr><td>Linux</td><td>|</td><td>X</td><td>X</td><td>X</td><td></td><td></td></tr><tr><td>Redis</td><td>|</td><td>X</td><td>X</td><td>X</td><td>X</td><td></td></tr><tr><td>Python</td><td>|</td><td>X</td><td>X</td><td>X</td><td></td><td></td></tr><tr><td>Ruby</td><td>|</td><td>X</td><td>X</td><td>X</td><td></td><td></td></tr><tr><td>Elixer</td><td>|</td><td>X</td><td>X</td><td>X</td><td></td><td></td></tr><tr><td>C++</td><td>|</td><td>X</td><td>X</td><td></td><td></td><td></td></tr><tr><td>Lisp</td><td>|</td><td>X</td><td>X</td><td></td><td></td><td></td></tr></table></div>",
  Gaurd: "<h1>Here's some projects he made!</h1><ul><li><h2><a href='https://www.oomamiapp.com/'>Oomamiapp</a></h2><p>Built a micro-service cloud base backend from and empty repo. <a href='https://itunes.apple.com/us/app/oomami/id1053373398?ls=1&mt=8'>Download</a> the app and check it out!</p></li><li><h2><a href='https://nepal-relief.herokuapp.com/beneficiaries/'>See The Need</a></h2><p>Help build the frontend. I used the Mapbox api to display points on a map of places that needed relief</p></li><li><h2><a href='https://github.com/Sedighian/watchthis'>Smart Potato</a></h2><p>Touched the whole stack. Built an app that aggregates movies helping solve the problem 'What do you want to watch.'</p></li><li><h2><a href='https://github.com/zimmermanw84/operation-mercy'>Operation Mercy</a></h2><p>This app! Through together a portfolio using just Es6 and HTML canvas. TODO: Make responsive, smooth animations, polish</p></li></ul>",
  Kefka: "<h1>Experience???</h1><ul><li><h2>Oomamiapp - Software Engineer</h2><p>Original hire. An app that connects users to food in their area.</p></li><li><h2>Bandpass - Fullstack Developer</h2><p>A platform that aims to get music fans closer to their favorite bands.</p></li><li><h2>DevBootcamp - Teacher Assistant</h2><p>Help bootcampers learn Javascript, Ruby, SQL and much more.</p></li></ul>"
};

exports["default"] = DIALOG;
module.exports = exports["default"];

},{}],3:[function(require,module,exports){
//  Sprite img sorces
//  public/js/src/config/img_src.js
//
//  Created by Walt Zimmerman on 7/11/16.
//

"use strict";

exports.__esModule = true;
var SPRITE_IMG_SRC = {
  Locke: {
    up: ["../assets/sprites/locke/locke_back_1.png", "../assets/sprites/locke/locke_back_2.png", "../assets/sprites/locke/locke_back_3.png"],
    down: ["../assets/sprites/locke/locke_front_1.png", "../assets/sprites/locke/locke_front_2.png", "../assets/sprites/locke/locke_front_3.png"],
    left: ["../assets/sprites/locke/locke_left_1.png", "../assets/sprites/locke/locke_left_2.png", "../assets/sprites/locke/locke_left_3.png"],
    right: ["../assets/sprites/locke/locke_right_1.png", "../assets/sprites/locke/locke_right_2.png", "../assets/sprites/locke/locke_right_3.png"]
  },
  Emporer: {
    up: ["../assets/sprites/emporer/emporer_back_1.png", "../assets/sprites/emporer/emporer_back_2.png", "../assets/sprites/emporer/emporer_back_3.png"],
    down: ["../assets/sprites/emporer/emporer_front_1.png", "../assets/sprites/emporer/emporer_front_2.png", "../assets/sprites/emporer/emporer_front_3.png"],
    left: ["../assets/sprites/emporer/emporer_left_1.png", "../assets/sprites/emporer/emporer_left_2.png", "../assets/sprites/emporer/emporer_left_3.png"],
    right: ["../assets/sprites/emporer/emporer_right_1.png", "../assets/sprites/emporer/emporer_right_2.png", "../assets/sprites/emporer/emporer_right_3.png"],
    headShot: "assets/sprites/emporer/emporer_front_1.png"
  },
  Mog: {
    up: ["../assets/sprites/mog/mog_back_1.png", "../assets/sprites/mog/mog_back_2.png", "../assets/sprites/mog/mog_back_3.png"],
    down: ["../assets/sprites/mog/mog_front_1.png", "../assets/sprites/mog/mog_front_2.png", "../assets/sprites/mog/mog_front_3.png"],
    left: ["../assets/sprites/mog/mog_left_1.png", "../assets/sprites/mog/mog_left_2.png", "../assets/sprites/mog/mog_left_3.png"],
    right: ["../assets/sprites/mog/mog_right_1.png", "../assets/sprites/mog/mog_right_2.png", "../assets/sprites/mog/mog_right_3.png"],
    headShot: "assets/sprites/mog/mog_head.png"
  },
  Gaurd: {
    up: ["../assets/sprites/narshe_gaurd/narshe_back_1.png", "../assets/sprites/narshe_gaurd/narshe_back_2.png", "../assets/sprites/narshe_gaurd/narshe_back_3.png"],
    down: ["../assets/sprites/narshe_gaurd/narshe_front_1.png", "../assets/sprites/narshe_gaurd/narshe_front_2.png", "../assets/sprites/narshe_gaurd/narshe_front_3.png"],
    left: ["../assets/sprites/narshe_gaurd/narshe_left_1.png", "../assets/sprites/narshe_gaurd/narshe_left_2.png", "../assets/sprites/narshe_gaurd/narshe_left_3.png"],
    right: ["../assets/sprites/narshe_gaurd/narshe_right_1.png", "../assets/sprites/narshe_gaurd/narshe_right_2.png", "../assets/sprites/narshe_gaurd/narshe_right_3.png"],
    headShot: "assets/sprites/narshe_gaurd/narshe_front_1.png"
  },
  Kefka: {
    up: ["../assets/sprites/kefka/kefka_back_1.png", "../assets/sprites/kefka/kefka_back_2.png", "../assets/sprites/kefka/kefka_back_3.png"],
    down: ["../assets/sprites/kefka/kefka_front_1.png", "../assets/sprites/kefka/kefka_front_2.png", "../assets/sprites/kefka/kefka_front_3.png"],
    left: ["../assets/sprites/kefka/kefka_left_1.png", "../assets/sprites/kefka/kefka_left_2.png", "../assets/sprites/kefka/kefka_left_3.png"],
    right: ["../assets/sprites/kefka/kefka_right_1.png", "../assets/sprites/kefka/kefka_right_2.png", "../assets/sprites/kefka/kefka_right_3.png"],
    headShot: "assets/sprites/kefka/kefka_front_1.png"
  }
};

exports["default"] = SPRITE_IMG_SRC;
module.exports = exports["default"];

},{}],4:[function(require,module,exports){
//  Application Controller
//  public/js/src/contollers/appController.js
//
//  Created by Walt Zimmerman on 7/9/16.
//

"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Import for type checking

var _modelsSprite = require("../models/sprite");

/**
* AppController {object}
* @param ViewController {ViewController}
* @param Board {Board} - Map Matrix
* @param hero {Locke} - Locke Sprite object
* @param npcs {Array, NPC} - Array of npcs
*/
var heroX = 19;
var heroY = 33;

// NPC starting Positions
var NPC_STARTING_XY = {
  Mog: { x: 12, y: 14 },
  Emporer: { x: 29, y: 9 },
  Gaurd: { x: 41, y: 15 },
  Kefka: { x: 54, y: 11 }
};
var AppController = (function () {
  function AppController(ViewController, Board, hero, npcs) {
    _classCallCheck(this, AppController);

    this.VC = ViewController;
    this.Board = Board;
    this.hero = hero;
    this.npcs = npcs || [];

    // Track random movement
    this.isSpriteMovementActive = false;

    // Initialize
    this._initSprites();
  }

  /**
  * @public
  * logBoard {function}
  * Console log the board
  */

  AppController.prototype.logBoard = function logBoard() {
    this.Board.forEach(function (row) {
      console.log(row);
    });
  };

  /**
  * @private
  * _initSprites {function}
  * Put sprites into play
  */

  AppController.prototype._initSprites = function _initSprites() {
    this._bindHeroMovement();
    this._setInitSpritePosition();
    this._updateBoard(this.hero);
    this._spriteRandomMovment();
    this._annimationLoop();
  };

  /**
  * @private
  * spriteRandomMovment {function}
  * Randomly move sprites around canvis
  */

  AppController.prototype._spriteRandomMovment = function _spriteRandomMovment() {
    var _this = this;

    this.spriteMovement = setInterval(function () {
      _this.npcs.forEach(function (npc) {
        npc.moveRandom();
        _this._updateBoard(npc);
      });
    }, 1000);

    this.isSpriteMovementActive = true;
  };

  /**
  * @private
  * _stopSpriteMovment {function}
  * Stop sprite movement board
  */

  AppController.prototype._stopSpriteMovment = function _stopSpriteMovment() {
    clearInterval(this.spriteMovement);
    this.isSpriteMovementActive = false;
  };

  /**
  * @private
  * annimationLoop {function}
  * Re-render board
  */

  AppController.prototype._annimationLoop = function _annimationLoop() {
    var _this2 = this;

    setInterval(function () {
      _this2.VC.render([_this2.hero].concat(_this2.npcs));
    }, 50 /*frame rate... kinda lol*/);
  };

  /**
  * @private
  * _setInitSpritePosition {function}
  * Set initial position of sprites
  */

  AppController.prototype._setInitSpritePosition = function _setInitSpritePosition() {
    var _this3 = this;

    this.hero.setPosition(heroX, heroY);
    // Set more NPC sprites after
    this.npcs.forEach(function (npc) {
      npc.setPosition(NPC_STARTING_XY[npc.name].x, NPC_STARTING_XY[npc.name].y);
      // Only need to update board during init for npcs
      _this3._updateBoard(npc);
    });
  };

  /**
  * @private
  * _updateBoard {function}
  * Place Sprite on board
  */

  AppController.prototype._updateBoard = function _updateBoard(sprite) {
    // Make sure is coorinates placeable
    if (this._isPlacableOnBoard(sprite)) {
      this.Board[sprite.yLast][sprite.xLast] = 0;
      // Set new position on board
      this.Board[sprite.y][sprite.x] = sprite;
    } else {
      // reset position
      sprite.setPosition(sprite.xLast, sprite.yLast);
    }
  };

  /**
  * @private
  * _tryHeroTalkToNPC {function}
  * Attempt to talk to npc
  */

  AppController.prototype._tryHeroTalkToNPC = function _tryHeroTalkToNPC() {
    /*
      Check all directional cases
      NOTE:
      A way to optimize this would be to find which
      direction the char is facing and only check that side
    */
    var isNPC = false;
    // Cache NPC reference
    var NPC = undefined;
    // Fall through
    if (this.Board[this.hero.y + 1][this.hero.x] instanceof _modelsSprite.Npc) {
      NPC = this.Board[this.hero.y + 1][this.hero.x];
      isNPC = true;
    }

    if (this.Board[this.hero.y - 1][this.hero.x] instanceof _modelsSprite.Npc) {
      NPC = this.Board[this.hero.y - 1][this.hero.x];
      isNPC = true;
    }

    if (this.Board[this.hero.y][this.hero.x + 1] instanceof _modelsSprite.Npc) {
      NPC = this.Board[this.hero.y][this.hero.x + 1];
      isNPC = true;
    }

    if (this.Board[this.hero.y][this.hero.x - 1] instanceof _modelsSprite.Npc) {
      NPC = this.Board[this.hero.y][this.hero.x - 1];
      isNPC = true;
    }

    if (isNPC && !this.VC.dialogOverlay.isActive && this.isSpriteMovementActive) {
      this._stopSpriteMovment();
      this.VC.dialogOverlay.toggleOverlay(NPC);
    } else if (isNPC) {
      this.VC.dialogOverlay.toggleOverlay(NPC);
      this._spriteRandomMovment();
    }
    // KEEP OLD IMPLIMENTATION IN LUE OF TESTING
    // switch(true) {
    // case (this.Board[(this.hero.y + 1)][this.hero.x] instanceof Npc):
    // case (this.Board[(this.hero.y - 1)][this.hero.x] instanceof Npc):
    // case (this.Board[this.hero.y][(this.hero.x + 1)] instanceof Npc):
    // case (this.Board[this.hero.y][(this.hero.x - 1)] instanceof Npc):
    // If overlay is active then toggle and start movement
    // if(!this.VC.dialogOverlay.isActive && this.isSpriteMovementActive) {
    //   this._stopSpriteMovment();
    //   this.VC.dialogOverlay.toggleOverlay();
    // } else {
    //   this.VC.dialogOverlay.toggleOverlay();
    //   this._spriteRandomMovment();
    // }
    // }
  };

  /**
  * @private
  * _isPlacableOnBoard {function}
  * @return {Bool}
  * @param {Sprite}
  */

  AppController.prototype._isPlacableOnBoard = function _isPlacableOnBoard(sprite) {
    // MAX Matrix bounds
    if (sprite.x > 61 || sprite.y > 33) {
      return false;
    } else if (this.Board[sprite.y][sprite.x] !== 0) {
      return false;
    } else {
      return true;
    }
  };

  /**
  * @private
  * _bindHeroMovement {function}
  * bind keyboard event for hero movement
  */

  AppController.prototype._bindHeroMovement = function _bindHeroMovement() {
    var _this4 = this;

    // Enum movement keycodes
    var LEFT = 37;
    var UP = 38;
    var RIGHT = 39;
    var DOWN = 40;
    var SPACE = 32;

    window.addEventListener('keydown', function (e) {

      switch (e.keyCode) {
        case LEFT:
          _this4.hero.moveLeft();
          break;
        case UP:
          _this4.hero.moveUp();
          break;
        case RIGHT:
          _this4.hero.moveRight();
          break;
        case DOWN:
          _this4.hero.moveDown();
          break;
        case SPACE:
          // For exiting overlays
          if (_this4.VC.introOverlay.isActive) {
            // Intro overlay
            _this4.VC.introOverlay.toggleOverlay();
          }

          // Try and talk to npc
          _this4._tryHeroTalkToNPC();
          break;
        default:
          console.log("non movement key");
      }

      if ([37, 38, 39, 40].indexOf(e.keyCode) !== -1) {
        // Then update sprite on board
        _this4._updateBoard(_this4.hero);
        // For Development
        // this.logBoard();
      }
    });
  };

  return AppController;
})();

exports.AppController = AppController;
// Hero/Locke Starting position

},{"../models/sprite":10}],5:[function(require,module,exports){
//  Canvas View Controller
//  public/js/src/controllers/viewController.js
//
//  Created by Walt Zimmerman on 7/8/16.
//

"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _vendorQ = require('../../vendor/Q');

var _vendorQ2 = _interopRequireDefault(_vendorQ);

// Promise
var Promise = _vendorQ2["default"].Promise;

/**
* ViewController {object}
* @param overlays {Array} - Overlay objects to control intro overlay and dialog box
* @params height {Number}, width {Number} - Optional
*/

var ViewController = (function () {
  function ViewController(overlays, height, width) {
    if (overlays === undefined) overlays = {};

    _classCallCheck(this, ViewController);

    // Overlay props
    this.introOverlay = overlays["intro"];
    this.dialogOverlay = overlays["dialog"];
    this.controlPanel = overlays["controlPanel"];

    // Hard coded for background img dimensions
    this.height = 768 || height; // height of background image
    this.width = 1366 || width; // width of background image
    this.cellPX = 21.5;

    // Uninitalized canvas and context objects
    this.canvas;
    this.ctx;

    // Initialize ViewController
    this._init();
  }

  /**
  * @private
  * _init {function}
  * Initialize ViewController
  */

  ViewController.prototype._init = function _init() {
    this.canvas = document.createElement("canvas");
    this.canvas.style.position = "relative";
    this.canvas.style.zIndex = "1";
    this.ctx = this.canvas.getContext("2d");
    // Set Props
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    // Append canvas object
    document.getElementById("canvas-container").appendChild(this.canvas);
  };

  /**
  * @public
  * render {function}
  * add necessary listeners
  */

  ViewController.prototype.render = function render(sprites) {
    var _this = this;

    // we can't add the source to the image upon sprite construction or it would load before we add the listener in the VC
    sprites.map(function (sprite) {
      sprite.image.src = sprite.imgSrc;
    });
    // Clear canvas
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Bind load event
    sprites[0].image.onload = function () {

      // Draw NPCS
      sprites.forEach(function (sprite) {
        _this.ctx.drawImage(sprite.image, sprite.x * _this.cellPX, sprite.y * _this.cellPX);
      });
    };
  };

  return ViewController;
})();

exports.ViewController = ViewController;

},{"../../vendor/Q":11}],6:[function(require,module,exports){
// Index
//  public/js/src/index.js
//
//  Created by Walt Zimmerman on 7/6/16.
//

// Models
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _modelsSprite = require('./models/sprite');

var _modelsBoard = require('./models/board');

var _modelsOverlay = require('./models/overlay');

var _modelsOverlay2 = _interopRequireDefault(_modelsOverlay);

var _modelsControlPanel = require('./models/controlPanel');

var _modelsControlPanel2 = _interopRequireDefault(_modelsControlPanel);

// Controllers

var _controllersViewController = require('./controllers/viewController');

var _controllersAppController = require('./controllers/appController');

// Characters
var Hero = new _modelsSprite.Locke();
var NPCs = [new _modelsSprite.Npc("Mog"), new _modelsSprite.Npc("Emporer"), new _modelsSprite.Npc("Gaurd"), new _modelsSprite.Npc("Kefka")];
// Overlays
var overlays = { intro: new _modelsOverlay2['default']("intro"), dialog: new _modelsOverlay2['default']("dialog"), controlPanel: new _modelsControlPanel2['default']() };
// Locals
var viewController = new _controllersViewController.ViewController(overlays);
var BoardFactory = new _modelsBoard.CollisionMatrix();

BoardFactory.buildBoard().then(function (Board) {
  new _controllersAppController.AppController(viewController, Board, Hero, NPCs);
})['catch'](function (err) {
  console.error(err);
});

},{"./controllers/appController":4,"./controllers/viewController":5,"./models/board":7,"./models/controlPanel":8,"./models/overlay":9,"./models/sprite":10}],7:[function(require,module,exports){
//  Board
//  public/js/src/models/board.js
//
//  Created by Walt Zimmerman on 7/8/16.
//

"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _vendorQ = require('../../vendor/Q');

var _vendorQ2 = _interopRequireDefault(_vendorQ);

// Promise
var Promise = _vendorQ2["default"].Promise;

/**
* @private
* CollisionMatrix {object}
* An matrix representation of the collision map
*/

var CollisionMatrix = (function () {
  function CollisionMatrix() {
    _classCallCheck(this, CollisionMatrix);

    this.spritesheet = new Image();
    this.spritesheet.src = "assets/sprites/CollisionMap.png";

    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.matrix = [];
    this.tiles = [];
    this.isBoardLoaded = false;
    this.tileHeight = 22;
    this.tileWidth = 22;
    this.tileCount = 4;
  }

  /**
  * @public
  * buildBoard {function}
  * Take a collision image(png) and build a matrix
  * @return {Promise} Board
  */

  CollisionMatrix.prototype.buildBoard = function buildBoard() {
    var _this = this;

    return Promise(function (resolve, reject) {

      // Sprite sheet load event
      _this.spritesheet.onload = function (event) {
        // Determine dimensions of the board/canvas
        var tilesX = Math.floor(_this.spritesheet.width / _this.tileWidth);
        var tilesY = Math.floor(_this.spritesheet.height / _this.tileHeight);

        _this.canvas.width = _this.spritesheet.width;
        _this.canvas.height = _this.spritesheet.height;
        // use canvas context to draw spritesheet/collision map so we can iterate over it
        _this.ctx.drawImage(_this.spritesheet, 0, 0);

        // Build a 1d array of 22x22 pixel image data
        for (var i = 0; i < tilesY; i++) {
          for (var j = 0; j < tilesX; j++) {
            _this.tiles.push(_this.ctx.getImageData(j * _this.tileWidth, i * _this.tileHeight, _this.tileWidth, _this.tileHeight));
          }
        }

        // Turn 1d array into 2d array of image data
        while (_this.tiles.length) _this.matrix.push(_this.tiles.splice(0, tilesX));

        // Temp Board
        var Board = [];
        // Temp Board row
        var boardRow = [];

        // Build board
        _this.matrix.forEach(function (imgDataRow, index, array) {
          imgDataRow.forEach(function (imgDataCell) {
            if (imgDataCell.data[0] === 0 && imgDataCell.data[1] === 0 && imgDataCell.data[2] === 0 && imgDataCell.data[3] === 255) {
              boardRow.push(1);
            } else {
              boardRow.push(0);
            }
          });

          console.log(boardRow.length);
          // Push row into board
          Board.push(boardRow);
          // After last iteration
          if (index + 1 === array.length) {
            // Return Board
            resolve(Board);
          } else {
            // Reset row
            boardRow = [];
          }
        });
      };
    });
  };

  return CollisionMatrix;
})();

exports.CollisionMatrix = CollisionMatrix;

},{"../../vendor/Q":11}],8:[function(require,module,exports){
//  control panel
//  public/js/src/models/controlPanel.js
//
//  Created by Walt Zimmerman on 7/20/16.
//

"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LEFT = 37;
var UP = 38;
var RIGHT = 39;
var DOWN = 40;
var SPACE = 32;

/**
* @Public
* ControlPanel {object}
* The control display
*/

var ControlPanel = (function () {
  function ControlPanel() {
    _classCallCheck(this, ControlPanel);

    // Elements
    this.up = document.getElementById("up"), this.down = document.getElementById("down"), this.left = document.getElementById("left"), this.right = document.getElementById("right"), this.space = document.getElementById("space");

    this._bindKeys();
  }

  /**
  * @private
  * _setActive {function}
  * Show Element as active
  */

  ControlPanel.prototype._setActive = function _setActive(el) {
    el.style.backgroundColor = "red";
  };

  /**
  * @private
  * _setInactive {function}
  * Show Element as inactive
  */

  ControlPanel.prototype._setInactive = function _setInactive(el) {
    el.style.backgroundColor = "white";
  };

  /**
  * @private
  * _bindKeys {function}
  * Bind necessary keys for state change
  */

  ControlPanel.prototype._bindKeys = function _bindKeys() {
    // Set keyup and key down events
    window.addEventListener('keydown', this._keyDownHendler.bind(this));
    window.addEventListener('keyup', this._keyUpHendler.bind(this));
  };

  // Event handlers

  ControlPanel.prototype._keyDownHendler = function _keyDownHendler(e) {
    switch (e.keyCode) {
      case LEFT:
        this._setActive(this.left);
        break;
      case UP:
        this._setActive(this.up);
        break;
      case RIGHT:
        this._setActive(this.right);
        break;
      case DOWN:
        this._setActive(this.down);
        break;
      case SPACE:
        this._setActive(this.space);
    }
  };

  ControlPanel.prototype._keyUpHendler = function _keyUpHendler(e) {
    switch (e.keyCode) {
      case LEFT:
        this._setInactive(this.left);
        break;
      case UP:
        this._setInactive(this.up);
        break;
      case RIGHT:
        this._setInactive(this.right);
        break;
      case DOWN:
        this._setInactive(this.down);
        break;
      case SPACE:
        this._setInactive(this.space);
    }
  };

  return ControlPanel;
})();

exports["default"] = ControlPanel;
module.exports = exports["default"];

},{}],9:[function(require,module,exports){
//  Models
//  public/js/src/models/overlay.js
//
//  Created by Walt Zimmerman on 7/12/16.
//

// OVERLAY TYPES - HTML IDS
"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OVERLAY_TYPES = {
  intro: "overlay-intro",
  dialog: "overlay-dialog"
};

/**
* Overlay {object}
* @param - type
*/

var Overlay = (function () {
  function Overlay(type) {
    _classCallCheck(this, Overlay);

    this.type = type;
    this.typeId = OVERLAY_TYPES[type];
    this.element = document.getElementById(this.typeId);

    this.isActive;

    // Initialize
    this._init();
  }

  /**
  * @private
  * _init {function}
  * Initialize overlay
  */

  Overlay.prototype._init = function _init() {
    this._getInitDisplayState();
  };

  /**
  * @public
  * toggleOverlay {function}
  * @param {Npc} - Optional - if Dialog box provide Npc
  * Show or Hide
  */

  Overlay.prototype.toggleOverlay = function toggleOverlay(npc) {
    if (this.isActive) {
      this._hide();
      if (npc) this._removeDialog(npc);
    } else {
      this._show();
      // The dialog box case
      if (npc) this._renderDialog(npc);
    }
  };

  /**
  * @private
  * _renderDialog {function}
  * Render correct dialog
  */

  Overlay.prototype._renderDialog = function _renderDialog(npc) {
    var headShotImg = document.getElementById("headshot");
    var content = document.getElementById("content");

    headShotImg.src = npc.headShotSrc;
    content.innerHTML = npc.dialog;
  };

  /**
  * @private
  * _renderDialog {function}
  * Clean out img and text nodes correct dialog
  */

  Overlay.prototype._removeDialog = function _removeDialog(npc) {
    var headShotImg = document.getElementById("headshot");
    var content = document.getElementById("content");

    headShotImg.src = "";
    content.innerHTML = "";
  };

  /**
  * @private
  * _show {function}
  * Show
  */

  Overlay.prototype._show = function _show() {
    this.element.style.display = "block";
    this.isActive = true;
  };

  /**
  * @private
  * _hide {function}
  * Hide
  */

  Overlay.prototype._hide = function _hide() {
    this.element.style.display = "none";
    this.isActive = false;
  };

  /**
  * @private
  * _getInitDisplayState {function}
  * Based on type determine if displayed or not
  */

  Overlay.prototype._getInitDisplayState = function _getInitDisplayState() {
    switch (this.type) {
      case 'intro':
        this._show();
        break;
      case 'dialog':
        this._hide();
        break;
      default:
        console.error("_getInitDisplayState: No Type");
    }
  };

  return Overlay;
})();

exports["default"] = Overlay;
module.exports = exports["default"];

},{}],10:[function(require,module,exports){
//  Models
//  public/js/src/models.js
//
//  Created by Walt Zimmerman on 7/6/16.
//

"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _configImg_src = require("../config/img_src");

var _configImg_src2 = _interopRequireDefault(_configImg_src);

var _configDialog = require("../config/dialog");

var _configDialog2 = _interopRequireDefault(_configDialog);

/**
* Sprite {object}
* @params type {ENUM}
* Srpite Char Base
*/
var LOCKE = 1;
var NPC = 2;

var SpriteBase = (function () {
  function SpriteBase(type, name) {
    var x = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
    var y = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

    _classCallCheck(this, SpriteBase);

    this.type = type;
    this.name = name;

    // Position
    this.x = x;
    this.y = y;
    this.xLast;
    this.yLast;

    // For rotating sprite images
    this.currentImgIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 3;
  }

  /**
  * @public
  * setPosition {function}
  * Set x/y coordinates of sprite
  */

  SpriteBase.prototype.setPosition = function setPosition(x, y) {
    this.xLast = this.x;
    this.yLast = this.y;

    this.x = x;
    this.y = y;
  };

  /**
  * @private
  * _rotateImageSrc {function}
  * Rotate img src for animation
  */

  SpriteBase.prototype._rotateImageSrc = function _rotateImageSrc(direction) {
    // Set img src
    this.imgSrc = _configImg_src2["default"][this.name][direction][Math.floor(this.currentImgIndex)];

    // We don't want to switch imgs every time so we do an incremental tick
    if (this.currentImgIndex >= _configImg_src2["default"][this.name][direction].length - 1) {
      this.currentImgIndex = 0;
    } else {
      // Rotate image index
      this.currentImgIndex++;
    }
  };

  // Movement Functions

  SpriteBase.prototype.moveLeft = function moveLeft() {
    this.xLast = this.x;
    this.yLast = this.y;
    this.x -= 1;

    this._rotateImageSrc("left");
  };

  SpriteBase.prototype.moveRight = function moveRight() {
    this.xLast = this.x;
    this.yLast = this.y;
    this.x += 1;

    this._rotateImageSrc("right");
  };

  SpriteBase.prototype.moveUp = function moveUp() {
    this.xLast = this.x;
    this.yLast = this.y;
    this.y -= 1;

    this._rotateImageSrc("up");
  };

  SpriteBase.prototype.moveDown = function moveDown() {
    this.xLast = this.x;
    this.yLast = this.y;
    this.y += 1;

    this._rotateImageSrc("down");
  };

  SpriteBase.prototype.logName = function logName() {
    console.log("Hey I am " + this.name);
  };

  return SpriteBase;
})();

;

/**
* Locke {object}
* Locke - Main Char
*/

var Locke = (function (_SpriteBase) {
  _inherits(Locke, _SpriteBase);

  function Locke() {
    var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
    var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    _classCallCheck(this, Locke);

    _SpriteBase.call(this, LOCKE, "Locke", x, y);
    this.image = new Image();

    // px
    this.width = 17;
    this.height = 28;
    // Asset
    // Setting starting src
    this.imgSrc = _configImg_src2["default"][this.name].up[this.currentImgIndex];
  }

  /**
  * Npc {object}
  * @params type {ENUM}
  * Locke - Main Char
  */
  return Locke;
})(SpriteBase);

var Npc = (function (_SpriteBase2) {
  _inherits(Npc, _SpriteBase2);

  function Npc(name) {
    var x = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
    var y = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

    _classCallCheck(this, Npc);

    _SpriteBase2.call(this, NPC, name, x, y);
    this.image = new Image();
    // px
    this.width = 17;
    this.height = 29;
    // Assets
    this.imgSrc = _configImg_src2["default"][this.name].down[this.currentImgIndex];
    this.headShotSrc = _configImg_src2["default"][this.name].headShot;
    this.dialog = _configDialog2["default"][this.name];
  }

  /**
  * @public
  * moveRandom {function}
  * Move in random direction
  */

  Npc.prototype.moveRandom = function moveRandom() {
    var randomSample = Math.floor(Math.random() * (3 - 0 + 1));

    switch (randomSample) {
      case 0:
        this.moveDown();
        break;
      case 1:
        this.moveUp();
        break;
      case 2:
        this.moveLeft();
        break;
      case 3:
        this.moveRight();
        break;
      default:
        // Don't want to throw: but need to be informed if the case happens
        console.info("randomSample non movement int");
    }
  };

  return Npc;
})(SpriteBase);

exports.Locke = Locke;
exports.Npc = Npc;

},{"../config/dialog":2,"../config/img_src":3}],11:[function(require,module,exports){
(function (process){
// vim:ts=4:sts=4:sw=4:
"use strict";

(function (definition) {
    "use strict";

    // This file will function properly as a <script> tag, or a module
    // using CommonJS and NodeJS or RequireJS module formats.  In
    // Common/Node/RequireJS, the module exports the Q API and when
    // executed as a simple <script>, it creates a Q global instead.

    // Montage Require
    if (typeof bootstrap === "function") {
        bootstrap("promise", definition);

        // CommonJS
    } else if (typeof exports === "object" && typeof module === "object") {
            module.exports = definition();

            // RequireJS
        } else if (typeof define === "function" && define.amd) {
                define(definition);

                // SES (Secure EcmaScript)
            } else if (typeof ses !== "undefined") {
                    if (!ses.ok()) {
                        return;
                    } else {
                        ses.makeQ = definition;
                    }

                    // <script>
                } else if (typeof window !== "undefined" || typeof self !== "undefined") {
                        // Prefer window over self for add-on scripts. Use self for
                        // non-windowed contexts.
                        var global = typeof window !== "undefined" ? window : self;

                        // Get the `window` object, save the previous Q global
                        // and initialize Q as a global.
                        var previousQ = global.Q;
                        global.Q = definition();

                        // Add a noConflict function so Q can be removed from the
                        // global namespace.
                        global.Q.noConflict = function () {
                            global.Q = previousQ;
                            return this;
                        };
                    } else {
                        throw new Error("This environment was not anticipated by Q. Please file a bug.");
                    }
})(function () {
    "use strict";

    var hasStacks = false;
    try {
        throw new Error();
    } catch (e) {
        hasStacks = !!e.stack;
    }

    // All code after this point will be filtered from stack traces reported
    // by Q.
    var qStartingLine = captureLine();
    var qFileName;

    // shims

    // used for fallback in "allResolved"
    var noop = function noop() {};

    // Use the fastest possible means to execute a task in a future turn
    // of the event loop.
    var nextTick = (function () {
        // linked list of tasks (single, with head node)
        var head = { task: void 0, next: null };
        var tail = head;
        var flushing = false;
        var requestTick = void 0;
        var isNodeJS = false;
        // queue for late tasks, used by unhandled rejection tracking
        var laterQueue = [];

        function flush() {
            /* jshint loopfunc: true */
            var task, domain;

            while (head.next) {
                head = head.next;
                task = head.task;
                head.task = void 0;
                domain = head.domain;

                if (domain) {
                    head.domain = void 0;
                    domain.enter();
                }
                runSingle(task, domain);
            }
            while (laterQueue.length) {
                task = laterQueue.pop();
                runSingle(task);
            }
            flushing = false;
        }
        // runs a single function in the async queue
        function runSingle(task, domain) {
            try {
                task();
            } catch (e) {
                if (isNodeJS) {
                    // In node, uncaught exceptions are considered fatal errors.
                    // Re-throw them synchronously to interrupt flushing!

                    // Ensure continuation if the uncaught exception is suppressed
                    // listening "uncaughtException" events (as domains does).
                    // Continue in next event to avoid tick recursion.
                    if (domain) {
                        domain.exit();
                    }
                    setTimeout(flush, 0);
                    if (domain) {
                        domain.enter();
                    }

                    throw e;
                } else {
                    // In browsers, uncaught exceptions are not fatal.
                    // Re-throw them asynchronously to avoid slow-downs.
                    setTimeout(function () {
                        throw e;
                    }, 0);
                }
            }

            if (domain) {
                domain.exit();
            }
        }

        nextTick = function (task) {
            tail = tail.next = {
                task: task,
                domain: isNodeJS && process.domain,
                next: null
            };

            if (!flushing) {
                flushing = true;
                requestTick();
            }
        };

        if (typeof process === "object" && process.toString() === "[object process]" && process.nextTick) {
            // Ensure Q is in a real Node environment, with a `process.nextTick`.
            // To see through fake Node environments:
            // * Mocha test runner - exposes a `process` global without a `nextTick`
            // * Browserify - exposes a `process.nexTick` function that uses
            //   `setTimeout`. In this case `setImmediate` is preferred because
            //    it is faster. Browserify's `process.toString()` yields
            //   "[object Object]", while in a real Node environment
            //   `process.nextTick()` yields "[object process]".
            isNodeJS = true;

            requestTick = function () {
                process.nextTick(flush);
            };
        } else if (typeof setImmediate === "function") {
            // In IE10, Node.js 0.9+, or https://github.com/NobleJS/setImmediate
            if (typeof window !== "undefined") {
                requestTick = setImmediate.bind(window, flush);
            } else {
                requestTick = function () {
                    setImmediate(flush);
                };
            }
        } else if (typeof MessageChannel !== "undefined") {
            // modern browsers
            // http://www.nonblocking.io/2011/06/windownexttick.html
            var channel = new MessageChannel();
            // At least Safari Version 6.0.5 (8536.30.1) intermittently cannot create
            // working message ports the first time a page loads.
            channel.port1.onmessage = function () {
                requestTick = requestPortTick;
                channel.port1.onmessage = flush;
                flush();
            };
            var requestPortTick = function requestPortTick() {
                // Opera requires us to provide a message payload, regardless of
                // whether we use it.
                channel.port2.postMessage(0);
            };
            requestTick = function () {
                setTimeout(flush, 0);
                requestPortTick();
            };
        } else {
            // old browsers
            requestTick = function () {
                setTimeout(flush, 0);
            };
        }
        // runs a task after all other tasks have been run
        // this is useful for unhandled rejection tracking that needs to happen
        // after all `then`d tasks have been run.
        nextTick.runAfter = function (task) {
            laterQueue.push(task);
            if (!flushing) {
                flushing = true;
                requestTick();
            }
        };
        return nextTick;
    })();

    // Attempt to make generics safe in the face of downstream
    // modifications.
    // There is no situation where this is necessary.
    // If you need a security guarantee, these primordials need to be
    // deeply frozen anyway, and if you don’t need a security guarantee,
    // this is just plain paranoid.
    // However, this **might** have the nice side-effect of reducing the size of
    // the minified code by reducing x.call() to merely x()
    // See Mark Miller’s explanation of what this does.
    // http://wiki.ecmascript.org/doku.php?id=conventions:safe_meta_programming
    var call = Function.call;
    function uncurryThis(f) {
        return function () {
            return call.apply(f, arguments);
        };
    }
    // This is equivalent, but slower:
    // uncurryThis = Function_bind.bind(Function_bind.call);
    // http://jsperf.com/uncurrythis

    var array_slice = uncurryThis(Array.prototype.slice);

    var array_reduce = uncurryThis(Array.prototype.reduce || function (callback, basis) {
        var index = 0,
            length = this.length;
        // concerning the initial value, if one is not provided
        if (arguments.length === 1) {
            // seek to the first value in the array, accounting
            // for the possibility that is is a sparse array
            do {
                if (index in this) {
                    basis = this[index++];
                    break;
                }
                if (++index >= length) {
                    throw new TypeError();
                }
            } while (1);
        }
        // reduce
        for (; index < length; index++) {
            // account for the possibility that the array is sparse
            if (index in this) {
                basis = callback(basis, this[index], index);
            }
        }
        return basis;
    });

    var array_indexOf = uncurryThis(Array.prototype.indexOf || function (value) {
        // not a very good shim, but good enough for our one use of it
        for (var i = 0; i < this.length; i++) {
            if (this[i] === value) {
                return i;
            }
        }
        return -1;
    });

    var array_map = uncurryThis(Array.prototype.map || function (callback, thisp) {
        var self = this;
        var collect = [];
        array_reduce(self, function (undefined, value, index) {
            collect.push(callback.call(thisp, value, index, self));
        }, void 0);
        return collect;
    });

    var object_create = Object.create || function (prototype) {
        function Type() {}
        Type.prototype = prototype;
        return new Type();
    };

    var object_hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);

    var object_keys = Object.keys || function (object) {
        var keys = [];
        for (var key in object) {
            if (object_hasOwnProperty(object, key)) {
                keys.push(key);
            }
        }
        return keys;
    };

    var object_toString = uncurryThis(Object.prototype.toString);

    function isObject(value) {
        return value === Object(value);
    }

    // generator related shims

    // FIXME: Remove this function once ES6 generators are in SpiderMonkey.
    function isStopIteration(exception) {
        return object_toString(exception) === "[object StopIteration]" || exception instanceof QReturnValue;
    }

    // FIXME: Remove this helper and Q.return once ES6 generators are in
    // SpiderMonkey.
    var QReturnValue;
    if (typeof ReturnValue !== "undefined") {
        QReturnValue = ReturnValue;
    } else {
        QReturnValue = function (value) {
            this.value = value;
        };
    }

    // long stack traces

    var STACK_JUMP_SEPARATOR = "From previous event:";

    function makeStackTraceLong(error, promise) {
        // If possible, transform the error stack trace by removing Node and Q
        // cruft, then concatenating with the stack trace of `promise`. See #57.
        if (hasStacks && promise.stack && typeof error === "object" && error !== null && error.stack && error.stack.indexOf(STACK_JUMP_SEPARATOR) === -1) {
            var stacks = [];
            for (var p = promise; !!p; p = p.source) {
                if (p.stack) {
                    stacks.unshift(p.stack);
                }
            }
            stacks.unshift(error.stack);

            var concatedStacks = stacks.join("\n" + STACK_JUMP_SEPARATOR + "\n");
            error.stack = filterStackString(concatedStacks);
        }
    }

    function filterStackString(stackString) {
        var lines = stackString.split("\n");
        var desiredLines = [];
        for (var i = 0; i < lines.length; ++i) {
            var line = lines[i];

            if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
                desiredLines.push(line);
            }
        }
        return desiredLines.join("\n");
    }

    function isNodeFrame(stackLine) {
        return stackLine.indexOf("(module.js:") !== -1 || stackLine.indexOf("(node.js:") !== -1;
    }

    function getFileNameAndLineNumber(stackLine) {
        // Named functions: "at functionName (filename:lineNumber:columnNumber)"
        // In IE10 function name can have spaces ("Anonymous function") O_o
        var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
        if (attempt1) {
            return [attempt1[1], Number(attempt1[2])];
        }

        // Anonymous functions: "at filename:lineNumber:columnNumber"
        var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
        if (attempt2) {
            return [attempt2[1], Number(attempt2[2])];
        }

        // Firefox style: "function@filename:lineNumber or @filename:lineNumber"
        var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
        if (attempt3) {
            return [attempt3[1], Number(attempt3[2])];
        }
    }

    function isInternalFrame(stackLine) {
        var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);

        if (!fileNameAndLineNumber) {
            return false;
        }

        var fileName = fileNameAndLineNumber[0];
        var lineNumber = fileNameAndLineNumber[1];

        return fileName === qFileName && lineNumber >= qStartingLine && lineNumber <= qEndingLine;
    }

    // discover own file name and line number range for filtering stack
    // traces
    function captureLine() {
        if (!hasStacks) {
            return;
        }

        try {
            throw new Error();
        } catch (e) {
            var lines = e.stack.split("\n");
            var firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
            var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
            if (!fileNameAndLineNumber) {
                return;
            }

            qFileName = fileNameAndLineNumber[0];
            return fileNameAndLineNumber[1];
        }
    }

    function deprecate(callback, name, alternative) {
        return function () {
            if (typeof console !== "undefined" && typeof console.warn === "function") {
                console.warn(name + " is deprecated, use " + alternative + " instead.", new Error("").stack);
            }
            return callback.apply(callback, arguments);
        };
    }

    // end of shims
    // beginning of real work

    /**
     * Constructs a promise for an immediate reference, passes promises through, or
     * coerces promises from different systems.
     * @param value immediate reference or promise
     */
    function Q(value) {
        // If the object is already a Promise, return it directly.  This enables
        // the resolve function to both be used to created references from objects,
        // but to tolerably coerce non-promises to promises.
        if (value instanceof Promise) {
            return value;
        }

        // assimilate thenables
        if (isPromiseAlike(value)) {
            return coerce(value);
        } else {
            return fulfill(value);
        }
    }
    Q.resolve = Q;

    /**
     * Performs a task in a future turn of the event loop.
     * @param {Function} task
     */
    Q.nextTick = nextTick;

    /**
     * Controls whether or not long stack traces will be on
     */
    Q.longStackSupport = false;

    // enable long stacks if Q_DEBUG is set
    if (typeof process === "object" && process && process.env && process.env.Q_DEBUG) {
        Q.longStackSupport = true;
    }

    /**
     * Constructs a {promise, resolve, reject} object.
     *
     * `resolve` is a callback to invoke with a more resolved value for the
     * promise. To fulfill the promise, invoke `resolve` with any value that is
     * not a thenable. To reject the promise, invoke `resolve` with a rejected
     * thenable, or invoke `reject` with the reason directly. To resolve the
     * promise to another thenable, thus putting it in the same state, invoke
     * `resolve` with that other thenable.
     */
    Q.defer = defer;
    function defer() {
        // if "messages" is an "Array", that indicates that the promise has not yet
        // been resolved.  If it is "undefined", it has been resolved.  Each
        // element of the messages array is itself an array of complete arguments to
        // forward to the resolved promise.  We coerce the resolution value to a
        // promise using the `resolve` function because it handles both fully
        // non-thenable values and other thenables gracefully.
        var messages = [],
            progressListeners = [],
            resolvedPromise;

        var deferred = object_create(defer.prototype);
        var promise = object_create(Promise.prototype);

        promise.promiseDispatch = function (resolve, op, operands) {
            var args = array_slice(arguments);
            if (messages) {
                messages.push(args);
                if (op === "when" && operands[1]) {
                    // progress operand
                    progressListeners.push(operands[1]);
                }
            } else {
                Q.nextTick(function () {
                    resolvedPromise.promiseDispatch.apply(resolvedPromise, args);
                });
            }
        };

        // XXX deprecated
        promise.valueOf = function () {
            if (messages) {
                return promise;
            }
            var nearerValue = nearer(resolvedPromise);
            if (isPromise(nearerValue)) {
                resolvedPromise = nearerValue; // shorten chain
            }
            return nearerValue;
        };

        promise.inspect = function () {
            if (!resolvedPromise) {
                return { state: "pending" };
            }
            return resolvedPromise.inspect();
        };

        if (Q.longStackSupport && hasStacks) {
            try {
                throw new Error();
            } catch (e) {
                // NOTE: don't try to use `Error.captureStackTrace` or transfer the
                // accessor around; that causes memory leaks as per GH-111. Just
                // reify the stack trace as a string ASAP.
                //
                // At the same time, cut off the first line; it's always just
                // "[object Promise]\n", as per the `toString`.
                promise.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
            }
        }

        // NOTE: we do the checks for `resolvedPromise` in each method, instead of
        // consolidating them into `become`, since otherwise we'd create new
        // promises with the lines `become(whatever(value))`. See e.g. GH-252.

        function become(newPromise) {
            resolvedPromise = newPromise;

            if (Q.longStackSupport && hasStacks) {
                // Only hold a reference to the new promise if long stacks
                // are enabled to reduce memory usage
                promise.source = newPromise;
            }

            array_reduce(messages, function (undefined, message) {
                Q.nextTick(function () {
                    newPromise.promiseDispatch.apply(newPromise, message);
                });
            }, void 0);

            messages = void 0;
            progressListeners = void 0;
        }

        deferred.promise = promise;
        deferred.resolve = function (value) {
            if (resolvedPromise) {
                return;
            }

            become(Q(value));
        };

        deferred.fulfill = function (value) {
            if (resolvedPromise) {
                return;
            }

            become(fulfill(value));
        };
        deferred.reject = function (reason) {
            if (resolvedPromise) {
                return;
            }

            become(reject(reason));
        };
        deferred.notify = function (progress) {
            if (resolvedPromise) {
                return;
            }

            array_reduce(progressListeners, function (undefined, progressListener) {
                Q.nextTick(function () {
                    progressListener(progress);
                });
            }, void 0);
        };

        return deferred;
    }

    /**
     * Creates a Node-style callback that will resolve or reject the deferred
     * promise.
     * @returns a nodeback
     */
    defer.prototype.makeNodeResolver = function () {
        var self = this;
        return function (error, value) {
            if (error) {
                self.reject(error);
            } else if (arguments.length > 2) {
                self.resolve(array_slice(arguments, 1));
            } else {
                self.resolve(value);
            }
        };
    };

    /**
     * @param resolver {Function} a function that returns nothing and accepts
     * the resolve, reject, and notify functions for a deferred.
     * @returns a promise that may be resolved with the given resolve and reject
     * functions, or rejected by a thrown exception in resolver
     */
    Q.Promise = promise; // ES6
    Q.promise = promise;
    function promise(resolver) {
        if (typeof resolver !== "function") {
            throw new TypeError("resolver must be a function.");
        }
        var deferred = defer();
        try {
            resolver(deferred.resolve, deferred.reject, deferred.notify);
        } catch (reason) {
            deferred.reject(reason);
        }
        return deferred.promise;
    }

    promise.race = race; // ES6
    promise.all = all; // ES6
    promise.reject = reject; // ES6
    promise.resolve = Q; // ES6

    // XXX experimental.  This method is a way to denote that a local value is
    // serializable and should be immediately dispatched to a remote upon request,
    // instead of passing a reference.
    Q.passByCopy = function (object) {
        //freeze(object);
        //passByCopies.set(object, true);
        return object;
    };

    Promise.prototype.passByCopy = function () {
        //freeze(object);
        //passByCopies.set(object, true);
        return this;
    };

    /**
     * If two promises eventually fulfill to the same value, promises that value,
     * but otherwise rejects.
     * @param x {Any*}
     * @param y {Any*}
     * @returns {Any*} a promise for x and y if they are the same, but a rejection
     * otherwise.
     *
     */
    Q.join = function (x, y) {
        return Q(x).join(y);
    };

    Promise.prototype.join = function (that) {
        return Q([this, that]).spread(function (x, y) {
            if (x === y) {
                // TODO: "===" should be Object.is or equiv
                return x;
            } else {
                throw new Error("Q can't join: not the same: " + x + " " + y);
            }
        });
    };

    /**
     * Returns a promise for the first of an array of promises to become settled.
     * @param answers {Array[Any*]} promises to race
     * @returns {Any*} the first promise to be settled
     */
    Q.race = race;
    function race(answerPs) {
        return promise(function (resolve, reject) {
            // Switch to this once we can assume at least ES5
            // answerPs.forEach(function (answerP) {
            //     Q(answerP).then(resolve, reject);
            // });
            // Use this in the meantime
            for (var i = 0, len = answerPs.length; i < len; i++) {
                Q(answerPs[i]).then(resolve, reject);
            }
        });
    }

    Promise.prototype.race = function () {
        return this.then(Q.race);
    };

    /**
     * Constructs a Promise with a promise descriptor object and optional fallback
     * function.  The descriptor contains methods like when(rejected), get(name),
     * set(name, value), post(name, args), and delete(name), which all
     * return either a value, a promise for a value, or a rejection.  The fallback
     * accepts the operation name, a resolver, and any further arguments that would
     * have been forwarded to the appropriate method above had a method been
     * provided with the proper name.  The API makes no guarantees about the nature
     * of the returned object, apart from that it is usable whereever promises are
     * bought and sold.
     */
    Q.makePromise = Promise;
    function Promise(descriptor, fallback, inspect) {
        if (fallback === void 0) {
            fallback = function (op) {
                return reject(new Error("Promise does not support operation: " + op));
            };
        }
        if (inspect === void 0) {
            inspect = function () {
                return { state: "unknown" };
            };
        }

        var promise = object_create(Promise.prototype);

        promise.promiseDispatch = function (resolve, op, args) {
            var result;
            try {
                if (descriptor[op]) {
                    result = descriptor[op].apply(promise, args);
                } else {
                    result = fallback.call(promise, op, args);
                }
            } catch (exception) {
                result = reject(exception);
            }
            if (resolve) {
                resolve(result);
            }
        };

        promise.inspect = inspect;

        // XXX deprecated `valueOf` and `exception` support
        if (inspect) {
            var inspected = inspect();
            if (inspected.state === "rejected") {
                promise.exception = inspected.reason;
            }

            promise.valueOf = function () {
                var inspected = inspect();
                if (inspected.state === "pending" || inspected.state === "rejected") {
                    return promise;
                }
                return inspected.value;
            };
        }

        return promise;
    }

    Promise.prototype.toString = function () {
        return "[object Promise]";
    };

    Promise.prototype.then = function (fulfilled, rejected, progressed) {
        var self = this;
        var deferred = defer();
        var done = false; // ensure the untrusted promise makes at most a
        // single call to one of the callbacks

        function _fulfilled(value) {
            try {
                return typeof fulfilled === "function" ? fulfilled(value) : value;
            } catch (exception) {
                return reject(exception);
            }
        }

        function _rejected(exception) {
            if (typeof rejected === "function") {
                makeStackTraceLong(exception, self);
                try {
                    return rejected(exception);
                } catch (newException) {
                    return reject(newException);
                }
            }
            return reject(exception);
        }

        function _progressed(value) {
            return typeof progressed === "function" ? progressed(value) : value;
        }

        Q.nextTick(function () {
            self.promiseDispatch(function (value) {
                if (done) {
                    return;
                }
                done = true;

                deferred.resolve(_fulfilled(value));
            }, "when", [function (exception) {
                if (done) {
                    return;
                }
                done = true;

                deferred.resolve(_rejected(exception));
            }]);
        });

        // Progress propagator need to be attached in the current tick.
        self.promiseDispatch(void 0, "when", [void 0, function (value) {
            var newValue;
            var threw = false;
            try {
                newValue = _progressed(value);
            } catch (e) {
                threw = true;
                if (Q.onerror) {
                    Q.onerror(e);
                } else {
                    throw e;
                }
            }

            if (!threw) {
                deferred.notify(newValue);
            }
        }]);

        return deferred.promise;
    };

    Q.tap = function (promise, callback) {
        return Q(promise).tap(callback);
    };

    /**
     * Works almost like "finally", but not called for rejections.
     * Original resolution value is passed through callback unaffected.
     * Callback may return a promise that will be awaited for.
     * @param {Function} callback
     * @returns {Q.Promise}
     * @example
     * doSomething()
     *   .then(...)
     *   .tap(console.log)
     *   .then(...);
     */
    Promise.prototype.tap = function (callback) {
        callback = Q(callback);

        return this.then(function (value) {
            return callback.fcall(value).thenResolve(value);
        });
    };

    /**
     * Registers an observer on a promise.
     *
     * Guarantees:
     *
     * 1. that fulfilled and rejected will be called only once.
     * 2. that either the fulfilled callback or the rejected callback will be
     *    called, but not both.
     * 3. that fulfilled and rejected will not be called in this turn.
     *
     * @param value      promise or immediate reference to observe
     * @param fulfilled  function to be called with the fulfilled value
     * @param rejected   function to be called with the rejection exception
     * @param progressed function to be called on any progress notifications
     * @return promise for the return value from the invoked callback
     */
    Q.when = when;
    function when(value, fulfilled, rejected, progressed) {
        return Q(value).then(fulfilled, rejected, progressed);
    }

    Promise.prototype.thenResolve = function (value) {
        return this.then(function () {
            return value;
        });
    };

    Q.thenResolve = function (promise, value) {
        return Q(promise).thenResolve(value);
    };

    Promise.prototype.thenReject = function (reason) {
        return this.then(function () {
            throw reason;
        });
    };

    Q.thenReject = function (promise, reason) {
        return Q(promise).thenReject(reason);
    };

    /**
     * If an object is not a promise, it is as "near" as possible.
     * If a promise is rejected, it is as "near" as possible too.
     * If it’s a fulfilled promise, the fulfillment value is nearer.
     * If it’s a deferred promise and the deferred has been resolved, the
     * resolution is "nearer".
     * @param object
     * @returns most resolved (nearest) form of the object
     */

    // XXX should we re-do this?
    Q.nearer = nearer;
    function nearer(value) {
        if (isPromise(value)) {
            var inspected = value.inspect();
            if (inspected.state === "fulfilled") {
                return inspected.value;
            }
        }
        return value;
    }

    /**
     * @returns whether the given object is a promise.
     * Otherwise it is a fulfilled value.
     */
    Q.isPromise = isPromise;
    function isPromise(object) {
        return object instanceof Promise;
    }

    Q.isPromiseAlike = isPromiseAlike;
    function isPromiseAlike(object) {
        return isObject(object) && typeof object.then === "function";
    }

    /**
     * @returns whether the given object is a pending promise, meaning not
     * fulfilled or rejected.
     */
    Q.isPending = isPending;
    function isPending(object) {
        return isPromise(object) && object.inspect().state === "pending";
    }

    Promise.prototype.isPending = function () {
        return this.inspect().state === "pending";
    };

    /**
     * @returns whether the given object is a value or fulfilled
     * promise.
     */
    Q.isFulfilled = isFulfilled;
    function isFulfilled(object) {
        return !isPromise(object) || object.inspect().state === "fulfilled";
    }

    Promise.prototype.isFulfilled = function () {
        return this.inspect().state === "fulfilled";
    };

    /**
     * @returns whether the given object is a rejected promise.
     */
    Q.isRejected = isRejected;
    function isRejected(object) {
        return isPromise(object) && object.inspect().state === "rejected";
    }

    Promise.prototype.isRejected = function () {
        return this.inspect().state === "rejected";
    };

    //// BEGIN UNHANDLED REJECTION TRACKING

    // This promise library consumes exceptions thrown in handlers so they can be
    // handled by a subsequent promise.  The exceptions get added to this array when
    // they are created, and removed when they are handled.  Note that in ES6 or
    // shimmed environments, this would naturally be a `Set`.
    var unhandledReasons = [];
    var unhandledRejections = [];
    var reportedUnhandledRejections = [];
    var trackUnhandledRejections = true;

    function resetUnhandledRejections() {
        unhandledReasons.length = 0;
        unhandledRejections.length = 0;

        if (!trackUnhandledRejections) {
            trackUnhandledRejections = true;
        }
    }

    function trackRejection(promise, reason) {
        if (!trackUnhandledRejections) {
            return;
        }
        if (typeof process === "object" && typeof process.emit === "function") {
            Q.nextTick.runAfter(function () {
                if (array_indexOf(unhandledRejections, promise) !== -1) {
                    process.emit("unhandledRejection", reason, promise);
                    reportedUnhandledRejections.push(promise);
                }
            });
        }

        unhandledRejections.push(promise);
        if (reason && typeof reason.stack !== "undefined") {
            unhandledReasons.push(reason.stack);
        } else {
            unhandledReasons.push("(no stack) " + reason);
        }
    }

    function untrackRejection(promise) {
        if (!trackUnhandledRejections) {
            return;
        }

        var at = array_indexOf(unhandledRejections, promise);
        if (at !== -1) {
            if (typeof process === "object" && typeof process.emit === "function") {
                Q.nextTick.runAfter(function () {
                    var atReport = array_indexOf(reportedUnhandledRejections, promise);
                    if (atReport !== -1) {
                        process.emit("rejectionHandled", unhandledReasons[at], promise);
                        reportedUnhandledRejections.splice(atReport, 1);
                    }
                });
            }
            unhandledRejections.splice(at, 1);
            unhandledReasons.splice(at, 1);
        }
    }

    Q.resetUnhandledRejections = resetUnhandledRejections;

    Q.getUnhandledReasons = function () {
        // Make a copy so that consumers can't interfere with our internal state.
        return unhandledReasons.slice();
    };

    Q.stopUnhandledRejectionTracking = function () {
        resetUnhandledRejections();
        trackUnhandledRejections = false;
    };

    resetUnhandledRejections();

    //// END UNHANDLED REJECTION TRACKING

    /**
     * Constructs a rejected promise.
     * @param reason value describing the failure
     */
    Q.reject = reject;
    function reject(reason) {
        var rejection = Promise({
            "when": function when(rejected) {
                // note that the error has been handled
                if (rejected) {
                    untrackRejection(this);
                }
                return rejected ? rejected(reason) : this;
            }
        }, function fallback() {
            return this;
        }, function inspect() {
            return { state: "rejected", reason: reason };
        });

        // Note that the reason has not been handled.
        trackRejection(rejection, reason);

        return rejection;
    }

    /**
     * Constructs a fulfilled promise for an immediate reference.
     * @param value immediate reference
     */
    Q.fulfill = fulfill;
    function fulfill(value) {
        return Promise({
            "when": function when() {
                return value;
            },
            "get": function get(name) {
                return value[name];
            },
            "set": function set(name, rhs) {
                value[name] = rhs;
            },
            "delete": function _delete(name) {
                delete value[name];
            },
            "post": function post(name, args) {
                // Mark Miller proposes that post with no name should apply a
                // promised function.
                if (name === null || name === void 0) {
                    return value.apply(void 0, args);
                } else {
                    return value[name].apply(value, args);
                }
            },
            "apply": function apply(thisp, args) {
                return value.apply(thisp, args);
            },
            "keys": function keys() {
                return object_keys(value);
            }
        }, void 0, function inspect() {
            return { state: "fulfilled", value: value };
        });
    }

    /**
     * Converts thenables to Q promises.
     * @param promise thenable promise
     * @returns a Q promise
     */
    function coerce(promise) {
        var deferred = defer();
        Q.nextTick(function () {
            try {
                promise.then(deferred.resolve, deferred.reject, deferred.notify);
            } catch (exception) {
                deferred.reject(exception);
            }
        });
        return deferred.promise;
    }

    /**
     * Annotates an object such that it will never be
     * transferred away from this process over any promise
     * communication channel.
     * @param object
     * @returns promise a wrapping of that object that
     * additionally responds to the "isDef" message
     * without a rejection.
     */
    Q.master = master;
    function master(object) {
        return Promise({
            "isDef": function isDef() {}
        }, function fallback(op, args) {
            return dispatch(object, op, args);
        }, function () {
            return Q(object).inspect();
        });
    }

    /**
     * Spreads the values of a promised array of arguments into the
     * fulfillment callback.
     * @param fulfilled callback that receives variadic arguments from the
     * promised array
     * @param rejected callback that receives the exception if the promise
     * is rejected.
     * @returns a promise for the return value or thrown exception of
     * either callback.
     */
    Q.spread = spread;
    function spread(value, fulfilled, rejected) {
        return Q(value).spread(fulfilled, rejected);
    }

    Promise.prototype.spread = function (fulfilled, rejected) {
        return this.all().then(function (array) {
            return fulfilled.apply(void 0, array);
        }, rejected);
    };

    /**
     * The async function is a decorator for generator functions, turning
     * them into asynchronous generators.  Although generators are only part
     * of the newest ECMAScript 6 drafts, this code does not cause syntax
     * errors in older engines.  This code should continue to work and will
     * in fact improve over time as the language improves.
     *
     * ES6 generators are currently part of V8 version 3.19 with the
     * --harmony-generators runtime flag enabled.  SpiderMonkey has had them
     * for longer, but under an older Python-inspired form.  This function
     * works on both kinds of generators.
     *
     * Decorates a generator function such that:
     *  - it may yield promises
     *  - execution will continue when that promise is fulfilled
     *  - the value of the yield expression will be the fulfilled value
     *  - it returns a promise for the return value (when the generator
     *    stops iterating)
     *  - the decorated function returns a promise for the return value
     *    of the generator or the first rejected promise among those
     *    yielded.
     *  - if an error is thrown in the generator, it propagates through
     *    every following yield until it is caught, or until it escapes
     *    the generator function altogether, and is translated into a
     *    rejection for the promise returned by the decorated generator.
     */
    Q.async = async;
    function async(makeGenerator) {
        return function () {
            // when verb is "send", arg is a value
            // when verb is "throw", arg is an exception
            function continuer(verb, arg) {
                var result;

                // Until V8 3.19 / Chromium 29 is released, SpiderMonkey is the only
                // engine that has a deployed base of browsers that support generators.
                // However, SM's generators use the Python-inspired semantics of
                // outdated ES6 drafts.  We would like to support ES6, but we'd also
                // like to make it possible to use generators in deployed browsers, so
                // we also support Python-style generators.  At some point we can remove
                // this block.

                if (typeof StopIteration === "undefined") {
                    // ES6 Generators
                    try {
                        result = generator[verb](arg);
                    } catch (exception) {
                        return reject(exception);
                    }
                    if (result.done) {
                        return Q(result.value);
                    } else {
                        return when(result.value, callback, errback);
                    }
                } else {
                    // SpiderMonkey Generators
                    // FIXME: Remove this case when SM does ES6 generators.
                    try {
                        result = generator[verb](arg);
                    } catch (exception) {
                        if (isStopIteration(exception)) {
                            return Q(exception.value);
                        } else {
                            return reject(exception);
                        }
                    }
                    return when(result, callback, errback);
                }
            }
            var generator = makeGenerator.apply(this, arguments);
            var callback = continuer.bind(continuer, "next");
            var errback = continuer.bind(continuer, "throw");
            return callback();
        };
    }

    /**
     * The spawn function is a small wrapper around async that immediately
     * calls the generator and also ends the promise chain, so that any
     * unhandled errors are thrown instead of forwarded to the error
     * handler. This is useful because it's extremely common to run
     * generators at the top-level to work with libraries.
     */
    Q.spawn = spawn;
    function spawn(makeGenerator) {
        Q.done(Q.async(makeGenerator)());
    }

    // FIXME: Remove this interface once ES6 generators are in SpiderMonkey.
    /**
     * Throws a ReturnValue exception to stop an asynchronous generator.
     *
     * This interface is a stop-gap measure to support generator return
     * values in older Firefox/SpiderMonkey.  In browsers that support ES6
     * generators like Chromium 29, just use "return" in your generator
     * functions.
     *
     * @param value the return value for the surrounding generator
     * @throws ReturnValue exception with the value.
     * @example
     * // ES6 style
     * Q.async(function* () {
     *      var foo = yield getFooPromise();
     *      var bar = yield getBarPromise();
     *      return foo + bar;
     * })
     * // Older SpiderMonkey style
     * Q.async(function () {
     *      var foo = yield getFooPromise();
     *      var bar = yield getBarPromise();
     *      Q.return(foo + bar);
     * })
    */
    Q["return"] = _return;
    function _return(value) {
        throw new QReturnValue(value);
    }

    /**
     * The promised function decorator ensures that any promise arguments
     * are settled and passed as values (`this` is also settled and passed
     * as a value).  It will also ensure that the result of a function is
     * always a promise.
     *
     * @example
     * var add = Q.promised(function (a, b) {
     *     return a + b;
     * });
     * add(Q(a), Q(B));
     *
     * @param {function} callback The function to decorate
     * @returns {function} a function that has been decorated.
     */
    Q.promised = promised;
    function promised(callback) {
        return function () {
            return spread([this, all(arguments)], function (self, args) {
                return callback.apply(self, args);
            });
        };
    }

    /**
     * sends a message to a value in a future turn
     * @param object* the recipient
     * @param op the name of the message operation, e.g., "when",
     * @param args further arguments to be forwarded to the operation
     * @returns result {Promise} a promise for the result of the operation
     */
    Q.dispatch = dispatch;
    function dispatch(object, op, args) {
        return Q(object).dispatch(op, args);
    }

    Promise.prototype.dispatch = function (op, args) {
        var self = this;
        var deferred = defer();
        Q.nextTick(function () {
            self.promiseDispatch(deferred.resolve, op, args);
        });
        return deferred.promise;
    };

    /**
     * Gets the value of a property in a future turn.
     * @param object    promise or immediate reference for target object
     * @param name      name of property to get
     * @return promise for the property value
     */
    Q.get = function (object, key) {
        return Q(object).dispatch("get", [key]);
    };

    Promise.prototype.get = function (key) {
        return this.dispatch("get", [key]);
    };

    /**
     * Sets the value of a property in a future turn.
     * @param object    promise or immediate reference for object object
     * @param name      name of property to set
     * @param value     new value of property
     * @return promise for the return value
     */
    Q.set = function (object, key, value) {
        return Q(object).dispatch("set", [key, value]);
    };

    Promise.prototype.set = function (key, value) {
        return this.dispatch("set", [key, value]);
    };

    /**
     * Deletes a property in a future turn.
     * @param object    promise or immediate reference for target object
     * @param name      name of property to delete
     * @return promise for the return value
     */
    Q.del = // XXX legacy
    Q["delete"] = function (object, key) {
        return Q(object).dispatch("delete", [key]);
    };

    Promise.prototype.del = // XXX legacy
    Promise.prototype["delete"] = function (key) {
        return this.dispatch("delete", [key]);
    };

    /**
     * Invokes a method in a future turn.
     * @param object    promise or immediate reference for target object
     * @param name      name of method to invoke
     * @param value     a value to post, typically an array of
     *                  invocation arguments for promises that
     *                  are ultimately backed with `resolve` values,
     *                  as opposed to those backed with URLs
     *                  wherein the posted value can be any
     *                  JSON serializable object.
     * @return promise for the return value
     */
    // bound locally because it is used by other methods
    Q.mapply = // XXX As proposed by "Redsandro"
    Q.post = function (object, name, args) {
        return Q(object).dispatch("post", [name, args]);
    };

    Promise.prototype.mapply = // XXX As proposed by "Redsandro"
    Promise.prototype.post = function (name, args) {
        return this.dispatch("post", [name, args]);
    };

    /**
     * Invokes a method in a future turn.
     * @param object    promise or immediate reference for target object
     * @param name      name of method to invoke
     * @param ...args   array of invocation arguments
     * @return promise for the return value
     */
    Q.send = // XXX Mark Miller's proposed parlance
    Q.mcall = // XXX As proposed by "Redsandro"
    Q.invoke = function (object, name /*...args*/) {
        return Q(object).dispatch("post", [name, array_slice(arguments, 2)]);
    };

    Promise.prototype.send = // XXX Mark Miller's proposed parlance
    Promise.prototype.mcall = // XXX As proposed by "Redsandro"
    Promise.prototype.invoke = function (name /*...args*/) {
        return this.dispatch("post", [name, array_slice(arguments, 1)]);
    };

    /**
     * Applies the promised function in a future turn.
     * @param object    promise or immediate reference for target function
     * @param args      array of application arguments
     */
    Q.fapply = function (object, args) {
        return Q(object).dispatch("apply", [void 0, args]);
    };

    Promise.prototype.fapply = function (args) {
        return this.dispatch("apply", [void 0, args]);
    };

    /**
     * Calls the promised function in a future turn.
     * @param object    promise or immediate reference for target function
     * @param ...args   array of application arguments
     */
    Q["try"] = Q.fcall = function (object /* ...args*/) {
        return Q(object).dispatch("apply", [void 0, array_slice(arguments, 1)]);
    };

    Promise.prototype.fcall = function () /*...args*/{
        return this.dispatch("apply", [void 0, array_slice(arguments)]);
    };

    /**
     * Binds the promised function, transforming return values into a fulfilled
     * promise and thrown errors into a rejected one.
     * @param object    promise or immediate reference for target function
     * @param ...args   array of application arguments
     */
    Q.fbind = function (object /*...args*/) {
        var promise = Q(object);
        var args = array_slice(arguments, 1);
        return function fbound() {
            return promise.dispatch("apply", [this, args.concat(array_slice(arguments))]);
        };
    };
    Promise.prototype.fbind = function () /*...args*/{
        var promise = this;
        var args = array_slice(arguments);
        return function fbound() {
            return promise.dispatch("apply", [this, args.concat(array_slice(arguments))]);
        };
    };

    /**
     * Requests the names of the owned properties of a promised
     * object in a future turn.
     * @param object    promise or immediate reference for target object
     * @return promise for the keys of the eventually settled object
     */
    Q.keys = function (object) {
        return Q(object).dispatch("keys", []);
    };

    Promise.prototype.keys = function () {
        return this.dispatch("keys", []);
    };

    /**
     * Turns an array of promises into a promise for an array.  If any of
     * the promises gets rejected, the whole array is rejected immediately.
     * @param {Array*} an array (or promise for an array) of values (or
     * promises for values)
     * @returns a promise for an array of the corresponding values
     */
    // By Mark Miller
    // http://wiki.ecmascript.org/doku.php?id=strawman:concurrency&rev=1308776521#allfulfilled
    Q.all = all;
    function all(promises) {
        return when(promises, function (promises) {
            var pendingCount = 0;
            var deferred = defer();
            array_reduce(promises, function (undefined, promise, index) {
                var snapshot;
                if (isPromise(promise) && (snapshot = promise.inspect()).state === "fulfilled") {
                    promises[index] = snapshot.value;
                } else {
                    ++pendingCount;
                    when(promise, function (value) {
                        promises[index] = value;
                        if (--pendingCount === 0) {
                            deferred.resolve(promises);
                        }
                    }, deferred.reject, function (progress) {
                        deferred.notify({ index: index, value: progress });
                    });
                }
            }, void 0);
            if (pendingCount === 0) {
                deferred.resolve(promises);
            }
            return deferred.promise;
        });
    }

    Promise.prototype.all = function () {
        return all(this);
    };

    /**
     * Returns the first resolved promise of an array. Prior rejected promises are
     * ignored.  Rejects only if all promises are rejected.
     * @param {Array*} an array containing values or promises for values
     * @returns a promise fulfilled with the value of the first resolved promise,
     * or a rejected promise if all promises are rejected.
     */
    Q.any = any;

    function any(promises) {
        if (promises.length === 0) {
            return Q.resolve();
        }

        var deferred = Q.defer();
        var pendingCount = 0;
        array_reduce(promises, function (prev, current, index) {
            var promise = promises[index];

            pendingCount++;

            when(promise, onFulfilled, onRejected, onProgress);
            function onFulfilled(result) {
                deferred.resolve(result);
            }
            function onRejected(err) {
                pendingCount--;
                if (pendingCount === 0) {
                    err.message = "Q can't get fulfillment value from any promise, all " + "promises were rejected. Last error message: " + err.message;
                    deferred.reject(err);
                }
            }
            function onProgress(progress) {
                deferred.notify({
                    index: index,
                    value: progress
                });
            }
        }, undefined);

        return deferred.promise;
    }

    Promise.prototype.any = function () {
        return any(this);
    };

    /**
     * Waits for all promises to be settled, either fulfilled or
     * rejected.  This is distinct from `all` since that would stop
     * waiting at the first rejection.  The promise returned by
     * `allResolved` will never be rejected.
     * @param promises a promise for an array (or an array) of promises
     * (or values)
     * @return a promise for an array of promises
     */
    Q.allResolved = deprecate(allResolved, "allResolved", "allSettled");
    function allResolved(promises) {
        return when(promises, function (promises) {
            promises = array_map(promises, Q);
            return when(all(array_map(promises, function (promise) {
                return when(promise, noop, noop);
            })), function () {
                return promises;
            });
        });
    }

    Promise.prototype.allResolved = function () {
        return allResolved(this);
    };

    /**
     * @see Promise#allSettled
     */
    Q.allSettled = allSettled;
    function allSettled(promises) {
        return Q(promises).allSettled();
    }

    /**
     * Turns an array of promises into a promise for an array of their states (as
     * returned by `inspect`) when they have all settled.
     * @param {Array[Any*]} values an array (or promise for an array) of values (or
     * promises for values)
     * @returns {Array[State]} an array of states for the respective values.
     */
    Promise.prototype.allSettled = function () {
        return this.then(function (promises) {
            return all(array_map(promises, function (promise) {
                promise = Q(promise);
                function regardless() {
                    return promise.inspect();
                }
                return promise.then(regardless, regardless);
            }));
        });
    };

    /**
     * Captures the failure of a promise, giving an oportunity to recover
     * with a callback.  If the given promise is fulfilled, the returned
     * promise is fulfilled.
     * @param {Any*} promise for something
     * @param {Function} callback to fulfill the returned promise if the
     * given promise is rejected
     * @returns a promise for the return value of the callback
     */
    Q.fail = // XXX legacy
    Q["catch"] = function (object, rejected) {
        return Q(object).then(void 0, rejected);
    };

    Promise.prototype.fail = // XXX legacy
    Promise.prototype["catch"] = function (rejected) {
        return this.then(void 0, rejected);
    };

    /**
     * Attaches a listener that can respond to progress notifications from a
     * promise's originating deferred. This listener receives the exact arguments
     * passed to ``deferred.notify``.
     * @param {Any*} promise for something
     * @param {Function} callback to receive any progress notifications
     * @returns the given promise, unchanged
     */
    Q.progress = progress;
    function progress(object, progressed) {
        return Q(object).then(void 0, void 0, progressed);
    }

    Promise.prototype.progress = function (progressed) {
        return this.then(void 0, void 0, progressed);
    };

    /**
     * Provides an opportunity to observe the settling of a promise,
     * regardless of whether the promise is fulfilled or rejected.  Forwards
     * the resolution to the returned promise when the callback is done.
     * The callback can return a promise to defer completion.
     * @param {Any*} promise
     * @param {Function} callback to observe the resolution of the given
     * promise, takes no arguments.
     * @returns a promise for the resolution of the given promise when
     * ``fin`` is done.
     */
    Q.fin = // XXX legacy
    Q["finally"] = function (object, callback) {
        return Q(object)["finally"](callback);
    };

    Promise.prototype.fin = // XXX legacy
    Promise.prototype["finally"] = function (callback) {
        if (!callback || typeof callback.apply !== "function") {
            throw new Error("Q can't apply finally callback");
        }
        callback = Q(callback);
        return this.then(function (value) {
            return callback.fcall().then(function () {
                return value;
            });
        }, function (reason) {
            // TODO attempt to recycle the rejection with "this".
            return callback.fcall().then(function () {
                throw reason;
            });
        });
    };

    /**
     * Terminates a chain of promises, forcing rejections to be
     * thrown as exceptions.
     * @param {Any*} promise at the end of a chain of promises
     * @returns nothing
     */
    Q.done = function (object, fulfilled, rejected, progress) {
        return Q(object).done(fulfilled, rejected, progress);
    };

    Promise.prototype.done = function (fulfilled, rejected, progress) {
        var onUnhandledError = function onUnhandledError(error) {
            // forward to a future turn so that ``when``
            // does not catch it and turn it into a rejection.
            Q.nextTick(function () {
                makeStackTraceLong(error, promise);
                if (Q.onerror) {
                    Q.onerror(error);
                } else {
                    throw error;
                }
            });
        };

        // Avoid unnecessary `nextTick`ing via an unnecessary `when`.
        var promise = fulfilled || rejected || progress ? this.then(fulfilled, rejected, progress) : this;

        if (typeof process === "object" && process && process.domain) {
            onUnhandledError = process.domain.bind(onUnhandledError);
        }

        promise.then(void 0, onUnhandledError);
    };

    /**
     * Causes a promise to be rejected if it does not get fulfilled before
     * some milliseconds time out.
     * @param {Any*} promise
     * @param {Number} milliseconds timeout
     * @param {Any*} custom error message or Error object (optional)
     * @returns a promise for the resolution of the given promise if it is
     * fulfilled before the timeout, otherwise rejected.
     */
    Q.timeout = function (object, ms, error) {
        return Q(object).timeout(ms, error);
    };

    Promise.prototype.timeout = function (ms, error) {
        var deferred = defer();
        var timeoutId = setTimeout(function () {
            if (!error || "string" === typeof error) {
                error = new Error(error || "Timed out after " + ms + " ms");
                error.code = "ETIMEDOUT";
            }
            deferred.reject(error);
        }, ms);

        this.then(function (value) {
            clearTimeout(timeoutId);
            deferred.resolve(value);
        }, function (exception) {
            clearTimeout(timeoutId);
            deferred.reject(exception);
        }, deferred.notify);

        return deferred.promise;
    };

    /**
     * Returns a promise for the given value (or promised value), some
     * milliseconds after it resolved. Passes rejections immediately.
     * @param {Any*} promise
     * @param {Number} milliseconds
     * @returns a promise for the resolution of the given promise after milliseconds
     * time has elapsed since the resolution of the given promise.
     * If the given promise rejects, that is passed immediately.
     */
    Q.delay = function (object, timeout) {
        if (timeout === void 0) {
            timeout = object;
            object = void 0;
        }
        return Q(object).delay(timeout);
    };

    Promise.prototype.delay = function (timeout) {
        return this.then(function (value) {
            var deferred = defer();
            setTimeout(function () {
                deferred.resolve(value);
            }, timeout);
            return deferred.promise;
        });
    };

    /**
     * Passes a continuation to a Node function, which is called with the given
     * arguments provided as an array, and returns a promise.
     *
     *      Q.nfapply(FS.readFile, [__filename])
     *      .then(function (content) {
     *      })
     *
     */
    Q.nfapply = function (callback, args) {
        return Q(callback).nfapply(args);
    };

    Promise.prototype.nfapply = function (args) {
        var deferred = defer();
        var nodeArgs = array_slice(args);
        nodeArgs.push(deferred.makeNodeResolver());
        this.fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
    };

    /**
     * Passes a continuation to a Node function, which is called with the given
     * arguments provided individually, and returns a promise.
     * @example
     * Q.nfcall(FS.readFile, __filename)
     * .then(function (content) {
     * })
     *
     */
    Q.nfcall = function (callback /*...args*/) {
        var args = array_slice(arguments, 1);
        return Q(callback).nfapply(args);
    };

    Promise.prototype.nfcall = function () /*...args*/{
        var nodeArgs = array_slice(arguments);
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        this.fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
    };

    /**
     * Wraps a NodeJS continuation passing function and returns an equivalent
     * version that returns a promise.
     * @example
     * Q.nfbind(FS.readFile, __filename)("utf-8")
     * .then(console.log)
     * .done()
     */
    Q.nfbind = Q.denodeify = function (callback /*...args*/) {
        if (callback === undefined) {
            throw new Error("Q can't wrap an undefined function");
        }
        var baseArgs = array_slice(arguments, 1);
        return function () {
            var nodeArgs = baseArgs.concat(array_slice(arguments));
            var deferred = defer();
            nodeArgs.push(deferred.makeNodeResolver());
            Q(callback).fapply(nodeArgs).fail(deferred.reject);
            return deferred.promise;
        };
    };

    Promise.prototype.nfbind = Promise.prototype.denodeify = function () /*...args*/{
        var args = array_slice(arguments);
        args.unshift(this);
        return Q.denodeify.apply(void 0, args);
    };

    Q.nbind = function (callback, thisp /*...args*/) {
        var baseArgs = array_slice(arguments, 2);
        return function () {
            var nodeArgs = baseArgs.concat(array_slice(arguments));
            var deferred = defer();
            nodeArgs.push(deferred.makeNodeResolver());
            function bound() {
                return callback.apply(thisp, arguments);
            }
            Q(bound).fapply(nodeArgs).fail(deferred.reject);
            return deferred.promise;
        };
    };

    Promise.prototype.nbind = function () /*thisp, ...args*/{
        var args = array_slice(arguments, 0);
        args.unshift(this);
        return Q.nbind.apply(void 0, args);
    };

    /**
     * Calls a method of a Node-style object that accepts a Node-style
     * callback with a given array of arguments, plus a provided callback.
     * @param object an object that has the named method
     * @param {String} name name of the method of object
     * @param {Array} args arguments to pass to the method; the callback
     * will be provided by Q and appended to these arguments.
     * @returns a promise for the value or error
     */
    Q.nmapply = // XXX As proposed by "Redsandro"
    Q.npost = function (object, name, args) {
        return Q(object).npost(name, args);
    };

    Promise.prototype.nmapply = // XXX As proposed by "Redsandro"
    Promise.prototype.npost = function (name, args) {
        var nodeArgs = array_slice(args || []);
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
        return deferred.promise;
    };

    /**
     * Calls a method of a Node-style object that accepts a Node-style
     * callback, forwarding the given variadic arguments, plus a provided
     * callback argument.
     * @param object an object that has the named method
     * @param {String} name name of the method of object
     * @param ...args arguments to pass to the method; the callback will
     * be provided by Q and appended to these arguments.
     * @returns a promise for the value or error
     */
    Q.nsend = // XXX Based on Mark Miller's proposed "send"
    Q.nmcall = // XXX Based on "Redsandro's" proposal
    Q.ninvoke = function (object, name /*...args*/) {
        var nodeArgs = array_slice(arguments, 2);
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        Q(object).dispatch("post", [name, nodeArgs]).fail(deferred.reject);
        return deferred.promise;
    };

    Promise.prototype.nsend = // XXX Based on Mark Miller's proposed "send"
    Promise.prototype.nmcall = // XXX Based on "Redsandro's" proposal
    Promise.prototype.ninvoke = function (name /*...args*/) {
        var nodeArgs = array_slice(arguments, 1);
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
        return deferred.promise;
    };

    /**
     * If a function would like to support both Node continuation-passing-style and
     * promise-returning-style, it can end its internal promise chain with
     * `nodeify(nodeback)`, forwarding the optional nodeback argument.  If the user
     * elects to use a nodeback, the result will be sent there.  If they do not
     * pass a nodeback, they will receive the result promise.
     * @param object a result (or a promise for a result)
     * @param {Function} nodeback a Node.js-style callback
     * @returns either the promise or nothing
     */
    Q.nodeify = nodeify;
    function nodeify(object, nodeback) {
        return Q(object).nodeify(nodeback);
    }

    Promise.prototype.nodeify = function (nodeback) {
        if (nodeback) {
            this.then(function (value) {
                Q.nextTick(function () {
                    nodeback(null, value);
                });
            }, function (error) {
                Q.nextTick(function () {
                    nodeback(error);
                });
            });
        } else {
            return this;
        }
    };

    Q.noConflict = function () {
        throw new Error("Q.noConflict only works when Q is used as a global");
    };

    // All code before this point will be filtered from stack traces.
    var qEndingLine = captureLine();

    return Q;
});
/*!
 *
 * Copyright 2009-2016 Kris Kowal under the terms of the MIT
 * license found at https://github.com/kriskowal/q/blob/v1/LICENSE
 *
 * With parts by Tyler Close
 * Copyright 2007-2009 Tyler Close under the terms of the MIT X license found
 * at http://www.opensource.org/licenses/mit-license.html
 * Forked at ref_send.js version: 2009-05-11
 *
 * With parts by Mark Miller
 * Copyright (C) 2011 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

}).call(this,require('_process'))
},{"_process":1}]},{},[6]);
