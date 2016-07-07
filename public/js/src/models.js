//  Models
//  public/js/src/models.js
//
//  Created by Walt Zimmerman on 7/6/16.
//

// Player Base Class
class Player {
  constructor(name) {
    this.name = name;
  }

  logName() {
    console.log(`Hey I am ${this.name}`);
  }
};

export { Player }