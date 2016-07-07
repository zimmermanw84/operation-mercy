(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//  Canvas View Controller
//  public/js/src/canvasVC.js
//
//  Created by Walt Zimmerman on 7/6/16.
//

/**
* CanvasViewController {object}
* @params height {Number}, width {Number} - Optional
*/

"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CanvasViewController = (function () {
  function CanvasViewController(height, width, backgroundImgSrc) {
    _classCallCheck(this, CanvasViewController);

    this.height = height || window.innerHeight;
    this.width = width || window.innerWidth;
    this.backgroundImgSrc = backgroundImgSrc || "assets/sprites/thamasa.png";
    this.background = new Image();

    // Uninitalized canvas and context objects
    this.canvas;
    this.ctx;

    // Initialize CanvasViewController
    this._init();
  }

  /**
  * @private
  * _init {function}
  * Initialize CanvasViewController
  */

  CanvasViewController.prototype._init = function _init() {
    this._buildAndAppendCanvas();
    this._drawBackgroundImg();
    this._bindInitEvents();
  };

  /**
  * @private
  * _buildAndAppendCanvas {function}
  * Build canvas and append to DOM
  */

  CanvasViewController.prototype._buildAndAppendCanvas = function _buildAndAppendCanvas() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    // Set Props
    this.canvas.width = this.width; //512;
    this.canvas.height = this.height; //480;
    // Append canvas object
    document.body.appendChild(this.canvas);
  };

  /**
  * @private
  * _drawBackgroundImg {function}
  * Draw background Img on canvas
  */

  CanvasViewController.prototype._drawBackgroundImg = function _drawBackgroundImg() {
    this.background.src = this.backgroundImgSrc;
  };

  /**
  * @private
  * _bindInitEvents {function}
  * add necessary listeners
  */

  CanvasViewController.prototype._bindInitEvents = function _bindInitEvents() {
    var _this = this;

    // Bind load event
    this.background.onload = function () {
      _this.ctx.scale(2, 2);
      _this.ctx.drawImage(_this.background, 0, 0);
    };
  };

  return CanvasViewController;
})();

exports.CanvasViewController = CanvasViewController;

},{}],2:[function(require,module,exports){
//  Index
//  public/js/src/index.js
//
//  Created by Walt Zimmerman on 7/6/16.
//

'use strict';

var _models = require('./models');

var _canvasVc = require('./canvasVc');

var CanvasVC = new _canvasVc.CanvasViewController();

},{"./canvasVc":1,"./models":3}],3:[function(require,module,exports){
//  Models
//  public/js/src/models.js
//
//  Created by Walt Zimmerman on 7/6/16.
//

/**
* Sprite {object}
* @params type {ENUM}
*/
"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sprite = (function () {
  // static spriteType = { MAIN_CHARACTER: 1, NPC: 2 };

  function Sprite(type) {
    _classCallCheck(this, Sprite);

    this.type = "";
    this.name = name;
  }

  Sprite.prototype.logName = function logName() {
    console.log("Hey I am " + this.name);
  };

  return Sprite;
})();

;

exports.Sprite = Sprite;

},{}]},{},[2]);
