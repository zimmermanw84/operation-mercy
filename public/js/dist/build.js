(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//  Index
//  public/js/src/index.js
//
//  Created by Walt Zimmerman on 7/6/16.
//

'use strict';

var _models = require('./models');

var _init = require('./init');

_init.init();

},{"./init":2,"./models":3}],2:[function(require,module,exports){
//  Init
//  public/js/src/init.js
//
//  Created by Walt Zimmerman on 7/6/16.
//

/*
  =====================================================================================
  initCanvas @private {function}

  @return {Object} Cavas Context Object
  @params height {Number}, width {Number}
  Initialize canvas and add to dom
  =====================================================================================
*/

"use strict";

exports.__esModule = true;
var initCanvas = function initCanvas(height, width) {
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  // Set Props
  canvas.width = width; //512;
  canvas.height = height; //480;
  // Append canvas object
  document.body.appendChild(canvas);

  return ctx;
};

/*
  =====================================================================================
  initBackgroundImg @private {function}

  @return {void}
  @param src {String}
  Add Background img to canvas
  =====================================================================================
*/

var initBackgroundImg = function initBackgroundImg(src, context) {
  var background = new Image();
  background.src = src;

  // Bind load event
  background.onload = function () {
    console.log("onload fired");
    context.scale(2, 2);
    context.drawImage(background, 0, 0);
  };
};

// @public - Init Canvas
var init = function init() {
  var ctx = initCanvas(window.innerHeight, window.innerWidth);
  initBackgroundImg("assets/sprites/thamasa.png", ctx);
};

exports.init = init;

},{}],3:[function(require,module,exports){
//  Models
//  public/js/src/models.js
//
//  Created by Walt Zimmerman on 7/6/16.
//

// Player Base Class
"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = (function () {
  function Player(name) {
    _classCallCheck(this, Player);

    this.name = name;
  }

  Player.prototype.logName = function logName() {
    console.log("Hey I am " + this.name);
  };

  return Player;
})();

;

exports.Player = Player;

},{}]},{},[1]);
