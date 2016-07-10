//  Models
//  public/js/src/models.js
//
//  Created by Walt Zimmerman on 7/6/16.
//

/**
* Sprite {object}
* @params type {ENUM}
* Srpite Char Base
*/
const LOCKE = 1;
const NPC = 2;

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
    console.log("thisX",this.x ,"thisY",this.y)
    console.log("X",x ,"Y",y)
  }

  logName() {
    console.log(`Hey I am ${this.name}`);
  }
};

/**
* Locke {object}
* @params type {ENUM}
* Locke - Main Char
*/
class Locke extends SpriteBase {
  constructor(x = 0, y = 0) {
    super(LOCKE, "Locke", x, y);

    // px
    this.width = 17;
    this.height = 29;
    // Asset
    this.imgSrc = "assets/sprites/lock_thumb.png";
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

export { Locke }