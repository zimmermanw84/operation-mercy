//  Models
//  public/js/src/models.js
//
//  Created by Walt Zimmerman on 7/6/16.
//

/**
* Sprite {object}
* @params type {ENUM}
*/
class Sprite {
  // static spriteType = { MAIN_CHARACTER: 1, NPC: 2 };

  constructor(type) {
    this.type = ""
    this.name = name;
  }

  logName() {
    console.log(`Hey I am ${this.name}`);
  }
};

export { Sprite }