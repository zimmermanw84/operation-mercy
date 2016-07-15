//  Models
//  public/js/src/models/overlay.js
//
//  Created by Walt Zimmerman on 7/12/16.
//

// OVERLAY TYPES - HTML IDS
const OVERLAY_TYPES = {
  intro: "overlay-intro",
  dialog: "overlay-dialog"
};

/**
* Overlay {object}
* @param - type
*/
class Overlay {
  constructor(type) {
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
  _init() {
    this._getInitDisplayState();
  }

  /**
  * @public
  * toggleOverlay {function}
  * Show or Hide
  */
  toggleOverlay() {
    if(this.isActive) this._hide();
    else this._show();
  }

  /**
  * @private
  * _show {function}
  * Show
  */
  _show() {
    this.element.style.display = "block";
    this.isActive = true;
  }

  /**
  * @private
  * _hide {function}
  * Hide
  */
  _hide() {
    this.element.style.display = "none";
    this.isActive = false;
  }

  /**
  * @private
  * _getInitDisplayState {function}
  * Based on type determine if displayed or not
  */
  _getInitDisplayState() {
    switch(this.type) {
      case 'intro':
        this._show();
        break;
      case 'dialog':
        this._hide();
        break;
      default:
        console.error("_getInitDisplayState: No Type");
    }
  }

}

export { Overlay }