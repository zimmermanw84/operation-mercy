//  Models
//  public/js/src/models.js
//
//  Created by Walt Zimmerman on 7/6/16.
//

const LOCKE = 1;
const NPC = 2;

const SPRITE_IMG_SRC = {
  Locke: "../assets/sprites/locke_back_1.png",
  Mog: "../assets/sprites/mog_front.png",
  Emperor: "../assets/sprites/emperor.png",
  Gaurd: "../assets/sprites/narshe_gaurd.png",
  Kefka: "../assets/sprites/kefka.png"
};


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
    this.imgSrc = SPRITE_IMG_SRC[this.name];
  }

  // Movement Functions
  moveLeft() {
    this.xLast = this.x;
    this.yLast = this.y;
    this.x -= 1;
  }

  moveRight() {
    this.xLast = this.x;
    this.yLast = this.y;
    this.x += 1;
  }

  moveUp() {
    this.xLast = this.x;
    this.yLast = this.y;
    this.y -= 1;
  }

  moveDown() {
    this.xLast = this.x;
    this.yLast = this.y;
    this.y += 1;
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
    this.imgSrc = SPRITE_IMG_SRC[this.name];
  }
}

export { Locke, Npc }