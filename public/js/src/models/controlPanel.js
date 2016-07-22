//  control panel
//  public/js/src/models/controlPanel.js
//
//  Created by Walt Zimmerman on 7/20/16.
//

const LEFT = 37;
const UP = 38;
const RIGHT = 39;
const DOWN = 40;
const SPACE = 32;

/**
* @Public
* ControlPanel {object}
* The control display
*/

export default class ControlPanel {
  constructor() {
    // Elements
    this.up = document.getElementById("up");
    this.down = document.getElementById("down");
    this.left = document.getElementById("left");
    this.right = document.getElementById("right");
    this.space = document.getElementById("space");

    this._bindKeys();
  }

  /**
  * @private
  * _setActive {function}
  * Show Element as active
  */
  _setActive(el) {
    el.style.backgroundColor = "red";
  }

  /**
  * @private
  * _setInactive {function}
  * Show Element as inactive
  */
  _setInactive(el) {
    el.style.backgroundColor = "white";
  }

  /**
  * @private
  * _bindKeys {function}
  * Bind necessary keys for state change
  */
  _bindKeys() {
    // Set keyup and key down events
    window.addEventListener('keydown', this._keyDownHendler.bind(this));
    window.addEventListener('keyup', this._keyUpHendler.bind(this));
  }


  // Event handlers
  _keyDownHendler(e) {
    switch(e.keyCode) {
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
  }

  _keyUpHendler(e) {
    switch(e.keyCode) {
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
  }

}

