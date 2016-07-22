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
  * @param {Npc} - Optional - if Dialog box provide Npc
  * Show or Hide
  */
  toggleOverlay(npc) {
    if(this.isActive) {
      this._hide();
      if(npc) this._removeDialog(npc);
    } else {
      this._show();
      // The dialog box case
      if(npc) this._renderDialog(npc);
    }

  }

  /**
  * @private
  * _renderDialog {function}
  * Render correct dialog
  */
  _renderDialog(npc) {
    let headShotImg = document.getElementById("headshot");
    let content = document.getElementById("content");

    headShotImg.src = npc.headShotSrc;
    content.innerHTML = npc.dialog;
  }

  /**
  * @private
  * _renderDialog {function}
  * Clean out img and text nodes correct dialog
  */
  _removeDialog(npc) {
    let headShotImg = document.getElementById("headshot");
    let content = document.getElementById("content");

    headShotImg.src = "";
    content.innerHTML = ""
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

export default Overlay;