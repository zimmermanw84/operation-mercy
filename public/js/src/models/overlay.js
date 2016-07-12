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
    this.type = OVERLAY_TYPES[type];
    this.element = document.getElementById(this.type);
    this.isActive = false;
  }

  /**
  * @private
  * _init {function}
  * Initialize overlay
  */
  _init() {

  }

  /**
  * @public
  * toggleOverlay {function}
  * Show or Hide
  */
  toggleOverlay() {
    if(this.isActive) {
      this.element.style.display === "none";
      this.isActive = false;
    } else {
      this.element.style.display === "block";
      this.isActive = true;
    }
  }
}