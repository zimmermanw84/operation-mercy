//  Models
//  public/js/src/models.js
//
//  Created by Walt Zimmerman on 7/6/16.
//

const LOCKE = 1;
const NPC = 2;

import { SPRITE_IMG_SRC } from "../config/img_src";

/**
* Sprite {object}
* @params type {ENUM}
* Srpite Char Base
*/
class SpriteBase {

  constructor(type, name, x = 0, y = 0) {
    this.type = type;
    this.name = name;

    // Position
    this.x = x;
    this.y = y;
    this.xLast;
    this.yLast;

    // For rotating sprite images
    this.currentImgIndex = 0;
  }

  /**
  * @public
  * setPosition {function}
  * Set x/y coordinates of sprite
  */
  setPosition(x, y) {
    this.xLast = this.x;
    this.yLast = this.y;

    this.x = x;
    this.y = y;
  }

  // Movement Functions
  moveLeft() {
    this.xLast = this.x;
    this.yLast = this.y;
    this.x -= 1;

    this._rotateImageSrc("left");
  }

  moveRight() {
    this.xLast = this.x;
    this.yLast = this.y;
    this.x += 1;

    this._rotateImageSrc("right");
  }

  moveUp() {
    this.xLast = this.x;
    this.yLast = this.y;
    this.y -= 1;

    this._rotateImageSrc("up");
  }

  moveDown() {
    this.xLast = this.x;
    this.yLast = this.y;
    this.y += 1;

    this._rotateImageSrc("down");
  }

  logName() {
    console.log(`Hey I am ${this.name}`);
  }
};

/**
* Locke {object}
* Locke - Main Char
*/
class Locke extends SpriteBase {
  constructor(x = 0, y = 0) {
    super(LOCKE, "Locke", x, y);
    this.image = new Image;

    // px
    this.width = 17;
    this.height = 29;
    // Asset
    // Setting starting src
    this.imgSrc = SPRITE_IMG_SRC[this.name].up[this.currentImgIndex];
  }

  /**
  * @private
  * _rotateImageSrc {function}
  * Rotate img src for animation
  */
  _rotateImageSrc(direction) {
    // Set img src
    this.imgSrc = SPRITE_IMG_SRC[this.name][direction][this.currentImgIndex];

    // Reset if currentImgIndex
    if(this.currentImgIndex >= SPRITE_IMG_SRC[this.name][direction].length - 1) {
      this.currentImgIndex = 0;
    } else {
      // Rotate image index
      this.currentImgIndex++;
    }

  }

}

/**
* Npc {object}
* @params type {ENUM}
* Locke - Main Char
*/
class Npc extends SpriteBase {

  constructor(name, x = 0, y = 0) {
    super(NPC, name, x, y);
    this.image = new Image;

    // px
    this.width = 17;
    this.height = 29;
    // Asset
    this.imgSrc = SPRITE_IMG_SRC[this.name].down[this.currentImgIndex];
  }
}

export { Locke, Npc }